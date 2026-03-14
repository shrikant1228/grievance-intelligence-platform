import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Brain } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-transparent font-sans flex flex-col">
            <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CivicSense AI</span>
                </div>
                <div className="flex gap-4">
                    <Link href="/auth/login" className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Login</Link>
                    <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">Sign Up</Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-8">
                <div className="space-y-4 max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        Smarter Cities, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Powered by AI.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Report civic issues instantly. Our AI automatically routes your complaints, predicts hotspots, and ensures rapid resolution.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/citizen/report" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-blue-500/20">
                        <MapPin className="w-5 h-5" /> Report an Issue Fast
                    </Link>
                    <Link href="/auth/login" className="px-8 py-4 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm">
                        <ShieldCheck className="w-5 h-5" /> Department Portal
                    </Link>
                </div>
            </main>
        </div>
    );
}
