import { useBoardSwitcher } from '../hooks/useBoardSwitcher';
import { Button } from './Button';
import { Input } from './Input';
import { UI_TEXT } from '../constants';
import { ChevronDownIcon, TrashIcon, PlusIcon } from '../assets/icons';

export const BoardSwitcher = () => {
  const {
    boards,
    activeBoardId,
    activeBoardTitle,
    isOpen,
    isCreating,
    newBoardTitle,
    dropdownRef,
    handleCreate,
    handleDelete,
    toggleDropdown,
    selectBoard,
    startCreating,
    cancelCreating,
    updateNewBoardTitle
  } = useBoardSwitcher();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          {activeBoardTitle || UI_TEXT.BOARD_SWITCHER.SELECT_BOARD}
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">

          <div className="p-2 max-h-64 overflow-y-auto">
            {boards.map((board) => (
              <div
                key={board.id}
                onClick={() => selectBoard(board.id)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer group ${board.id === activeBoardId
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                    : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                <div className="truncate font-medium">{board.title}</div>
                {boards.length > 1 && (
                  <button
                    onClick={(e) => handleDelete(e, board.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500 transition-all"
                    title={UI_TEXT.BOARD_SWITCHER.DELETE_BOARD_TOOLTIP}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50">
            {isCreating ? (
              <form onSubmit={handleCreate} className="flex flex-col gap-2">
                <Input
                  value={newBoardTitle}
                  onChange={(e) => updateNewBoardTitle(e.target.value)}
                  placeholder={UI_TEXT.BOARD_SWITCHER.CREATE_BOARD_PLACEHOLDER}
                  autoFocus
                  className="h-8 text-sm"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={cancelCreating}
                    className="py-1 h-7 text-xs"
                  >
                    {UI_TEXT.GLOBAL.CANCEL}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={!newBoardTitle.trim()}
                    className="py-1 h-7 text-xs"
                  >
                    {UI_TEXT.BOARD_SWITCHER.CREATE}
                  </Button>
                </div>
              </form>
            ) : (
              <button
                onClick={startCreating}
                className="flex items-center gap-2 w-full p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-lg transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                {UI_TEXT.BOARD_SWITCHER.CREATE_BOARD}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
