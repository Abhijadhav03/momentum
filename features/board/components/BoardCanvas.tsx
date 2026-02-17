"use client"

import { useState, useMemo, useEffect } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useTaskStore } from "@/store/useTaskStore";
import { useActivityStore } from "@/store/useActivityStore"; // Import Activity Store
import { Column } from "@/features/board/components/Column";
import { TaskCard } from "@/features/tasks/components/TaskCard";
import { Task, TaskStatus } from "@/types";
import { createPortal } from "react-dom";

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.5",
            },
        },
    }),
};

export function BoardCanvas() {
    const { tasks, columns, searchQuery, filterPriority, sortBy, moveTask, updateTask } = useTaskStore();
    const { addLog } = useActivityStore(); // Use Activity Store
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [mounted, setMounted] = useState(false);

      // Filter and Sort Logic
    const filteredTasks = useMemo(() => {
        let result = tasks;

        // Search
        if (searchQuery) {
            result = result.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Filter
        if (filterPriority !== 'All') {
            result = result.filter(t => t.priority === filterPriority);
        }

        // Sort
        if (sortBy === 'date') {
            result = [...result].sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            });
        }

        return result;
    }, [tasks, searchQuery, filterPriority, sortBy]);

    const tasksByColumn = useMemo(() => {
        const map: Record<TaskStatus, Task[]> = { todo: [], doing: [], done: [] };
        filteredTasks.forEach(task => {
            if (map[task.status]) {
                map[task.status].push(task);
            }
        });
        return map;
    }, [filteredTasks]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Require 5px movement to start drag (prevents accidental clicks)
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task as Task);
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";
        const isOverColumn = over.data.current?.type === "Column";

        if (!isActiveTask) return;

        // Moving task over another task in a different column
        if (isActiveTask && isOverTask) {
            const activeTask = active.data.current?.task as Task;
            const overTask = over.data.current?.task as Task;

            if (activeTask.status !== overTask.status) {
                // This is visual only, actual state update happens onDragEnd usually, 
                // but for smooth sortable we might need optimistic updates. 
                // However, simple status change on drag end is safer for this scope.
                // We will handle the actual move in onDragEnd.
            }
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveTask(null);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTask = active.data.current?.task as Task;

        // Dropped over a column
        if (over.data.current?.type === "Column") {
            const columnId = over.id as TaskStatus;
            if (activeTask.status !== columnId) {
                moveTask(activeId, columnId);
                addLog("moved", activeTask.id, activeTask.title, `to ${columnId}`); // Log activity
            }
            return;
        }

        // Dropped over another task
        if (over.data.current?.type === "Task") {
            const overTask = over.data.current?.task as Task;

            // Different column
            if (activeTask.status !== overTask.status) {
                moveTask(activeId, overTask.status);
                addLog("moved", activeTask.id, activeTask.title, `to ${overTask.status}`); // Log activity
            }
            // Same column reordering (Visual only for now since we don't persist order index)
            else {
                // If we had an order field, we would update it here.
            }
        }
    }

    // Placeholder handlers for task actions
    // In a real app we'd open the modal. passed down from parent page usually.
    const handleEditTask = (task: Task) => {
        // Triggered via custom event or context if not passed as prop.
        // For simplicity, we will emit a custom window event or use a store action to open modal
        // But cleaner is to accept props. We'll leave this to be wired in the page.
        window.dispatchEvent(new CustomEvent("edit-task", { detail: task }));
    };

    const handleDeleteTask = (taskId: string) => {
        // confirm delete
        window.dispatchEvent(new CustomEvent("delete-task", { detail: taskId }));
    };
 return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            {/* Mobile: Horizontal scroll with fixed width columns, Desktop: Grid */}
            <div className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 h-full p-3 sm:p-4 overflow-x-auto sm:overflow-hidden pb-4 sm:pb-0">
                {columns.map((col) => (
                    <div key={col.id} className="w-[85vw] sm:w-auto flex-shrink-0 sm:flex-shrink">
                        <Column
                            column={col}
                            tasks={tasksByColumn[col.id]}
                            onEditTask={handleEditTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    </div>
                ))}
            </div>

            {mounted && createPortal(
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeTask && (
                        <TaskCard
                            task={activeTask}
                            onEdit={() => { }}
                            onDelete={() => { }}
                        />
                    )}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}
