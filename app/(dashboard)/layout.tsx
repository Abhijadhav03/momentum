"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ActivityLog } from "@/features/activity/components/ActivityLog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/toast-provider";
import { Activity, X } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, logout, user } = useAuthStore();
    const router = useRouter();
    const { toast, toasts, dismiss } = useToast();
    const [mounted, setMounted] = useState(false);
    const [hasHydrated, setHasHydrated] = useState(false);
    const [isMobileActivityOpen, setIsMobileActivityOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const unsub = useAuthStore.persist.onFinishHydration(() => {
            setHasHydrated(true);
        });
        if (useAuthStore.persist.hasHydrated()) {
            setHasHydrated(true);
        }
        return unsub;
    }, []);

    useEffect(() => {
        if (hasHydrated && !isAuthenticated) {
            router.push("/login");
        }
    }, [hasHydrated, isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        toast({
            title: "Logged out",
            description: "You have been successfully logged out",
            variant: "success",
        });
        router.push('/login');
    };

    if (!mounted || !hasHydrated) return null;
    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-col h-screen bg-neutral-50">
            <header className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-3 sm:px-4 shrink-0">
                <span className="font-medium text-sm sm:text-base">Momentum</span>
                <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-xs sm:text-sm text-neutral-500 hidden sm:inline">Hello { user?.name || 'Intern'} 🖐️</span>
                    <span className="text-xs text-neutral-500 sm:hidden">🖐️ { user?.name || 'Intern'}</span>
                    {/* Mobile Activity Log Toggle */}
                    <button
                        onClick={() => setIsMobileActivityOpen(true)}
                        className="lg:hidden text-xs text-neutral-500 hover:text-neutral-900 px-2 py-1 rounded hover:bg-neutral-100 transition-colors flex items-center gap-1"
                    >
                        <Activity className="h-4 w-4" />
                        <span className="hidden sm:inline">Activity</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-900 px-2 py-1 rounded hover:bg-neutral-100 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-hidden flex flex-col relative">
                    {children}
                </main>
                {/* Desktop Activity Log */}
                <aside className="hidden lg:block">
                    <ActivityLog />
                </aside>
            </div>
            {/* Mobile Activity Log Slide-out */}
            {isMobileActivityOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="lg:hidden fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsMobileActivityOpen(false)}
                    />
                    {/* Slide-out Panel */}
                    <div className="lg:hidden fixed right-0 top-0 bottom-0 w-72 bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4 shrink-0">
                            <span className="font-medium text-sm">Activity</span>
                            <button 
                                onClick={() => setIsMobileActivityOpen(false)}
                                className="p-1 rounded hover:bg-neutral-100 transition-colors"
                            >
                                <X className="h-5 w-5 text-neutral-500" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <ActivityLog mobile />
                        </div>
                    </div>
                </>
            )}
            <Toaster toasts={toasts} dismiss={dismiss} />
        </div>
    );
}
