"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MapPin } from "lucide-react";

export default function WardAnalyticsPage() {
    const wardData = [
        { name: "Whitefield", value: 20 },
        { name: "Indiranagar", value: 15 },
        { name: "Marathahalli", value: 10 },
        { name: "Koramangala", value: 8 },
        { name: "BTM Layout", value: 6 },
        { name: "Jayanagar", value: 5 },
    ];

    const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ward Analytics</h1>
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300">
                    City Zones
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Complaints by Ward</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={wardData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                                <Bar dataKey="value" fill="#ec4899" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ward Distribution</h2>
                    <div className="flex-1 flex items-center justify-center h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={wardData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {wardData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Highest Density Areas</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                    {wardData.slice(0, 3).map((ward, i) => (
                        <div key={ward.name} className="p-6 flex items-start gap-4">
                            <div className={`p-3 rounded-full text-white ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase">Rank #{i + 1}</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{ward.name}</p>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">{ward.value} active issues</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
