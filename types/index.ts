export type Priority = 'Low' | 'Medium' | 'High';

export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    dueDate?: string; 
    tags: string[];
    createdAt: string; 
    status: TaskStatus;
}

export interface Column {
    id: TaskStatus;
    title: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export type ActivityAction = 'created' | 'updated' | 'moved' | 'deleted';

export interface ActivityLog {
    id: string;
    taskId: string;
    taskTitle: string;
    action: ActivityAction;
    details: string; // e.g., "moved to Doing"
    timestamp: string; // ISO date string
}
