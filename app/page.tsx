"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
// import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Green Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="flex px-6 py-4 items-center justify-between border-b border-zinc-200/50 backdrop-blur-sm">
        <span className="text-2xl font-semibold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">Momentum</span>
        <button
          onClick={() => router.push("/login")}
          className="text-sm bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors px-4 py-2 rounded-3xl border border-zinc-200/50"
        >
          Sign In
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 mt-16">
        <div className="max-w-md text-center space-y-8">
          <h1 className="text-5xl instrumentSerif font-medium tracking-tight text-neutral-900">
            Organize Your Work, One Task at a Time
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed">Organize Tasks, Track Progress, and Achieve Goals -- Effortlessly</p>
          <button className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors px-4 py-2 rounded-3xl border border-zinc-200/50">Get Started <ArrowRight size={16} /></button>
        </div>

        {/* features */}
    <div className="mt-20 grid grid-cols-3 gap-12 text-center">
       <div className="space-y-2">
                        <CheckCircle2 size={20} className="mx-auto text-neutral-400" />
                        <p className="text-sm text-neutral-600">Drag & drop</p>
                    </div>
                    <div className="space-y-2">
                        <CheckCircle2 size={20} className="mx-auto text-neutral-400" />
                        <p className="text-sm text-neutral-600">Clean interface</p>
                    </div>
                    <div className="space-y-2">
                        <CheckCircle2 size={20} className="mx-auto text-neutral-400" />
                        <p className="text-sm text-neutral-600">Auto-saved</p>
                    </div>
    </div>
      </main>
   
     {/* Footer */}
            <footer className="px-6 py-4 text-center text-xs text-neutral-400 mt-16">
                Momentum — Minimal task management
            </footer>
    </div>
  );
}
