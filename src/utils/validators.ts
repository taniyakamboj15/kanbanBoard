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
  columnTitle: {
    required: 'Column title is required',
    minLength: {
      value: 2,
      message: 'Column title must be at least 2 characters',
    },
    maxLength: {
      value: 30,
      message: 'Column title must be less than 30 characters',
    },
    validate: {
      notEmpty: (value: string) => {
        return value.trim().length > 0 || 'Column title cannot be empty or only spaces';
      },
      validCharacters: (value: string) => {
        const regex = /^[a-zA-Z0-9\s\-_]+$/;
        return regex.test(value) || 'Column title can only contain letters, numbers, spaces, hyphens, and underscores';
      },
    },
  },
} as const;
