"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Eye, ArrowRight, CheckCircle } from "lucide-react";

export default function PriorityAlertsPage() {
    const [alerts] = useState([
        { id: "CIV-1033", text: "Overflowing bin on Main Street causing major public health hazard", ward: "Indiranagar", date: "2 Hours ago" },
        { id: "CIV-1034", text: "Dead animal on the road creating massive traffic block", ward: "Koramangala", date: "5 Hours ago" },
    ]);

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 border-b border-red-200 dark:border-red-900/50 pb-4">
                <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-red-600 dark:text-red-500">Priority Alerts</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">High severity issues requiring immediate action.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {alerts.map(alert => (
                    <div key={alert.id} className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-black tracking-widest">{alert.id}</span>
                                <span className="text-xs font-semibold text-slate-500">{alert.date} • {alert.ward}</span>
                            </div>
                            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{alert.text}</p>
                        </div>

                        <Link
                            href={`/department/complaint-detail?id=${alert.id}`}
                            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-300 hover:text-red-600 shadow-sm rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                            Action Required
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ))}

                {alerts.length === 0 && (
                    <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium text-slate-600">No high priority alerts.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
