/*
  # Add admin insert policy for profiles

  1. Changes
    - Add RLS policy allowing admins to insert new profiles
    
  2. Security
    - Only users with admin role can insert new profiles
    - Maintains existing RLS policies
*/

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