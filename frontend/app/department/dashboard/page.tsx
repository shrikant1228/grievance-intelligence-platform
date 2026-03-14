"use client";

import React from "react";
import { ClipboardList, AlertTriangle, CheckCircle, Clock, Radio } from "lucide-react";
import { useRealtimeComplaints } from "../../../hooks/useRealtime";

export default function DepartmentDashboard() {
    const { lastUpdate } = useRealtimeComplaints();

    // In a real app, these would be fetched from Supabase
    const stats = [
        { title: "Total Complaints", value: 45, icon: ClipboardList, color: "bg-blue-500" },
        { title: "Pending", value: 12, icon: Clock, color: "bg-orange-500" },
        { title: "In Progress", value: 8, icon: Clock, color: "bg-blue-400" },
        { title: "Resolved", value: 25, icon: CheckCircle, color: "bg-green-500" },
        { title: "High Priority", value: 5, icon: AlertTriangle, color: "bg-red-500" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-bold border border-green-200 dark:border-green-800/30">
                        <Radio className="w-3.5 h-3.5 animate-pulse" /> Live
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">Sanitation Department</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                            <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
                <p className="text-sm text-slate-500">Activity logs will appear here...</p>
            </div>
        </div>
    );
}
