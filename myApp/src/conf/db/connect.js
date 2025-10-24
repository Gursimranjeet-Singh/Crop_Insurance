import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fctlekouhevrbjsvzwqt.supabase.co" 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdGxla291aGV2cmJqc3Z6d3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NzU5NDAsImV4cCI6MjA3NjM1MTk0MH0.u1tywelZ2_facbqwGkNEi7l38uKTU66TW0uD7Je5tmA" 

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;