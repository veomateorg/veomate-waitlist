'use client';

import Link from 'next/link';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#73AFEA] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#7374EA] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#AD73EA] opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Logo/Brand */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#73AFEA] via-[#7374EA] to-[#AD73EA] bg-clip-text text-transparent">
          VeoMate
        </h1>

        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 mb-8">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            You&apos;re All Set!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for joining the VeoMate waitlist. We&apos;re excited to have you on board!
          </p>
          <p className="text-gray-600">
            We&apos;ll notify you via email as soon as VeoMate is ready to launch.
            Get ready to transform the way your team collaborates!
          </p>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <p className="text-gray-600">
            In the meantime, follow us on social media to stay updated with our progress.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#73AFEA] via-[#7374EA] to-[#AD73EA] text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
