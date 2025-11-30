'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function UserDocs() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'features', title: 'Key Features' },
    { id: 'shortcuts', title: 'Keyboard Shortcuts' },
    { id: 'faq', title: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-white/20">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white hover:opacity-80 transition-opacity">
            VeoMate <span className="text-gray-500 font-normal">Docs</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 flex gap-12">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 flex-shrink-0 fixed h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                  activeSection === section.id
                    ? 'bg-white text-black font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-72 max-w-4xl">
          {/* Introduction */}
          <section id="intro" className="mb-16 scroll-mt-28">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome to VeoMate
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              VeoMate is the first visual collaboration platform that combines the structure of Discord, 
              the creativity of Excalidraw, and the organization of Notion.
            </p>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Why VeoMate?</h3>
              <p className="text-gray-400">
                Traditional tools force you to switch contexts constantly. VeoMate keeps your chat, 
                canvas, and documentation in one fluid workspace.
              </p>
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
            <div className="space-y-8">
              <div className="group p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-semibold text-white">Create a Space</h3>
                </div>
                <p className="text-gray-400 pl-12">
                  Start by creating a new space for your team. Spaces are like servers—completely isolated environments for your projects.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-semibold text-white">Add Nodes</h3>
                </div>
                <p className="text-gray-400 pl-12">
                  Right-click anywhere on the canvas to add a Node. Nodes can contain text, images, or even other nested canvases.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">3</div>
                  <h3 className="text-xl font-semibold text-white">Invite Your Team</h3>
                </div>
                <p className="text-gray-400 pl-12">
                  Share your unique invite link. Collaborators can join instantly and see your changes in real-time.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">Infinite Canvas</h3>
                <p className="text-gray-400 text-sm">
                  Never run out of space. Zoom out to see the big picture, zoom in to focus on details.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">Contextual Chat</h3>
                <p className="text-gray-400 text-sm">
                  Chat threads are attached to nodes. Move to a different part of the project, and the chat updates automatically.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">Version History</h3>
                <p className="text-gray-400 text-sm">
                  Track every change. Roll back to any point in time with a visual timeline slider.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">Smart Embeds</h3>
                <p className="text-gray-400 text-sm">
                  Embed Figma files, Google Docs, or YouTube videos directly onto your canvas.
                </p>
              </div>
            </div>
          </section>

          {/* Shortcuts */}
          <section id="shortcuts" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">Keyboard Shortcuts</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-4 text-sm font-medium text-gray-300">Action</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Shortcut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-400">New Node</td>
                    <td className="p-4 text-white font-mono text-sm"><kbd className="px-2 py-1 rounded bg-white/10">N</kbd></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-400">Search</td>
                    <td className="p-4 text-white font-mono text-sm"><kbd className="px-2 py-1 rounded bg-white/10">Cmd</kbd> + <kbd className="px-2 py-1 rounded bg-white/10">K</kbd></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-400">Zoom In/Out</td>
                    <td className="p-4 text-white font-mono text-sm"><kbd className="px-2 py-1 rounded bg-white/10">Cmd</kbd> + <kbd className="px-2 py-1 rounded bg-white/10">+/-</kbd></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-400">Toggle Chat</td>
                    <td className="p-4 text-white font-mono text-sm"><kbd className="px-2 py-1 rounded bg-white/10">Cmd</kbd> + <kbd className="px-2 py-1 rounded bg-white/10">\</kbd></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#111] border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-2">Is VeoMate free?</h4>
                <p className="text-gray-400">
                  VeoMate is currently in private beta. Early access users will get a free "Pro" plan for 6 months once we launch publicly.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#111] border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-2">Can I use it offline?</h4>
                <p className="text-gray-400">
                  Currently, VeoMate requires an active internet connection for real-time collaboration features. An offline mode is on our roadmap.
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
