import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { 
  addTask, 
  updateTask, 
  deleteTask, 
  moveTask, 
  addColumn, 
  updateColumn, 
  deleteColumn,
  reorderColumns 
} from '../store/reducers/kanbanSlice';
import { Task } from '../types';
import { storageService } from '../services/storage';


export const useBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const boardState = useSelector((state: RootState) => state.kanban);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      storageService.saveBoard(boardState);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [boardState]);

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

  return {
    boardState,
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    moveTask: handleMoveTask,
    addColumn: handleAddColumn,
    updateColumn: handleUpdateColumn,
    deleteColumn: handleDeleteColumn,
    reorderColumns: handleReorderColumns,
  };
};
