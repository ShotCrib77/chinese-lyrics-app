type SongObject = {
    song_name: string;
    song_name_pn: string;
    artist: string;
    artist_pn: string;
    lyrics_zh: string;
    lyrics_pn: string;
    lyrics_en: string;
    song_id: string;
    favorite: boolean;
}

type InputObject = {
    song_name: string;
    artist: string;
    lyrics_zh: string;
    password: string;
} 

type SongOverview = {
    song_id: number;
    song_name: string;
    artist: string;
}