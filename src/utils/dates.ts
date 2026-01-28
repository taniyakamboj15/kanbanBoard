// ==========================================
// PURE DATE UTILITIES
// ==========================================

export const isOverdue = (dueDate: string | undefined): boolean => {
  if (!dueDate) return false;
  
  const now = new Date();
  const due = new Date(dueDate);
  
  // Reset time to compare only dates
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  return due < now;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
