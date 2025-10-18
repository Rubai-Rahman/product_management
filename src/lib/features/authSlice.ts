// lib/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
}

const getStoredAuth = () => {
  if (typeof window === 'undefined') return { token: null, email: null };

  const authData = localStorage.getItem('auth');
  if (!authData) return { token: null, email: null };
  try {
    return JSON.parse(authData);
  } catch (e) {
    console.log(e);
    return { token: null, email: null };
  }
};

const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

const initialState: AuthState = getStoredAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;

      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            token: action.payload.token,
            email: action.payload.email,
          })
        );
      }

      // Store token in cookie for middleware
      setCookie('auth-token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.email = null;

      // Remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
      }

      // Remove cookie
      deleteCookie('auth-token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
