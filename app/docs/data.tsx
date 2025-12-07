
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

export const DOCS_SECTIONS = [
  { id: 'intro', title: 'Introduction' },
  { id: 'preview', title: 'Interface Preview' },
  { id: 'concepts', title: 'Core Concepts' },
  { id: 'faq', title: 'Q&A' },
  { id: 'team', title: 'Team' },
];

export const INTRO_CARDS = [
  {
    title: 'Visual Project Mapping',
    description:
      'Use nodes and branches to build a clear, simple map of your whole project. Every part of your work is in one place and easy to manage.',
  },
  {
    title: 'Instant Communication',
    description:
      'The chat sidebar automatically follows your focus. It instantly snaps to the topic you are viewing, killing context switching.',
  },
];

export const CORE_CONCEPTS = [
  {
    id: 1,
    title: 'Spaces',
    description:
      'A space is like a team or workspace, similar to a Discord server. You can create your own space, invite others, or join existing ones. Each space has its own canvas and chats.',
  },
  {
    id: 2,
    title: 'The Canvas & Nodes',
    description:
      'The canvas is a visual area where you build your work using **nodes** (blocks). Each node represents a part of your project (e.g., "Auth Page", "Landing Page").',
    list: [
      {
        label: 'Nodes',
        value: 'Main project parts.',
      },
      {
        label: 'Sub-nodes',
        value: 'Smaller parts inside a node (e.g., "Navbar" inside "Landing Page").',
      },
      {
        label: 'Branches',
        value: 'Connections showing the flow between parts (e.g., Auth Page → Landing Page).',
      },
    ],
  },
  {
    id: 3,
    title: 'Contextual Sidebar',
    description:
      'The sidebar handles chats and automatically switches to the related chat when you move between nodes. When you open a node, your sidebar updates to match that specific context, keeping conversations focused.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What exactly is this platform?',
    answer:
      'VeoMate is a visual project workspace that combines planning, management, and communication on a single, context-aware canvas. Teams create shared spaces and map their entire workflow using interactive nodes, with chat and navigation updating automatically based on where they are working.',
  },
  {
    question: 'What are "nodes" and "sub-nodes"?',
    answer:
      'Nodes are project parts (e.g., "Auth Page"). Inside a node, you can create sub-nodes (e.g., "Navbar"). You can assign people to manage each node or sub-node.',
  },
  {
    question: 'Who can edit what?',
    list: [
      { label: 'Space Owner', value: 'Full control.' },
      { label: 'Node Maintainers', value: 'Can edit their assigned nodes.' },
      { label: 'Members', value: 'View only.' },
    ],
  },
  {
    question: 'What happens when a user "triggers" a part?',
    answer:
      "When someone opens a task, their canvas zooms into that area and the sidebar switches to that task's chat automatically. This zoom is personal and doesn't affect others.",
  },
  {
    question: 'How is this different from Discord, Figma, or Jira?',
    answer:
      'Discord lacks visual project views. Figma lacks structured task management and Jira lacks in perfect communication. VeoMate combines real-time visual work with structured task management, communication, and roles.',
  },
  {
    question: 'Can this platform be used by developers only?',
    answer:
      "No! It's for any team-developers, designers, product managers, content teams, or even individuals. Anyone can visualize their work, assign parts, and communicate clearly.",
  },
];

export const TEAM_MEMBERS = [
  {
    name: 'SK Akram',
    socials: [
      { icon: FaGithub, url: 'https://github.com/akramcodez' },
      { icon: RiTwitterXFill, url: 'https://x.com/akramcodez' },
      {
        icon: FaLinkedin,
        url: 'https://www.linkedin.com/in/akramcodez',
      },
    ],
  },
  {
    name: 'Shabareesh Shetty',
    socials: [
      { icon: FaGithub, url: 'https://github.com/ShabiShett07' },
      {
        icon: RiTwitterXFill,
        url: 'https://x.com/shabishetty07',
      },
      {
        icon: FaLinkedin,
        url: 'https://www.linkedin.com/in/shabareesh-shetty%F0%9F%87%AE%F0%9F%87%B3-063b57293',
      },
    ],
  },
];
