"use client"

import { LoginForm } from "@/features/auth/components/LoginForm";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/toast-provider";

export default function Login() {
    const { toasts, dismiss } = useToast();

    return (
        <>
            <LoginForm />
            <Toaster toasts={toasts} dismiss={dismiss} />
        </>
    );
}