'use client';

import Error from '../components/main/error-component';

export default function ShowError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <Error message={error.message} />;
}
