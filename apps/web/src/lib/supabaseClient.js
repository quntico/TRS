import { createClient } from '@supabase/supabase-js';

// Si no se han configurado las variables de entorno, usamos placeholders para evitar fallos críticos al iniciar la aplicación.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GOXJBQrzk5SiOEIgATSd6A_rxqR_hHH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
