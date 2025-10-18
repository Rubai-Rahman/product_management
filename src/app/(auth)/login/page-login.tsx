'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/login/login-form';
import { useLoginMutation } from '@/lib/store/api';
import { setCredentials } from '@/lib/features/authSlice';

const LogInPageContent = () => {
  const dispatch = useDispatch(); 
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [login] = useLoginMutation();

  const handleSubmit = async (formData: { email: string }) => {
    try {
      setIsLoading(true);
      const response = await login({ email: formData.email }).unwrap();
      dispatch(
        setCredentials({
          token: response.token,
          email: formData.email,
        })
      );

      router.push('/products');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default LogInPageContent;
