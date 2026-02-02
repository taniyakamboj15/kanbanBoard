import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { selectUser } from '../store/reducers/authSlice';
import { loadUserData, createDefaultBoard } from '../store/reducers/boardSlice';
import { storageService } from '../services/storage';

/**
 * Hook to manage data persistence based on the current authenticated user.
 * It listens to user changes, loads relevant data, and saves data on change.
 */
export const useAuthPersistence = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const boardState = useSelector((state: RootState) => state.board);
  
  // Ref to track if initial load has happened
  const isLoaded = useRef(false);

  // 1. Load data when user changes
  useEffect(() => {
    if (!user) {
      // If no user, we might want to clear board state or just do nothing
      // For now, let's assume we wait for a user.
      isLoaded.current = false;
      return;
    }

    const userId = user.id;
    const existingData = storageService.loadBoards(userId);

    if (existingData) {
      dispatch(loadUserData(existingData));
    } else {
      // Initialize new user data
      const defaultId = `board-${Date.now()}`;
      const initialData = {
        boards: { [defaultId]: createDefaultBoard(defaultId, 'My First Board') },
        boardIds: [defaultId],
        activeBoardId: defaultId,
      };
      
      dispatch(loadUserData(initialData));
    }
    
    isLoaded.current = true;
  }, [user, dispatch]);

  // 2. Save data when board state changes
  useEffect(() => {
    if (!user || !isLoaded.current) return;

    // Debounce save
    const timeoutId = setTimeout(() => {
      storageService.saveBoards(boardState, user.id);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [boardState, user]);
};
