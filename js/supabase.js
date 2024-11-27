// Import the Supabase client library from the CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Define Supabase URL and Anonymous Key
const SUPABASE_URL = "https://ldjyrvfxoxsjuxxvekpw.supabase.co"; // Replace with your project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkanlydmZ4b3hzanV4eHZla3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjYyNDQsImV4cCI6MjA0ODMwMjI0NH0.scu-KOTK00cTMeSk0NSaQ_o6wbVdJt331iQ0l8Ps618"; // Replace with your anon key

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// No need to access 'supabase' directly here; it is exported
