/*
  # Allow authenticated users to upload images

  1. Changes
    - Create storage bucket 'ad-images' if it doesn't exist
    - Enable RLS on the storage.objects table for the bucket
    - Add policy to allow authenticated users to upload images
    - Add policy to allow public read access to uploaded images

  2. Security
    - Only authenticated users can upload images
    - Anyone can view uploaded images (public read access)
    - Users can only delete their own uploaded images
*/

-- Create the ad-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('ad-images', 'ad-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ad-images');

-- Allow public read access to images
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ad-images');

-- Allow users to delete their own uploaded images
CREATE POLICY "Users can delete own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'ad-images' AND auth.uid() = owner::uuid);

-- Allow users to update their own uploaded images
CREATE POLICY "Users can update own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ad-images' AND auth.uid() = owner::uuid);