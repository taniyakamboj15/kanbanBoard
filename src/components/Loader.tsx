
export const ComponentLoader = () => (
  <div className="flex items-center justify-center p-12 w-full h-full min-h-[200px]">
    <div className="relative flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 shadow-sm"></div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">Loading content...</p>
    </div>
  </div>
);


export const FormLoader = () => (
  <div className="h-64 flex flex-col items-center justify-center gap-3 w-full">
    <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin shadow-sm" />
    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preparing Form</span>
  </div>
);
