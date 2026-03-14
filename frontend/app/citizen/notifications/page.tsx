"use client";

import React from "react";
import Link from "next/link";
import { Home, PlusCircle, FileText, Bell, User, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export default function NotificationsPage() {
    const alerts = [
        { id: 1, text: "Your complaint 'Massive pothole' has been updated to IN PROGRESS.", date: "2 hours ago", icon: CheckCircle2, color: "text-green-500 bg-green-100" },
        { id: 2, text: "A new issue 'Broken Streetlight' was reported near your location.", date: "Yesterday", icon: AlertTriangle, color: "text-orange-500 bg-orange-100" },
        { id: 3, text: "Welcome to CivicSense AI! Start by reporting your first civic issue.", date: "3 days ago", icon: Info, color: "text-blue-500 bg-blue-100" }
    ];

    return (
        <div className="bg-slate-50/50 dark:bg-transparent font-sans text-slate-900 dark:text-slate-100 min-h-screen pb-24">
            <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl min-h-screen flex flex-col shadow-xl">

                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl/80 backdrop-blur-md sticky top-0 z-10">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Notifications</h1>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-3">
                    {/* Alerts */}
                    {alerts.map(a => {
                        const Icon = a.icon;
                        return (
                            <div key={a.id} className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm flex items-start gap-4">
                                <div className={`${a.color} p-2.5 rounded-full shrink-0 dark:bg-opacity-20`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">{a.text}</p>
                                    <p className="text-xs text-slate-500 font-semibold mt-1">{a.date}</p>
                                </div>
                            </div>
                        )
                    })}
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
                    <Link href="/citizen/notifications" className="flex flex-col items-center p-2 text-[#1a355b] dark:text-blue-400">
                        <Bell className="w-6 h-6 fill-current" />
                        <span className="text-[10px] font-bold mt-1">Alerts</span>
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
