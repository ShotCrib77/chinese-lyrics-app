export default function OpenModalButton({setIsOpen}: {setIsOpen: (state: boolean) => void}) {
  return (
		<div className="flex items-center justify-center ml-auto">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-full border text-lg font-medium transition-colors cursor-pointer bg-black text-white border-black"
      >
        Add Song
      </button>
    </div>
  );
}