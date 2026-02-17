"use client"

import { useEffect, useState } from "react";
import { Task, Priority } from "@/types";

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: Task | null;
}

export function TaskForm({ isOpen, onClose, onSubmit, initialData }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("Medium");
    const [dueDate, setDueDate] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description || "");
            setPriority(initialData.priority);
            setDueDate(initialData.dueDate ? initialData.dueDate.split('T')[0] : "");
            setTags(initialData.tags.join(", "));
        } else {
            setTitle("");
            setDescription("");
            setPriority("Medium");
            setDueDate("");
            setTags("");
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formattedData = {
            title,
            description,
            priority,
            dueDate,
            tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        };
        onSubmit(formattedData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white rounded-t-lg">
                    <h2 className="font-medium text-sm sm:text-base">{initialData ? "Edit task" : "New task"}</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 text-xl leading-none p-1">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="text-sm text-neutral-600 block mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            required
                            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded focus:outline-none focus:border-neutral-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-600 block mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add task details..."
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded focus:outline-none focus:border-neutral-400 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm text-neutral-600 block mb-1">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Priority)}
                                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded focus:outline-none focus:border-neutral-400"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-neutral-600 block mb-1">Due date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded focus:outline-none focus:border-neutral-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-neutral-600 block mb-1">Tags</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="bug, frontend (comma separated)"
                            className="w-full px-3 py-2 text-sm border border-neutral-200 rounded focus:outline-none focus:border-neutral-400"
                        />
                    </div>

                    <div className="flex gap-2 pt-2 sticky bottom-0 bg-white pb-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-sm border border-neutral-200 rounded hover:bg-neutral-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 text-sm bg-neutral-900 text-white rounded hover:bg-neutral-700 transition-colors"
                        >
                            {initialData ? "Save" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
