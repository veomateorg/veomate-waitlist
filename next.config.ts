import type { NextConfig } from 'next';
import crypto from 'crypto';

if (process.env.NODE_ENV === 'development') {
  const ownerKey = process.env.VEOMATE_OWNER_KEY;
  const REQUIRED_HASH = 'bf241f835d33c726188746d174c2ca81e7e321bc48014e7cd7b8480d22b7d335';

  if (!ownerKey) {
    console.error('\x1b[31m%s\x1b[0m', 'VEOMATE WAITLIST SECURITY: You are not authorized to run this development server.');
    console.error('\x1b[31m%s\x1b[0m', 'Missing Owner Key. Please contact the repository owner.');
    process.exit(1);
  }

  const providedHash = crypto.createHash('sha256').update(ownerKey).digest('hex');

  if (providedHash !== REQUIRED_HASH) {
    console.error('\x1b[31m%s\x1b[0m', 'VEOMATE WAITLIST SECURITY: Access Denied.');
    console.error('\x1b[31m%s\x1b[0m', 'The provided Owner Key is incorrect.');
    process.exit(1);
  }
}

const nextConfig: NextConfig = {};

export default nextConfig;
