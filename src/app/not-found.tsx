import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 Not Found',
};

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link href="/">Go back to home</Link>
    </div>
  );
};

export default NotFound;
