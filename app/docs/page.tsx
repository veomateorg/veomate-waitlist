'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function UserDocs() {
  const [activeSection, setActiveSection] = useState('intro');
  const [demoStep, setDemoStep] = useState(0);
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'preview', title: 'Interface Preview' },
    { id: 'concepts', title: 'Core Concepts' },
    { id: 'faq', title: 'Q&A' },
    { id: 'team', title: 'Team' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-veo-docs-bg text-gray-300 font-sans selection:bg-white/20">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:opacity-80 transition-opacity"
          >
            VeoMate <span className="text-gray-500 font-normal">Docs</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 flex gap-12">
        <aside className="hidden lg:block w-64 flex-shrink-0 fixed h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

        <main className="flex-1 lg:pl-72 max-w-4xl">
          <section id="intro" className="mb-16 scroll-mt-28">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-3 sm:mb-6">
              Welcome to VeoMate
            </h1>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
              <span className="font-semibold text-gray-350">
                VeoMate is a context-aware work platform designed to make
                communication effortless and fully maintainable for individuals
                and organizations
              </span>{' '}
              It kills context switching by fusing the visual diagramming of a
              canvas with the structured power of Jira and the communication of
              Discord.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">
                  Visual Project Mapping
                </h3>
                <p className="text-gray-400 text-sm">
                  Use nodes and branches to build a clear, simple map of your
                  whole project. Every part of your work is in one place and
                  easy to manage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">
                  Instant Communication
                </h3>
                <p className="text-gray-400 text-sm">
                  The chat sidebar automatically follows your focus. It
                  instantly snaps to the topic you are viewing, killing context
                  switching.
                </p>
              </div>
            </div>
          </section>

          <section id="preview" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">
              Interface Preview
            </h2>

            <div className="w-full aspect-video rounded-xl border border-white/10 bg-veo-bg-dark overflow-hidden flex shadow-2xl relative select-none group">
              <div className="w-1/3 sm:w-1/4 h-full border-r border-white/10 bg-veo-sidebar-bg flex flex-col transition-colors duration-500 z-20 relative">
                <div className="p-3 sm:p-4 border-b border-white/5">
                  <div className="h-3 sm:h-4 w-16 sm:w-24 bg-white/10 rounded"></div>
                </div>
                <div className="flex-1 p-3 sm:p-4 space-y-3">
                  <div
                    className={`h-6 sm:h-8 w-full rounded flex items-center px-2 sm:px-3 transition-all duration-500 ${demoStep === 0 ? 'bg-red-500/10 border border-red-500/20' : 'bg-transparent border border-transparent'}`}
                  >
                    <div
                      className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full mr-2 transition-colors duration-500 ${demoStep === 0 ? 'bg-red-400' : 'bg-white/10'}`}
                    ></div>
                    <div
                      className={`h-1.5 sm:h-2 w-12 sm:w-20 rounded transition-colors duration-500 ${demoStep === 0 ? 'bg-red-400/20' : 'bg-white/5'}`}
                    ></div>
                  </div>

                  <div
                    className={`h-6 sm:h-8 w-full rounded flex items-center px-2 sm:px-3 transition-all duration-500 ${demoStep === 1 ? 'bg-green-500/10 border border-green-500/20' : 'bg-transparent border border-transparent'}`}
                  >
                    <div
                      className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full mr-2 transition-colors duration-500 ${demoStep === 1 ? 'bg-green-400' : 'bg-white/10'}`}
                    ></div>
                    <div
                      className={`h-1.5 sm:h-2 w-12 sm:w-20 rounded transition-colors duration-500 ${demoStep === 1 ? 'bg-green-400/20' : 'bg-white/5'}`}
                    ></div>
                  </div>

                  <div className="h-1.5 sm:h-2 w-1/2 bg-white/5 rounded ml-3 mt-4"></div>
                </div>
              </div>

              <div className="flex-1 relative bg-veo-docs-bg overflow-hidden">
                <div className="absolute top-3 sm:top-4 left-4 sm:left-6 right-4 sm:right-6 h-8 sm:h-10 rounded-lg border border-white/10 bg-veo-bg-dark flex items-center px-3 sm:px-4 justify-between z-20">
                  <div className="h-2 sm:h-3 w-20 sm:w-32 bg-white/10 rounded"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-white/20"></div>
                </div>

                <div
                  className="absolute inset-0 transition-transform duration-1000 ease-in-out will-change-transform"
                  style={{
                    transform:
                      demoStep === 0
                        ? 'scale(1) translate(0%, 0%)'
                        : 'scale(1.1) translate(-10%, -5%)',
                  }}
                >
                  <div
                    className={`absolute w-32 h-20 sm:w-48 sm:h-28 rounded-xl sm:rounded-2xl border backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-700 
                      top-16 left-8 sm:top-24 sm:left-20
                      ${
                        demoStep === 0
                          ? 'border-red-500 bg-red-500/10 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] scale-105'
                          : 'border-white/10 bg-veo-card-darker opacity-40 scale-100'
                      }`}
                  >
                    <div
                      className={`font-mono text-xs sm:text-sm transition-colors duration-500 ${demoStep === 0 ? 'text-red-400' : 'text-gray-500'}`}
                    >
                      Auth Page
                    </div>
                  </div>

                  <div
                    className={`absolute w-32 h-20 sm:w-48 sm:h-28 rounded-xl sm:rounded-2xl border backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-700 
                      top-36 left-40 sm:top-48 sm:left-80
                      ${
                        demoStep === 1
                          ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)] scale-105'
                          : 'border-white/10 bg-veo-card-darker opacity-40 scale-100'
                      }`}
                  >
                    <div
                      className={`font-mono text-xs sm:text-sm transition-colors duration-500 ${demoStep === 1 ? 'text-green-400' : 'text-gray-500'}`}
                    >
                      Dashboard
                    </div>
                  </div>
                </div>

                <div
                  className="absolute z-5 pointer-events-none transition-all duration-[1000ms] ease-in-out"
                  style={{
                    top: demoStep === 0 ? '40%' : '65%',
                    left: demoStep === 0 ? '30%' : '60%',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg filter drop-shadow-md w-4 h-4 sm:w-6 sm:h-6"
                  >
                    <path
                      d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section id="concepts" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">
              Core Concepts
            </h2>

            <div className="space-y-12">
              <div className="group">
                <h3 className="text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-sm">
                    1
                  </span>
                  Spaces
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-11">
                  A space is like a team or workspace, similar to a Discord
                  server. You can create your own space, invite others, or join
                  existing ones. Each space has its own canvas and chats.
                </p>
              </div>

              <div className="group">
                <h3 className="text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-sm">
                    2
                  </span>
                  The Canvas & Nodes
                </h3>
                <div className="pl-11">
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
                    The canvas is a visual area where you build your work using{' '}
                    <strong>nodes</strong> (blocks). Each node represents a part
                    of your project (e.g., &quot;Auth Page&quot;, &quot;Landing
                    Page&quot;).
                  </p>
                  <ul className="text-sm sm:text-base list-disc list-inside text-gray-400 space-y-2 bg-white/5 p-4 rounded-xl border border-white/5">
                    <li>
                      <strong className="text-white">Nodes:</strong> Main
                      project parts.
                    </li>
                    <li>
                      <strong className="text-white">Sub-nodes:</strong> Smaller
                      parts inside a node (e.g., &quot;Navbar&quot; inside
                      &quot;Landing Page&quot;).
                    </li>
                    <li>
                      <strong className="text-white">Branches:</strong>{' '}
                      Connections showing the flow between parts (e.g., Auth
                      Page → Landing Page).
                    </li>
                  </ul>
                </div>
              </div>

              <div className="group">
                <h3 className="text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center text-sm">
                    3
                  </span>
                  Contextual Sidebar
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-11">
                  The sidebar handles chats and automatically switches to the
                  related chat when you move between nodes. When you open a
                  node, your sidebar updates to match that specific context,
                  keeping conversations focused.
                </p>
              </div>
            </div>
          </section>

          <section id="faq" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">Q&A</h2>
            <div className="grid gap-6">
              <div className="p-6 rounded-2xl bg-veo-card-darker border border-white/5 hover:border-white/10 transition-all">
                <h4 className="text-lg font-semibold text-white mb-2">
                  What exactly is this platform?
                </h4>
                <p className="text-sm sm:text-base text-gray-400">
                  VeoMate is the visual project workspace that unifies planning,
                  management, and chat on a single canvas. Teams create
                  collaborative spaces and map their entire project structure
                  using interactive nodes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-veo-card-darker border border-white/5 hover:border-white/10 transition-all">
                <h4 className="text-lg font-semibold text-white mb-2">
                  What are &quot;nodes&quot; and &quot;sub-nodes&quot;?
                </h4>
                <p className="text-sm sm:text-base text-gray-400">
                  Nodes are project parts (e.g., &quot;Auth Page&quot;). Inside
                  a node, you can create sub-nodes (e.g., &quot;Navbar&quot;).
                  You can assign people to manage each node or sub-node.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-veo-card-darker border border-white/5 hover:border-white/10 transition-all">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Who can edit what?
                </h4>
                <ul className="text-sm sm:text-base text-gray-400 list-disc list-inside space-y-1 mt-2">
                  <li>
                    <strong>Space Owner:</strong> Full control.
                  </li>
                  <li>
                    <strong>Node Maintainers:</strong> Can edit their assigned
                    nodes.
                  </li>
                  <li>
                    <strong>Members:</strong> View only.
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-veo-card-darker border border-white/5 hover:border-white/10 transition-all">
                <h4 className="text-lg font-semibold text-white mb-2">
                  What happens when a user &quot;triggers&quot; a part?
                </h4>
                <p className="text-sm sm:text-base text-gray-400">
                  When someone opens a task, their canvas zooms into that area
                  and the sidebar switches to that task&apos;s chat
                  automatically. This zoom is personal and doesn&apos;t affect
                  others.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-veo-card-darker border border-white/5 hover:border-white/10 transition-all">
                <h4 className="text-lg font-semibold text-white mb-2">
                  How is this different from Discord, Figma, or Jira?
                </h4>
                <p className="text-sm sm:text-base text-gray-400">
                  Discord lacks visual project views. Figma lacks structured
                  task management. VeoMate combines real-time visual work with
                  structured task management and roles.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-veo-card-darker border border-white/5 hover:border-white/10 transition-all">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Can this platform be used by developers only?
                </h4>
                <p className="text-sm sm:text-base text-gray-400">
                  No! It&apos;s for any team-developers, designers, product
                  managers, content teams, or even individuals. Anyone can
                  visualize their work, assign parts, and communicate clearly.
                </p>
              </div>
            </div>
          </section>

          <section id="team" className="mb-16 scroll-mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">Team</h2>
            <div className="space-y-4">
              {[
                { 
                  name: 'SK Akram', 
                  socials: [
                    { icon: FaGithub, url: 'https://github.com/akramcodez' },
                    { icon: RiTwitterXFill, url: 'https://x.com/akramcodez' },
                    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/akramcodez' }
                  ]
                },
                { 
                  name: 'Shabareesh Shetty', 
                  socials: [
                    { icon: FaGithub, url: 'https://github.com/ShabiShett07' },
                    { icon: RiTwitterXFill, url: 'https://x.com/shabishetty07' },
                    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/shabareesh-shetty%F0%9F%87%AE%F0%9F%87%B3-063b57293' }
                  ]
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="group flex flex-wrap sm:items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all"
                >
                  <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-5">
                    {member.socials.map((social, index) => (
                      <Link 
                        key={index} 
                        href={social.url}
                        target="_blank"
                        className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
                      >
                        <social.icon size={22} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>


        </main>
      </div>
    </div>
  );
}
