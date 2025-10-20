import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "put ur own" 
const supabaseKey = "put ur own" 

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;