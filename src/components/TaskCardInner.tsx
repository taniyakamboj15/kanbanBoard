import React from 'react';
import { LabelBadge } from './LabelBadge';
import { PriorityBadge } from './PriorityBadge';
import { formatDate } from '../utils/dates';
import { TASK_CARD_STYLES } from '../constants/componentConfig';
import { UI_TEXT } from '../constants';
import type { TaskCardInnerProps } from '../types';


const getCardStyleType = (isOverdue: boolean, isOverlay: boolean): keyof typeof TASK_CARD_STYLES => {
  if (isOverlay) return 'overlay';
  if (isOverdue) return 'overdue';
  return 'normal';
};


export const TaskCardInner = React.memo(({ 
  task, 
  isOverdue, 
  onClick, 
  style, 
  className = '',
  isOverlay = false 
}: TaskCardInnerProps) => {

  const styleType = getCardStyleType(isOverdue, isOverlay);
  const styles = TASK_CARD_STYLES[styleType];
  

  const hasDescription = Boolean(task.description);
  const hasLabels = task.labels && task.labels.length > 0;
  const hasDueDate = Boolean(task.dueDate);
  
  const baseClasses = 'rounded-xl p-4 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group relative overflow-hidden flex flex-col min-h-[140px] bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800/50';
  const cursorClass = isOverlay ? 'cursor-grabbing' : 'cursor-grab hover:-translate-y-1';
  const interactiveClass = onClick ? 'active:scale-[0.98]' : '';
  const cardClasses = `${styles.card} ${cursorClass} ${interactiveClass} ${baseClasses} ${className}`.trim();
  
  const titleClasses = `font-semibold transition-colors line-clamp-2 text-[15px] leading-snug mb-2 ${styles.title} dark:text-gray-100`;
  
  const gradientClasses = `absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${styles.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -mr-10 -mt-10 pointer-events-none`;
  
  const dueDateText = hasDueDate ? (isOverdue ? UI_TEXT.TASK.OVERDUE : formatDate(task.dueDate!)) : null;
  
  const dateBaseClasses = 'flex items-center gap-1.5 text-xs font-semibold';
  const dateColorClass = isOverdue ? 'text-red-600' : 'text-slate-400 group-hover:text-slate-600';
  const dueDateClasses = `${dateBaseClasses} ${dateColorClass}`;
  
  return (
    <div 
      onClick={onClick} 
      style={style} 
      className={cardClasses}
      role="button"
      tabIndex={onClick ? 0 : -1}
      aria-label={`Task: ${task.title}`}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
   
      <div className={gradientClasses} aria-hidden="true" />

   
      <div className="flex items-center justify-between mb-3 relative z-10">
        <PriorityBadge priority={task.priority} />
        
        <div className="flex items-center gap-1.5">
          {isOverdue && (
            <div className="text-red-500 animate-pulse" title={UI_TEXT.TASK.OVERDUE}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}
    
          <button 
            className="text-slate-300 hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100 p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={(e) => e.stopPropagation()}
            aria-label="Task options"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>

   
      <div className="flex-grow">
        <h3 className={titleClasses}>
          {task.title}
        </h3>
        
        {hasDescription && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed font-medium">
            {task.description}
          </p>
        )}

        {/* Labels section */}
        {hasLabels && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {task.labels.map((label) => (
              <LabelBadge key={label} label={label} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100/80 mt-2">
        {hasDueDate ? (
          <div className={dueDateClasses}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{dueDateText}</span>
          </div>
        ) : <div className="flex-grow" />}

      
        <div className="flex -space-x-1.5">
          <div 
            className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[9px] text-white font-bold ring-2 ring-white shadow-sm"
            title={UI_TEXT.TASK.ASSIGNED_TO_ME}
          >
            ME
          </div>
        </div>
      </div>
    </div>
  );
});

TaskCardInner.displayName = 'TaskCardInner';
