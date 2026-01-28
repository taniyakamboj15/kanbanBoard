import { useForm } from 'react-hook-form';
import { validationRules } from '../utils/validators';
import { Button } from './Button';
import { Select } from './Select';
import { Input } from './Input';
import { LABEL_OPTIONS, PRIORITY_OPTIONS } from '../constants/componentConfig';
import { UI_TEXT } from '../constants';
import { Priority, type TaskFormData, type TaskFormProps } from '../types';


export const TaskForm = ({
  onSubmit,
  onCancel,
  onDelete,
  defaultValues,
  submitLabel = UI_TEXT.GLOBAL.create('Task'),
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      dueDate: defaultValues?.dueDate ?? '',
      priority: defaultValues?.priority ?? Priority.LOW,
      labels: defaultValues?.labels ?? [],
      columnId: defaultValues?.columnId ?? 'todo',
    },
  });
  

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
  };
  
  const handleCancel = () => {
    onCancel();
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
          {UI_TEXT.TASK.TITLE_LABEL} <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          placeholder={UI_TEXT.TASK.TITLE_PLACEHOLDER}
          {...register('title', validationRules.title)}
          error={errors.title?.message}
        />
      </div>

    
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
          {UI_TEXT.TASK.DESCRIPTION_LABEL}
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder={UI_TEXT.TASK.DESCRIPTION_PLACEHOLDER}
          {...register('description', validationRules.description)}
          className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none text-sm leading-relaxed"
        />
        {errors.description && (
          <p className="mt-1 text-xs font-medium text-red-500 ml-1">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Due Date */}
        <div className="flex flex-col">
          <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
            {UI_TEXT.TASK.DUE_DATE_LABEL}
          </label>
          <input
            id="dueDate"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            {...register('dueDate', validationRules.dueDate)}
            className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-sm [color-scheme:light]"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <Select
            label={UI_TEXT.TASK.PRIORITY_LABEL}
            id="priority"
            {...register('priority')}
            options={PRIORITY_OPTIONS.map(opt => ({
              value: opt,
              label: opt.charAt(0).toUpperCase() + opt.slice(1)
            }))}
          />
        </div>
      </div>
      {/* Labels */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">{UI_TEXT.TASK.LABELS_LABEL}</label>
        <div className="flex flex-wrap gap-2">
          {LABEL_OPTIONS.map((label) => (
            <label key={label} className="relative cursor-pointer group">
              <input type="checkbox" value={label} {...register('labels')} className="peer sr-only" />
              <span className="inline-block px-2.5 py-1.5 rounded-lg text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-600 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all duration-200 select-none hover:bg-slate-100 peer-checked:hover:bg-blue-700 shadow-sm group-active:scale-95">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        {onDelete && (
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-2 border-transparent rounded-xl transition-all shadow-sm active:scale-90"
            title={UI_TEXT.TASK.DELETE_TITLE}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </Button>
        )}
        <div className="flex space-x-3 ml-auto">
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            type="button"
            className="hover:bg-slate-50 text-slate-600 border-slate-200 shadow-sm"
          >
            {UI_TEXT.GLOBAL.CANCEL}
          </Button>
          <Button type="submit" variant="black" className="shadow-lg shadow-slate-900/10">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};
