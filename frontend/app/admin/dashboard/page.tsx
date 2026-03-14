"use client";

import React, { useEffect, useState } from "react";
import { ClipboardList, Clock, PlayCircle, CheckCircle, AlertTriangle, Radio } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useRealtimeComplaints } from "../../../hooks/useRealtime";

export default function AdminDashboard() {
    const { lastUpdate } = useRealtimeComplaints();
    const [statsData, setStatsData] = useState({
        total: 0,
        pending: 0,
        in_progress: 0,
        resolved: 0,
        high_priority: 0,
        departmentData: [],
        trendData: []
    });

    useEffect(() => {
        fetch("http://localhost:8000/api/admin/stats")
            .then(res => res.json())
            .then(data => setStatsData(data))
            .catch(err => console.error("Failed to fetch admin stats:", err));
    }, []);

    const stats = [
        { title: "Total Complaints", value: statsData.total, icon: ClipboardList, color: "bg-blue-500" },
        { title: "Pending", value: statsData.pending, icon: Clock, color: "bg-orange-500" },
        { title: "In Progress", value: statsData.in_progress, icon: PlayCircle, color: "bg-purple-500" },
        { title: "Resolved", value: statsData.resolved, icon: CheckCircle, color: "bg-green-500" },
        { title: "High Priority", value: statsData.high_priority, icon: AlertTriangle, color: "bg-red-500" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Overview</h1>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-bold border border-green-200 dark:border-green-800/30">
                        <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Updates
                    </div>
                    <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300">
                        City-wide Data
                    </div>
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
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                                    <span className="text-xs font-bold text-green-500 mb-1">+5%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-96">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Complaints by Department</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statsData.departmentData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
                            <YAxis />
                            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-96">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Complaints Trend (7 Days)</h2>
                    <ResponsiveContainer width="100%" height="80%">
                        <LineChart data={statsData.trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
