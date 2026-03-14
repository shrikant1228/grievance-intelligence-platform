"use client";

import React from "react";
import Link from "next/link";
import { Map, ChevronRight } from "lucide-react";

export default function WardViewPage() {
    const wards = [
        { name: "Whitefield", count: 12, urgent: 3 },
        { name: "Indiranagar", count: 8, urgent: 5 },
        { name: "Marathahalli", count: 6, urgent: 1 },
        { name: "Koramangala", count: 4, urgent: 0 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ward View</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wards.map((ward) => (
                    <Link
                        key={ward.name}
                        href={`/department/assigned?ward=${ward.name.toLowerCase()}`}
                        className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group cursor-pointer flex flex-col justify-between h-40"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                    <Map className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{ward.name}</h2>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </div>

                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">{ward.count}</p>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Complaints</p>
                            </div>
                            {ward.urgent > 0 && (
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                    {ward.urgent} High Priority
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
