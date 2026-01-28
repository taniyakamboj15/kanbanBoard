import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { isOverdue } from '../utils/dates';

// ==========================================
// OVERDUE TASKS HOOK
// Returns Set of overdue task IDs for efficient lookup
// ==========================================

export const useOverdueTasks = (): Set<string> => {
  const tasks = useSelector((state: RootState) => state.kanban.tasks);

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
