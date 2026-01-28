import { Priority, LabelType } from '../types';

import { Task } from '../types';


export const BUTTON_VARIANTS = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  black: 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-900/20 dark:bg-white dark:text-slate-950 dark:hover:bg-gray-100',
} as const;

export const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const;


export const PRIORITY_CONFIG: Record<Priority, { classes: string; dotColor: string; label: string }> = {
  [Priority.LOW]: {
    classes: 'bg-slate-100 text-slate-600 border-slate-200',
    dotColor: 'bg-slate-600',
    label: 'Low',
  },
  [Priority.MEDIUM]: {
    classes: 'bg-blue-50 text-blue-600 border-blue-200',
    dotColor: 'bg-blue-600',
    label: 'Medium',
  },
  [Priority.HIGH]: {
    classes: 'bg-orange-50 text-orange-600 border-orange-200',
    dotColor: 'bg-orange-600',
    label: 'High',
  },
  [Priority.URGENT]: {
    classes: 'bg-red-50 text-red-600 border-red-200',
    dotColor: 'bg-red-600',
    label: 'Urgent',
  },
};

export const PRIORITY_SORT_ORDER: Record<Priority, number> = {
  [Priority.URGENT]: 0,
  [Priority.HIGH]: 1,
  [Priority.MEDIUM]: 2,
  [Priority.LOW]: 3,
};


export const LABEL_CONFIG: Record<LabelType, string> = {
  [LabelType.BUG]: 'bg-red-50 text-red-700 ring-red-600/10',
  [LabelType.FEATURE]: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  [LabelType.IMPROVEMENT]: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  [LabelType.DOCUMENTATION]: 'bg-purple-50 text-purple-700 ring-purple-700/10',
  [LabelType.URGENT]: 'bg-orange-50 text-orange-700 ring-orange-600/10',
};


export const DEFAULT_COLUMN_THEMES = {
  todo: 'blue',
  'in-progress': 'amber',
  done: 'emerald',
} as const;

export const DEFAULT_COLUMNS_SET = new Set(['todo', 'in-progress', 'done']);


export const TASK_CARD_STYLES = {
  normal: {
    card: 'border border-gray-200 hover:border-primary-400/50 bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1)] dark:bg-slate-900 dark:border-slate-800 dark:hover:border-primary-500/50',
    title: 'text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400',
    gradient: 'from-primary-100/40 dark:from-primary-900/20',
  },
  overdue: {
    card: 'ring-1 ring-inset ring-red-200 bg-gradient-to-br from-red-50 via-white to-red-50/30 shadow-[0_4px_20px_-4px_rgba(239,68,68,0.1)] hover:shadow-[0_8px_25px_-4px_rgba(239,68,68,0.2)]',
    title: 'text-red-900 group-hover:text-red-700',
    gradient: 'from-red-100/50',
  },
  overlay: {
    card: 'shadow-2xl scale-105 cursor-grabbing rotate-2 ring-2 ring-primary-500 z-50 bg-white',
    title: '',
    gradient: '',
  },
} as const;


export const LABEL_OPTIONS = Object.values(LabelType);
export const PRIORITY_OPTIONS = Object.values(Priority);

export const FORM_LABEL_STYLES = {
  unchecked: 'inline-block px-2.5 py-1.5 rounded-lg text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm',
  checked: 'peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 peer-checked:hover:bg-blue-700',
  transition: 'transition-all duration-200 select-none group-active:scale-95',
} as const;


type SortComparator = (a: Task, b: Task) => number;

export const SORT_COMPARATORS: Record<string, SortComparator> = {
  manual: () => 0,
  date: (a, b) => (a.dueDate || '9999-99-99').localeCompare(b.dueDate || '9999-99-99'),
  title: (a, b) => a.title.localeCompare(b.title),
  priority: (a, b) => (PRIORITY_SORT_ORDER[a.priority] ?? 4) - (PRIORITY_SORT_ORDER[b.priority] ?? 4),
} as const;

export const SELECT_STYLES = {
  base: 'w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-950 border rounded-xl shadow-sm appearance-none cursor-pointer font-medium text-sm transition-all duration-300 outline-none text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed',
  error: 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-1',
  normal: 'border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-blue-500',
} as const;

export const SORT_OPTIONS = [
  { value: 'manual', label: 'Manual' },
  { value: 'date', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];
