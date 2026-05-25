import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xfrsjvaewbcukazxcwvv.supabase.co";
const supabasePublishableKey = "sb_publishable_P3Wzj3G_5kEyhMlEUrosCQ_5mi_wINe";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
