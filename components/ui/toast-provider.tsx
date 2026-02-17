"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

export interface Toast {
    id: string
    title: string
    description?: string
    variant?: "default" | "success" | "error" | "warning"
}

interface ToastContextType {
    toast: (toast: Omit<Toast, "id">) => void
    toasts: Toast[]
    dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const toast = useCallback(({ title, description, variant = "default" }: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9)
        const newToast: Toast = { id, title, description, variant }

        setToasts((prev) => [...prev, newToast])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)

        return id
    }, [])

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toast, toasts, dismiss }}>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}
