'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase, isUsingPlaceholderCredentials, saveToLocalStorage } from '@/lib/supabase';

// Force dynamic rendering since we use Supabase
export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check if we're using placeholder credentials
      if (isUsingPlaceholderCredentials()) {
        // Use localStorage fallback for demo mode
        const result = saveToLocalStorage({
          email,
          completed_signup: false,
          updated_at: new Date().toISOString()
        });

        if (!result.success) {
          setError('Failed to save email. Please try again.');
          setLoading(false);
          return;
        }

        // Navigate to complete signup page with email
        router.push(`/complete-signup?email=${encodeURIComponent(email)}`);
        return;
      }

      // Use Supabase for real database
      const { error: dbError } = await supabase
        .from('waitlist')
        .upsert(
          {
            email,
            completed_signup: false,
            updated_at: new Date().toISOString()
          },
          {
            onConflict: 'email',
            ignoreDuplicates: false
          }
        )
        .select();

      if (dbError) {
        console.error('Database error:', dbError);
        setError('Failed to save email. Please try again.');
        setLoading(false);
        return;
      }

      // Navigate to complete signup page with email
      router.push(`/complete-signup?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-400 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-gray-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gray-600 opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Logo/Brand */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="VeoMate Logo"
                width={120}
                height={120}
                priority
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              VeoMate
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Where Visual Collaboration Meets Productivity
            </p>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
              The Future of Team Collaboration is Visual
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              VeoMate combines the best of Discord&apos;s community spaces, Excalidraw&apos;s visual canvas,
              and Notion&apos;s productivity tools into one seamless platform. Build, collaborate, and manage
              your projects with real-time visual workspaces.
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-black focus:outline-none text-gray-800 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-full bg-black text-white font-semibold hover:bg-gray-800 hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            What Makes VeoMate Special?
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-black mb-4 flex items-center justify-center text-white text-2xl">
                🎨
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Visual Canvas</h4>
              <p className="text-gray-600">
                Build your projects visually with nodes and sub-nodes. Organize your work
                intuitively like never before.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-gray-700 mb-4 flex items-center justify-center text-white text-2xl">
                💬
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Smart Sidebar Chat</h4>
              <p className="text-gray-600">
                Conversations that automatically sync with your canvas navigation.
                Chat context switches as you move between nodes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-gray-600 mb-4 flex items-center justify-center text-white text-2xl">
                ⚡
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Real-Time Collaboration</h4>
              <p className="text-gray-600">
                See your team&apos;s changes instantly. Live updates keep everyone on the same page,
                always.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-gray-800 mb-4 flex items-center justify-center text-white text-2xl">
                🏢
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Spaces for Teams</h4>
              <p className="text-gray-600">
                Create or join spaces like Discord servers. Each space is a complete
                collaborative workspace for your team.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-gray-500 mb-4 flex items-center justify-center text-white text-2xl">
                👥
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Role-Based Access</h4>
              <p className="text-gray-600">
                Space owners have full control. Maintainers manage their assigned nodes.
                Flexible permissions for every team.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="w-12 h-12 rounded-xl bg-black mb-4 flex items-center justify-center text-white text-2xl">
                🔍
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Dynamic Zoom & Focus</h4>
              <p className="text-gray-600">
                Your canvas automatically zooms into the section you&apos;re working on.
                Perfect focus, zero distraction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            How VeoMate Works
          </h3>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-black text-white rounded-full font-semibold mb-4">
                  Step 1
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-800">Create or Join a Space</h4>
                <p className="text-gray-600 leading-relaxed">
                  Start by creating your own workspace or joining an existing team space.
                  Each space is your project&apos;s home base, combining all your collaboration needs in one place.
                </p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-12 text-center">
                <span className="text-6xl">🚀</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-gray-700 text-white rounded-full font-semibold mb-4">
                  Step 2
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-800">Build Your Canvas</h4>
                <p className="text-gray-600 leading-relaxed">
                  Use nodes to represent different parts of your project. Create sub-nodes for detailed
                  components, assign team members, and organize your work visually. It&apos;s like building
                  with blocks, but for your entire project.
                </p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-12 text-center">
                <span className="text-6xl">🎯</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-gray-600 text-white rounded-full font-semibold mb-4">
                  Step 3
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-800">Collaborate in Real-Time</h4>
                <p className="text-gray-600 leading-relaxed">
                  Navigate between nodes and watch your chat context automatically update. See your team&apos;s
                  changes live. Everything stays in sync, keeping your entire team aligned and productive.
                </p>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-12 text-center">
                <span className="text-6xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of teams waiting to experience the future of visual collaboration.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-700 bg-gray-800 focus:border-gray-500 focus:outline-none text-white placeholder-gray-400 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
            {error && (
              <p className="text-white text-sm text-center bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full">{error}</p>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
