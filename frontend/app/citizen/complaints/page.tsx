"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Home, PlusCircle, FileText, Bell, User, ArrowLeft, MoreVertical, Eye, Loader2 } from "lucide-react";

export default function MyComplaintsPage() {
    const [myComplaints, setMyComplaints] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) return;

                const res = await fetch(`http://localhost:8000/api/citizen/my-complaints?user_id=${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setMyComplaints(data.complaints || []);
                }
            } catch (err) {
                console.error("Failed to fetch complaints history", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "resolved": return "text-green-600 bg-green-50";
            case "in_progress": return "text-blue-600 bg-blue-50";
            case "pending": return "text-orange-600 bg-orange-50";
            default: return "text-slate-600 bg-slate-50";
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Recently";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-slate-50/50 dark:bg-transparent font-sans text-slate-900 dark:text-slate-100 min-h-screen pb-24">
            <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl min-h-screen flex flex-col shadow-xl">

                {/* Header */}
                <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl/80 backdrop-blur-md sticky top-0 z-10">
                    <Link href="/citizen/dashboard" className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors mr-2">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">My History</h1>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* List */}
                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : myComplaints.length === 0 ? (
                        <div className="text-center p-8 text-slate-500">
                            No complaints reported yet.
                        </div>
                    ) : (
                        myComplaints.map(c => (
                            <div key={c.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm relative">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getStatusColor(c.status)} dark:bg-opacity-20 capitalize`}>{c.status.replace("_", " ")}</span>
                                    <span className="text-xs font-semibold text-slate-400">{formatDate(c.created_at)}</span>
                                </div>
                                <h3 className="font-bold text-base mb-1 pr-8">{c.complaint_text}</h3>
                                <p className="text-xs text-slate-500 font-mono mb-4">{c.id.slice(-6).toUpperCase()}</p>
                                <Link href={`/citizen/complaint-detail`} className="w-full flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/40 backdrop-blur-xl dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                                    <Eye className="w-4 h-4" /> View Details & Timeline
                                </Link>
                            </div>
                        ))
                    )}
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
                    <Link href="/citizen/complaints" className="flex flex-col items-center p-2 text-[#1a355b] dark:text-blue-400">
                        <FileText className="w-6 h-6 fill-current" />
                        <span className="text-[10px] font-bold mt-1">History</span>
                    </Link>
                    <Link href="/citizen/notifications" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Alerts</span>
                    </Link>
                    <Link href="/citizen/profile" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Profile</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
