import { redirect } from 'next/navigation';

// This page will never be rendered as we redirect immediately
export default function Home() {
  redirect('/login');
}
