"use client"

import { useActivityStore } from "@/store/useActivityStore";
import { format } from "date-fns";

export function ActivityLog() {
    const { logs } = useActivityStore();

    return (
        <div className="w-64 border-l border-neutral-200 bg-white h-full flex flex-col">
            <div className="p-3 border-b border-neutral-200 shrink-0">
                <span className="text-sm font-medium">Activity</span>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                    {logs.length === 0 && (
                        <p className="text-xs text-neutral-400 text-center py-4">No activity yet</p>
                    )}
                    {logs.map((log) => (
                        <div key={log.id} className="text-xs p-2 hover:bg-neutral-50 rounded">
                            <span className="font-medium">{log.taskTitle}</span>
                            <span className="text-neutral-500"> {log.action}</span>
                            <span className="text-neutral-400 block text-[10px] mt-1">
                                {format(new Date(log.timestamp), "MMM d, h:mm a")}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
