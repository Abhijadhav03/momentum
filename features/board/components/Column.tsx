"use client"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "@/types";
import { TaskCard } from "@/features/tasks/components/TaskCard";

interface ColumnProps {
    column: ColumnType;
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
}

export function Column({ column, tasks, onEditTask, onDeleteTask }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    return (
        <div className={`flex flex-col h-full rounded-lg border transition-colors ${
            isOver ? "bg-green-50 border-green-300" : "bg-neutral-50 border-neutral-200"
        }`}>
            <div className="p-3 flex items-center justify-between border-b border-neutral-200 shrink-0">
                <span className="text-sm font-medium">{column.title}</span>
                <span className="text-xs text-neutral-400">{tasks.length}</span>
            </div>
            <div ref={setNodeRef} className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto min-h-0">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <div className="h-20 border-2 border-dashed border-neutral-200 rounded flex items-center justify-center text-neutral-300 text-xs">
                        Drop here
                    </div>
                )}
            </div>
        </div>
    );
}
