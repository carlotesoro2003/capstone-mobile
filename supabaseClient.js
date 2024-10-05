import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tihoeiokcroraysthhwp.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpaG9laW9rY3JvcmF5c3RoaHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0ODUxNDUsImV4cCI6MjA0MzA2MTE0NX0.juN4TXAAExrrhAMVz9pJn4SUDgU6zTZCV9eXnROlFsQ"

export const supabase = createClient(supabaseUrl, supabaseKey)
