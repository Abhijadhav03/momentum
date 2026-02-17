"use client"
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore"
import { useToast } from "@/components/ui/toast-provider"
import { useState } from "react"

export function LoginForm() {
    const router = useRouter();
    const { login } = useAuthStore();
    const { toast } = useToast();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        await new Promise((resolve) => setTimeout(resolve, 500))

        if (email === "intern@demo.com" && password === "intern123") {
            login(email)
            toast({
                title: "Welcome back!",
                description: "Successfully logged in to Momentum",
                variant: "success",
            })
            setTimeout(() => {
                router.push("/board")
                router.refresh()
            }, 100)
        } else {
            setError("Invalid credentials")
            toast({
                title: "Login failed",
                description: "Invalid email or password",
                variant: "error",
            })
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl text-gray-900">
                        Sign In
                    </h1>
                    <p className="text-sm font-medium text-gray-500">Enter Your Credentials to Sign In</p>
                </div>
                <form onSubmit={onSubmit} className="space-y-6" action="">
                    <div className="space-y-2">
                        <label htmlFor="email"
                        
                        className="text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" 
                        value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="intern@demo.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="password" 
                        value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter your password" required />
                    </div>
                     {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                    <button type="submit" className="w-full px-3 py-2 bg-green-50 border border-green-100 rounded-lg text-sm text-gray-900 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors">
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <p className="text-xs text-center text-gray-500">
                    intern@demo.com / intern123
                </p>
            </div>
        </div>
    );
}
