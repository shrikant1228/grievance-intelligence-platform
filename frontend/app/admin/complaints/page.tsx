"use client";

import React, { useState } from "react";
import { Eye, Edit, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AllComplaintsPage() {
    const [complaints] = useState([
        { id: "CIV-2041", text: "Massive pothole causing accidents", dept: "Road Maintenance", ward: "Whitefield", priority: "High", status: "pending", date: "2023-10-26" },
        { id: "CIV-2042", text: "Streetlights not working in 4th block", dept: "Electricity", ward: "Koramangala", priority: "Medium", status: "in_progress", date: "2023-10-25" },
        { id: "CIV-2043", text: "Sewage overflow near park", dept: "Drainage", ward: "Indiranagar", priority: "High", status: "pending", date: "2023-10-26" },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Complaints Directory</h1>
            </div>

            <div className="flex gap-4 mb-6">
                <select className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl text-sm">
                    <option>All Departments</option>
                    <option>Sanitation</option>
                    <option>Road Maintenance</option>
                </select>
                <select className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl text-sm">
                    <option>All Wards</option>
                    <option>Whitefield</option>
                    <option>Indiranagar</option>
                </select>
                <select className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl text-sm">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <select className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl text-sm">
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Complaint</th>
                                <th className="px-6 py-4">Dept</th>
                                <th className="px-6 py-4">Ward</th>
                                <th className="px-6 py-4">Priority</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Admin Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {complaints.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-semibold text-purple-600 dark:text-purple-400">{c.id}</td>
                                    <td className="px-6 py-4 text-slate-900 dark:text-slate-200 max-w-[200px] truncate" title={c.text}>{c.text}</td>
                                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{c.dept}</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{c.ward}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${c.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                                                c.priority === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                                                    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                            }`}>
                                            {c.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize text-slate-600 dark:text-slate-400 font-medium">
                                            {c.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{c.date}</td>
                                    <td className="px-6 py-4 flex items-center justify-center gap-2">
                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View Details">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors" title="Reassign Department">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Escalate Priority">
                                            <AlertCircle className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
