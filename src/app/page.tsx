import { redirect } from 'next/navigation';

// Redirect to products - middleware will handle auth
export default function Home() {
  redirect('/products');
}
