import { LabelType } from '../types';


export const LABEL_CONFIG: Record<LabelType, { color: string; bg: string; text: string }> = {
  [LabelType.BUG]: {
    color: 'red',
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
  [LabelType.FEATURE]: {
    color: 'blue',
    bg: 'bg-blue-100',
    text: 'text-blue-800',
  },
  [LabelType.IMPROVEMENT]: {
    color: 'green',
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  [LabelType.DOCUMENTATION]: {
    color: 'purple',
    bg: 'bg-purple-100',
    text: 'text-purple-800',
  },
  [LabelType.URGENT]: {
    color: 'orange',
    bg: 'bg-orange-100',
    text: 'text-orange-800',
  },
};

// ==========================================
// DEFAULT COLUMNS
// ==========================================

export const DEFAULT_COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
] as const;

export const COLUMN_COLOR_VARIANTS: Record<string, { bg: string; border: string; text: string; badge: string; icon: string; label: string; button: string; swatch: string }> = {
  slate: { bg: 'bg-slate-50/50', border: 'border-slate-200/60', text: 'text-slate-700', badge: 'bg-slate-200 text-slate-700', icon: 'bg-slate-100', label: 'Default', button: 'bg-slate-800 hover:bg-slate-900 text-white', swatch: 'bg-slate-500' },
  blue: { bg: 'bg-blue-50/60', border: 'border-blue-200/60', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700', icon: 'bg-blue-100', label: 'Blue', button: 'bg-blue-600 hover:bg-blue-700 text-white', swatch: 'bg-blue-500' },
  indigo: { bg: 'bg-indigo-50/50', border: 'border-indigo-200/60', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700', icon: 'bg-indigo-100', label: 'Indigo', button: 'bg-indigo-600 hover:bg-indigo-700 text-white', swatch: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50/50', border: 'border-purple-200/60', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700', icon: 'bg-purple-100', label: 'Purple', button: 'bg-purple-600 hover:bg-purple-700 text-white', swatch: 'bg-purple-500' },
  pink: { bg: 'bg-pink-50/50', border: 'border-pink-200/60', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700', icon: 'bg-pink-100', label: 'Pink', button: 'bg-pink-600 hover:bg-pink-700 text-white', swatch: 'bg-pink-500' },
  red: { bg: 'bg-red-50/50', border: 'border-red-200/60', text: 'text-red-700', badge: 'bg-red-100 text-red-700', icon: 'bg-red-100', label: 'Red', button: 'bg-red-600 hover:bg-red-700 text-white', swatch: 'bg-red-500' },
  orange: { bg: 'bg-orange-50/50', border: 'border-orange-200/60', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700', icon: 'bg-orange-100', label: 'Orange', button: 'bg-orange-500 hover:bg-orange-600 text-white', swatch: 'bg-orange-500' },
  amber: { bg: 'bg-amber-50/50', border: 'border-amber-200/60', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', icon: 'bg-amber-100', label: 'Amber', button: 'bg-amber-600 hover:bg-amber-700 text-white', swatch: 'bg-amber-500' },
  emerald: { bg: 'bg-emerald-50/50', border: 'border-emerald-200/60', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', icon: 'bg-emerald-100', label: 'Emerald', button: 'bg-emerald-600 hover:bg-emerald-700 text-white', swatch: 'bg-emerald-500' },
  teal: { bg: 'bg-teal-50/50', border: 'border-teal-200/60', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700', icon: 'bg-teal-100', label: 'Teal', button: 'bg-teal-600 hover:bg-teal-700 text-white', swatch: 'bg-teal-500' },
  cyan: { bg: 'bg-cyan-50/50', border: 'border-cyan-200/60', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-700', icon: 'bg-cyan-100', label: 'Cyan', button: 'bg-cyan-600 hover:bg-cyan-700 text-white', swatch: 'bg-cyan-500' },
};

// ==========================================
// STORAGE KEYS
// ==========================================

export const STORAGE_KEYS = {
  BOARD_STATE: 'kanban-board-state',
} as const;

// ==========================================
// DATE FORMAT
// ==========================================

export const DATE_FORMAT = 'yyyy-MM-dd';

// ==========================================
// DRAG AND DROP IDS
// ==========================================

export const DND_TYPE = {
  TASK: 'task',
  COLUMN: 'column',
} as const;

// ==========================================
// UI CONSTANTS
// ==========================================

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;

// ==========================================
// UI STRINGS
// ==========================================

export const UI_TEXT = {
  GLOBAL: {
    CANCEL: 'Cancel',
    DELETE: 'Delete',
    SAVE: 'Save',
    create: (item: string) => `Create ${item}`,
  },
  COLUMN: {
    DELETE_TITLE: 'Delete Column',
    ADD_TASK: 'Add Task',
    DROP_PLACEHOLDER: 'Drop items here',
    DELETE_CONFIRMATION: (title: string) => `Are you sure you want to delete the column "${title}"?`,
    DELETE_WARNING: 'All tasks in this column will be permanently removed.',
    TITLE_TOOLTIP: 'Double click to edit title',
    NEW_TITLE_PLACEHOLDER: 'e.g. Backlog, Ideas, QA',
    TITLE_LABEL: 'Column Title',
    THEME_LABEL: 'Theme Color',
  },
  TASK: {
    OVERDUE: 'Overdue',
    ASSIGNED_TO_ME: 'Assigned to Me',
    TITLE_LABEL: 'Title',
    TITLE_PLACEHOLDER: 'What needs to be done?',
    DESCRIPTION_LABEL: 'Description',
    DESCRIPTION_PLACEHOLDER: 'Add details...',
    DUE_DATE_LABEL: 'Due Date',
    PRIORITY_LABEL: 'Priority',
    LABELS_LABEL: 'Labels',
    DELETE_TITLE: 'Delete Task',
  },
} as const;
