"use client";

import React from "react";
import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
    return (
        <header className="h-16 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Department: Sanitation
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                </button>
                <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
                    <UserCircle className="w-8 h-8 text-slate-400" />
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Officer John Doe</p>
                        <p className="text-xs text-slate-500">Sanitation Dept</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
