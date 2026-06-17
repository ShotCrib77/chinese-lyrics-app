"use client";
import { useRef, useState } from "react";
import { searchSongs } from "../lib/db";
import Link from "next/link";

export default function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const [songs, setSongs] = useState<SongOverview[]>();
	const timeoutRef = useRef<NodeJS.Timeout>(null);

	const getSongs = async (input: string) => {
		if (!input) {setSongs(undefined); return};
		const songs: SongOverview[] = await searchSongs(input)
		setSongs(songs);
	}

	const onChange = (input: string) => {
		setSearchInput(input);
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => getSongs(input), 500)
	}

  return (
		<div className="z-100 relative">
			<input className="outline-0 rounded-full text-xl px-6 py-2 border-2" value={searchInput} onChange={(e) => onChange(e.target.value)} type="text" placeholder="Search..."/>
			{songs && 
				<ol className="absolute mt-2 w-full max-h-80 overflow-y-auto bg-white rounded-2xl border-2 shadow-lg">
					{songs.map(song =>
						<li key={song.song_id} className="border-b last:border-0">
							<Link 
								href={`/song/${song.song_id}`} 
								className="block px-6 py-2 hover:bg-gray-100 cursor-pointer"
							>
								<span className="font-semibold">{song.song_name}</span> • {song.artist}
							</Link>
						</li>
					)}
				</ol>
			}
		</div>
  );
}