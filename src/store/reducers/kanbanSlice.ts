import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardState, Task } from '../../types';
import { DEFAULT_COLUMNS } from '../../constants';
import { storageService } from '../../services/storage';

const initialState: BoardState = storageService.loadBoard() || {
  columns: [...DEFAULT_COLUMNS],
  tasks: [],
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    moveTask: (
      state,
      action: PayloadAction<{ taskId: string; columnId: string; newIndex: number }>
    ) => {
      const { taskId, columnId, newIndex } = action.payload;
      const taskIndex = state.tasks.findIndex((t) => t.id === taskId);

      if (taskIndex === -1) return;

      const task = state.tasks[taskIndex];


      if (!task) return;

      // Update column
      task.columnId = columnId;

      // Reorder tasks
      const [movedTask] = state.tasks.splice(taskIndex, 1);
      if (!movedTask) return;

      // Find insertion point
      const columnTasks = state.tasks.filter((t) => t.columnId === columnId);
      const actualNewIndex = Math.min(newIndex, columnTasks.length);

      // Get global index for insertion
      const tasksBeforeColumn = state.tasks.filter(
        (t) => t.columnId !== columnId && state.tasks.indexOf(t) < taskIndex
      ).length;

      const targetIndex = tasksBeforeColumn + actualNewIndex;
      state.tasks.splice(targetIndex, 0, movedTask);
    },

    reorderTasks: (
      state,
      action: PayloadAction<{ columnId: string; taskId: string; newIndex: number }>
    ) => {
      const { columnId, taskId, newIndex } = action.payload;
      const taskIndex = state.tasks.findIndex((t) => t.id === taskId);

      if (taskIndex === -1) return;

      const [task] = state.tasks.splice(taskIndex, 1);
      if (!task) return;

      // Calculate global index
      const columnTasks = state.tasks.filter((t) => t.columnId === columnId);
      const actualNewIndex = Math.min(newIndex, columnTasks.length);

      const firstTaskInColumn = state.tasks.findIndex((t) => t.columnId === columnId);
      const targetIndex =
        firstTaskInColumn === -1 ? state.tasks.length : firstTaskInColumn + actualNewIndex;

      state.tasks.splice(targetIndex, 0, task);
    },

    loadBoard: (_state, action: PayloadAction<BoardState>) => {
      return action.payload;
    },

    addColumn: (state, action: PayloadAction<{ title: string; color?: string }>) => {
      const id = action.payload.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
      state.columns.push({ 
        id, 
        title: action.payload.title,
        color: action.payload.color
      });
    },

    updateColumn: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const col = state.columns.find((c) => c.id === action.payload.id);
      if (col) {
        col.title = action.payload.title;
      }
    },

    deleteColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter((c) => c.id !== action.payload);
      state.tasks = state.tasks.filter((t) => t.columnId !== action.payload);
    },

    reorderColumns: (
      state,
      action: PayloadAction<{ activeId: string; overId: string }>
    ) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.columns.findIndex((c) => c.id === activeId);
      const newIndex = state.columns.findIndex((c) => c.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const movedColumn = state.columns[oldIndex];
        if (movedColumn) {
          state.columns.splice(oldIndex, 1);
          state.columns.splice(newIndex, 0, movedColumn);
        }
      }
    },
  },
});

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  moveTask, 
  reorderTasks, 
  loadBoard,
  addColumn,
  updateColumn,
  deleteColumn,
  reorderColumns
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
