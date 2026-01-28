# Kanban Board - Production-Grade Task Management

A modern, production-ready Kanban board built with React 18, TypeScript, Redux Toolkit, and @dnd-kit. Features drag-and-drop task management with localStorage persistence.

## 🚀 Features

- **Drag & Drop**: Smooth task dragging within and across columns using @dnd-kit
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Dark Mode**: Premium "Deep Dark" theme with system preference detection and persistence
- **Labels**: Color-coded task categorization (Bug, Feature, Improvement, Documentation, Urgent)
- **Deadlines**: Due date tracking with visual overdue indicators
- **Auto-Save**: Optimized 500ms debounced persistence to localStorage
- **Type-Safe**: Strict TypeScript with zero `any` types
- **Production-Ready**: Senior-level architecture suitable for code review

## 📋 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety (strict mode)
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling
- **@dnd-kit** - Drag and drop
- **React Router v7** - Routing
- **Tailwind CSS** - Styling

## 🏗️ Architecture

### Strict Folder Structure

```
src/
├── components/         # Dumb UI components
├── pages/             # Route-level components
├── features/          # Business logic (Kanban)
├── services/          # API abstraction (localStorage)
├── router/            # Route configuration
├── hooks/             # Reusable logic
├── utils/             # Pure functions
├── store/
│   ├── reducers/
│   └── store.ts
├── layout/
├── constants/
├── error-boundary/
├── types.d.ts
├── app.tsx
└── main.tsx
```

### Design Principles

✅ **Components = UI Only** - No business logic  
✅ **Features = Domain Logic** - All business rules  
✅ **Services = API Layer** - Backend-ready abstraction  
✅ **No if/else in JSX** - Object maps and early returns  
✅ **Optimized Hooks** - Minimal use of `useCallback`/`useMemo` (only where performance-critical)  
✅ **Auto-Save Debounce** - 500ms delay to prevent excessive storage writes  
✅ **React Hook Form** - No useState per field  

## 🎯 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Usage

### Adding Tasks

1. Click **"+ Add Task"** button
2. Fill in title (required), description, due date, and labels
3. Task will appear in the "To Do" column

### Editing Tasks

1. Click on any task card
2. Modify fields in the modal
3. Click **"Save Changes"** or **"Delete Task"**

### Drag & Drop

- **Within column**: Drag tasks up/down to reorder
- **Across columns**: Drag tasks between To Do / In Progress / Done
- Changes auto-save to localStorage

### Labels

- **BUG** (Red): Bug fixes
- **FEATURE** (Blue): New features
- **IMPROVEMENT** (Green): Enhancements
- **DOCUMENTATION** (Purple): Documentation
- **URGENT** (Orange): High priority

### Overdue Tasks

Tasks with past due dates show:
- Red left border
- Light red background
- Automatic visual highlighting

## 🔄 State Management

### Redux Store Structure

```typescript
{
  kanban: {
    columns: Column[];
    tasks: Task[];
  }
}
```

### Data Flow

1. UI components dispatch actions
2. Redux reducers update state
3. State changes trigger re-render
4. `useBoard` hook auto-saves to localStorage with 500ms debounce

## 🛠️ Development Guidelines

### Adding New Features

1. **Types**: Add to `types.d.ts`
2. **Constants**: Add to `constants/index.ts`
3. **Redux**: Extend `kanbanSlice.ts`
4. **Components**: Create in `components/`
5. **Features**: Business logic in `features/`

### Code Standards

❌ **Prohibited**:
- `any` types
- Inline functions in JSX
- if/else chains in components
- Magic strings
- Prop drilling

✅ **Required**:
- Strict TypeScript
- Logical grouping of event handlers
- `useMemo` for complex computations only
- Object maps for conditionals
- React Hook Form for forms

## 🚀 Backend Migration Path

The architecture is designed for seamless backend integration:

### Step 1: Replace Storage Service

```typescript
// src/services/api.ts
export const apiService = {
  getTasks: () => fetch('/api/tasks'),
  createTask: (task) => fetch('/api/tasks', { method: 'POST', body: JSON.stringify(task) }),
  // ... other endpoints
};
```

### Step 2: Add TanStack Query

```bash
npm install @tanstack/react-query
```

### Step 3: Update Hooks

```typescript
// src/hooks/useBoard.ts
export const useBoard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: apiService.getTasks,
  });
  // ... rest of implementation
};
```

### Step 4: Add Authentication

- Create `features/auth/`
- Add auth slice to Redux
- Protect routes in `router/index.tsx`

## 📝 Project Structure Details

### Types (`types.d.ts`)

All TypeScript interfaces and enums centralized for consistency.

### Constants (`constants/index.ts`)

Label configs, default columns, storage keys - no magic strings.

### Services (`services/storage.ts`)

Backend-ready abstraction layer. Easy to swap localStorage with API calls.

### Hooks (`hooks/`)

- `useBoard.ts` - Task CRUD operations
- `useOverdueTasks.ts` - Derived state for overdue detection

### Features (`features/kanban/`)

- `KanbanBoard.tsx` - Main orchestrator
- `utils/dragHandlers.ts` - Drag-and-drop logic

## 🐛 Troubleshooting

### TypeScript Errors

```bash
npx tsc --noEmit
```

### Clear LocalStorage

Open DevTools Console:
```javascript
localStorage.clear();
location.reload();
```

### Port Already in Use

Change port in `vite.config.ts`:
```typescript
export default defineConfig({
  server: { port: 3001 },
});
```

## 📄 License

MIT

## 👥 Contributing

This is a demonstration project following strict architectural patterns suitable for:
- Senior frontend interviews
- Production code reviews
- System design discussions
- Team best practices reference

---

**Built with ❤️ following production-grade React + TypeScript best practices**
