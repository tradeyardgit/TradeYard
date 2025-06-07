/*
  # Add admin role and reports table

  1. Changes
    - Add role column to profiles table
    - Create reports table for tracking user reports
    - Set up RLS policies for reports
    - Create necessary indexes

  2. Security
    - Enable RLS on reports table
    - Add policies for admin access and user report creation
*/

-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_item_id uuid REFERENCES ads(id) ON DELETE CASCADE,
  reported_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  reporter_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('scam', 'inappropriate', 'offensive', 'illegal', 'other')),
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to read all reports
CREATE POLICY "Admins can read all reports" ON reports
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to update reports
CREATE POLICY "Admins can update reports" ON reports
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policy for users to create reports
CREATE POLICY "Users can create reports" ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster queries
CREATE INDEX reports_status_idx ON reports(status);
CREATE INDEX reports_reported_item_idx ON reports(reported_item_id);
CREATE INDEX reports_reported_user_idx ON reports(reported_user_id);