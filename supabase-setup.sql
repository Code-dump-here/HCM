-- Run this in your Supabase SQL Editor to fix the 401 Unauthorized error
-- Go to: Supabase Dashboard → SQL Editor → New Query

-- Enable Row Level Security (if not already enabled)
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their game sessions
CREATE POLICY "Allow public insert game sessions" ON game_sessions
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Allow reading all sessions (useful for leaderboards later)
CREATE POLICY "Allow public read game sessions" ON game_sessions
  FOR SELECT 
  USING (true);
