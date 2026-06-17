"use client";
import { useState } from "react";
import OpenModalButton from "./OpenModalButton";
import AddSongModal from "./AddSongModal";
import SearchBar from "./SearchBar";

export default function AddSong() {
	const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center w-full gap-4 md:gap-0">
        <div className="flex-1" />
        <div className="flex flex-1 justify-center order-2 md:order-1">
          <SearchBar />
        </div>
        <div className="flex flex-1 justify-end order-1 md:order-2 z-50">
          <OpenModalButton setIsOpen={setOpenModal} />
        </div>
      </div>
      <div className="absolute max-w-6xl inset-0 mx-auto">
        <AddSongModal isOpen={openModal} setIsOpen={setOpenModal} />
      </div>
    </div>
  );
}