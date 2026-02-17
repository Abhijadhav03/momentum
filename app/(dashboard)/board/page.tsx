"use client"

import { useState, useEffect } from "react";
import { BoardCanvas } from "@/features/board/components/BoardCanvas";
import { Toolbar } from "@/features/board/components/Toolbar";
import { TaskForm } from "@/features/tasks/components/TaskForm";
import { useTaskStore } from "@/store/useTaskStore";
import { useActivityStore } from "@/store/useActivityStore";
import { useToast } from "@/components/ui/toast-provider";
import { Task } from "@/types";

export default function BoardPage() {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

    const { addTask, updateTask, deleteTask } = useTaskStore();
    const { addLog } = useActivityStore();
    const { toast } = useToast();

    useEffect(() => {
        const handleEdit = (e: any) => {
            setEditingTask(e.detail);
            setIsTaskModalOpen(true);
        };
        const handleDelete = (e: any) => {
            setDeletingTaskId(e.detail);
        };

        window.addEventListener("edit-task" as any, handleEdit);
        window.addEventListener("delete-task" as any, handleDelete);
        return () => {
            window.removeEventListener("edit-task" as any, handleEdit);
            window.removeEventListener("delete-task" as any, handleDelete);
        };
    }, []);

    const handleTaskSubmit = (data: any) => {
        if (editingTask) {
            updateTask(editingTask.id, data);
            addLog("updated", editingTask.id, data.title, "Updated");
            toast({
                title: "Task updated",
                description: `"${data.title}" has been updated`,
                variant: "success",
            });
        } else {
            addTask(data);
            addLog("created", "new", data.title, "Created");
            toast({
                title: "Task created",
                description: `"${data.title}" has been created`,
                variant: "success",
            });
        }
        setEditingTask(null);
        setIsTaskModalOpen(false);
    };

    const confirmDelete = () => {
        if (deletingTaskId) {
            const task = useTaskStore.getState().tasks.find(t => t.id === deletingTaskId);
            if (task) {
                addLog("deleted", task.id, task.title, "Deleted");
                deleteTask(task.id);
                toast({
                    title: "Task deleted",
                    description: `"${task.title}" has been deleted`,
                    variant: "success",
                });
            }
            setDeletingTaskId(null);
        }
    };

    return (
        <>
            <Toolbar onAddTask={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
            }} />

            <div className="flex-1 overflow-hidden relative">
                <BoardCanvas />
            </div>

            <TaskForm
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSubmit={handleTaskSubmit}
                initialData={editingTask}
            />

            {deletingTaskId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl w-full max-w-sm mx-4 p-6">
                        <h2 className="text-lg font-semibold mb-2">Delete task?</h2>
                        <p className="text-sm text-neutral-500 mb-6">
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDeletingTaskId(null)}
                                className="flex-1 px-4 py-2 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
// "use client";
// import { useState } from "react";
// import { BoardCanvas } from "@/features/board/components/BoardCanvas";
// import { Toolbar } from "@/features/board/components/Toolbar";
// import { TaskForm } from "@/features/tasks/components/TaskForm";

// export default function BoardPage() {
//     const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

//     return (
//         <>
//             <Toolbar onAddTask={() => setIsTaskFormOpen(true)} />
//             <div className="flex-1 overflow-hidden relative">
//                 <BoardCanvas />
//             </div>
//             <TaskForm
//                 isOpen={isTaskFormOpen}
//                 onClose={() => setIsTaskFormOpen(false)}
//                 onSubmit={() => {}}
//             />
//         </>
//     )
// }


