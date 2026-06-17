"use client";

export default function ToggleButton({language, on, setOn}: {language: string, on: boolean, setOn: (state: boolean) => void}) {

  return (
    <div className="flex items-center justify-center py-8 px-4 lg:px-8">
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors cursor-pointer ${
          on
            ? "bg-black text-white border-black"
            : "bg-white text-gray-500 border-gray-300"
        }`}
      >
        {language}
      </button>
    </div>
  );
}