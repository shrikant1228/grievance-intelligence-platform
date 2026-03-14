"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Home, PlusCircle, FileText, Bell, User, Settings, LogOut, Loader2 } from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState<{username: string, phone: string} | null>(null);
    const [reportsCount, setReportsCount] = useState(0);
    const [resolvedCount, setResolvedCount] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) return;

                // Fetch User Identity
                const res = await fetch(`http://localhost:8000/api/users/me?user_id=${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setUser({ username: data.username, phone: data.phone });
                }

                // Fetch User Complaints History
                const compRes = await fetch(`http://localhost:8000/api/citizen/my-complaints?user_id=${userId}`);
                if (compRes.ok) {
                    const compData = await compRes.json();
                    const complaints = compData.complaints || [];
                    setReportsCount(complaints.length);
                    setResolvedCount(complaints.filter((c: any) => c.status === "resolved").length);
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="bg-slate-50/50 dark:bg-transparent font-sans text-slate-900 dark:text-slate-100 min-h-screen pb-24">
            <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl min-h-screen flex flex-col shadow-xl">

                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl/80 backdrop-blur-md sticky top-0 z-10">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Citizen Profile</h1>
                    <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                        <Settings className="w-5 h-5" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm text-center">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-800 shadow-lg">
                            <User className="w-10 h-10 text-slate-400" />
                        </div>
                        {user ? (
                            <>
                                <h2 className="text-xl font-bold">{user.username}</h2>
                                <p className="text-sm font-semibold text-slate-500 mb-4">{user.phone}</p>
                            </>
                        ) : (
                            <Loader2 className="w-6 h-6 animate-spin text-blue-500 mb-4" />
                        )}
                        <div className="flex gap-4">
                            <div className="text-center px-4 border-r border-slate-200 dark:border-slate-700">
                                <p className="text-2xl font-black text-blue-600">{reportsCount}</p>
                                <p className="text-xs uppercase font-bold text-slate-500 mt-1">Reports</p>
                            </div>
                            <div className="text-center px-4">
                                <p className="text-2xl font-black text-green-600">{resolvedCount}</p>
                                <p className="text-xs uppercase font-bold text-slate-500 mt-1">Resolved</p>
                            </div>
                        </div>
                    </div>

                    <ul className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
                        <li>
                            <button className="w-full text-left px-4 py-4 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-3">
                                <User className="w-5 h-5 text-slate-400" /> Personal Details
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user_id");
                                    localStorage.removeItem("username");
                                    localStorage.removeItem("userRole");
                                    window.location.href = "/auth/login";
                                }}
                                className="w-full text-left px-4 py-4 font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3">
                                <LogOut className="w-5 h-5 text-red-500" /> Sign Out
                            </button>
                        </li>
                    </ul>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-4 py-2 z-20">
                    <Link href="/citizen/dashboard" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Home</span>
                    </Link>
                    <Link href="/citizen/report" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <PlusCircle className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Report</span>
                    </Link>
                    <Link href="/citizen/complaints" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <FileText className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">History</span>
                    </Link>
                    <Link href="/citizen/notifications" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Alerts</span>
                    </Link>
                    <Link href="/citizen/profile" className="flex flex-col items-center p-2 text-[#1a355b] dark:text-blue-400">
                        <User className="w-6 h-6 fill-current" />
                        <span className="text-[10px] font-bold mt-1">Profile</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
