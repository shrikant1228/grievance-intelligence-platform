"use client";

import React from "react";
import { Bell, Shield } from "lucide-react";

export default function AdminNavbar() {
    return (
        <header className="h-16 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 w-full shadow-sm">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">City Authority Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full border border-white dark:border-slate-900"></span>
                </button>
                <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
                    <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">System Admin</p>
                        <p className="text-xs text-slate-500">Superuser</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
