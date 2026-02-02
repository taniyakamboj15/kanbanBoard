import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isOverdue } from '../utils/dates';
import { selectActiveBoardTasks } from '../store/reducers/boardSlice';

export const useOverdueTasks = (): Set<string> => {
  const tasks = useSelector(selectActiveBoardTasks);

  return useMemo(() => {
    const overdueSet = new Set<string>();
    
    tasks.forEach((task) => {
      if (isOverdue(task.dueDate)) {
        overdueSet.add(task.id);
      }
    });

    return overdueSet;
  }, [tasks]);
};
