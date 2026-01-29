/*
  # Fix Storage Policies Type Mismatch

  ## Overview
  This migration fixes the "operator does not exist: text = uuid" error by ensuring
  all storage policies correctly handle UUID comparisons.

  ## Changes
  1. Drop any existing storage policies that might have incorrect type casting
  2. Recreate storage policies with correct UUID type handling
  3. Ensure the owner column comparison is properly cast to UUID

  ## Technical Details
  - The `storage.objects.owner` column is TEXT type
  - The `auth.uid()` function returns UUID type
  - We must cast `owner` to UUID, not cast `auth.uid()` to TEXT
  - Correct: `auth.uid() = owner::uuid`
  - Incorrect: `auth.uid()::text = owner`
*/

-- Drop all existing storage policies for ad-images bucket to ensure clean slate
DROP POLICY IF EXISTS "Allow authenticated users to upload ad images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update own ad images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete own ad images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to ad images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view ad images" ON storage.objects;

-- Recreate storage policies with correct type handling

-- 1. Allow authenticated users to upload images to ad-images bucket
CREATE POLICY "Allow authenticated users to upload ad images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'ad-images' AND
    auth.uid() = owner::uuid
  );

-- 2. Allow users to update their own images
CREATE POLICY "Allow users to update own ad images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'ad-images' AND
    auth.uid() = owner::uuid
  );

-- 3. Allow users to delete their own images
CREATE POLICY "Allow users to delete own ad images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'ad-images' AND
    auth.uid() = owner::uuid
  );

-- 4. Allow anyone (including anonymous users) to view/download ad images
CREATE POLICY "Anyone can view ad images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'ad-images');

-- Verify the ad-images bucket exists and is properly configured
DO $$
BEGIN
  -- Check if bucket exists, create if it doesn't
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'ad-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('ad-images', 'ad-images', true);
  ELSE
    -- Ensure the bucket is public
    UPDATE storage.buckets
    SET public = true
    WHERE id = 'ad-images';
  END IF;
END $$;