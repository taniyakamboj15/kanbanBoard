import { Outlet, Link } from 'react-router-dom';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary';
import { ThemeToggle } from '../components/ThemeToggle';


export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] transition-colors duration-300">
        {/* Global Navigation Header using React Router Link */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-gray-200/50 dark:border-slate-800/50 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="bg-primary-600 rounded-lg p-2 shadow-lg shadow-primary-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-none">Kanban Board</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Manage your tasks efficiently</p>
                  </div>
                </Link>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
               <ThemeToggle />
              </div>
              
              {/* Actions could go here, passed via Context or Props if needed globally */}
              {/* For now, buttons are layout-specific, we can use an Outlet context or just render them in the page */}
              {/* But wait, the previous design had the "Add Column" button in the header. */}
              {/* To keep it simple for now, we'll let pages control the header extras via a Portal or just keep it simple. */}
              
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main>
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
};
