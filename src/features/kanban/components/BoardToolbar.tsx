import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { SORT_OPTIONS } from '@/constants/componentConfig';
import type { BoardToolbarProps, SortOption } from '@/types';

export const BoardToolbar = ({
  filterText,
  onFilterChange,
  sortBy,
  onSortChange,
  onAddColumn,
}: BoardToolbarProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };
  return (
    <div className="sticky top-[80px] z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-7xl mx-auto">
        
 
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-full md:w-80">
            <Input
              placeholder="Search tasks, labels..."
              value={filterText}
              onChange={handleFilterChange}
              className="py-1.5"
            />
          </div>
        </div>

   
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48 group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-500 transition-colors z-10">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              options={SORT_OPTIONS}
              className="w-full"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          
          <Button 
            onClick={onAddColumn} 
            variant="black"
            size="sm"
            className="whitespace-nowrap group/btn flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 transform active:scale-[0.98] shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="bg-white/20 rounded-full p-0.5 group-hover/btn:rotate-90 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            Add Column
          </Button>
        </div>
      </div>
    </div>
  );
};
