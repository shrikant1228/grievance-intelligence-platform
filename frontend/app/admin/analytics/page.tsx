"use client";

import React from "react";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto p-6">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                    <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Overview</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Platform-wide statistics and metrics.</p>
                </div>
            </div>
            
            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <p className="text-slate-600 dark:text-slate-400">Analytics data is currently being populated. Please check back later.</p>
            </div>
        </div>
    );
}
