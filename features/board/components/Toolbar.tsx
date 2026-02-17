"use client"
import FilterIcon from "@/components/ui/filter-icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTaskStore } from "@/store/useTaskStore";
import { useToast } from "@/components/ui/toast-provider";
import { Plus, RotateCcw } from 'lucide-react';


interface ToolbarProps {
    onAddTask: () => void;
}
export function Toolbar({ onAddTask }: ToolbarProps) {

      const { searchQuery, setSearchQuery, filterPriority, setFilterPriority, sortBy, setSortBy, resetBoard, tasks } = useTaskStore();
      const { toast } = useToast();
       console.log(tasks);
       console.log(filterPriority);
       
       
    return (
        <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 border-neutral-200 border-b border-solid bg-white">
            {/* Mobile: Stack vertically, Desktop: Side by side */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Search and filters */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <input
                        type="text"
                        placeholder="🔍 Search..."
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 sm:w-48 lg:w-70 min-w-0 rounded-md border border-solid border-neutral-300 px-3 py-2 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-green-500 focus:bg-green-50 focus:outline-none transition-colors"
                    />
                   
                    <Select 
                        value={filterPriority}
                        onValueChange={(e) => setFilterPriority(e as any)}
                    >
                        <SelectTrigger className="h-9 w-24 sm:w-32 rounded-md border border-solid border-neutral-300 bg-white px-2 sm:px-3 py-1.5 text-sm text-neutral-700 focus:border-green-500 focus:bg-green-50 focus:outline-none transition-colors cursor-pointer hover:border-neutral-400">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select 
                        value={sortBy}
                        onValueChange={(e) => setSortBy(e as any)}
                    >
                        <SelectTrigger className="h-9 w-24 sm:w-32 rounded-md border border-solid border-neutral-300 bg-white px-2 sm:px-3 py-1.5 text-sm text-neutral-700 focus:border-green-500 focus:bg-green-50 focus:outline-none transition-colors cursor-pointer hover:border-neutral-400">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <FilterIcon className="h-4 w-4" />
                                <SelectValue placeholder="Sort" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2 shrink-0">
                    <button 
                        className="flex items-center justify-center rounded-md border border-solid border-neutral-300 bg-green-500/20 px-2 py-1.5 text-xs sm:text-sm text-neutral-500 hover:bg-green-500/30 transition-colors"
                        onClick={() => {
                            if (confirm("Clear all tasks?")) {
                                resetBoard();
                                toast({
                                    title: "Board reset",
                                    description: "All tasks have been cleared",
                                    variant: "warning",
                                });
                            }
                        }}
                    >
                        <RotateCcw className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
                        <span className="hidden sm:inline">Reset</span>
                    </button>

                    <button
                        onClick={onAddTask}
                        className="flex items-center justify-center rounded-md border border-solid border-neutral-300 bg-green-500/20 px-2 py-1.5 text-xs sm:text-sm text-neutral-500 hover:bg-green-500/30 transition-colors"
                    >
                        <Plus className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
                        <span className="hidden sm:inline">Add New Task</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </div>
            </div>
            {/* Task count */}
            <div className="flex gap-2 text-xs sm:text-sm">
                <span className="text-neutral-500">Tasks</span>
                <span className="text-neutral-500">{tasks.length}</span>
            </div>
        </div>
    )
}
