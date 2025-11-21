import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "://..co" 
const supabaseKey = "" 

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;