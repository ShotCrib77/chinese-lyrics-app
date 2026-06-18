"use server";
import postgres from "postgres";

const connection = postgres({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
});

export async function addSong(songObj: SongObject) {
    if (!songObj.song_name || !songObj.artist || !songObj.lyrics_zh || !songObj.lyrics_pn || !songObj.lyrics_en) return;

    const res = await connection`
        INSERT INTO songs (song_name, song_name_pn, artist, artist_pn, lyrics_zh, lyrics_pn, lyrics_en)
        VALUES (${songObj.song_name}, ${songObj.song_name_pn}, ${songObj.artist}, ${songObj.artist_pn}, ${songObj.lyrics_zh}, ${songObj.lyrics_pn}, ${songObj.lyrics_en})
        RETURNING song_id
    `
    return res[0]?.song_id;
}

export async function getSongById(songId: string) {
    if (!songId) return;

    const res = await connection`
        SELECT song_id, song_name, song_name_pn, artist, artist_pn, lyrics_zh, lyrics_pn, lyrics_en, favorite FROM songs WHERE song_id = ${songId}
    `

    await connection`
        UPDATE songs SET times_accessed = times_accessed + 1, last_accessed = CURRENT_TIMESTAMP WHERE song_id = ${songId};
    `
    return res[0] as SongObject;
}

export async function getRecentlyAccessed(){
    const res = await connection`
        SELECT song_id, song_name, artist FROM songs ORDER BY last_accessed DESC LIMIT 5;
    `

    return res as unknown as SongOverview[];
}

export async function getMostAccessed() {
    const res = await connection`
        SELECT song_id, song_name, artist FROM songs ORDER BY times_accessed DESC LIMIT 5;
    `

    return res as unknown as SongOverview[];
}

export async function getFavorites() {
    const res = await connection`
        SELECT song_id, song_name, artist FROM songs WHERE favorite = true;
    `

    return res as unknown as SongOverview[];
}

export async function changeIsFavoriteStatus(songId: string | number) {
    await connection`
        UPDATE songs SET favorite = NOT favorite WHERE song_id = ${songId} 
    `
}

export async function searchSongs(input: string) {
    const res = await connection`
        SELECT song_id, song_name, artist FROM songs
        WHERE song_name ILIKE ${`%${input}%`} OR artist ILIKE ${`%${input}%`}
    `

    return res as unknown as SongOverview[];
}

export async function deleteSongById(songId: string | number) {
    await connection`
        DELETE FROM songs WHERE song_id = ${songId} 
    `
}