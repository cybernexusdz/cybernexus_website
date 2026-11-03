-- ==============================================================================
-- CyberNexus Team Data Migration for Supabase
-- ==============================================================================

-- 1. Create departments table
CREATE TABLE IF NOT EXISTS public.departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and add public read policy
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on departments" 
    ON public.departments FOR SELECT USING (true);

-- 2. Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    grade TEXT,
    bio TEXT,
    social_links JSONB DEFAULT '[]'::jsonb NOT NULL,
    department_roles JSONB DEFAULT '[]'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and add public read policy
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on team_members" 
    ON public.team_members FOR SELECT USING (true);

-- 3. Create relational member department roles table (normalized)
CREATE TABLE IF NOT EXISTS public.team_member_department_roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INTEGER REFERENCES public.team_members(id) ON DELETE CASCADE,
    department_id TEXT REFERENCES public.departments(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    is_lead BOOLEAN DEFAULT FALSE NOT NULL
);

-- Enable RLS and add public read policy
ALTER TABLE public.team_member_department_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on team_member_department_roles" 
    ON public.team_member_department_roles FOR SELECT USING (true);

-- ==============================================================================
-- Seed Data: Departments
-- ==============================================================================
INSERT INTO public.departments (id, name, description, icon)
VALUES
  ('leadership', 'Club Leadership', 'Sets the club''s vision, strategy and priorities; coordinates cross-department initiatives and represents the club externally.', 'Crown'),
  ('hr', 'Human Resources', 'Recruits and onboards members, manages volunteer engagement, policies, and supports member development and well-being.', 'Users'),
  ('external', 'External Relations', 'Builds and maintains partnerships with organizations, handles outreach, sponsorships, and community relations.', 'Handshake'),
  ('treasury', 'Treasury', 'Oversees budgeting, expense tracking, fundraising, and financial reporting to ensure the club''s resources are managed responsibly.', 'Wallet'),
  ('media', 'Media & Content', 'Creates and distributes multimedia content — photography, video, copy, and social media — to promote events and projects.', 'Camera'),
  ('development', 'Development', 'Designs and builds web and software projects, maintains technical infrastructure, and supports tooling and automation for the club.', 'Code'),
  ('design', 'Design & Branding', 'Shapes the club''s visual identity, UI/UX for products, and produces assets for campaigns, events, and digital presence.', 'Palette')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

-- ==============================================================================
-- Seed Data: Team Members
-- ==============================================================================
INSERT INTO public.team_members (id, name, image, grade, bio, social_links, department_roles)
VALUES
  (1, 'Sabrine', '/images/team/sabrine-image-front.png', 'M1-NET', 'Leading CyberNexus with vision and design excellence', '[]'::jsonb, '[{"departmentId":"leadership","role":"Club Leader","isLead":true},{"departmentId":"design","role":"UI/UX Designer","isLead":false},{"departmentId":"hr","role":"Training & Culture Supervisor","isLead":false},{"departmentId":"external","role":"External Relations","isLead":false}]'::jsonb),
  (2, 'Sofiane', '/images/team/sofiane-image-front.jpg', 'M1-AID', 'Driving media strategy and club operations', '[]'::jsonb, '[{"departmentId":"leadership","role":"Co-Leader","isLead":true},{"departmentId":"media","role":"Media Lead","isLead":true}]'::jsonb),
  (3, 'Tounsi Abd Essamed', '/images/team/tounssi-image-front.jpg', 'M1-AID', 'Believe in yourself 🫶🏻', '[{"icon":"Globe","href":"https://port-folio-hvbi.vercel.app/","label":"Portfolio"},{"icon":"Mail","href":"mailto:mcboosabdo@gmail.com","label":"Email"}]'::jsonb, '[{"departmentId":"leadership","role":"General Secretary"},{"departmentId":"media","role":"Content Creator"}]'::jsonb),
  (4, 'Gaza. Aya.', '/images/team/aya-image-front.png', NULL, 'حينمـــا تلتــــــقي الكلمـــــــــة بألـــــف حـرف', '[]'::jsonb, '[{"departmentId":"media","role":"Club Writer"},{"departmentId":"hr","role":"Data & Records Coordinator"}]'::jsonb),
  (5, 'Soltana', '/images/team/soltana-iamge-front.png', 'L1-Droit', '', '[{"icon":"Instagram","href":"https://www.instagram.com/mikas_a0301?igsh=MWk3ZmNoYXMxczdwYg==","label":"Instagram"}]'::jsonb, '[{"departmentId":"hr","role":"Legal Advisor"}]'::jsonb),
  (6, 'Benghanem Riad', '/images/team/riad-image-front.png', 'M1-GL', 'Just chill 🦦', '[{"icon":"Mail","href":"mailto:achrafriadh123456@gmail.com","label":"Email"}]'::jsonb, '[{"departmentId":"hr","role":"Team Building & Engagement Officer","isLead":false}]'::jsonb),
  (7, 'MATELA Abdelhafid', '/images/team/hafid-image-front.png', 'L3-SI', NULL, '[]'::jsonb, '[{"departmentId":"hr","role":"HR Lead","isLead":true},{"departmentId":"development","role":"Developer"}]'::jsonb),
  (8, 'Moussa Ahlem', '/images/team/ahlem-image-front.png', 'L3-SI', 'Passion', '[{"icon":"Send","href":"https://t.me/+213555865385","label":"Telegram"}]'::jsonb, '[{"departmentId":"hr","role":"Emotional Intelligence Trainer"}]'::jsonb),
  (9, 'Bedoui Denia', '/images/team/wissam-image-front.png', 'L3-SI', 'Layers in the gaps.', '[{"icon":"Github","href":"https://github.com/wssmei","label":"GitHub"},{"icon":"Linkedin","href":"https://www.linkedin.com/in/deniabedoui/","label":"LinkedIn"},{"icon":"Globe","href":"https://www.behance.net/deniabd","label":"Behance"}]'::jsonb, '[{"departmentId":"hr","role":"Engagement & Wellbeing Officer"},{"departmentId":"design","role":"Designer"}]'::jsonb),
  (10, 'Benzarfa Rania Manel', '/images/team/rania-image-front.png', 'M1-AID', NULL, '[]'::jsonb, '[{"departmentId":"hr","role":"HR Co-Leader","isLead":true}]'::jsonb),
  (11, 'Farah', '/images/team/farah-image-front.png', 'M1-NET', 'Navigating the digital cosmos 🌸👩🏻‍💻', '[]'::jsonb, '[{"departmentId":"design","role":"Designer"},{"departmentId":"media","role":"Content Creator"}]'::jsonb),
  (12, 'Rafika Rohdea', '/images/team/rafika-image-front.png', 'L2', 'Embodiment of ideas into an unforgettable reality.', '[{"icon":"Github","href":"https://github.com/rafikarohdea","label":"Github"}]'::jsonb, '[{"departmentId":"hr","role":"Attendance Coordinator"}]'::jsonb),
  (13, 'Mendjour Lounis', '/images/team/lounis-image-front.png', 'M1-GL', NULL, '[{"icon":"Instagram","href":"https://www.instagram.com/mendjour.lounis","label":"Instagram"}]'::jsonb, '[{"departmentId":"external","role":"External Relations Lead","isLead":true}]'::jsonb),
  (14, 'Hadjadj Kawther', '/images/team/kawther-image-front.jpg', 'M1-GI', NULL, '[]'::jsonb, '[{"departmentId":"treasury","role":"Treasurer","isLead":true},{"departmentId":"hr","role":"Performance Analyst"}]'::jsonb),
  (15, 'Samira Mostefaoui', '/images/team/samira-image-front.JPG', 'L3-SI', NULL, '[{"icon":"Linkedin","href":"https://www.linkedin.com/in/mostefaoui-samira-77174b393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app","label":"LinkedIn"},{"icon":"Instagram","href":"https://www.instagram.com/sam_lens_?igsh=N3NwaXV5amI2dmVh&utm_source=qr","label":"Instagram"}]'::jsonb, '[{"departmentId":"media","role":"Photographer"}]'::jsonb),
  (16, 'Chikhaoui Ahmed', '/images/team/chikhaoui-image-front.png', 'M1-NET', '', '[{"icon":"Github","href":"https://github.com/mrahmed14","label":"GitHub"},{"icon":"Globe","href":"https://www.mrahmed.org/","label":"Portfolio"}]'::jsonb, '[{"departmentId":"media","role":"Photographer"},{"departmentId":"design","role":"Design Lead","isLead":true},{"departmentId":"development","role":"Developer"}]'::jsonb),
  (17, 'Kamel', '/images/team/kamel-image-front.png', 'M1-GL', NULL, '[]'::jsonb, '[{"departmentId":"media","role":"Media Member"},{"departmentId":"development","role":"Developer"}]'::jsonb),
  (18, 'Mohamed Reggad', '/images/team/reggad-image-front.png', 'L1', 'Here for anything related to spreading benefit', '[{"icon":"Instagram","href":"https://www.instagram.com/mohamed_reggadd?igsh=aGluYnh5d2sycTQ5","label":"Instagram"}]'::jsonb, '[{"departmentId":"media","role":"Video Editor"}]'::jsonb),
  (19, 'BRAHIM Youcef', '/images/team/joseph-image-front.jpg', 'L3-SI', 'Code is like humor. When you have to explain it, it''s bad.', '[{"icon":"Github","href":"https://github.com/joseph-cef","label":"GitHub"},{"icon":"Globe","href":"https://my-links-joseph.netlify.app/","label":"Portfolio"}]'::jsonb, '[{"departmentId":"development","role":"Development Lead","isLead":true}]'::jsonb),
  (20, 'Mlsvmdl', '/images/team/mlsvmdl-image-front.jpg', NULL, '☀️ Chich Loves Poppo ☀️', '[{"icon":"Github","href":"https://github.com/mlsvmdl","label":"GitHub"}]'::jsonb, '[{"departmentId":"development","role":"Developer","isLead":false}]'::jsonb),
  (22, 'Missoum Hadi Adda', '/images/team/adda-image-front.jpg', 'L3-SI', NULL, '[]'::jsonb, '[{"departmentId":"development","role":"Developer"},{"departmentId":"hr","role":"Performance Supervisor"}]'::jsonb),
  (24, 'Bousbia Mouhhamed Bachir', '/images/team/bachir-iamge-front.jpg', 'M1-GL', NULL, '[]'::jsonb, '[{"departmentId":"development","role":"Developer"}]'::jsonb),
  (25, 'Noureddine Yahia', '/images/team/noureddine-image-front.jpg', 'M1-GL', 'Coding my way to better solution', '[{"icon":"Github","href":"https://github.com/Yahia47","label":"GitHub"},{"icon":"Linkedin","href":"https://www.linkedin.com/in/merdjet-yahia-noureddine-510a94255/","label":"LinkedIn"}]'::jsonb, '[{"departmentId":"development","role":"Developer"}]'::jsonb),
  (27, 'Fatah', '/images/team/fatah-image-front.png', 'L3-ISIL', 'Try to show your best, not what others deem the best', '[]'::jsonb, '[{"departmentId":"hr","role":"Data & Records Coordinator"},{"departmentId":"development","role":"Developer"}]'::jsonb),
  (28, 'Abderrhmane Ouahrani', '/images/team/abdo-image-front.png', NULL, '', '[]'::jsonb, '[{"departmentId":"media","role":"Photographer"}]'::jsonb),
  (29, 'Abdelaziz Benallou', '/images/team/aziz-image-front.png', NULL, '', '[]'::jsonb, '[{"departmentId":"development","role":"Networking & Security"}]'::jsonb),
  (31, 'Selma Sayah', '/images/team/selma-image-front.jpg', 'L3-SI', 'Observe more.. React less', '[{"icon":"Instagram","href":"https://www.instagram.com/selmasayahh?igsh=MWIzY2kxbG5lY2JkeA==","label":"Instagram"}]'::jsonb, '[{"departmentId":"media","role":"Content Creator"},{"departmentId":"hr","role":"Workshop Operations Coordinator"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  image = EXCLUDED.image,
  grade = EXCLUDED.grade,
  bio = EXCLUDED.bio,
  social_links = EXCLUDED.social_links,
  department_roles = EXCLUDED.department_roles;

-- ==============================================================================
-- Seed Data: Member Department Roles (Normalized)
-- ==============================================================================
DELETE FROM public.team_member_department_roles;

INSERT INTO public.team_member_department_roles (member_id, department_id, role, is_lead)
VALUES
  (1, 'leadership', 'Club Leader', TRUE),
  (1, 'design', 'UI/UX Designer', FALSE),
  (1, 'hr', 'Training & Culture Supervisor', FALSE),
  (1, 'external', 'External Relations', FALSE),
  (2, 'leadership', 'Co-Leader', TRUE),
  (2, 'media', 'Media Lead', TRUE),
  (3, 'leadership', 'General Secretary', FALSE),
  (3, 'media', 'Content Creator', FALSE),
  (4, 'media', 'Club Writer', FALSE),
  (4, 'hr', 'Data & Records Coordinator', FALSE),
  (5, 'hr', 'Legal Advisor', FALSE),
  (6, 'hr', 'Team Building & Engagement Officer', FALSE),
  (7, 'hr', 'HR Lead', TRUE),
  (7, 'development', 'Developer', FALSE),
  (8, 'hr', 'Emotional Intelligence Trainer', FALSE),
  (9, 'hr', 'Engagement & Wellbeing Officer', FALSE),
  (9, 'design', 'Designer', FALSE),
  (10, 'hr', 'HR Co-Leader', TRUE),
  (11, 'design', 'Designer', FALSE),
  (11, 'media', 'Content Creator', FALSE),
  (12, 'hr', 'Attendance Coordinator', FALSE),
  (13, 'external', 'External Relations Lead', TRUE),
  (14, 'treasury', 'Treasurer', TRUE),
  (14, 'hr', 'Performance Analyst', FALSE),
  (15, 'media', 'Photographer', FALSE),
  (16, 'media', 'Photographer', FALSE),
  (16, 'design', 'Design Lead', TRUE),
  (16, 'development', 'Developer', FALSE),
  (17, 'media', 'Media Member', FALSE),
  (17, 'development', 'Developer', FALSE),
  (18, 'media', 'Video Editor', FALSE),
  (19, 'development', 'Development Lead', TRUE),
  (20, 'development', 'Developer', FALSE),
  (22, 'development', 'Developer', FALSE),
  (22, 'hr', 'Performance Supervisor', FALSE),
  (24, 'development', 'Developer', FALSE),
  (25, 'development', 'Developer', FALSE),
  (27, 'hr', 'Data & Records Coordinator', FALSE),
  (27, 'development', 'Developer', FALSE),
  (28, 'media', 'Photographer', FALSE),
  (29, 'development', 'Networking & Security', FALSE),
  (31, 'media', 'Content Creator', FALSE),
  (31, 'hr', 'Workshop Operations Coordinator', FALSE);
