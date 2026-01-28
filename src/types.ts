// ==========================================
// LABEL TYPES
// ==========================================

export enum LabelType {
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  IMPROVEMENT = 'IMPROVEMENT',
  DOCUMENTATION = 'DOCUMENTATION',
  URGENT = 'URGENT',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

// ==========================================
// CORE DATA MODELS
// ==========================================

export interface Column {
  id: string;
  title: string;
  color?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  labels: LabelType[];
  columnId: string;
}

export interface BoardState {
  columns: Column[];
  tasks: Task[];
}

// ==========================================
// FORM TYPES
// ==========================================

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  labels: LabelType[];
  columnId: string;
}

// ==========================================
// DRAG AND DROP TYPES
// ==========================================

export interface DragEndEvent {
  active: {
    id: string;
  };
  over: {
    id: string;
  } | null;
}

// ==========================================
// MODAL TYPES
// ==========================================

export type ModalMode = 'create' | 'edit' | 'createColumn' | null;

export interface ModalState {
  mode: ModalMode;
  taskId: string | null;
  defaultColumnId?: string;
}

// ==========================================
// VIEW TYPES
// ==========================================

export type ViewMode = 'board' | 'list';

export type SortOption = 'manual' | 'date' | 'priority' | 'title';

// ==========================================
// UTILITY TYPES
// ==========================================

export type ColumnTheme = {
  bg: string;
  border: string;
  text: string;
  badge: string;
  icon: string;
  label: string;
  button: string;
  swatch: string;
};

export type SortComparator = (a: Task, b: Task) => number;

// ==========================================
// COMPONENT PROPS
// ==========================================

// UI Components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'black';
  size?: 'sm' | 'md' | 'lg';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

// Domain Components
export interface ColumnProps {
  id: string;
  title: string;
  color?: string;
  tasks: Task[];
  overdueTaskIds: Set<string>;
  onTaskClick: (taskId: string) => void;
  onUpdate?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
  onAddTask: (columnId: string) => void;
}

export interface ColumnFormProps {
  onSubmit: (title: string, color: string) => void;
  onCancel: () => void;
}

export interface TaskCardProps {
  task: Task;
  isOverdue: boolean;
  onClick: (taskId: string) => void;
}

export interface TaskCardInnerProps {
  task: Task;
  isOverdue: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  isOverlay?: boolean;
}

export interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  onDelete?: () => void;
  defaultValues?: Partial<Task>;
  submitLabel?: string;
}

export interface PriorityBadgeProps {
  priority: Priority;
}

export interface LabelBadgeProps {
  label: LabelType;
}

// ==========================================
// FEATURE COMPONENTS
// ==========================================

export interface BoardViewProps {
  tasksByColumn: { column: Column; tasks: Task[] }[];
  overdueTaskIds: Set<string>;
  activeTask: Task | null;
  sensors: any; // From @dnd-kit/core
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  onDragCancel: () => void;
  onTaskClick: (taskId: string) => void;
  onAddTask: (columnId: string) => void;
  onUpdateColumn: (id: string, title: string) => void;
  onDeleteColumn: (id: string) => void;
}

export interface BoardToolbarProps {
  filterText: string;
  onFilterChange: (text: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onAddColumn: () => void;
}

// ==========================================
// ERROR BOUNDARY TYPES
// ==========================================

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
