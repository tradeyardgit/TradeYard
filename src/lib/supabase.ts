import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Admin helper functions
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile?.role === 'admin';
};

// Reports helper functions
export const getReports = async () => {
  const { data, error } = await supabase
    .from('reports')
    .select(`
      *,
      reported_item:ads(*),
      reported_user:profiles(*),
      reporter:profiles(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateReportStatus = async (id: string, status: 'pending' | 'resolved' | 'dismissed') => {
  const { error } = await supabase
    .from('reports')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
};

// Users helper functions
export const getUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateUser = async (id: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
};

export const deleteUser = async (id: string) => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Ads helper functions
export const getAds = async () => {
  const { data, error } = await supabase
    .from('ads')
    .select(`
      *,
      seller:profiles(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateAd = async (id: string, updates: Partial<Database['public']['Tables']['ads']['Update']>) => {
  const { error } = await supabase
    .from('ads')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
};

export const deleteAd = async (id: string) => {
  const { error } = await supabase
    .from('ads')
    .delete()
    .eq('id', id);

  if (error) throw error;
};