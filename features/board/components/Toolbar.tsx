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
        <div className="flex flex-col gap-3 p-4 border-neutral-200 border-b border-solid bg-white">
            <div className="flex items-center justify-between">



                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder=" 🔍Search..."
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-70 rounded-md border border-solid border-neutral-300 px-3 py-2 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-green-500 focus:bg-green-50 focus:outline-none transition-colors"
                    />
                   
                    <Select 
                        value={filterPriority}
                        onValueChange={(e) => setFilterPriority(e as any)}
                    >
                        <SelectTrigger className="h-9 w-32 rounded-md border border-solid border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 focus:border-green-500 focus:bg-green-50 focus:outline-none transition-colors cursor-pointer hover:border-neutral-400">
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
                        <SelectTrigger className="h-9 w-32 rounded-md border border-solid border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 focus:border-green-500 focus:bg-green-50 focus:outline-none transition-colors cursor-pointer hover:border-neutral-400">
                            <div className="flex items-center gap-2">
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
                <div className="flex gap-2">
                    <button className="flex items-center rounded-md border border-solid border-neutral-300 bg-green-500/20 px-2 py-1 text-sm text-neutral-500 hover:bg-green-500/30"><RotateCcw className="mr-1 h-4 w-4" onClick={() => {
                         if (confirm("Clear all tasks?")) {
                                resetBoard();
                                toast({
                                    title: "Board reset",
                                    description: "All tasks have been cleared",
                                    variant: "warning",
                                });
                            }
                    }} /> Reset</button>

                    <button
                     onClick={onAddTask}
                    className="flex items-center rounded-md border border-solid border-neutral-300 bg-green-500/20 px-2 py-1 text-sm text-neutral-500 hover:bg-green-500/30"><Plus className="mr-1 h-4 w-4" /> Add New Task</button>
                </div>
            </div>
             <div className="flex gap-2">
                <span className="text-sm text-neutral-500">Tasks</span>
                <span className="text-sm text-neutral-500">{tasks.length}</span>
             </div>
           </div>
    )
}
