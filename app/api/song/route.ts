import { getLyricsTranslations } from "@/app/lib/claude";
import { addSong, deleteSongById } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const inputObj: InputObject = await req.json();
        
        if (!inputObj || !inputObj.artist || !inputObj.song_name || !inputObj.lyrics_zh || !inputObj.password) {
            return NextResponse.json({ message: "Missing parameters" }, {status: 400});
        }

        if (inputObj.password !== process.env.CLAUDE_PASSWORD) { 
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const songObjJson = await getLyricsTranslations(inputObj.artist, inputObj.song_name, inputObj.lyrics_zh);
        const songObj: SongObject = JSON.parse(songObjJson);
        
        if (!songObj.artist || !songObj.song_name || !songObj.lyrics_zh || !songObj.lyrics_en || !songObj.lyrics_pn) {
            return NextResponse.json({ message: "Bad input, not a lyrics"}, { status: 422 })
        };
        
        const songId = await addSong(songObj);
        return NextResponse.json({ songId }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error translating lyrics" }, {status: 500});
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const { songId, password } = await req.json();

        if (!songId || !password) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        if (password !== process.env.CLAUDE_PASSWORD) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        await deleteSongById(songId);
        return NextResponse.json({ message: "Successfully deleted song" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error deleting song" }, { status: 500 });
    }
}