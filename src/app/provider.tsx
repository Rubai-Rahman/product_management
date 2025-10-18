'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
