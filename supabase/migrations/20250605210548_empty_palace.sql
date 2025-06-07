/*
  # Update profiles RLS policies

  1. Changes
    - Add new RLS policy to allow admins to create user profiles
    - Modify existing admin insert policy to use proper admin role check

  2. Security
    - Ensures admins can create new user profiles
    - Maintains existing security for non-admin users
*/

-- Drop the existing admin insert policy
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;

-- Create new policy for admin profile creation
CREATE POLICY "Admins can create user profiles"
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