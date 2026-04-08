-- Create the workshop_enrollments table
CREATE TABLE IF NOT EXISTS public.workshop_enrollments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    workshop_id integer NOT NULL,
    workshop_title text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    enrolled_at timestamp with time zone DEFAULT now(),
    CONSTRAINT workshop_enrollments_pkey PRIMARY KEY (id)
);

-- Note: RLS is disabled on this table, but if needed, we can enable it:
-- ALTER TABLE public.workshop_enrollments ENABLE ROW LEVEL SECURITY;

-- If uploading Workshop Materials via Storage buckets:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('workshop-materials', 'workshop-materials', true);
