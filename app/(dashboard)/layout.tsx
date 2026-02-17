"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ActivityLog } from "@/features/activity/components/ActivityLog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/toast-provider";

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
            <header className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-4 shrink-0">
                <span className="font-medium">Momentum</span>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-500">Hello { user?.name || 'Intern'} 🖐️</span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-neutral-500 hover:text-neutral-900"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-hidden flex flex-col relative">
                    {children}
                </main>
                <aside className="hidden lg:block">
                    <ActivityLog />
                </aside>
            </div>
            <Toaster toasts={toasts} dismiss={dismiss} />
        </div>
    );
}
