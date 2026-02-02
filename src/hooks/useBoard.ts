import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { 
  createBoard,
  deleteBoard,
  setActiveBoard,
  updateBoardName,
  addTask, 
  updateTask, 
  deleteTask, 
  moveTask, 
  addColumn, 
  updateColumn, 
  deleteColumn,
  reorderColumns,
  selectActiveBoard,
  selectBoards,
  selectActiveBoardId
} from '../store/reducers/boardSlice';
import { Task } from '../types';
import { storageService } from '../services/storage';


export const useBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // New Selectors
  const activeBoard = useSelector(selectActiveBoard);
  const boards = useSelector(selectBoards);
  const activeBoardId = useSelector(selectActiveBoardId);
  const fullBoardState = useSelector((state: RootState) => state.board);

  // Derived state to match legacy BoardState interface for components
  const boardState = useMemo(() => ({
    columns: activeBoard?.columns || [],
    tasks: activeBoard?.tasks || [],
  }), [activeBoard]);

  // Persistence triggers when full state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      storageService.saveBoards(fullBoardState);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fullBoardState]);

  // Actions wrapped to match component expectations
  const handleAddTask = (task: Task) => {
      dispatch(addTask(task));
    };

  const handleUpdateTask = (task: Task) => {
      dispatch(updateTask(task));
    };

  const handleDeleteTask = (taskId: string) => {
      dispatch(deleteTask(taskId));
    };

  const handleMoveTask = (taskId: string, columnId: string, newIndex: number) => {
      // If simply reordering in same column, use reorderTasks? 
      // Existing components call moveTask for both?
      // Let's check logic. `moveTask` in slice handles both cross-column and same-column (via splice logic).
      dispatch(moveTask({ taskId, columnId, newIndex }));
    };

  const handleAddColumn = (title: string, color?: string) => {
      dispatch(addColumn({ title, color }));
    };

  const handleUpdateColumn = (id: string, title: string) => {
      dispatch(updateColumn({ id, title }));
    };

  const handleDeleteColumn = (id: string) => {
      dispatch(deleteColumn(id));
    };

  const handleReorderColumns = (activeId: string, overId: string) => {
      dispatch(reorderColumns({ activeId, overId }));
    };

  // New Board Management Actions
  const handleCreateBoard = (title: string) => dispatch(createBoard(title));
  const handleDeleteBoard = (id: string) => dispatch(deleteBoard(id));
  const handleSetActiveBoard = (id: string) => dispatch(setActiveBoard(id));
  const handleUpdateBoardName = (id: string, title: string) => dispatch(updateBoardName({ id, title }));

  return {
    // Current Board Data
    boardState,
    activeBoardId,
    activeBoardTitle: activeBoard?.title,
    
    // Board List
    boards,

    // Task & Column Actions
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    moveTask: handleMoveTask,
    addColumn: handleAddColumn,
    updateColumn: handleUpdateColumn,
    deleteColumn: handleDeleteColumn,
    reorderColumns: handleReorderColumns,

    // Board Actions
    createBoard: handleCreateBoard,
    deleteBoard: handleDeleteBoard,
    setActiveBoard: handleSetActiveBoard,
    updateBoardName: handleUpdateBoardName,
  };
};
