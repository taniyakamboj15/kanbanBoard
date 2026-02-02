import { BoardSliceState } from '../store/reducers/boardSlice';
import { STORAGE_KEYS } from '../constants';
import { User } from '../types';

export const storageService = {
  // --- Board Persistence ---
  
  getBoardKey: (userId: string) => `kanban-boards-${userId}`,

  saveBoards: (state: BoardSliceState, userId: string = 'guest'): void => {
    try {
      const key = storageService.getBoardKey(userId);
      const serialized = JSON.stringify(state);
      localStorage.setItem(key, serialized);
    } catch (err: unknown) {
      console.error('Failed to save boards state:', err);
    }
  },

  loadBoards: (userId: string = 'guest'): BoardSliceState | null => {
    try {
      const key = storageService.getBoardKey(userId);
      const serialized = localStorage.getItem(key);
      
      // Fallback to legacy key if guest and no new key exists (migration path)
      if (!serialized && userId === 'guest') {
        const legacy = localStorage.getItem(STORAGE_KEYS.BOARDS_STATE);
        if (legacy) return JSON.parse(legacy) as BoardSliceState;
      }

      if (!serialized) return null;
      return JSON.parse(serialized) as BoardSliceState;
    } catch (err: unknown) {
      console.error('Failed to load boards state:', err);
      return null;
    }
  },

  clearBoards: (userId: string = 'guest'): void => {
    try {
      const key = storageService.getBoardKey(userId);
      localStorage.removeItem(key);
    } catch (err: unknown) {
      console.error('Failed to clear boards state:', err);
    }
  },

  // --- Auth Persistence ---

  saveUser: (user: User): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save user:', err);
    }
  },

  loadUser: (): User | null => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      if (!serialized) return null;
      return JSON.parse(serialized) as User;
    } catch (err) {
      return null;
    }
  },

  clearUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },
  
  // Legacy stubs
  saveBoard: () => {},
  loadBoard: () => null,
  clearBoard: () => {},
};
