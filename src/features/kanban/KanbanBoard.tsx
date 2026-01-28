import { lazy, Suspense } from 'react';
import { useKanbanController } from './useKanbanController';
import { BoardToolbar } from './components/BoardToolbar';
import { BoardView } from './components/BoardView';
import { Modal } from '../../components/Modal';

// Lazy load form components as they are only used in modals
const TaskForm = lazy(() => import('../../components/TaskForm').then(m => ({ default: m.TaskForm })));
const ColumnForm = lazy(() => import('../../components/ColumnForm').then(m => ({ default: m.ColumnForm })));

import { FormLoader } from '../../components/Loader';
import { UI_TEXT } from '@/constants';


export const KanbanBoard = () => {
  const {
    modalState,
    sensors,
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
    onDragStart,
    onDragEnd,
    handleDragCancel,
    updateColumn,
    deleteColumn,
  } = useKanbanController();

  return (
    <>
    
      <BoardToolbar
        filterText={filterText}
        onFilterChange={setFilterText}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onAddColumn={handleOpenAddColumnModal}
      />

   
      <main className="max-w-7xl mx-auto h-[calc(100vh-160px)]">
        <BoardView
          tasksByColumn={tasksByColumn}
          overdueTaskIds={overdueTaskIds}
          activeTask={activeTask}
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragCancel={handleDragCancel}
          onTaskClick={handleOpenEditModal}
          onAddTask={handleOpenCreateModal}
          onUpdateColumn={updateColumn}
          onDeleteColumn={deleteColumn}
        />
      </main>

    
      <Modal
        isOpen={modalState.mode === 'create'}
        onClose={handleCloseModal}
        title={UI_TEXT.GLOBAL.create('New Task')}
      >
        <Suspense fallback={<FormLoader />}>
          <TaskForm 
            onSubmit={handleCreateTask} 
            onCancel={handleCloseModal} 
            submitLabel={UI_TEXT.GLOBAL.create('Task')}
            defaultValues={modalState.defaultColumnId ? { columnId: modalState.defaultColumnId } : undefined}
          />
        </Suspense>
      </Modal>

      <Modal
        isOpen={modalState.mode === 'edit'}
        onClose={handleCloseModal}
        title={UI_TEXT.GLOBAL.edit('Task')}
      >
        {editingTask && (
          <Suspense fallback={<FormLoader />}>
            <TaskForm 
              onSubmit={handleUpdateTask} 
              onCancel={handleCloseModal} 
              onDelete={handleDeleteTask}
              defaultValues={editingTask} 
              submitLabel={UI_TEXT.GLOBAL.SAVE_CHANGES} 
            />
            <div className="mt-0" />
          </Suspense>
        )}
      </Modal>

      <Modal
        isOpen={modalState.mode === 'createColumn'}
        onClose={handleCloseModal}
        title={UI_TEXT.GLOBAL.create('New Column')}
      >
        <Suspense fallback={<FormLoader />}>
          <ColumnForm onSubmit={handleCreateColumn} onCancel={handleCloseModal} />
        </Suspense>
      </Modal>
    </>
  );
};
