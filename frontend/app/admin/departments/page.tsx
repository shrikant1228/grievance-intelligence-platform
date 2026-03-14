"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DepartmentsPage() {
    const depts = [
        { name: "Sanitation", total: 400, resolved: 320, pending: 80, avgTime: "48h" },
        { name: "Road Maintenance", total: 300, resolved: 150, pending: 150, avgTime: "96h" },
        { name: "Electricity", total: 200, resolved: 180, pending: 20, avgTime: "24h" },
        { name: "Water Supply", total: 278, resolved: 200, pending: 78, avgTime: "72h" },
        { name: "Traffic", total: 189, resolved: 170, pending: 19, avgTime: "12h" },
        { name: "Drainage", total: 239, resolved: 100, pending: 139, avgTime: "120h" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Department Performance Metrics</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {depts.map((d) => (
                    <div key={d.name} className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{d.name}</h2>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-3xl font-black text-purple-600 dark:text-purple-400">{d.total}</p>
                                <p className="text-xs font-semibold text-slate-500 uppercase mt-1">Total Complaints</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-slate-700 dark:text-slate-300">{d.avgTime}</p>
                                <p className="text-xs font-semibold text-slate-500 uppercase mt-1">Avg Res. Time</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                            <div>
                                <p className="text-sm font-semibold text-green-600">{d.resolved} Resolved</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-orange-500">{d.pending} Pending</p>
                            </div>
                        </div>

                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(d.resolved / d.total) * 100}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-96 mt-8">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Resolution Rate Comparison</h2>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={depts} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                        <Bar dataKey="resolved" stackId="a" fill="#10b981" name="Resolved" />
                        <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
