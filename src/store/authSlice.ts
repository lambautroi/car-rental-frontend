import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null, // Will be restored from server on app load
  token: localStorage.getItem('token'),
  loading: !!localStorage.getItem('token'), // Start loading if token exists
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; access_token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      localStorage.setItem('token', action.payload.access_token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser, clearLoading } = authSlice.actions;

export default authSlice.reducer;