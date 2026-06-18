"use client";
import { useState } from "react";

export default function AddSongModal({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (state: boolean) => void}) {
	const [songName, setSongName] = useState<string>("");
	const [artist, setArtist] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [lyrics, setLyrics] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const canSubmit = (songName && artist && lyrics && !loading) ? true : false;

	const [error, setError] = useState<boolean>(false);

	const submitSong = async () => {
		setLoading(true);
		setError(false);
		const res = await fetch("/api/song", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				song_name: songName,
				artist,
				lyrics_zh: lyrics,
				password
			})
		})

		if (!res.ok) {
			setError(true);
			setLoading(false);
			return;
		}

		window.location.reload();
	}

  return (
		<div className={`${!isOpen && "hidden"}`}>
			<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}/>
			<div className="absolute z-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 px-6 py-12 rounded-md shadow-2xl w-5/6 lg:w-3/5 h-auto">
				<button onClick={() => setIsOpen(false)} className="absolute right-4 top-2 cursor-pointer">✖</button>
				<div className="flex flex-col gap-4">
					<div className="flex gap-3">
						<input onChange={(e) => setSongName(e.target.value)} value={songName} type="text" id="songName" name="songName" placeholder="Song Name..." className="outline-0 border-black border p-1 rounded-sm w-full"/>
						<input onChange={(e) => setArtist(e.target.value)} value={artist} type="text" id="artist" name="artist" placeholder="Artist..." className="outline-0 border-black border p-1 rounded-sm w-full"/>
					</div>
					<input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" name="password" placeholder="Password..." className="outline-0 border-black border p-1 rounded-sm w-full"/>
					<textarea onChange={(e) => setLyrics(e.target.value)} value={lyrics} id="lyrics" name="lyrics" placeholder="Lyrics" className="outline-0 border-black border p-1 rounded-sm h-64"/>
				</div>
				<button onClick={submitSong} className={`mt-4 p-2 rounded-3xl mx-auto flex self-center ${canSubmit ? "bg-black text-white cursor-pointer" : "bg-gray-200 border-gray-500 border text-gray-500 cursor-not-allowed"}`}>Submit</button>
				{error && <span className="text-red-400 mt-4 mx-auto flex self-center w-fit">Something went wrong when submitting song.</span>}
			</div>
		</div>
  );
}