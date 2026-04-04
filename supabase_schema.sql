-- ============================================================
-- STEMKey — Supabase Schema
-- Paste toàn bộ file này vào SQL Editor của Supabase và chạy.
-- ============================================================

-- ============================================================
-- 1. BRANCHES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.branches (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       TEXT NOT NULL,
    address    TEXT NOT NULL,
    city       TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. PROGRAMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.programs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    description TEXT,
    image_url   TEXT,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. COURSES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id  UUID REFERENCES public.programs(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    description TEXT,
    duration    TEXT,
    level       TEXT,
    schedule    TEXT,   -- e.g. "Thứ 2, 4, 6 | 18:00 - 19:30"
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. SCHEDULES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.schedules (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id   UUID REFERENCES public.branches(id) ON DELETE CASCADE,
    course_id   UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    class_code  TEXT NOT NULL,
    schedule    TEXT NOT NULL,
    start_date  DATE NOT NULL,
    status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'full', 'closed')),
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 5. STUDENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.students (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    age         INTEGER,
    grade       TEXT,
    parent_name TEXT,
    phone       TEXT,
    email       TEXT,
    branch_id   UUID REFERENCES public.branches(id) ON DELETE SET NULL,
    course_id   UUID REFERENCES public.courses(id) ON DELETE SET NULL,
    schedule_id UUID REFERENCES public.schedules(id) ON DELETE SET NULL,
    status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. EVENTS
-- Dùng chung cho: Tin tức, Góc học tập, Góc ba mẹ, Video
-- Phân loại bằng: category + type
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    category        TEXT,             -- 'Tin tức' | 'Góc học tập' | 'Góc ba mẹ'
    type            TEXT DEFAULT 'article' CHECK (type IN ('article', 'video')),
    description     TEXT,
    excerpt         TEXT,
    content         TEXT,
    date            DATE NOT NULL,
    location        TEXT,
    image_url       TEXT,
    author_image_url TEXT,
    youtube_id      TEXT,             -- YouTube video ID nếu type = 'video'
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. REGISTRATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.registrations (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    grade        TEXT,
    parent_name  TEXT,
    phone        TEXT,
    email        TEXT,
    course_id    UUID REFERENCES public.courses(id) ON DELETE SET NULL,
    branch_id    UUID REFERENCES public.branches(id) ON DELETE SET NULL,
    status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'cancelled')),
    created_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 8. BANNERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.banners (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title         TEXT,
    image_url     TEXT NOT NULL,
    link_url      TEXT,
    is_active     BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 9. PROFILES
-- Tự động tạo khi user đăng ký (qua trigger bên dưới)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email      TEXT,
    role       TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 10. QUIZ SETS
-- id là TEXT (slug tự đặt, ví dụ: "toan-tu-duy-3-4-tuoi")
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_sets (
    id               TEXT PRIMARY KEY,
    title            TEXT NOT NULL,
    age_group        TEXT NOT NULL,   -- '3-4 tuổi' | '4-5 tuổi' | '5-6 tuổi' | 'Tiểu học'
    duration_seconds INTEGER NOT NULL DEFAULT 1800,
    is_active        BOOLEAN NOT NULL DEFAULT true,
    created_at       TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 11. QUIZ QUESTIONS
-- id là BIGSERIAL (integer) — code dùng id: number
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id             BIGSERIAL PRIMARY KEY,
    quiz_set_id    TEXT NOT NULL REFERENCES public.quiz_sets(id) ON DELETE CASCADE,
    question_order INTEGER NOT NULL DEFAULT 1,
    text           TEXT NOT NULL,
    options        TEXT[] NOT NULL DEFAULT '{}',
    correct_answer INTEGER NOT NULL DEFAULT 0,
    option_type    TEXT NOT NULL DEFAULT 'text' CHECK (option_type IN ('text', 'image')),
    option_images  TEXT[],
    created_at     TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 12. QUIZ RESULTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id               UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email            TEXT,
    parent_phone          TEXT,
    quiz_slug             TEXT NOT NULL REFERENCES public.quiz_sets(id) ON DELETE CASCADE,
    total_questions       INTEGER NOT NULL DEFAULT 0,
    completed_count       INTEGER NOT NULL DEFAULT 0,
    score                 NUMERIC,
    answers               JSONB DEFAULT '{}',
    current_question_index INTEGER NOT NULL DEFAULT 0,
    time_left             INTEGER,
    status                TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    started_at            TIMESTAMPTZ DEFAULT now(),
    completed_at          TIMESTAMPTZ,
    created_at            TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TRIGGER — Tự động tạo profile khi user đăng ký
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.branches     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sets    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Helper: kiểm tra user hiện tại có role admin không
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
$$;

-- ---- branches: public đọc, admin full ----
CREATE POLICY "branches_public_select"  ON public.branches FOR SELECT USING (true);
CREATE POLICY "branches_admin_all"      ON public.branches FOR ALL    USING (public.is_admin());

-- ---- programs: public đọc, admin full ----
CREATE POLICY "programs_public_select"  ON public.programs FOR SELECT USING (true);
CREATE POLICY "programs_admin_all"      ON public.programs FOR ALL    USING (public.is_admin());

-- ---- courses: public đọc, admin full ----
CREATE POLICY "courses_public_select"   ON public.courses FOR SELECT USING (true);
CREATE POLICY "courses_admin_all"       ON public.courses FOR ALL    USING (public.is_admin());

-- ---- schedules: public đọc, admin full ----
CREATE POLICY "schedules_public_select" ON public.schedules FOR SELECT USING (true);
CREATE POLICY "schedules_admin_all"     ON public.schedules FOR ALL   USING (public.is_admin());

-- ---- events: public đọc, admin full ----
CREATE POLICY "events_public_select"    ON public.events FOR SELECT USING (true);
CREATE POLICY "events_admin_all"        ON public.events FOR ALL     USING (public.is_admin());

-- ---- banners: public đọc, admin full ----
CREATE POLICY "banners_public_select"   ON public.banners FOR SELECT USING (true);
CREATE POLICY "banners_admin_all"       ON public.banners FOR ALL    USING (public.is_admin());

-- ---- registrations: ai cũng INSERT được (form đăng ký), admin full ----
CREATE POLICY "registrations_public_insert" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "registrations_admin_all"     ON public.registrations FOR ALL    USING (public.is_admin());

-- ---- students: chỉ admin ----
CREATE POLICY "students_admin_all"      ON public.students FOR ALL USING (public.is_admin());

-- ---- profiles: user đọc/sửa profile của mình, admin full ----
CREATE POLICY "profiles_own_select"     ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_own_update"     ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all"      ON public.profiles FOR ALL    USING (public.is_admin());

-- ---- quiz_sets: public đọc (cần lấy bài thi), admin full ----
CREATE POLICY "quiz_sets_public_select"  ON public.quiz_sets FOR SELECT USING (true);
CREATE POLICY "quiz_sets_admin_all"      ON public.quiz_sets FOR ALL   USING (public.is_admin());

-- ---- quiz_questions: public đọc, admin full ----
CREATE POLICY "quiz_questions_public_select" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "quiz_questions_admin_all"     ON public.quiz_questions FOR ALL   USING (public.is_admin());

-- ---- quiz_results: user thao tác kết quả của chính mình, admin đọc tất cả ----
CREATE POLICY "quiz_results_own_insert" ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "quiz_results_own_select" ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "quiz_results_own_update" ON public.quiz_results FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "quiz_results_admin_all"  ON public.quiz_results FOR ALL    USING (public.is_admin());
