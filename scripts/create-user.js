import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createUser() {
  try {
    console.log('Creating new user...');
    
    // Create the user account
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'shafogrin@gmail.com',
      password: '123456',
      email_confirm: true // Skip email confirmation
    });

    if (authError) {
      throw authError;
    }

    console.log('User created successfully:', authData.user.id);

    // Create the user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        name: 'Shafogrin User',
        phone: '+234 800 000 0000',
        location: 'lagos',
        role: 'user'
      });

    if (profileError) {
      throw profileError;
    }

    console.log('User profile created successfully');
    console.log('User can now login with:');
    console.log('Email: shafogrin@gmail.com');
    console.log('Password: 123456');

  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}

createUser();