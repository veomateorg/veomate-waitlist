'use client';

import { usePathname } from 'next/navigation';
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import Link from 'next/link';

export default function GlobalFooterIcons() {
  const pathname = usePathname();

  if (pathname?.startsWith('/docs')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 flex gap-4 z-50">
      <Link href="https://twitter.com/veomate" target="_blank" className="text-white/70 hover:text-white transition-colors">
        <RiTwitterXFill size={24} />
      </Link>
      <Link href="https://github.com/veomateorg" target="_blank" className="text-white/70 hover:text-white transition-colors">
        <FaGithub size={24} />
      </Link>
    </div>
  );
}
