import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ActivityLog, ActivityAction } from '@/types';
import { StorageAdapter } from '@/lib/storage'; // Note: Zustand has its own persist middleware, but we'll use a custom storage implementation if needed or standard zustand persist.
import { v4 as uuidv4 } from 'uuid';

interface ActivityState {
    logs: ActivityLog[];
    addLog: (action: ActivityAction, taskId: string, taskTitle: string, details: string) => void;
    clearLogs: () => void;
}

export const useActivityStore = create<ActivityState>()(
    persist(
        (set) => ({
            logs: [],
            addLog: (action, taskId, taskTitle, details) =>
                set((state) => {
                    const newLog: ActivityLog = {
                        id: uuidv4(),
                        timestamp: new Date().toISOString(),
                        taskId,
                        taskTitle,
                        action,
                        details,
                    };
                    // Keep only the last 20 logs
                    return { logs: [newLog, ...state.logs].slice(0, 20) };
                }),
            clearLogs: () => set({ logs: [] }),
        }),
        {
            name: 'activity-storage',
            // We can use Zustand's default local storage, or wrap our StorageAdapter.
            // Zustand's createJSONStorage finds window.localStorage automatically.
        }
    )
);
