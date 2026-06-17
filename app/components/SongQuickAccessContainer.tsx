"use client";
import { useState } from "react";
import SongsQuickAccess from "./SongsQuickAccess";

export default function SongQuickAccessContainer({favorites, recentlyAccessed, mostAccessed} : {favorites: SongOverview[], recentlyAccessed:SongOverview[], mostAccessed: SongOverview[]}) {
	const [starredSongs, setStarredSongs] = useState(favorites);

	return (
    <div className="flex flex-col gap-8 w-full mt-24">
			<SongsQuickAccess title="Favorites" songs={starredSongs} starredSongs={starredSongs} setStarredSongs={setStarredSongs} />
			<SongsQuickAccess title="Recently Accessed" songs={recentlyAccessed} starredSongs={starredSongs} setStarredSongs={setStarredSongs} />
			<SongsQuickAccess title="Most Accessed" songs={mostAccessed} starredSongs={starredSongs} setStarredSongs={setStarredSongs} />
    </div>
  );
}

