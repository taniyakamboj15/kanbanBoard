import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/boardSlice';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    auth: authReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
