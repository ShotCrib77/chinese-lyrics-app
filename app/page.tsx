import AddSong from "./components/AddSong";
import SongQuickAccessContainer from "./components/SongQuickAccessContainer";
import { getFavorites, getMostAccessed, getRecentlyAccessed } from "./lib/db";

export default async function Home() {
  const recentlyAccessed = await getRecentlyAccessed();
  const mostAccessed = await getMostAccessed();
  const favorites = await getFavorites();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-6xl flex-col py-16 px-4 md:px-16 bg-white dark:bg-black">
        <AddSong />
        <SongQuickAccessContainer favorites={favorites} mostAccessed={mostAccessed} recentlyAccessed={recentlyAccessed}/>
      </main>
    </div>
  );
}
