import { useForm } from 'react-hook-form';
import { validationRules } from '../utils/validators';
import { Button } from './Button';
import { COLUMN_COLOR_VARIANTS, UI_TEXT } from '../constants';
import type { ColumnFormProps, ColumnFormData } from '../types';
import { CheckIcon } from '../assets/icons';

export const ColumnForm = ({ onSubmit, onCancel }: ColumnFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ColumnFormData>({
    defaultValues: {
      title: '',
      color: 'slate',
    },
    mode: 'onChange',
  });

  const selectedColor = watch('color');

  const handleFormSubmit = (data: ColumnFormData) => {
    onSubmit(data.title.trim(), data.color);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="column-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
          {UI_TEXT.COLUMN.TITLE_LABEL} <span className="text-red-500">*</span>
        </label>
        <input
          id="column-title"
          type="text"
          placeholder={UI_TEXT.COLUMN.NEW_TITLE_PLACEHOLDER}
          className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-gray-400 font-medium"
          autoFocus
          {...register('title', validationRules.columnTitle)}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
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
              onClick={() => setValue('color', key as keyof typeof COLUMN_COLOR_VARIANTS)}
              className={`group relative w-full aspect-square rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === key ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'
                }`}
              title={theme.label}
            >
              <div className={`w-full h-full rounded-full ${theme.swatch} border border-black/5 mx-auto`} />
              {selectedColor === key && (
                <CheckIcon className="absolute w-4 h-4 text-gray-900" />
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
        <Button type="submit" variant="black" disabled={!isValid}>
          {UI_TEXT.GLOBAL.create('Column')}
        </Button>
      </div>
    </form>
  );
};
