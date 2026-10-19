import { createClient } from "@supabase/supabase-js";
import env from "./env.js";

let supabase = null;

if (env.supabaseUrl && env.supabaseServiceRoleKey) {
  supabase = createClient(
    env.supabaseUrl,
    env.supabaseServiceRoleKey,
  );
}

export default supabase;