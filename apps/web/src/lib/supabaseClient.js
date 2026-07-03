import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ugbloftsagwooagofixk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GOXJBQrzk5SiOEIgATSd6A_rxqR_hHH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
