import { useState, useRef, useEffect } from 'react';
import { useBoard } from './useBoard';
import { UI_TEXT } from '../constants';

export const useBoardSwitcher = () => {
   const { 
    boards, 
    activeBoardId, 
    setActiveBoard, 
    createBoard, 
    deleteBoard,
    activeBoardTitle 
  } = useBoard();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoardTitle.trim()) {
      createBoard(newBoardTitle.trim());
      setNewBoardTitle('');
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm(UI_TEXT.BOARD_SWITCHER.DELETE_BOARD_CONFIRM)) {
      deleteBoard(id);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectBoard = (id: string) => {
      setActiveBoard(id);
      setIsOpen(false);
  };
  const startCreating = () => setIsCreating(true);
  const cancelCreating = () => setIsCreating(false);
  const updateNewBoardTitle = (title: string) => setNewBoardTitle(title);

  return {
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
  };
};
