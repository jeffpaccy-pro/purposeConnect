-- ConnectPurpose Seed Data
-- File: supabase/seed.sql

-- 1. Insert Reference Purposes
INSERT INTO public.purposes (id, name, slug, description, icon) VALUES
('11111111-1111-1111-1111-111111111101', 'Learn skills', 'learn-skills', 'Master coding, design, business, or local trades with peers.', 'GraduationCap'),
('11111111-1111-1111-1111-111111111102', 'Find opportunities', 'find-opportunities', 'Discover internships, jobs, grants, mentorship, and gigs.', 'Compass'),
('11111111-1111-1111-1111-111111111103', 'Build a project', 'build-project', 'Form teams, build open source apps, startups, and community tools.', 'Layers'),
('11111111-1111-1111-1111-111111111104', 'Meet people', 'meet-people', 'Connect with authentic peers, mentors, and local collaborators.', 'Users'),
('11111111-1111-1111-1111-111111111105', 'Sell locally', 'sell-locally', 'Offer trustworthy freelance skills, handcrafted goods, and local services.', 'Store'),
('11111111-1111-1111-1111-111111111106', 'Support community', 'support-community', 'Volunteer, mentor students, organize cleanups, and lead local initiatives.', 'HeartHandshake')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Reference Interests
INSERT INTO public.interests (id, name, slug) VALUES
('22222222-2222-2222-2222-222222222201', 'Web development', 'web-development'),
('22222222-2222-2222-2222-222222222202', 'Design', 'design'),
('22222222-2222-2222-2222-222222222203', 'Business', 'business'),
('22222222-2222-2222-2222-222222222204', 'Music', 'music'),
('22222222-2222-2222-2222-222222222205', 'Agriculture', 'agriculture'),
('22222222-2222-2222-2222-222222222206', 'Gaming', 'gaming'),
('22222222-2222-2222-2222-222222222207', 'Education', 'education'),
('22222222-2222-2222-2222-222222222208', 'Technology', 'technology'),
('22222222-2222-2222-2222-222222222209', 'Community work', 'community-work'),
('22222222-2222-2222-2222-222222222210', 'Entrepreneurship', 'entrepreneurship'),
('22222222-2222-2222-2222-222222222211', 'Photography', 'photography'),
('22222222-2222-2222-2222-222222222212', 'Writing', 'writing')
ON CONFLICT (name) DO NOTHING;

-- 3. Demo Profiles (corresponding to auth.users in production)
-- Aline Uwimana, Eric Ndayishimiye, Chantal Mukamana, David Habimana, Grace Uwase
INSERT INTO public.profiles (id, username, full_name, avatar_url, bio, location, website, onboarding_completed, message_privacy, profile_visibility) VALUES
('33333333-3333-3333-3333-333333333301', 'aline_u', 'Aline Uwimana', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80', 'Frontend developer & mentor in Kigali. Passionate about helping beginners break into tech through study pods.', 'Kigali, Rwanda', 'https://alineu.dev', true, 'community', 'public'),
('33333333-3333-3333-3333-333333333302', 'eric_n', 'Eric Ndayishimiye', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80', 'Python learner & university student. Building an open agri-sensor tracker for local farmers.', 'Huye, Rwanda', 'https://github.com/ericndayi', true, 'community', 'public'),
('33333333-3333-3333-3333-333333333303', 'chantal_m', 'Chantal Mukamana', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80', 'Product designer & design educator. Organizing monthly portfolio reviews and Figma hands-on sessions.', 'Kigali, Rwanda', 'https://chantaldesign.co', true, 'community', 'public'),
('33333333-3333-3333-3333-333333333304', 'david_h', 'David Habimana', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80', 'Full-stack builder & tech community organizer. Founder of Kigali Builders circle.', 'Kigali, Rwanda', 'https://davidh.rw', true, 'community', 'public'),
('33333333-3333-3333-3333-333333333305', 'grace_u', 'Grace Uwase', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80', 'Social entrepreneur & youth coordinator. Linking ambitious students with real internships.', 'Musanze, Rwanda', 'https://graceinitiatives.org', true, 'community', 'public')
ON CONFLICT (id) DO NOTHING;

-- 4. Demo Communities
INSERT INTO public.communities (id, slug, name, description, category, location, cover_image_url, created_by, visibility, rules) VALUES
('44444444-4444-4444-4444-444444444401', 'rwanda-it-learners', 'Rwanda IT Learners', 'Peer-to-peer coding groups, beginner questions, study challenges, and local hardware troubleshooting.', 'Technology', 'Rwanda', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', '33333333-3333-3333-3333-333333333301', 'public', '1. Be respectful and constructive. 2. Share practical code, not spam. 3. Help one another solve blockers.'),
('44444444-4444-4444-4444-444444444402', 'web-builders', 'Web Builders', 'Crafting accessible websites, React & Next.js systems, and modern web applications that solve real needs.', 'Web development', 'Global / Hybrid', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', '33333333-3333-3333-3333-333333333304', 'public', '1. Showcase real prototypes. 2. Give helpful feedback on code quality. 3. Zero self-promotional spam.'),
('44444444-4444-4444-4444-444444444403', 'kigali-creators', 'Kigali Creators', 'Local UI/UX designers, illustrators, videographers, and storytellers collaborating on cultural and tech projects.', 'Design & Arts', 'Kigali, Rwanda', 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80', '33333333-3333-3333-3333-333333333303', 'public', '1. Critique with kindness. 2. Share open Figma resources. 3. Credit collaborator work.'),
('44444444-4444-4444-4444-444444444404', 'student-opportunities', 'Student Opportunities', 'Curated internships, mentorship pairings, scholarship alerts, and campus hackathon teams.', 'Education & Careers', 'East Africa', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', '33333333-3333-3333-3333-333333333305', 'public', '1. Verified opportunities only. 2. No fee-to-apply postings allowed. 3. Support fellow applicants.'),
('44444444-4444-4444-4444-444444444405', 'entrepreneurs-network', 'Entrepreneurs Network', 'Founders, small business owners, and operators exchanging operational playbooks and partnership leads.', 'Entrepreneurship', 'Rwanda', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80', '33333333-3333-3333-3333-333333333304', 'public', '1. Value-first discussions. 2. Transparency about wins and struggles. 3. Safe space for real business math.')
ON CONFLICT (slug) DO NOTHING;

-- 5. Community Memberships
INSERT INTO public.community_members (community_id, user_id, role) VALUES
('44444444-4444-4444-4444-444444444401', '33333333-3333-3333-3333-333333333301', 'admin'),
('44444444-4444-4444-4444-444444444401', '33333333-3333-3333-3333-333333333302', 'member'),
('44444444-4444-4444-4444-444444444402', '33333333-3333-3333-3333-333333333301', 'member'),
('44444444-4444-4444-4444-444444444402', '33333333-3333-3333-3333-333333333304', 'admin'),
('44444444-4444-4444-4444-444444444403', '33333333-3333-3333-3333-333333333303', 'admin'),
('44444444-4444-4444-4444-444444444404', '33333333-3333-3333-3333-333333333305', 'admin')
ON CONFLICT DO NOTHING;

-- 6. Posts
INSERT INTO public.posts (id, author_id, community_id, post_type, body, urgency, category, skill_level, created_at) VALUES
('55555555-5555-5555-5555-555555555501', '33333333-3333-3333-3333-333333333302', '44444444-4444-4444-4444-444444444401', 'help_request', 'Hello everyone! I am working on my first responsive layout with HTML and CSS Flexbox. I am having trouble keeping the sidebar fixed while letting the main feed scroll smoothly on smaller laptop screens. Could anyone recommend the cleanest standard approach or review my snippet?', 'this_week', 'Web development', 'Beginner', NOW() - INTERVAL '3 hours'),
('55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333301', '44444444-4444-4444-4444-444444444401', 'resource', 'Reminder for the community: We have our weekly Python & Data Structures study session happening today at 5:00 PM CAT. We will walk through list comprehensions and real-world file parsing. Everyone is welcome, no prior experience needed!', NULL, 'Technology', 'All Levels', NOW() - INTERVAL '5 hours'),
('55555555-5555-5555-5555-555555555503', '33333333-3333-3333-3333-333333333303', '44444444-4444-4444-4444-444444444403', 'update', 'We just wrapped up our design system sprint for the Kigali Community Library open catalog. We focused entirely on high contrast typography and zero layout shift on 3G connections. Check out the project board to test out the live Figma components.', NULL, 'Design', 'Intermediate', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- 7. Reactions
INSERT INTO public.reactions (id, post_id, user_id, reaction_type) VALUES
('66666666-6666-6666-6666-666666666601', '55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333302', 'helpful'),
('66666666-6666-6666-6666-666666666602', '55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333303', 'interested'),
('66666666-6666-6666-6666-666666666603', '55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333304', 'trusted'),
('66666666-6666-6666-6666-666666666604', '55555555-5555-5555-5555-555555555501', '33333333-3333-3333-3333-333333333301', 'learned')
ON CONFLICT DO NOTHING;

-- 8. Events
INSERT INTO public.events (id, creator_id, community_id, title, description, start_at, end_at, event_mode, location, meeting_url, capacity) VALUES
('77777777-7777-7777-7777-777777777701', '33333333-3333-3333-3333-333333333301', '44444444-4444-4444-4444-444444444401', 'Python Study Session: Hands-on Data Parsing', 'A practical 90-minute live session where we build a simple CSV parser in Python together. Bring your laptop and your questions!', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '4 hours', 'online', NULL, 'https://meet.jit.si/rwanda-it-python-pod', 40),
('77777777-7777-7777-7777-777777777702', '33333333-3333-3333-3333-333333333303', '44444444-4444-4444-4444-444444444403', 'Community Design Workshop & Portfolio Clinic', 'In-person peer feedback session in Kigali. Bring 1 project you want constructive feedback on from senior UI/UX practitioners.', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 3 hours', 'in_person', 'Norrsken House Kigali, Town Hall Room', NULL, 30)
ON CONFLICT (id) DO NOTHING;

-- 9. Opportunities
INSERT INTO public.opportunities (id, creator_id, community_id, title, opportunity_type, description, required_skills, location, is_remote, deadline, contact_preference, contact_info) VALUES
('88888888-8888-8888-8888-888888888801', '33333333-3333-3333-3333-333333333305', '44444444-4444-4444-4444-444444444404', 'Junior UI/UX Design Intern (3 Months Paid)', 'We are looking for an enthusiastic junior product designer to work alongside our health tech team. You will conduct user interviews, build wireframes in Figma, and design accessible mobile interfaces.', ARRAY['Figma', 'UI/UX Design', 'User Research', 'Prototyping'], 'Kigali, Rwanda (Hybrid)', true, NOW() + INTERVAL '14 days', 'platform', 'internships@connectpurpose.org'),
('88888888-8888-8888-8888-888888888802', '33333333-3333-3333-3333-333333333304', '44444444-4444-4444-4444-444444444402', 'Open Source Frontend Mentorship Pod', 'Looking for 3 beginner-intermediate frontend developers who want structured mentorship on TypeScript, state architecture, and building production web applications.', ARRAY['JavaScript', 'TypeScript', 'React', 'HTML/CSS'], 'Remote', true, NOW() + INTERVAL '7 days', 'platform', 'david@builders.rw')
ON CONFLICT (id) DO NOTHING;

-- 10. Projects
INSERT INTO public.projects (id, creator_id, community_id, title, goal, description, status, start_date, target_date) VALUES
('99999999-9999-9999-9999-999999999901', '33333333-3333-3333-3333-333333333304', '44444444-4444-4444-4444-444444444402', 'Open Agri-Sensor Dashboard', 'Enable cooperative farmers to monitor soil moisture and temperature using low-cost ESP32 hardware and an open web interface.', 'Building an open-source progressive web application and MQTT broker integration to visualize sensor nodes with zero cloud subscription fees.', 'active', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '45 days'),
('99999999-9999-9999-9999-999999999902', '33333333-3333-3333-3333-333333333303', '44444444-4444-4444-4444-444444444403', 'Kigali Accessible Transit Map', 'Create clear, community-validated walking and transit guides for youth and differently abled commuters across Kigali.', 'A collaborative research and mapping effort to document pedestrian safety, wheelchair ramps, and key transit hubs.', 'planning', CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days')
ON CONFLICT (id) DO NOTHING;

-- 11. Tasks for Project
INSERT INTO public.tasks (project_id, assignee_id, title, description, status, due_date) VALUES
('99999999-9999-9999-9999-999999999901', '33333333-3333-3333-3333-333333333302', 'Set up mock MQTT telemetry broker', 'Test sample packets from 3 simulated sensor nodes', 'done', CURRENT_DATE - INTERVAL '3 days'),
('99999999-9999-9999-9999-999999999901', '33333333-3333-3333-3333-333333333301', 'Build high-contrast data chart component', 'Visualize 24-hour moisture readings with accessible focus states', 'in_progress', CURRENT_DATE + INTERVAL '5 days'),
('99999999-9999-9999-9999-999999999901', '33333333-3333-3333-3333-333333333304', 'Document deployment steps for rural solar gateways', 'Write clear step-by-step markdown manual for field technicians', 'todo', CURRENT_DATE + INTERVAL '12 days')
ON CONFLICT DO NOTHING;
