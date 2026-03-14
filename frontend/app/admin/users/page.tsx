"use client";

import React, { useState } from "react";
import { UserCog, Ban, KeyRound } from "lucide-react";

export default function UsersPage() {
    const [users] = useState([
        { id: "USR-001", name: "Rahul Sharma", phone: "+91 9876543210", role: "Citizen", complaints: 4, status: "Active" },
        { id: "USR-002", name: "Priya Singh", phone: "+91 9876543211", role: "Department Officer", complaints: 0, status: "Active" },
        { id: "USR-003", name: "Amit Kumar", phone: "+91 9876543212", role: "Citizen", complaints: 12, status: "Warning" },
        { id: "USR-004", name: "Neha Gupta", phone: "+91 9876543213", role: "Citizen", complaints: 0, status: "Suspended" },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg w-64 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl text-sm"
                    />
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-lg transition-colors">
                        Add System User
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Submitted</th>
                                <th className="px-6 py-4">Account Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                                        <p className="text-xs text-slate-500 font-mono">{u.id}</p>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-mono">{u.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${u.role === 'Department Officer' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{u.complaints}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.status === 'Active' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' :
                                                u.status === 'Warning' ? 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' :
                                                    'text-red-600 bg-red-50 dark:bg-red-900/20'
                                            }`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center justify-center gap-2">
                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="View Profile">
                                            <UserCog className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors" title="Assign Role">
                                            <KeyRound className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Suspend User">
                                            <Ban className="w-4 h-4" />
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
