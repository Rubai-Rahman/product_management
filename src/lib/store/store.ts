// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { api } from './api';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: api.reducer,
    // add other reducers here (e.g., products) when ready
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
