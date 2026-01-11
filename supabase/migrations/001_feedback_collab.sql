-- =========================================================
-- HIFLIX: Feedback & Collaboration Schema Update
-- =========================================================

-- 1) UPDATE FEEDBACK TABLE (Audit + Meta)
-- =========================================================

ALTER TABLE IF EXISTS public.feedback
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS closed_at timestamptz,
  ADD COLUMN IF NOT EXISTS admin_note text,
  ADD COLUMN IF NOT EXISTS meta jsonb;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS feedback_status_idx ON public.feedback (status);
CREATE INDEX IF NOT EXISTS feedback_type_idx ON public.feedback (type);
CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON public.feedback (created_at DESC);

-- RLS Policies for feedback
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public/guest can insert feedback
DROP POLICY IF EXISTS "feedback_public_insert" ON public.feedback;
CREATE POLICY "feedback_public_insert"
ON public.feedback FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin can read all feedback
DROP POLICY IF EXISTS "feedback_admin_select" ON public.feedback;
CREATE POLICY "feedback_admin_select"
ON public.feedback FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admin can update feedback
DROP POLICY IF EXISTS "feedback_admin_update" ON public.feedback;
CREATE POLICY "feedback_admin_update"
ON public.feedback FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admin can delete feedback
DROP POLICY IF EXISTS "feedback_admin_delete" ON public.feedback;
CREATE POLICY "feedback_admin_delete"
ON public.feedback FOR DELETE
TO authenticated
USING (public.is_admin());

-- 2) CREATE COLLABORATION_REQUESTS TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS public.collaboration_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_email text,
  name text,
  organization text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  closed_at timestamptz,
  admin_note text,
  meta jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS collab_status_idx ON public.collaboration_requests (status);
CREATE INDEX IF NOT EXISTS collab_created_at_idx ON public.collaboration_requests (created_at DESC);

-- RLS
ALTER TABLE public.collaboration_requests ENABLE ROW LEVEL SECURITY;

-- Public can insert
DROP POLICY IF EXISTS "collab_public_insert" ON public.collaboration_requests;
CREATE POLICY "collab_public_insert"
ON public.collaboration_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin can read
DROP POLICY IF EXISTS "collab_admin_select" ON public.collaboration_requests;
CREATE POLICY "collab_admin_select"
ON public.collaboration_requests FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admin can update
DROP POLICY IF EXISTS "collab_admin_update" ON public.collaboration_requests;
CREATE POLICY "collab_admin_update"
ON public.collaboration_requests FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admin can delete
DROP POLICY IF EXISTS "collab_admin_delete" ON public.collaboration_requests;
CREATE POLICY "collab_admin_delete"
ON public.collaboration_requests FOR DELETE
TO authenticated
USING (public.is_admin());

-- 3) STATUS CONSTRAINTS (Optional but recommended)
-- =========================================================

ALTER TABLE public.collaboration_requests
  DROP CONSTRAINT IF EXISTS collab_status_check;

ALTER TABLE public.collaboration_requests
  ADD CONSTRAINT collab_status_check
  CHECK (status IN ('open', 'reviewed', 'closed'));

-- Feedback status constraint (if using text, not enum)
ALTER TABLE public.feedback
  DROP CONSTRAINT IF EXISTS feedback_status_check;

ALTER TABLE public.feedback
  ADD CONSTRAINT feedback_status_check
  CHECK (status IN ('open', 'reviewed', 'closed'));
