'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import DocsButton from '@/components/DocsButton';
import {
  supabase,
  isUsingPlaceholderCredentials,
  saveToLocalStorage,
} from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function CompleteSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showTeamSizeDropdown, setShowTeamSizeDropdown] = useState(false);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [isCheckingState, setIsCheckingState] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+1',
    phoneNumber: '',
    companyName: '',
    role: '',
    teamSize: '',
    hearAbout: '',
  });

  const countryOptions = [
    { value: '+1', label: '🇺🇸 +1' },
    { value: '+44', label: '🇬🇧 +44' },
    { value: '+91', label: '🇮🇳 +91' },
    { value: '+61', label: '🇦🇺 +61' },
    { value: '+86', label: '🇨🇳 +86' },
    { value: '+81', label: '🇯🇵 +81' },
    { value: '+49', label: '🇩🇪 +49' },
    { value: '+33', label: '🇫🇷 +33' },
    { value: '+39', label: '🇮🇹 +39' },
    { value: '+34', label: '🇪🇸 +34' },
    { value: '+7', label: '🇷🇺 +7' },
    { value: '+55', label: '🇧🇷 +55' },
    { value: '+52', label: '🇲🇽 +52' },
    { value: '+82', label: '🇰🇷 +82' },
    { value: '+65', label: '🇸🇬 +65' },
    { value: '+971', label: '🇦🇪 +971' },
    { value: '+27', label: '🇿🇦 +27' },
    { value: '+64', label: '🇳🇿 +64' },
    { value: '+31', label: '🇳🇱 +31' },
    { value: '+46', label: '🇸🇪 +46' },
  ];

  const teamSizeOptions = [
    { value: '1', label: 'Just me' },
    { value: '2-10', label: '2-10 people' },
    { value: '11-50', label: '11-50 people' },
    { value: '51-200', label: '51-200 people' },
    { value: '201+', label: '201+ people' },
  ];

  const sourceOptions = [
    { value: 'social-media', label: 'Social Media' },
    { value: 'search-engine', label: 'Search Engine' },
    { value: 'friend', label: 'Friend/Colleague' },
    { value: 'blog', label: 'Blog/Article' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const savedEmail = localStorage.getItem('veomate_current_email');

    if (emailParam) {
      setTimeout(() => setEmail(emailParam), 0);
      if (emailParam !== savedEmail) {
        localStorage.setItem('veomate_current_email', emailParam);
      }
    } else if (savedEmail) {
      setTimeout(() => setEmail(savedEmail), 0);
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  useEffect(() => {
    const state = localStorage.getItem('veomate_signup_state');
    if (!state) {
      router.replace('/');
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkip = () => {
    localStorage.setItem('veomate_signup_state', 'profile_completed');
    router.push('/welcome');
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.phoneNumber.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError(
        'Please fill in First Name, Last Name, and Phone Number to complete your profile.'
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isUsingPlaceholderCredentials()) {
        const result = saveToLocalStorage({
          email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          country_code: formData.countryCode,
          phone_number: formData.phoneNumber,
          company_name: formData.companyName || null,
          role: formData.role || null,
          team_size: formData.teamSize || null,
          hear_about: formData.hearAbout || null,
          completed_signup: true,
          updated_at: new Date().toISOString(),
        });

        if (!result.success) {
          setError('Failed to save your information. Please try again.');
          setLoading(false);
          return;
        }

        localStorage.setItem('veomate_signup_state', 'profile_completed');
        router.push('/welcome');
        return;
      }

      const { error: dbError } = await supabase
        .from('waitlist')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          country_code: formData.countryCode,
          phone_number: formData.phoneNumber,
          company_name: formData.companyName || null,
          role: formData.role || null,
          team_size: formData.teamSize || null,
          hear_about: formData.hearAbout || null,
          completed_signup: true,
          updated_at: new Date().toISOString(),
        })
        .eq('email', email)
        .select();

      if (dbError) {
        setError('Failed to save your information. Please try again.');
        setLoading(false);
        return;
      }

      localStorage.setItem('veomate_signup_state', 'profile_completed');
      router.push('/welcome');
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (!email || isCheckingState) {
    return null;
  }

  return (
    <div className="min-h-screen bg-veo-bg-dark relative flex items-center justify-center p-2 sm:p-4 overflow-hidden">
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

      <div className="relative z-10 w-full max-w-4xl bg-black/60 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-[1.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4 lg:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
              <div className="bg-veo-card-bg p-2 rounded-lg sm:rounded-xl border border-white/10 shadow-inner w-fit md:mb-6 shrink-0">
                <Image
                  src="/logo-dark.png"
                  alt="VeoMate Logo"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                  You&apos;re on the list!
                </h1>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-6 hidden md:block">
                  You&apos;ve secured your spot and{' '}
                  <span className="text-white font-medium">
                    1 month of Pro access
                  </span>
                  .
                  <br />
                  <br />
                  Help us tailor your experience by completing your profile
                  below.
                </p>
                <p className="text-gray-400 text-[10px] leading-tight mb-0 md:hidden">
                  You&apos;ve secured{' '}
                  <span className="text-white font-medium">
                    1 month of Pro access
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 text-[10px] text-gray-500 bg-white/5 p-2.5 rounded-lg border border-white/5 mt-2 md:mt-0">
              Waitlist joined as{' '}
              <span className="text-gray-300 font-medium truncate max-w-[140px]">
                {email}
              </span>
            </div>
          </div>

          <div className="md:w-2/3 p-4 lg:p-8">
            <div className="mb-3 sm:mb-5 flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-semibold text-white">
                Complete Profile{' '}
                <span className="text-[10px] font-normal text-gray-500 ml-2 border border-white/10 px-1.5 py-0.5 rounded-full">
                  Optional
                </span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-0.5 sm:space-y-1">
                  <label
                    htmlFor="firstName"
                    className="text-[10px] font-medium text-gray-400 ml-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white placeholder-gray-600 transition-all text-xs"
                  />
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <label
                    htmlFor="lastName"
                    className="text-[10px] font-medium text-gray-400 ml-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white placeholder-gray-600 transition-all text-xs"
                  />
                </div>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <label
                  htmlFor="phoneNumber"
                  className="text-[10px] font-medium text-gray-400 ml-1"
                >
                  Phone Number
                </label>
                <div className="flex gap-2 relative">
                  <style jsx global>{`
                    .no-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                    .no-scrollbar {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `}</style>

                  <div className="relative">
                    {showCountryDropdown && (
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowCountryDropdown(false)}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setShowCountryDropdown(!showCountryDropdown)
                      }
                      className="h-full px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white transition-all text-xs min-w-[80px] text-left flex items-center justify-between gap-1"
                    >
                      <span>
                        {countryOptions.find(
                          (c) => c.value === formData.countryCode
                        )?.label || formData.countryCode}
                      </span>
                      <svg
                        className={`w-2.5 h-2.5 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-32 max-h-48 overflow-y-auto z-20 bg-veo-card-dark border border-white/10 rounded-lg shadow-xl no-scrollbar">
                        {countryOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                countryCode: option.value,
                              }));
                              setShowCountryDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-white/10 transition-colors ${formData.countryCode === option.value ? 'bg-white/5 text-white' : 'text-gray-300'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="123-456-7890"
                    className="flex-1 px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white placeholder-gray-600 transition-all text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-0.5 sm:space-y-1">
                  <label
                    htmlFor="companyName"
                    className="text-[10px] font-medium text-gray-400 ml-1"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white placeholder-gray-600 transition-all text-xs"
                  />
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <label
                    htmlFor="role"
                    className="text-[10px] font-medium text-gray-400 ml-1"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Product Manager"
                    className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white placeholder-gray-600 transition-all text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-0.5 sm:space-y-1">
                  <label
                    htmlFor="teamSize"
                    className="text-[10px] font-medium text-gray-400 ml-1"
                  >
                    Team Size
                  </label>
                  <div className="relative">
                    {showTeamSizeDropdown && (
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowTeamSizeDropdown(false)}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setShowTeamSizeDropdown(!showTeamSizeDropdown)
                      }
                      className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white transition-all text-xs text-left flex items-center justify-between"
                    >
                      <span
                        className={`truncate ${formData.teamSize ? 'text-white' : 'text-gray-600'}`}
                      >
                        {teamSizeOptions.find(
                          (t) => t.value === formData.teamSize
                        )?.label || 'Select size'}
                      </span>
                      <svg
                        className={`w-2.5 h-2.5 text-gray-400 transition-transform ${showTeamSizeDropdown ? 'rotate-180' : ''} shrink-0 ml-1`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    {showTeamSizeDropdown && (
                      <div className="absolute bottom-full left-0 mb-1 w-full max-h-48 overflow-y-auto z-20 bg-veo-card-dark border border-white/10 rounded-lg shadow-xl no-scrollbar">
                        {teamSizeOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                teamSize: option.value,
                              }));
                              setShowTeamSizeDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-white/10 transition-colors ${formData.teamSize === option.value ? 'bg-white/5 text-white' : 'text-gray-300'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <label
                    htmlFor="hearAbout"
                    className="text-[10px] font-medium text-gray-400 ml-1"
                  >
                    Source
                  </label>
                  <div className="relative">
                    {showSourceDropdown && (
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowSourceDropdown(false)}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setShowSourceDropdown(!showSourceDropdown)}
                      className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-white/10 bg-white/5 focus:bg-white/10 focus:border-white/30 focus:outline-none text-white transition-all text-xs text-left flex items-center justify-between"
                    >
                      <span
                        className={`truncate ${formData.hearAbout ? 'text-white' : 'text-gray-600'}`}
                      >
                        {sourceOptions.find(
                          (s) => s.value === formData.hearAbout
                        )?.label || 'Select option'}
                      </span>
                      <svg
                        className={`w-2.5 h-2.5 text-gray-400 transition-transform ${showSourceDropdown ? 'rotate-180' : ''} shrink-0 ml-1`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    {showSourceDropdown && (
                      <div className="absolute bottom-full left-0 mb-1 w-full max-h-48 overflow-y-auto z-20 bg-veo-card-dark border border-white/10 rounded-lg shadow-xl no-scrollbar">
                        {sourceOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                hearAbout: option.value,
                              }));
                              setShowSourceDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-white/10 transition-colors ${formData.hearAbout === option.value ? 'bg-white/5 text-white' : 'text-gray-300'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-[8px] sm:text-[10px] text-center">
                    {error}
                  </p>
                </div>
              )}

              <div className="pt-2 sm:pt-1 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 sm:py-2.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
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
                      Saving...
                    </span>
                  ) : (
                    'Complete Profile'
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="group w-full py-2 sm:py-2.5 rounded-lg border border-white/5 hover:border-white/20 bg-transparent hover:bg-white/5 text-gray-500 hover:text-white font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Skip for now
                  <svg
                    className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompleteSignup() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-veo-bg-dark flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          </div>
        </div>
      }
    >
      <CompleteSignupForm />
    </Suspense>
  );
}
