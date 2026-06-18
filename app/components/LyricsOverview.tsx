"use client";
import Link from "next/link";
import ToggleButton from "./ToggleButton"
import { useState } from "react"
import { changeIsFavoriteStatus } from "../lib/db";
import { useRouter } from "next/navigation";

export default function LyricsOverview({ songObject }: { songObject: SongObject }) {
  const router = useRouter();

  const [displayChinese, setDisplayChinese] = useState(true);
  const [displayPinyin, setDisplayPinyin] = useState(true);
  const [displayEnglish, setDisplayEnglish] = useState(true);
  const [isFavorited, setIsFavorited] = useState<boolean>(songObject.favorite);

  const [displayPasswordEntry, setDisplayPasswordEntry] = useState(false);
  const [password, setPassword] = useState("");

  const chinese = songObject.lyrics_zh.split("\n");
  const pinyin = songObject.lyrics_pn.split("\n");
  const english = songObject.lyrics_en.split("\n");

  const getLyrics = (zh: boolean, pn: boolean, en: boolean) => {
    const completeLyrics: string[] = Array(chinese.length).fill("")
    for (let i = 0; i < chinese.length; i++) {
      if (zh) {
        if (chinese[i] === "") continue // To remove tripple "empty row"
        completeLyrics[i] += chinese[i] + "\n"
      }
      if (pn) {
        if (pinyin[i] === "") continue // If chinese is turned off
        completeLyrics[i] += pinyin[i] + "\n"
      }
      if (en) {
        if (english[i] === "") continue // If only english is turned on
        completeLyrics[i] += english[i] + "\n"
      }
    }
    return completeLyrics
  }

  const handlePasswordKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const res = await fetch("/api/song", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          songId: songObject.song_id,
          password
        })
      });

      if (res.ok) {
        router.push("/")
      }
    }
  }
  return (
    <main className="relative flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-16 px-16 bg-white dark:bg-black">
      <div className="absolute top-8 left-8">
        <Link className={"text-2xl font-bold"} href={"/"}>←</Link>
      </div>
      <div className="flex flex-col absolute top-8 transform-x-1/2 text-red-400">
        <button onClick={() => setDisplayPasswordEntry(prev => !prev)} className={"text-2xl font-bold"}>✖</button>
        <input onKeyDown={(e) => handlePasswordKeyDown(e)} onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password..." className={`${!displayPasswordEntry && "hidden"} text-gray-600 border p-1 text-sm outline-0`}/>
      </div>
      <div className="absolute top-8 right-8">
        <button
          onClick={() => {
            setIsFavorited(prev => !prev);
            changeIsFavoriteStatus(songObject.song_id)
          }}
          className="text-3xl"
          aria-label={isFavorited ? "Unstar" : "Star"}
          style={{
            color: isFavorited ? "#F59E0B" : "transparent",
            WebkitTextStroke: isFavorited ? "0" : "1px #9ca3af",
          }}
        >
          ★
        </button>
      </div>
      <div className="flex mt-4">
        <ToggleButton language="Chinese" on={displayChinese} setOn={setDisplayChinese} />
        <ToggleButton language="Pinyin"  on={displayPinyin}  setOn={setDisplayPinyin}  />
        <ToggleButton language="English" on={displayEnglish} setOn={setDisplayEnglish} />
      </div>
      <section className="flex flex-col items-center justify-center">
        <h1 className="mb-12 text-2xl font-semibold group relative">
          {songObject.song_name} • {songObject.artist}
          {(songObject.song_name_pn && songObject.artist_pn) &&
            <span className="absolute top-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
              {songObject.song_name_pn} • {songObject.artist_pn}
            </span>
          }
        </h1>
        <div className="flex flex-col whitespace-pre-line gap-3 text-xl">
          {getLyrics(displayChinese, displayPinyin, displayEnglish).map((row, i) => 
            <div key={i} className="text-center">
              {row}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}