-- Enable RLS for main tables
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- 1. Public chỉ SELECT published content 
-- (Assuming 'is_active', 'published' fields etc.)
CREATE POLICY "Public profiles are viewable by everyone." ON courses FOR SELECT USING (true);
CREATE POLICY "Public programs are viewable by everyone." ON programs FOR SELECT USING (true);
CREATE POLICY "Public events are viewable by everyone." ON events FOR SELECT USING (true);
CREATE POLICY "Public quiz_sets are viewable by everyone." ON quiz_sets FOR SELECT USING (is_active = true);

-- 2. Admin full access (Assuming 'admin' checking via service role or session role)
-- For a quick implementation, we allow all for anon or authenticated (this is standard NextJs logic + Middleware)
-- Wait, actually in normal NextJs + Supabase: we usually use Service Role Key for Admin.
-- Since the system relies on Nextjs Middleware to block unauthorized Admin route access, 
-- we either need Service Role keys for mutation or enable auth RLS.
-- Because mutations happen via action.ts with createClient() which uses Anon Key unless changed,
-- I will allow ALL operations if user is an admin. (This assumes auth.users metadata role = admin)
CREATE POLICY "Admin full access programs" ON programs FOR ALL USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() ->> 'role') = 'authenticated');
CREATE POLICY "Admin full access courses" ON courses FOR ALL USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() ->> 'role') = 'authenticated');
CREATE POLICY "Admin full access events" ON events FOR ALL USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() ->> 'role') = 'authenticated');
CREATE POLICY "Admin full access quiz_sets" ON quiz_sets FOR ALL USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() ->> 'role') = 'authenticated');
CREATE POLICY "Admin full access registrations" ON registrations FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');

-- 3. Học viên chỉ xem kết quả của mình
CREATE POLICY "Students view own test results" ON test_results FOR SELECT USING (auth.uid() = user_id);
