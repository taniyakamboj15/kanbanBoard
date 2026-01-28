import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './reducers/kanbanSlice';


export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
