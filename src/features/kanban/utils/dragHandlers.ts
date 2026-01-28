import { DragEndEvent as DndKitDragEndEvent } from '@dnd-kit/core';
import { Task } from '@/types';



export const findTaskById = (tasks: Task[], taskId: string): Task | undefined => {
  return tasks.find((t) => t.id === taskId);
};

export const findTaskColumn = (tasks: Task[], taskId: string): string | undefined => {
  const task = findTaskById(tasks, taskId);
  return task?.columnId;
};

export const getTasksByColumn = (tasks: Task[], columnId: string): Task[] => {
  return tasks.filter((t) => t.columnId === columnId);
};

export const calculateNewIndex = (
  tasks: Task[],
  overId: string,
  columnId: string
): number => {
  const columnTasks = getTasksByColumn(tasks, columnId);
  const overTask = findTaskById(columnTasks, overId);
  
  if (!overTask) {
    return columnTasks.length;
  }

  return columnTasks.indexOf(overTask);
};

export type DragResult = 
  | { type: 'TASK'; taskId: string; targetColumnId: string; newIndex: number }
  | { type: 'COLUMN'; activeId: string; overId: string }
  | null;

export const handleDragEnd = (
  event: DndKitDragEndEvent,
  tasks: Task[],
  columns: { id: string }[]
): DragResult => {
  const { active, over } = event;

  if (!over) return null;

  const activeId = active.id as string;
  const overId = over.id as string;


  const isActiveColumn = active.data.current?.type === 'Column';
  if (isActiveColumn) {
    if (activeId === overId) return null;
    return {
      type: 'COLUMN',
      activeId,
      overId,
    };
  }


  const taskId = activeId;
  
 
  const isOverColumn = columns.some((col) => col.id === overId);
  const targetColumnId = isOverColumn ? overId : findTaskColumn(tasks, overId) || '';

  if (!targetColumnId) return null;

  const newIndex = isOverColumn
    ? getTasksByColumn(tasks, targetColumnId).length
    : calculateNewIndex(tasks, overId, targetColumnId);

  return {
    type: 'TASK',
    taskId,
    targetColumnId,
    newIndex,
  };
};
