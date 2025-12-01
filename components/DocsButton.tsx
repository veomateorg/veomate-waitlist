'use client';

import { useRouter } from 'next/navigation';

export default function DocsButton() {
  const router = useRouter();

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
      <div className="relative p-[1px] rounded-2xl overflow-hidden group">
        <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#ffffff_100%)] opacity-70" />

        <button
          onClick={() => router.push('/docs')}
          suppressHydrationWarning
          className="relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 xl:px-6 xl:py-3 rounded-2xl bg-black/60 backdrop-blur-xl cursor-pointer border border-white/20 transition-all duration-300"
        >
          <span className="text-gray-200 font-medium text-sm sm:text-base">
            Docs
          </span>
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
