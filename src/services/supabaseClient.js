import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hthfcotxjbjlpgwnaceq.supabase.co"
const supabaseKey = "sb_publishable_NfwEfZ4t1CBX881eDh4EqA_XIVd4Wgs"

export const supabase = createClient(supabaseUrl, supabaseKey)