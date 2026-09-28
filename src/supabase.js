import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nsvvmmofzbfchuutuoxt.supabase.co";
const supabaseKey = "sb_publishable_r6GBnSfRiUoF6-BdqVZtCw_Ssu1haKA";

export const supabase = createClient(supabaseUrl, supabaseKey);
