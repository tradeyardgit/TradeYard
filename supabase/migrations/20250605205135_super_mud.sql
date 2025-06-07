/*
  # Create Example Users and Ads

  1. New Data
    - Creates 10 example user accounts with profiles
    - Creates 20 example ads distributed among users
    - Sets up realistic test data for development

  2. Changes
    - Inserts users into auth.users table
    - Creates corresponding profiles
    - Creates sample ads with varied categories and prices
*/

-- Create users and profiles first
WITH user_data AS (
  SELECT
    gen_random_uuid() AS user_id,
    'user' || n || '@example.com' AS email,
    'User ' || n AS name,
    '+234' || (800000000 + n)::text AS phone,
    (ARRAY['lagos', 'abuja', 'port-harcourt', 'ibadan', 'kano'])[1 + (n % 5)] AS location,
    n AS seq_num
  FROM generate_series(1, 10) n
),
inserted_auth_users AS (
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    aud,
    role
  )
  SELECT
    user_id,
    email,
    crypt('123456', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('name', name, 'phone', phone),
    now(),
    now(),
    'authenticated',
    'authenticated'
  FROM user_data
  RETURNING id, (raw_user_meta_data->>'name') as name, created_at, updated_at, aud, role
),
inserted_profiles AS (
  INSERT INTO public.profiles (
    id,
    name,
    phone,
    location,
    role,
    created_at,
    updated_at
  )
  SELECT
    au.id,
    ud.name,
    ud.phone,
    ud.location,
    'user',
    au.created_at,
    au.updated_at
  FROM inserted_auth_users au
  JOIN user_data ud ON au.id = ud.user_id
  RETURNING id, location
)
-- Create sample ads
INSERT INTO public.ads (
  title,
  description,
  price,
  category,
  location,
  images,
  seller_id,
  featured,
  condition,
  negotiable,
  status,
  created_at
)
SELECT
  CASE (gs.n % 5)
    WHEN 0 THEN 'iPhone ' || (13 + (gs.n % 3)) || ' Pro Max - ' || (128 * (1 + (gs.n % 3))) || 'GB'
    WHEN 1 THEN (2020 + (gs.n % 4)) || ' Toyota ' || (CASE (gs.n % 3) WHEN 0 THEN 'Camry' WHEN 1 THEN 'Corolla' ELSE 'RAV4' END)
    WHEN 2 THEN (3 + (gs.n % 2)) || ' Bedroom Apartment in ' || (CASE (gs.n % 3) WHEN 0 THEN 'Lekki' WHEN 1 THEN 'Ikeja' ELSE 'Victoria Island' END)
    WHEN 3 THEN 'Designer ' || (CASE (gs.n % 3) WHEN 0 THEN 'Handbag' WHEN 1 THEN 'Watch' ELSE 'Shoes' END)
    ELSE 'Professional ' || (CASE (gs.n % 3) WHEN 0 THEN 'Developer' WHEN 1 THEN 'Designer' ELSE 'Manager' END) || ' Position'
  END,
  'Detailed description for item ' || gs.n || '. In excellent condition with all original accessories.',
  CASE (gs.n % 5)
    WHEN 0 THEN 450000 + (gs.n * 50000)
    WHEN 1 THEN 5000000 + (gs.n * 500000)
    WHEN 2 THEN 50000000 + (gs.n * 5000000)
    WHEN 3 THEN 50000 + (gs.n * 5000)
    ELSE 150000 + (gs.n * 25000)
  END,
  (ARRAY['electronics', 'vehicles', 'property', 'fashion', 'jobs'])[1 + (gs.n % 5)],
  (SELECT location FROM inserted_profiles ORDER BY id OFFSET (gs.n - 1) % (SELECT COUNT(*) FROM inserted_profiles) LIMIT 1),
  ARRAY[
    'https://images.pexels.com/photos/' || (5750001 + gs.n) || '/pexels-photo-' || (5750001 + gs.n) || '.jpeg',
    'https://images.pexels.com/photos/' || (1571460 + gs.n) || '/pexels-photo-' || (1571460 + gs.n) || '.jpeg'
  ],
  (SELECT id FROM inserted_profiles ORDER BY id OFFSET (gs.n - 1) % (SELECT COUNT(*) FROM inserted_profiles) LIMIT 1),
  (gs.n % 5 = 0),
  (ARRAY['New', 'Used - Like New', 'Used - Good', 'Used - Fair'])[1 + (gs.n % 4)],
  (gs.n % 3 = 0),
  'active',
  now() - (gs.n || ' days')::interval
FROM generate_series(1, 20) gs(n);