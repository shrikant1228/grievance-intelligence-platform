"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, MapPin, Search, Home, FileText, Bell, User, AlertTriangle } from "lucide-react";

export default function CitizenDashboard() {
    return (
        <div className="bg-slate-50/50 dark:bg-transparent font-sans text-slate-900 dark:text-slate-100 min-h-screen pb-24">
            <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl min-h-screen flex flex-col shadow-xl">

                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl/80 backdrop-blur-md sticky top-0 z-10">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-[#1a355b] dark:text-blue-400">CivicSense AI</h1>
                        <p className="text-xs text-slate-500 font-medium">Citizen Portal</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-500" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Welcome Banner */}
                    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg space-y-4">
                        <h2 className="text-2xl font-bold">See something broken?</h2>
                        <p className="text-blue-100 text-sm">Help us build a cleaner, safer city by reporting issues around you.</p>
                        <Link href="/citizen/report" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors">
                            <PlusCircle className="w-4 h-4" /> Report an Issue
                        </Link>
                    </section>

                    {/* Quick Access */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/citizen/complaints" className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:border-blue-300 transition-colors">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full">
                                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-semibold text-sm">My Reports</span>
                        </Link>
                        <Link href="/citizen/map" className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:border-blue-300 transition-colors">
                            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-full">
                                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="font-semibold text-sm">City Map</span>
                        </Link>
                    </div>

                    {/* Near You */}
                    <section className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h3 className="text-lg font-bold">Issues Near You</h3>
                            <Link href="/citizen/map" className="text-sm text-blue-600 font-semibold hover:underline">View Map</Link>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-2.5 rounded-lg text-orange-600">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Streetlight not working</h4>
                                <p className="text-xs text-slate-500 mt-1">Koramangala 4th Block • Reported Yesterday</p>
                                <div className="mt-2 text-xs font-semibold text-blue-600 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded inline-block">
                                    In Progress
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-4 py-2 z-20">
                    <Link href="/citizen/dashboard" className="flex flex-col items-center p-2 text-[#1a355b] dark:text-blue-400">
                        <Home className="w-6 h-6 fill-current" />
                        <span className="text-[10px] font-bold mt-1">Home</span>
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
                    <Link href="/citizen/profile" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Profile</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
