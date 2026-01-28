import React, { useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCardInner } from './TaskCardInner';
import type { TaskCardProps } from '../types';


export const TaskCard = React.memo(({ task, isOverdue, onClick }: TaskCardProps) => {

  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });


  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const handleClick = useCallback(() => {
    onClick(task.id);
  }, [onClick, task.id]);

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="outline-none"
    >
      <TaskCardInner 
        task={task} 
        isOverdue={isOverdue} 
        onClick={handleClick}
      />
    </div>
  );
});

TaskCard.displayName = 'TaskCard';
