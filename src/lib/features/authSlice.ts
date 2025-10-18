// lib/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
}

const getStoredAuth = () => {
  const authData = localStorage.getItem('auth');
  if (!authData) return { token: null, email: null };
  try {
    return JSON.parse(authData);
  } catch (e) {
    return { token: null, email: null };
  }
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
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: action.payload.token,
          email: action.payload.email,
        })
      );
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
