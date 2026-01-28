import { useState, useCallback } from 'react';
import { Button } from './Button';
import { COLUMN_COLOR_VARIANTS, UI_TEXT } from '../constants';
import type { ColumnFormProps } from '../types';

export const ColumnForm = ({ onSubmit, onCancel }: ColumnFormProps) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState<keyof typeof COLUMN_COLOR_VARIANTS>('slate');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), selectedColor);
    }
  }, [title, selectedColor, onSubmit]);
  
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  
  const handleColorSelect = useCallback((color: keyof typeof COLUMN_COLOR_VARIANTS) => {
    setSelectedColor(color);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {UI_TEXT.COLUMN.TITLE_LABEL} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder={UI_TEXT.COLUMN.NEW_TITLE_PLACEHOLDER}
          className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-gray-400 font-medium"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {UI_TEXT.COLUMN.THEME_LABEL}
        </label>
        <div className="grid grid-cols-6 gap-3">
          {Object.entries(COLUMN_COLOR_VARIANTS).map(([key, theme]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleColorSelect(key as keyof typeof COLUMN_COLOR_VARIANTS)}
              className={`group relative w-full aspect-square rounded-full border-2 transition-all flex items-center justify-center ${
                selectedColor === key ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'
              }`}
              title={theme.label}
            >
              <div className={`w-full h-full rounded-full ${theme.swatch} border border-black/5 mx-auto`} />
              {selectedColor === key && (
                <svg className="absolute w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-50">
        <Button 
          variant="outline" 
          onClick={onCancel} 
          type="button"
          className="hover:bg-gray-50 text-gray-600 border-gray-300"
        >
          {UI_TEXT.GLOBAL.CANCEL}
        </Button>
        <Button type="submit" variant="black" disabled={!title.trim()}>
          {UI_TEXT.GLOBAL.create('Column')}
        </Button>
      </div>
    </form>
  );
};
