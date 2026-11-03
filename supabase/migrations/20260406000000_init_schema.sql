-- Create the workshop_enrollments table
CREATE TABLE IF NOT EXISTS public.workshop_enrollments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    workshop_id integer NOT NULL,
    workshop_title text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    enrolled_at timestamp with time zone DEFAULT now(),
    CONSTRAINT workshop_enrollments_pkey PRIMARY KEY (id),
    CONSTRAINT workshop_enrollments_unique_member UNIQUE (workshop_id, email)
);

-- Enable Row Level Security (RLS) on workshop_enrollments
ALTER TABLE public.workshop_enrollments ENABLE ROW LEVEL SECURITY;

-- Allow public read of enrollment counts & duplicate checks, and public insert for enrolling
CREATE POLICY "Allow public read on workshop_enrollments"
    ON public.workshop_enrollments FOR SELECT USING (true);

CREATE POLICY "Allow public insert on workshop_enrollments"
    ON public.workshop_enrollments FOR INSERT WITH CHECK (true);

-- Create contact_messages table for ContactSection submissions
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    email text NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT contact_messages_pkey PRIMARY KEY (id)
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on contact_messages"
    ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated admin read on contact_messages"
    ON public.contact_messages FOR SELECT TO authenticated USING (true);

-- Storage bucket for Workshop Materials (matching 'workshop_materials' in frontend code):
INSERT INTO storage.buckets (id, name, public)
VALUES ('workshop_materials', 'workshop_materials', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies for workshop_materials bucket
DROP POLICY IF EXISTS "Public read access for workshop_materials" ON storage.objects;
CREATE POLICY "Public read access for workshop_materials"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'workshop_materials');

DROP POLICY IF EXISTS "Admin upload access for workshop_materials" ON storage.objects;
CREATE POLICY "Admin upload access for workshop_materials"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'workshop_materials');

DROP POLICY IF EXISTS "Admin update access for workshop_materials" ON storage.objects;
CREATE POLICY "Admin update access for workshop_materials"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'workshop_materials');

DROP POLICY IF EXISTS "Admin delete access for workshop_materials" ON storage.objects;
CREATE POLICY "Admin delete access for workshop_materials"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'workshop_materials');
