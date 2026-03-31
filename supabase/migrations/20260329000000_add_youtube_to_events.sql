-- Add video support to events table
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'article',
  ADD COLUMN IF NOT EXISTS youtube_id TEXT;

-- Add check constraint for type values
ALTER TABLE events
  ADD CONSTRAINT events_type_check CHECK (type IN ('article', 'video'));
