CREATE TABLE IF NOT EXISTS songs(
    song_id SERIAL PRIMARY KEY,
    song_name VARCHAR(32) NOT NULL,
    song_name_pn VARCHAR(128),
    artist VARCHAR(32) NOT NULL,
    artist_pn VARCHAR(128),
    lyrics_zh TEXT NOT NULL,
    lyrics_pn TEXT NOT NULL,
    lyrics_en TEXT NOT NULL,
    times_accessed INTEGER DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    favorite BOOLEAN DEFAULT FALSE,
    UNIQUE (song_name, artist)
);
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX songs_trgm_idx ON songs USING GIN (song_name gin_trgm_ops, artist gin_trgm_ops);