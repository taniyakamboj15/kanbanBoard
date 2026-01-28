import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from '../constants';

export const validationRules = {
  title: {
    required: 'Title is required',
    maxLength: {
      value: MAX_TITLE_LENGTH,
      message: `Title must be less than ${MAX_TITLE_LENGTH} characters`,
    },
  },
  description: {
    maxLength: {
      value: MAX_DESCRIPTION_LENGTH,
      message: `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`,
    },
  },
  dueDate: {
    validate: (value: string) => {
      if (!value) return true; // Optional field
      const today = new Date().toISOString().split('T')[0] as string;
      return value >= today || 'Date cannot be in the past';
    },
  },
} as const;
