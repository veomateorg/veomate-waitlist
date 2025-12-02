'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const state = localStorage.getItem('veomate_signup_state');
    const savedEmail = localStorage.getItem('veomate_current_email');

    if (state === 'email_entered') {
      if (savedEmail) {
        router.replace(
          `/complete-signup?email=${encodeURIComponent(savedEmail)}`
        );
      } else {
        router.replace('/complete-signup');
      }
    } else if (state === 'profile_completed') {
      router.replace('/welcome');
    } else {
      router.replace('/');
    }
  }, [router]);

  return null;
}
