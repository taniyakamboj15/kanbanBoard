import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Column, Task } from '../../types';
import { DEFAULT_COLUMNS } from '../../constants';
// storageService supports loadBoards now
import { storageService } from '../../services/storage';

interface BoardData {
  id: string;
  title: string;
  createdAt: number;
  columns: Column[];
  tasks: Task[];
}

export interface BoardSliceState {
  boards: Record<string, BoardData>;
  boardIds: string[];
  activeBoardId: string | null;
}

// Helper to create a default board
export const createDefaultBoard = (id: string, title: string): BoardData => ({
  id,
  title,
  createdAt: Date.now(),
  columns: [...DEFAULT_COLUMNS],
  tasks: [],
});

const loadInitialState = (): BoardSliceState => {
  const saved = storageService.loadBoards();
  if (saved) return saved;

  const defaultId = 'board-' + Date.now();
  const defaultBoard = createDefaultBoard(defaultId, 'My First Board');
  
  return {
    boards: { [defaultId]: defaultBoard },
    boardIds: [defaultId],
    activeBoardId: defaultId,
  };
};

const initialState: BoardSliceState = {
  boards: {},
  boardIds: [],
  activeBoardId: null,
}; // State initialized empty; hydration happens via explicit action

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // Board Actions
    loadUserData: (state, action: PayloadAction<BoardSliceState>) => {
      state.boards = action.payload.boards;
      state.boardIds = action.payload.boardIds;
      state.activeBoardId = action.payload.activeBoardId;
    },

    createBoard: (state, action: PayloadAction<string>) => {
      const id = 'board-' + Date.now();
      const newBoard = createDefaultBoard(id, action.payload);
      state.boards[id] = newBoard;
      state.boardIds.push(id);
      state.activeBoardId = id; // Auto switch
    },

    deleteBoard: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.boardIds.length <= 1) return; // Prevent deleting last board

      delete state.boards[id];
      state.boardIds = state.boardIds.filter(bid => bid !== id);
      
      if (state.activeBoardId === id) {
        state.activeBoardId = state.boardIds[0] || null;
      }
    },

    setActiveBoard: (state, action: PayloadAction<string>) => {
      if (state.boards[action.payload]) {
        state.activeBoardId = action.payload;
      }
    },

    updateBoardName: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;
      if (state.boards[id]) {
        state.boards[id].title = title;
      }
    },

    // Task Actions (scoped to active board)
    addTask: (state, action: PayloadAction<Task>) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (board) {
        board.tasks.push(action.payload);
      }
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;

      const index = board.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        board.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;

      board.tasks = board.tasks.filter((t) => t.id !== action.payload);
    },

    moveTask: (
      state,
      action: PayloadAction<{ taskId: string; columnId: string; newIndex: number }>
    ) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;

      const { taskId, columnId, newIndex } = action.payload;
      const taskIndex = board.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return;

      const task = board.tasks[taskIndex];
      if (!task) return;
      
      // Note: task is a Proxy here, modifying it is fine
      task.columnId = columnId;

      const [movedTask] = board.tasks.splice(taskIndex, 1);
      if (!movedTask) return;
      
      // Calculate insertion index
      const targetColumnTasks = board.tasks.filter(t => t.columnId === columnId);
      let targetIndex = board.tasks.length;
      
      if (newIndex < targetColumnTasks.length) {
         const nextTask = targetColumnTasks[newIndex];
         if (nextTask) {
           targetIndex = board.tasks.indexOf(nextTask);
         }
      }
      
      board.tasks.splice(targetIndex, 0, movedTask);
    },

    reorderTasks: (
      state,
      action: PayloadAction<{ columnId: string; taskId: string; newIndex: number }>
    ) => {
      // Re-use logic or similar to moveTask logic but columnId doesn't change
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;
      const { taskId, columnId, newIndex } = action.payload;
       
      const taskIndex = board.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return;

      const [movedTask] = board.tasks.splice(taskIndex, 1);
      if (!movedTask) return;
      
      // Same insertion logic
      const targetColumnTasks = board.tasks.filter(t => t.columnId === columnId);
      let targetIndex = board.tasks.length;
      
      if (newIndex < targetColumnTasks.length) {
         const nextTask = targetColumnTasks[newIndex];
         if (nextTask) {
           targetIndex = board.tasks.indexOf(nextTask);
         }
      }

      board.tasks.splice(targetIndex, 0, movedTask);
    },
    
    // Column Actions
    addColumn: (state, action: PayloadAction<{ title: string; color?: string }>) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;

      const id = action.payload.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
      board.columns.push({
        id,
        title: action.payload.title,
        color: action.payload.color,
      });
    },

    updateColumn: (state, action: PayloadAction<{ id: string; title: string }>) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;

      const col = board.columns.find((c) => c.id === action.payload.id);
      if (col) {
        col.title = action.payload.title;
      }
    },

    deleteColumn: (state, action: PayloadAction<string>) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;

      board.columns = board.columns.filter((c) => c.id !== action.payload);
      board.tasks = board.tasks.filter((t) => t.columnId !== action.payload);
    },

    reorderColumns: (
      state,
      action: PayloadAction<{ activeId: string; overId: string }>
    ) => {
      if (!state.activeBoardId) return;
      const board = state.boards[state.activeBoardId];
      if (!board) return;

      const { activeId, overId } = action.payload;
      const oldIndex = board.columns.findIndex((c) => c.id === activeId);
      const newIndex = board.columns.findIndex((c) => c.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const movedColumn = board.columns[oldIndex];
        if (movedColumn) {
          board.columns.splice(oldIndex, 1);
          board.columns.splice(newIndex, 0, movedColumn);
        }
      }
    }
  },
});

export const {
  loadUserData,
  createBoard,
  deleteBoard,
  setActiveBoard,
  updateBoardName,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  reorderTasks,
  addColumn,
  updateColumn,
  deleteColumn,
  reorderColumns
} = boardSlice.actions;

// Selectors
const selectBoardState = (state: { board: BoardSliceState }) => state.board;

export const selectBoards = createSelector(
  [selectBoardState],
  (state) => state.boardIds.map(id => {
    const board = state.boards[id];
    if (!board) return null;
    return { 
      id, 
      title: board.title, 
      createdAt: board.createdAt 
    };
  }).filter((b): b is { id: string; title: string; createdAt: number } => b !== null)
);

export const selectActiveBoardId = createSelector(
  [selectBoardState],
  (state) => state.activeBoardId
);

export const selectActiveBoard = createSelector(
  [selectBoardState, selectActiveBoardId],
  (state, activeId) => activeId ? state.boards[activeId] : null
);

export const selectActiveBoardColumns = createSelector(
  [selectActiveBoard],
  (board) => board?.columns || []
);

export const selectActiveBoardTasks = createSelector(
  [selectActiveBoard],
  (board) => board?.tasks || []
);

export default boardSlice.reducer;
