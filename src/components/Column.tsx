import { useState, useRef, useEffect, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Modal } from './Modal';

import { Button } from './Button';
import { UI_TEXT } from '../constants';
import { DEFAULT_COLUMNS_SET } from '../constants/componentConfig';
import { getColumnTheme } from '../utils/columnUtils';
import type { ColumnProps, ColumnTheme } from '../types';



export const Column = ({ 
  id, 
  title, 
  color, 
  tasks, 
  overdueTaskIds, 
  onTaskClick, 
  onUpdate, 
  onDelete, 
  onAddTask 
}: ColumnProps) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({
    id,
    data: {
      type: 'Column',
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };
  

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  
  
  
  const taskIds = tasks.map((t) => t.id);
  const theme: ColumnTheme = getColumnTheme(id, color);
  const isDeletable = !DEFAULT_COLUMNS_SET.has(id) && Boolean(onDelete);
  const isEmpty = tasks.length === 0;
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  
  const handleEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  }, []);
  
  const handleStartEdit = useCallback(() => {
    setEditTitle(title);
    setIsEditing(true);
  }, [title]);
  
  const handleSaveTitle = useCallback(() => {
    if (editTitle.trim() && onUpdate) {
      onUpdate(id, editTitle.trim());
    }
    setIsEditing(false);
  }, [editTitle, id, onUpdate]);
  
  const handleCancelEdit = useCallback(() => {
    setEditTitle(title);
    setIsEditing(false);
  }, [title]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keyHandlers = {
      Enter: handleSaveTitle,
      Escape: handleCancelEdit,
    };
    
    const handler = keyHandlers[e.key as keyof typeof keyHandlers];
    handler?.();
  }, [handleSaveTitle, handleCancelEdit]);
  
  const handleAddTask = useCallback(() => {
    onAddTask(id);
  }, [id, onAddTask]);
  
  const handleTaskClick = useCallback((taskId: string) => {
    onTaskClick(taskId);
  }, [onTaskClick]);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = useCallback(() => {
    if (onDelete) {
      onDelete(id);
    }
    setIsDeleteModalOpen(false);
  }, [id, onDelete]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      setIsDeleteModalOpen(true);
    }
  }, [onDelete]);
  
 
  const renderHeader = () => {
    if (isEditing) {
      return (
        <input
          ref={inputRef}
          value={editTitle}
          onChange={handleEditChange}
          onBlur={handleSaveTitle}
          onKeyDown={handleKeyDown}
          className="bg-white/50 border border-primary-300 rounded px-2 py-1 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-primary-500/50"
        />
      );
    }
    
    const dotBgClass = theme.text.replace('text-', 'bg-');
    
    return (
      <button 
        onDoubleClick={handleStartEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleStartEdit();
        }}
       
        className={`font-bold tracking-tight flex items-center gap-2.5 ${theme.text} cursor-pointer select-none text-base bg-transparent border-none p-0 text-left w-full focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1 -ml-1`}
        title={`${UI_TEXT.COLUMN.TITLE_TOOLTIP} (Double-click or Enter to edit)`}
        aria-label={`Column title: ${title}. Press Enter to edit.`}
      >
        <span className={`w-3 h-3 rounded-full ${dotBgClass} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
        {title}
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ml-1.5 opacity-90 ${theme.badge} shadow-sm border border-black/5 dark:border-white/5`}>
          {tasks.length}
        </span>
      </button>
    );
  };
  
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`opacity-40 border-2 border-dashed ${theme.border} min-w-[380px] w-[380px] rounded-2xl p-5 h-full`}
      />
    );
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`${theme.bg} backdrop-blur-md rounded-2xl p-5 min-w-[380px] w-[380px] flex flex-col max-h-full border ${theme.border} shadow-sm snap-center transition-colors duration-300 group/column`}
    >
     
      <div 
        {...attributes} 
        {...listeners}
        className="flex items-center justify-between mb-4 px-1 min-h-[32px] cursor-grab active:cursor-grabbing"
      >
        {renderHeader()}
        
        {isDeletable && (
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50 opacity-0 group-hover/column:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete column"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

 
      <button
        onClick={handleAddTask}
        className={`group/btn w-full py-2.5 mb-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] shadow-sm border border-transparent ${theme.button || 'bg-slate-900 hover:bg-black text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'} hover:shadow-md hover:-translate-y-0.5`}
      >
        <span className="bg-white/20 rounded-full p-0.5 group-hover/btn:rotate-90 transition-transform duration-300">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </span>
        {UI_TEXT.COLUMN.ADD_TASK}
      </button>
      
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div 
          ref={setNodeRef} 
          className="space-y-3 overflow-y-auto flex-1 p-1 -mr-1 scrollbar-hide min-h-[100px]"
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isOverdue={overdueTaskIds.has(task.id)}
              onClick={handleTaskClick}
            />
          ))}
          
         
          {isEmpty && (
            <div className="h-32 border-2 border-dashed border-gray-200/60 rounded-xl flex flex-col items-center justify-center gap-2 group hover:border-gray-300 hover:bg-white/40 transition-all">
              <div className={`p-2 rounded-full ${theme.icon} text-gray-400 group-hover:scale-110 transition-transform`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-400 text-xs font-medium">{UI_TEXT.COLUMN.DROP_PLACEHOLDER}</p>
            </div>
          )}
        </div>
      </SortableContext>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={UI_TEXT.COLUMN.DELETE_TITLE}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {UI_TEXT.COLUMN.DELETE_CONFIRMATION(title)}
            <br />
            {UI_TEXT.COLUMN.DELETE_WARNING}
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              {UI_TEXT.GLOBAL.CANCEL}
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              {UI_TEXT.GLOBAL.DELETE}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
