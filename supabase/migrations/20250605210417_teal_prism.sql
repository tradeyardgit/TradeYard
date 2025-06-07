/*
  # Update profiles table RLS policies

  1. Changes
    - Add new RLS policy to allow admins to create new user profiles
    - Keep existing policies intact
    
  2. Security
    - Only authenticated admins can create new profiles
    - Maintains existing security for other operations
*/

-- First remove the existing insert policy
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;

-- Create new insert policy with proper checks
CREATE POLICY "Admins can insert profiles"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Ensure other policies remain unchanged
DO $$ 
BEGIN
  -- Verify select policy exists, create if not
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Public profiles are viewable by everyone'
  ) THEN
    CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles
    FOR SELECT
    TO public
    USING (true);
  END IF;

  -- Verify update policy exists, create if not
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
    ON profiles
    FOR UPDATE
    TO public
    USING (auth.uid() = id);
  END IF;
END $$;