-- Gen G Pulse Database Schema (Supabase PostgreSQL)

-- 1. Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  college TEXT,
  is_pro BOOLEAN DEFAULT FALSE,
  read_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Story Arcs
CREATE TABLE arcs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  status TEXT DEFAULT 'developing',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Stories
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  arc_id UUID REFERENCES arcs(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL, -- 60 words
  context TEXT NOT NULL, -- Deep Dive
  category TEXT NOT NULL,
  source TEXT NOT NULL,
  credibility_score INTEGER CHECK (credibility_score >= 0 AND credibility_score <= 10),
  political_lean TEXT,
  is_blindspot BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Content (Readable by all, writable by admins)
ALTER TABLE arcs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Arcs are readable by everyone" ON arcs FOR SELECT USING (true);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stories are readable by everyone" ON stories FOR SELECT USING (true);

-- 4. News IQ Questions
CREATE TABLE news_iq_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_idx INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  week_date DATE NOT NULL
);

ALTER TABLE news_iq_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are readable by everyone" ON news_iq_questions FOR SELECT USING (true);

-- 5. User IQ Scores
CREATE TABLE user_iq_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  week_date DATE NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, week_date)
);

ALTER TABLE user_iq_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see all scores for leaderboard" ON user_iq_scores FOR SELECT USING (true);
CREATE POLICY "Users can insert their own score" ON user_iq_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
