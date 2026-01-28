import { BoardState } from '../types';
import { STORAGE_KEYS } from '../constants';


export const storageService = {
  saveBoard: (state: BoardState): void => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEYS.BOARD_STATE, serialized);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Failed to save board state:', error.message);
    }
  },

  loadBoard: (): BoardState | null => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.BOARD_STATE);
      if (!serialized) return null;
      
      return JSON.parse(serialized) as BoardState;
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Failed to load board state:', error.message);
      return null;
    }
  },

  clearBoard: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BOARD_STATE);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Failed to clear board state:', error.message);
    }
  },
};
