/*
  # Add default admin user

  1. Changes
    - Create default admin user in auth.users
    - Create corresponding admin profile
    
  2. Security
    - Password is hashed using Supabase's built-in encryption
    - User is assigned admin role
*/

-- Create admin user in auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  'admin@tradeyard.com',
  crypt('123456', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Create admin profile
INSERT INTO public.profiles (
  id,
  name,
  role,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Admin',
  'admin',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;