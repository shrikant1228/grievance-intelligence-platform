"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, AlertCircle, Play, CheckCircle, UploadCloud } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ComplaintDetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams() as any;
    const id = searchParams?.get('id') || "CIV-1032";

    // Mock data fetching based on ID
    const [complaint, setComplaint] = useState({
        id: id,
        text: "Garbage not collected near bus stop for three days causing foul smell.",
        ward: "Whitefield",
        priority: "Medium",
        status: "pending",
        before_image: "https://images.unsplash.com/photo-1595278456673-c15cbeacbca4?q=80&w=600&auto=format&fit=crop",
        lat: 12.9698,
        lng: 77.7499
    });

    const handleStartWork = () => setComplaint({ ...complaint, status: "in_progress" });
    const handleMarkResolved = () => setComplaint({ ...complaint, status: "resolved" });

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Complaint {complaint.id}</h1>
                    <p className="text-sm text-slate-500 capitalize">Status: <strong className="text-slate-700 dark:text-slate-300">{complaint.status.replace('_', ' ')}</strong></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Description</h2>
                        <p className="text-slate-700 dark:text-slate-300">{complaint.text}</p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Ward</p>
                                <p className="font-medium text-slate-900 dark:text-white flex items-center gap-2 mt-1"><MapPin className="w-4 h-4 text-blue-500" /> {complaint.ward}</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Priority</p>
                                <p className="font-medium text-slate-900 dark:text-white flex items-center gap-2 mt-1"><AlertCircle className="w-4 h-4 text-orange-500" /> {complaint.priority}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Location</h2>
                        {/* Map Placeholder */}
                        <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded-lg relative overflow-hidden">
                            <img
                                className="w-full h-full object-cover opacity-80"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Pv02_xXUfVTtVmqYxnEfYkq1iunYkv2V6QuUyxxpOxw2DA7voL0Lf5elxRcWHm1PbhPeBqbVfYfSQgD-gqwEjMlRz1AnIoxLmfp1QKybGWx3Sc0F7YlO0al2pPR6hK02lgieOp9XpA3dYRaR3eu-uKv3BRQ3X-b6g7-sxEGj8FZC-EOXVf2f5JLkpLlA0NijvsJ1WSd7ea0VDoTXr3PDvpmGdKUC9FD-HHBdNXCZombfI7TdZxldqZby0wVcI7JzkRbgVoqv98c"
                                alt="Map view"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-500 text-white p-2 rounded-full border-4 border-white dark:border-slate-900 shadow-lg">
                                    <MapPin className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 font-mono text-center">Lat: {complaint.lat}, Lng: {complaint.lng}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Actions</h2>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleStartWork}
                                disabled={complaint.status !== 'pending'}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                Start Work
                            </button>
                            <Link
                                href={`/department/upload-proof?id=${complaint.id}`}
                                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                style={{ pointerEvents: complaint.status === 'in_progress' ? 'auto' : 'none', opacity: complaint.status === 'in_progress' ? 1 : 0.5 }}
                            >
                                <UploadCloud className="w-4 h-4" />
                                Upload Proof
                            </Link>
                            <button
                                onClick={handleMarkResolved}
                                disabled={complaint.status !== 'in_progress'}
                                className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Mark Resolved
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Reported Evidence</h2>
                        {complaint.before_image ? (
                            <img src={complaint.before_image} alt="Before evidence" className="w-full rounded-lg object-cover h-48" />
                        ) : (
                            <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                                No image provided
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
