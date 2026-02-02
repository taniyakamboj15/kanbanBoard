import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { storageService } from '../../services/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: storageService.loadUser(),
  isAuthenticated: !!storageService.loadUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      const newUser: User = {
        id: action.payload.email.toLowerCase(), // Simple ID generation
        name: action.payload.name,
        email: action.payload.email,
        isGuest: false,
      };
      state.user = newUser;
      state.isAuthenticated = true;
      storageService.saveUser(newUser);
    },
    loginAsGuest: (state) => {
      const guestUser: User = {
        id: 'guest',
        name: 'Guest User',
        email: '',
        isGuest: true,
      };
      state.user = guestUser;
      state.isAuthenticated = true;
      storageService.saveUser(guestUser);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      storageService.clearUser();
      // Note: We do NOT clear board data on logout, ensuring persistence
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        storageService.saveUser(state.user);
      }
    }
  },
});

export const { login, loginAsGuest, logout, updateUser } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export default authSlice.reducer;
