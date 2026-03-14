"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, PlayCircle, CheckCircle2 } from "lucide-react";

export default function AssignedComplaintsPage() {
    // Mock data for table
    const [complaints, setComplaints] = useState([
        { id: "CIV-1032", text: "Garbage not collected near bus stop", ward: "Whitefield", priority: "Medium", status: "pending", date: "2023-10-25" },
        { id: "CIV-1033", text: "Overflowing bin on Main Street", ward: "Indiranagar", priority: "High", status: "in_progress", date: "2023-10-24" },
        { id: "CIV-1034", text: "Dead animal on the road", ward: "Koramangala", priority: "High", status: "pending", date: "2023-10-26" },
    ]);

    const handleStatusChange = (id: string, newStatus: string) => {
        // Note: Mocking status update. In a real app we'd POST to our backend/Supabase.
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Assigned Complaints</h1>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Complaint ID</th>
                                <th className="px-6 py-4">Complaint Text</th>
                                <th className="px-6 py-4">Ward</th>
                                <th className="px-6 py-4">Priority</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {complaints.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400">{c.id}</td>
                                    <td className="px-6 py-4 text-slate-900 dark:text-slate-200 max-w-xs truncate">{c.text}</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{c.ward}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                c.priority === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
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
                                        <Link href={`/department/complaint-detail?id=${c.id}`} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View Details">
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                        {c.status === 'pending' && (
                                            <button onClick={() => handleStatusChange(c.id, 'in_progress')} className="p-1.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors" title="Start Work">
                                                <PlayCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                        {c.status === 'in_progress' && (
                                            <button onClick={() => handleStatusChange(c.id, 'resolved')} className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Mark Resolved">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {complaints.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No assigned complaints found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
