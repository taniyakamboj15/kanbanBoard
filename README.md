# Kanban Task Management Board: Taniya Kamboj

> A professional, production-ready Trello-like task management board for organizing work using drag-and-drop columns. Built with React 18, TypeScript, and Redux Toolkit.

## 📋 Description

This project is a high-performance, strictly typed Kanban board application designed to streamline task management. It mimics the intuitive interface of Trello while enforcing enterprise-grade engineering standards. The application features a robust drag-and-drop interface, real-time local persistence (now scoped per user), and a highly customizable UI that adapts to user workflow.

## 🎯 Use Cases

- **Agile Teams & Project Managers**: track sprint progress, manage backlogs, and visualize workflows.
- **Personal Productivity**: Organize daily tasks, personal goals, and side projects.
- **Startup Task Tracking**: A lightweight yet powerful tool for simple project management without the bloat.

## ♿ Accessibility

We are committed to inclusivity. This board is fully keyboard and screen-reader accessible:
- **Keyboard Navigation**: Full Tab support for all interactive elements.
- **Focus Management**: Visible focus rings for buttons, cards, and inputs.
- **Accessible Modal**: Focus trapping (via library/custom), ESC to close, and ARIA roles.
- **Keyboard DnD**: Task cards can be moved using Space/Enter to lift and Arrow keys to move.
- **Screen Readers**: ARIA labels on all icon-only buttons and form controls.

## 🚀 Key Features

### 1. Customizable Columns & Cards
- **Dynamic Columns**: Create, rename (Double-click or **Enter**), and delete columns to match your specific workflow.
- **Rich Task Cards**: Tasks include titles, descriptions, priority levels, and visual labels.
- **Modal Editing**: Full CRUD operations for tasks via an accessible, keyboard-friendly modal interface.

### 2. Drag-and-Drop Task Movement
- **Smooth Interaction**: Powered by `@dnd-kit` for high-performance drag operations.
- **Cross-Column Drops**: seamlessly move tasks between columns to update their status.
- **Reorderable**: Drag items within a column to prioritize them.

### 3. Task Deadlines & Labels
- **Due Date Tracking**: Tasks display due dates with automatic visual cues for overdue items (red borders/highlighting).
- **Categorization**: Use color-coded labels (Bug, Feature, Improvement, Urgent) for quick visual scanning.
- **Priority Badges**: Distinct badges for Low, Medium, High, and Urgent priorities.

### 4. Robust Persistence
- **User-Scoped Storage**: Data is saved to `localStorage` keyed by `User ID`, ensuring data isolation between users.
- **Debounced Writes**: Optimized save logic (500ms debounce) prevents performance degradation during rapid updates.
- **State Hydration**: The board instantly restores its previous state upon reloading the page or logging in.

### 5. Multi-Board & Authentication (Simulated)
- **User Authentication**: Support for Login, Logout, and Guest Mode.
- **Multiple Boards**: Users can create, switch between, and manage multiple boards.
- **Isolation**: Each user sees only their own set of boards and tasks.

*Note: Authentication is currently simulated via LocalStorage. In a production environment with a backend, we would implement JWT Access Tokens with HTTP-Only Refresh Tokens for security.*

---

## 💻 Technical Highlights

This project was built with a strict focus on code quality and maintainability:

- **Strict TypeScript**: 100% type safety with **Zero `any`** types allowed.
- **Performance Optimized**: Usage of `React.memo` and strictly managed re-renders.
- **Clean Architecture**: Separation of concerns between UI (Components), Logic (Hooks/Features), and State (Redux).
- **Code Hygiene**: No `console.log` artifacts, unused imports, or magic strings.
- **Dark Mode**: Fully implementing "Deep Dark" mode using Tailwind CSS.

## 🛠️ Setup & Installation

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js**: Version 18 or higher recommended.
- **npm**: Version 9 or higher.

### Step 1: Clone the Repository
```bash
git clone https://github.com/taniyakamboj15/kanbanBoard.git
cd board
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### Step 4: Build for Production
To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory, ready for deployment.

---

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── Button.tsx     # Standardized button component
│   ├── Modal.tsx      # accessible modal dialogs
│   └── Input.tsx      # Form controls
├── features/          # Feature-based modules
│   └── kanban/        # Kanban domain logic
│       ├── KanbanBoard.tsx       # Main board controller
│       └── useKanbanController.ts # Logic hook
├── hooks/             # Custom React hooks
│   ├── useBoard.ts         # Board state operations
│   ├── useAuthManager.ts   # Authentication logic
│   └── useBoardSwitcher.ts # Board handling logic
├── store/             # Global State (Redux)
│   ├── boardSlice.ts  # Multi-board state reducers
│   └── authSlice.ts   # Authentication state
├── services/          # External Integrations
│   └── storage.ts     # LocalStorage abstraction layer (User-scoped)
├── types.ts           # Shared TypeScript interfaces
├── constants/         # Configuration & static text
└── layouts/           # Page layouts (RootLayout)
```

## 🛡️ License

This project is available for use under the MIT License.
