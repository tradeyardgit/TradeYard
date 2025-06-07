/*
  # Fix profiles policy for admin user creation

  1. Changes
    - Add policy for admins to insert new profiles if it doesn't exist
    - Uses DO block to check for policy existence first
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Admins can insert profiles'
  ) THEN
    CREATE POLICY "Admins can insert profiles"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
      )
    );
  END IF;
END $$;