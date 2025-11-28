'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-600 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gray-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gray-400 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Logo/Brand */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo-dark.png"
            alt="VeoMate Logo"
            width={96}
            height={96}
            priority
            className="w-20 h-20 md:w-24 md:h-24"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          VeoMate
        </h1>

        {/* Success Message */}
        <div className="bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-800 p-12 mb-8">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            You&apos;re All Set!
          </h2>
          <p className="text-lg text-gray-400 mb-6">
            Thank you for joining the VeoMate waitlist. We&apos;re excited to have you on board!
          </p>
          <p className="text-gray-400">
            We&apos;ll notify you via email as soon as VeoMate is ready to launch.
            Get ready to transform the way your team collaborates!
          </p>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <p className="text-gray-400">
            In the meantime, follow us on social media to stay updated with our progress.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
