"use client"

import { Toast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"

interface ToasterProps {
    toasts: Toast[]
    dismiss: (id: string) => void
}

const variantStyles = {
    default: "bg-white border-neutral-200 text-neutral-900",
    success: "bg-green-50 border-green-200 text-green-900",
    error: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
}

const variantIcons = {
    default: Info,
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
}

export function Toaster({ toasts, dismiss }: ToasterProps) {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => {
                const Icon = variantIcons[toast.variant || "default"]
                return (
                    <div
                        key={toast.id}
                        className={`flex items-start gap-3 min-w-[300px] max-w-[400px] p-4 rounded-lg border shadow-lg transition-all duration-300 ease-out transform translate-x-0 ${variantStyles[toast.variant || "default"]}`}
                        style={{ animation: "slideIn 0.3s ease-out" }}
                    >
                        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="font-medium text-sm">{toast.title}</p>
                            {toast.description && (
                                <p className="text-sm opacity-80 mt-1">{toast.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => dismiss(toast.id)}
                            className="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
