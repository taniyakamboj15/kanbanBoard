import React from 'react';
import { PRIORITY_CONFIG } from '../constants/componentConfig';
import { Priority, type PriorityBadgeProps } from '../types';


export const PriorityBadge = React.memo(({ priority }: PriorityBadgeProps) => {

  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG[Priority.LOW];

  return (
    <span className={`
      px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
      flex items-center gap-1
      ${config.classes}
    `}>
      <span className={`w-1 h-1 rounded-full ${config.dotColor}`} />
      {priority}
    </span>
  );
});

PriorityBadge.displayName = 'PriorityBadge';
