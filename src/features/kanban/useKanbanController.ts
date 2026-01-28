import { useState, useCallback, useMemo } from 'react';
import { 
  useSensor, 
  useSensors, 
  PointerSensor, 
  KeyboardSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useBoard } from '../../hooks/useBoard';
import { useOverdueTasks } from '../../hooks/useOverdueTasks';
import { handleDragEnd } from './utils/dragHandlers';
import { Task, TaskFormData, ModalState, SortOption } from '../../types';
import { SORT_COMPARATORS } from '../../constants/componentConfig';

const INITIAL_MODAL_STATE: ModalState = {
  mode: null,
  taskId: null,
};

export const useKanbanController = () => {
  const [modalState, setModalState] = useState<ModalState>(INITIAL_MODAL_STATE);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const { 
    boardState, 
    addTask, 
    updateTask, 
    deleteTask, 
    moveTask, 
    addColumn, 
    updateColumn, 
    deleteColumn,
    reorderColumns
  } = useBoard();
  
  const overdueTaskIds = useOverdueTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleOpenCreateModal = (columnId?: string) => {
    setModalState({ 
      mode: 'create', 
      taskId: null,
      defaultColumnId: columnId 
    });
  };

  const handleOpenEditModal = (taskId: string) => {
    setModalState({ mode: 'edit', taskId });
  };

  const handleCloseModal = () => {
    setModalState(INITIAL_MODAL_STATE);
  };

  const handleOpenAddColumnModal = () => {
    setModalState({ mode: 'createColumn', taskId: null });
  };

  // --- CRUD Operations ---
  const handleCreateColumn = (title: string, color: string) => {
    addColumn(title, color);
    handleCloseModal();
  };

  const handleCreateTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      labels: data.labels,
      columnId: data.columnId,
    };
    addTask(newTask);
    handleCloseModal();
  };

  const handleUpdateTask = (data: TaskFormData) => {
    if (!modalState.taskId) return;
    const existingTask = boardState.tasks.find((t) => t.id === modalState.taskId);
    if (!existingTask) return;
    
    updateTask({
      ...existingTask,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      labels: data.labels,
    });
    handleCloseModal();
  };

  const handleDeleteTask = () => {
    if (!modalState.taskId) return;
    setModalState(prev => ({ ...prev, mode: 'deleteTask' }));
  };

  const confirmDeleteTask = () => {
    if (!modalState.taskId) return;
    deleteTask(modalState.taskId);
    handleCloseModal();
  };

  // --- Drag & Drop ---
  const onDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const result = handleDragEnd(event, boardState.tasks, boardState.columns);
    setActiveId(null);

    if (!result) return;
    
    if (result.type === 'TASK') {
      moveTask(result.taskId, result.targetColumnId, result.newIndex);
      return;
    } 
    
    if (result.type === 'COLUMN') {
      reorderColumns(result.activeId, result.overId);
    }
  }, [boardState.tasks, boardState.columns, moveTask, reorderColumns]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);


  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('manual');

  const editingTask = modalState.taskId ? boardState.tasks.find((t) => t.id === modalState.taskId) : undefined;


  const processedTasks = useMemo(() => {
    let processed = [...boardState.tasks];

    const searchString = filterText.trim().toLowerCase();
    if (searchString) {
      processed = processed.filter(t => 
        t.title?.toLowerCase().includes(searchString) || 
        t.description?.toLowerCase().includes(searchString) ||
        t.priority?.toLowerCase().includes(searchString) ||
        t.labels?.some(l => l?.toLowerCase().includes(searchString))
      );
    }

    const comparator = SORT_COMPARATORS[sortBy] ?? SORT_COMPARATORS.manual;
    return processed.sort(comparator);
  }, [boardState.tasks, filterText, sortBy]);

  const tasksByColumn = useMemo(
    () => boardState.columns.map((column) => ({
      column,
      tasks: processedTasks.filter((task) => task.columnId === column.id),
    })),
    [boardState.columns, processedTasks]
  );

  const activeTask = activeId ? (boardState.tasks.find((t) => t.id === activeId) ?? null) : null;

  return {
    modalState,
    boardState,
    sensors,
    activeId,
    overdueTaskIds,
    editingTask,
    tasksByColumn,
    activeTask,
    // View State
    filterText,
    setFilterText,
    sortBy,
    setSortBy,
    // Actions
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleOpenAddColumnModal,
    handleCreateColumn,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    confirmDeleteTask,
    onDragStart,
    onDragEnd,
    handleDragCancel,
    // Direct Access (if needed)
    updateColumn,
    deleteColumn,
  };
};
