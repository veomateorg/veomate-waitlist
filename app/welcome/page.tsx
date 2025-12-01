'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DocsButton from '@/components/DocsButton';

export default function Welcome() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCheckingState, setIsCheckingState] = useState(true);

  useEffect(() => {
    const state = localStorage.getItem('veomate_signup_state');
    const savedEmail = localStorage.getItem('veomate_current_email');

    if (!state) {
      router.replace('/');
    } else if (state === 'email_entered') {
      if (savedEmail) {
        router.replace(`/complete-signup?email=${encodeURIComponent(savedEmail)}`);
      } else {
        router.replace('/complete-signup');
      }
    } else {
      setIsCheckingState(false);
    }

    if (videoRef.current) {
      const video = videoRef.current;
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((error) => {
        if (error.name !== 'AbortError') {
        }
      });
    }
  }, [router]);

  if (isCheckingState) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative flex items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none', opacity: 0.5 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 backdrop-blur-xs bg-black/10"></div>
      </div>

      <DocsButton />

      <div className="relative z-10 w-full max-w-sm">
        <div className="group relative bg-black/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 sm:p-10 text-center shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">

          <div className="mb-6 relative inline-flex items-center justify-center">
            <div className="relative bg-white/5 p-3.5 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            You&apos;re In.
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mb-8 font-medium">
            Your spot is secured.
          </p>

          <div className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/0 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse"></div>
            <span className="text-[10px] font-semibold text-gray-200 uppercase tracking-widest">
              Pro Access Unlocked
            </span>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                localStorage.removeItem('veomate_signup_state');
                router.push('/');
              }}
              className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              Back to Home
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            <p className="text-[10px] text-gray-600">
              Thanks a lot for investing in VeoMate!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center animate-in fade-in delay-300 duration-700">
          <div className="inline-flex items-center gap-2 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-500 cursor-default">
            <Image
              src="/logo-dark.png"
              alt="Logo"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-[10px] font-medium text-white tracking-[0.2em] uppercase">
              VeoMate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
