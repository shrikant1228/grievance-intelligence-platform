"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, AlertTriangle, Clock, CheckCircle2, MoreVertical, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ComplaintDetailPage() {
    const router = useRouter();

    const mockComplaint = {
        id: "CIV-2084",
        title: "Massive pothole on Main Street causing traffic jams",
        description: "The recent heavy rains have washed away a significant portion of the road near the metro station pillar 42. Vehicles are having to swerve dangerously to avoid it.",
        status: "in_progress",
        priority: "High",
        department: "Road Maintenance",
        ward: "Whitefield",
        created_at: "2024-10-24T08:30:00Z",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbnE42A8C_37j2U1o2C9xQ_R81vO4D8R_d5H82qYpV6M4y_L6VnE_D_T7XyO_N5J_F5Q_I2t4y_82D82D_C9Q82Y_F5Q_H82D82D_C9Q82Y_F5Q_H82D82D_C9Q",
    };

    const timelineObj = [
        {
            id: 1,
            status: "submitted",
            label: "Complaint Submitted",
            date: "Oct 24, 08:30 AM",
            comment: "Reported by citizen. AI automatically classified issue as 'Road Maintenance' and set priority to 'High'.",
            officer: null,
            icon: AlertTriangle,
            color: "text-blue-500",
            bg: "bg-blue-100 dark:bg-blue-900/30",
            completed: true,
        },
        {
            id: 2,
            status: "assigned",
            label: "Assigned to Department",
            date: "Oct 24, 09:15 AM",
            comment: "System automatically routed to Whitefield Ward road inspector.",
            officer: "System Auto-Router",
            icon: Clock,
            color: "text-yellow-500",
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            completed: true,
        },
        {
            id: 3,
            status: "in_progress",
            label: "Work Started",
            date: "Oct 25, 02:45 PM",
            comment: "Inspected the site. Scheduling asphalt truck for evening repairs to avoid traffic.",
            officer: "Rajesh K. (Inspector)",
            icon: Clock,
            color: "text-purple-500",
            bg: "bg-purple-100 dark:bg-purple-900/30",
            completed: true,
        },
        {
            id: 4,
            status: "resolved",
            label: "Resolved",
            date: "Pending",
            comment: "Awaiting final proof of resolution.",
            officer: null,
            icon: CheckCircle2,
            color: "text-slate-400 dark:text-slate-600",
            bg: "bg-slate-100 dark:bg-slate-800",
            completed: false,
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* Header Area */}
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        {mockComplaint.id}
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs rounded-full uppercase tracking-wider">
                            {mockComplaint.status.replace('_', ' ')}
                        </span>
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Reported on {new Date(mockComplaint.created_at).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{mockComplaint.title}</h2>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                <AlertTriangle className="w-4 h-4 text-red-500" /> {mockComplaint.priority} Priority
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                <MapPin className="w-4 h-4 text-slate-400" /> {mockComplaint.ward}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span> {mockComplaint.department}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Description</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                                {mockComplaint.description}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-slate-400" /> Evidence Image
                            </h3>
                            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-90"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Transparency Timeline */}
                <div className="lg:col-span-1">
                    <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Resolution Timeline</h2>

                        <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800 before:z-0">
                            {timelineObj.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <div key={idx} className={`relative z-10 ${!step.completed ? 'opacity-50' : ''}`}>
                                        <div className={`absolute -left-10 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 ${step.bg} flex items-center justify-center`}>
                                            <Icon className={`w-3.5 h-3.5 ${step.color}`} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{step.label}</h3>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{step.date}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                                {step.comment}
                                            </p>
                                            {step.officer && (
                                                <div className="text-[10px] font-semibold text-slate-500 flex items-center gap-1.5 mt-1">
                                                    <span className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[8px] text-slate-600 dark:text-slate-300">
                                                        {step.officer.charAt(0)}
                                                    </span>
                                                    {step.officer}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
