import LyricsOverview from "@/app/components/LyricsOverview";
import { getSongById } from "@/app/lib/db";
import { notFound } from "next/navigation";

export default async function SongPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const songObj = await getSongById(id);

  if (!songObj) notFound();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
			<LyricsOverview songObject={songObj} />
    </div>
  );
}
