/*
  # Create Admin User

  1. Changes
    - Create new admin user with email tradeyardmail@gmail.com
    - Create corresponding profile with admin role
    
  2. Security
    - Password is hashed using Supabase's auth schema
    - User is given admin role
*/

-- Create admin user using Supabase's auth schema
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
  recovery_token,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'tradeyardmail@gmail.com',
  crypt('123456', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Sedi Raheem"}',
  now(),
  now(),
  '',
  '',
  '',
  '',
  'authenticated',
  'authenticated'
);

-- Create admin profile
INSERT INTO public.profiles (
  id,
  name,
  role,
  created_at,
  updated_at
)
SELECT
  id,
  'Sedi Raheem',
  'admin',
  now(),
  now()
FROM auth.users
WHERE email = 'tradeyardmail@gmail.com';