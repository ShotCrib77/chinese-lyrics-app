"use client";
import { useRouter } from "next/navigation";
import { changeIsFavoriteStatus } from "../lib/db";
import { Dispatch, SetStateAction } from "react";

export default function SongsQuickAccess({ title, songs, starredSongs, setStarredSongs } : {title: string, songs: SongOverview[], starredSongs: SongOverview[], setStarredSongs: Dispatch<SetStateAction<SongOverview[]>>}) {
  const toggleFavorite = (song: SongOverview) => {
    setStarredSongs(prev => 
      prev.some(s => s.song_id === song.song_id)
        ? prev.filter(s => s.song_id !== song.song_id)
        : [...prev, song]
    );
  };

  return (
    <section className="flex flex-col gap-2 w-full">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-1">
        {title}
      </span>

      <div className="flex flex-row gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {songs.map((song, i) => (
          <SongCard key={song.song_id} song={song} index={i} isStarred={starredSongs.some(s => s.song_id === song.song_id)} toggleFavorite={() => toggleFavorite(song)} />
        ))}
      </div>
    </section>
  );
}

function SongCard({ song, index, isStarred, toggleFavorite }: { song: SongOverview, index: number, isStarred: boolean, toggleFavorite: () => void }) {
	const router = useRouter();

  return (
    <div onClick={() => router.push(`/song/${song.song_id}`)} className="group relative shrink-0 flex flex-col bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-3 cursor-pointer transition-all duration-150 shadow-sm hover:shadow w-44">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite()
					changeIsFavoriteStatus(song.song_id)
        }}
        className="absolute top-2 right-2 text-2xl leading-none transition-colors duration-150"
        aria-label={isStarred ? "Unstar" : "Star"}
        style={{
          color: isStarred ? "#F59E0B" : "transparent",
          WebkitTextStroke: isStarred ? "0" : "1.5px #9ca3af",
        }}
      >
        ★
      </button>

      <span className="text-xs font-mono text-gray-400 mb-1">{index + 1}</span>
      <h2 className="font-semibold text-sm text-gray-900 truncate leading-tight">
        {song.song_name}
      </h2>
      <h3 className="text-xs text-gray-500 truncate leading-snug">
        {song.artist}
      </h3>
    </div>
  );
}