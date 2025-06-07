/*
  # Update profiles table RLS policies

  1. Changes
    - Add new RLS policy to allow admins to insert new profiles
    - Keep existing policies intact
    
  2. Security
    - Admins can create new profiles
    - Users can still update their own profiles
    - Public profiles remain viewable by everyone
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;

-- Create new insert policy that allows admins to create profiles
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