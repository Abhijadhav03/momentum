import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Column, Priority, TaskStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface TaskState {
    tasks: Task[];
    columns: Column[];
    searchQuery: string;
    filterPriority: Priority | 'All';
    sortBy: 'date' | 'none'; // Basic sort for now

    // Actions
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'> & { status?: TaskStatus }) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    moveTask: (taskId: string, newStatus: TaskStatus) => void;
    setSearchQuery: (query: string) => void;
    setFilterPriority: (priority: Priority | 'All') => void;
    setSortBy: (sort: 'date' | 'none') => void;
    resetBoard: () => void;
}

const initialColumns: Column[] = [
    { id: 'todo', title: 'Todo' },
    { id: 'doing', title: 'Doing' },
    { id: 'done', title: 'Done' },
];

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            columns: initialColumns,
            searchQuery: '',
            filterPriority: 'All',
            sortBy: 'none',

            addTask: (taskData) =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        {
                            ...taskData,
                            id: uuidv4(),
                            status: taskData.status || 'todo',
                            createdAt: new Date().toISOString(),
                        },
                    ],
                })),

            updateTask: (id, updates) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
                })),

            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),

            moveTask: (taskId, newStatus) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === taskId ? { ...t, status: newStatus } : t
                    ),
                })),

            setSearchQuery: (query) => set({ searchQuery: query }),
            setFilterPriority: (priority) => set({ filterPriority: priority }),
            setSortBy: (sort) => set({ sortBy: sort }),

            resetBoard: () => set({ tasks: [], searchQuery: '', filterPriority: 'All', sortBy: 'none' }),
        }),
        {
            name: 'task-storage',
        }
    )
);
