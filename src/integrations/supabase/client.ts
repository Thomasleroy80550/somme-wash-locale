
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lzgjuyaiiwkkdddgxddt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Z2p1eWFpaXdra2RkZGd4ZGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNTcwNzcsImV4cCI6MjA2NDczMzA3N30.eH_kGHSl27WfdjT3s3CGg6IXKrgQXta6EAjVNAoye6E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
