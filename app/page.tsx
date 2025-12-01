'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DocsButton from '@/components/DocsButton';
import {
  isUsingPlaceholderCredentials,
  saveToLocalStorage,
} from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCheckingState, setIsCheckingState] = useState(true);

  useEffect(() => {
    const state = localStorage.getItem('veomate_signup_state');
    const savedEmail = localStorage.getItem('veomate_current_email');

    if (state === 'email_entered' && savedEmail) {
      router.replace(`/complete-signup?email=${encodeURIComponent(savedEmail)}`);
    } else if (state === 'profile_completed') {
      router.replace('/welcome');
    } else {
      setTimeout(() => setIsCheckingState(false), 0);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');



    try {
      if (isUsingPlaceholderCredentials()) {
        const result = saveToLocalStorage({
          email,
          completed_signup: false,
          updated_at: new Date().toISOString(),
        });

        if (!result.success) {
          setError('Failed to save email. Please try again.');
          setLoading(false);
          return;
        }
        
        const demoCount = parseInt(localStorage.getItem('veomate_submission_count') || '0', 10);
        if (demoCount >= 5) {
             setError('You have reached the maximum limit of 5 email submissions.');
             setLoading(false);
             return;
        }
        localStorage.setItem('veomate_submission_count', (demoCount + 1).toString());

        localStorage.setItem('veomate_signup_state', 'email_entered');
        localStorage.setItem('veomate_current_email', email);
        router.push(`/complete-signup?email=${encodeURIComponent(email)}`);
        return;
      }

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to save email. Please try again.');
        setLoading(false);
        return;
      }

      localStorage.setItem('veomate_signup_state', 'email_entered');
      localStorage.setItem('veomate_current_email', email);

      
      router.push(`/complete-signup?email=${encodeURIComponent(email)}`);
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (isCheckingState) {
    return null;
  }

  return (
    <div className="min-h-screen bg-veo-bg-dark relative">
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

      <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-12 sm:py-0 overflow-hidden">
        <DocsButton />

        <div className="w-full max-w-3xl px-4 relative z-10">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 sm:p-10 xl:p-12 hover:border-white/20 transition-all duration-300 group w-full">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 xl:gap-12">
              <div className="flex flex-row sm:flex-col items-center sm:items-start text-left gap-5 sm:gap-0 sm:space-y-6 w-full sm:w-auto justify-start sm:justify-start">
                <div className="relative shrink-0">
                  <div className="relative bg-veo-card-bg p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-inner">
                    <Image
                      src="/logo-dark.png"
                      alt="VeoMate Logo"
                      width={120}
                      height={120}
                      className="w-12 h-12 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white mb-1 tracking-tight">
                    VeoMate
                  </h1>
                  <p className="text-gray-400 text-xs sm:text-base font-medium max-w-[200px]">
                    future of work and communication
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-52 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

              <div className="sm:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>

              <div className="flex-1 w-full">
                <div className="mb-3 sm:mb-4 xl:mb-6 text-left">
                  <h3 className="text-md sm:text-xl font-semibold text-white sm:mb-1">
                    Join the Waitlist
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Support us and get{' '}
                    <span className="text-white font-medium">
                      1 month of Pro
                    </span>{' '}
                    for free
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 sm:gap-4"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative group/input">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        required
                        suppressHydrationWarning
                        className="w-full px-3 py-2 sm:px-3 sm:py-2.5 xl:py-3.5 xl:px-4 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white placeholder-gray-500 transition-all text-base"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      suppressHydrationWarning
                      className="w-full py-2 sm:py-2.5 xl:py-3.5 rounded-xl bg-white text-black font-bold text-base hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Joining...
                        </span>
                      ) : (
                        'Get Early Access'
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
                      {error}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
