
"use client"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, Priority } from "@/types";
import { format } from "date-fns";

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

const priorityStyles: Record<Priority, string> = {
    Low: "bg-blue-100 text-blue-700 border-blue-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    High: "bg-red-100 text-red-700 border-red-200",
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-lg h-24 w-full"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group bg-white rounded-lg border border-neutral-200 p-3 hover:shadow-sm transition-shadow cursor-default"
        >
            <div className="flex items-start gap-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-neutral-300 hover:text-neutral-500 mt-0.5"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <circle cx="2" cy="2" r="1.5" />
                        <circle cx="2" cy="6" r="1.5" />
                        <circle cx="2" cy="10" r="1.5" />
                        <circle cx="10" cy="2" r="1.5" />
                        <circle cx="10" cy="6" r="1.5" />
                        <circle cx="10" cy="10" r="1.5" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium truncate">{task.title}</span>
                        <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded border ${priorityStyles[task.priority]}`}>
                            {task.priority}
                        </span>
                    </div>
                    {task.description && (
                        <p className="text-xs text-neutral-500 line-clamp-2 mb-2">
                            {task.description}
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                            {task.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="text-[10px] text-neutral-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            {task.dueDate && (
                                <span className="text-[10px] text-neutral-400">
                                    {format(new Date(task.dueDate), "MMM d")}
                                </span>
                            )}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="text-[10px] text-neutral-400 hover:text-neutral-900"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="text-[10px] text-neutral-400 hover:text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
