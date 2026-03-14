"use client";

import React from "react";
import { BarChart3, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function PerformancePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Department Performance</h1>
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold">
                    Last 30 Days
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Resolution Rate</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">84%</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Avg Resolution Time</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">48 hrs</p>
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-green-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> 12% faster than last month
                    </p>
                </div>

                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg text-orange-600">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Pending Backlog</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">12 Total</p>
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-orange-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +2 from last week
                    </p>
                </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-bold mb-6">Historical Resolutions</h2>
                <div className="h-64 flex items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                    {/* Mock Bar Chart */}
                    {[30, 45, 20, 60, 80, 50, 65].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors relative group-hover:opacity-90" style={{ height: `${val}%` }}>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs px-2 py-1 rounded transition-opacity">
                                    {val}
                                </span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">Day {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
