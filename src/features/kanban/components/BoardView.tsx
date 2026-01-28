import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  defaultDropAnimationSideEffects,
  DropAnimation,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { BoardViewProps } from '@/types';
import { Column } from '@/components/Column';
import { TaskCardInner } from '@/components/TaskCardInner';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: { opacity: '0.5' },
    },
  }),
};

export const BoardView = ({
  tasksByColumn,
  overdueTaskIds,
  activeTask,
  sensors,
  onDragStart,
  onDragEnd,
  onDragCancel,
  onTaskClick,
  onAddTask,
  onUpdateColumn,
  onDeleteColumn,
}: BoardViewProps) => {
  const columnIds = tasksByColumn.map(c => c.column.id);


  return (
    <div className="h-full overflow-hidden flex flex-col">
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-8 h-full items-start scrollbar-hide px-4 sm:px-6 lg:px-8">
          <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-8 h-full items-start">
              {tasksByColumn.map(({ column, tasks }) => (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  color={column.color}
                  tasks={tasks}
                  overdueTaskIds={overdueTaskIds}
                  onTaskClick={onTaskClick}
                  onUpdate={onUpdateColumn}
                  onDelete={onDeleteColumn}
                  onAddTask={onAddTask}
                />
              ))}
            </div>
          </SortableContext>
        </div>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeTask ? (
            <TaskCardInner 
              task={activeTask} 
              isOverdue={overdueTaskIds.has(activeTask.id)}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
