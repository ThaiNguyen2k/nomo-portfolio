CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL UNIQUE,
  score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 117),
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_score_created
ON leaderboard_entries (score DESC, created_at ASC);

CREATE TABLE IF NOT EXISTS game_sessions (
  id TEXT PRIMARY KEY,
  seed INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  submitted_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_game_sessions_created_at
ON game_sessions (created_at);

PRAGMA optimize;
