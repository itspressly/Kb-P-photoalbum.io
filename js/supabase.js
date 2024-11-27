// Supabase API Configuration
const SUPABASE_URL = "https://ldjyrvfxoxsjuxxvekpw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkanlydmZ4b3hzanV4eHZla3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjYyNDQsImV4cCI6MjA0ODMwMjI0NH0.scu-KOTK00cTMeSk0NSaQ_o6wbVdJt331iQ0l8Ps618";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
