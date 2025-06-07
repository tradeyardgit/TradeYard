/*
  # Update profiles table RLS policies

  1. Changes
    - Add new RLS policy to allow admins to insert new profiles
    - Modify existing admin insert policy to use proper admin check

  2. Security
    - Updates RLS policies for the profiles table
    - Ensures only admins can create new profiles
    - Maintains existing policies for other operations
*/

-- Drop the existing admin insert policy
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

-- Create new admin insert policy with proper admin check
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