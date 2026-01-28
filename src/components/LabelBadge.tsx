import React from 'react';
import { LABEL_CONFIG } from '../constants/componentConfig';
import type { LabelBadgeProps } from '../types';


export const LabelBadge = React.memo(({ label }: LabelBadgeProps) => {
  const classes = LABEL_CONFIG[label];

  return (
    <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset ${classes}`}>
      {label}
    </span>
  );
});
