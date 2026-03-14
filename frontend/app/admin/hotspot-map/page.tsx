"use client";

import React, { useState, useEffect } from "react";
import { Map as MapIcon, Layers, Filter, Loader2 } from "lucide-react";

export default function HotspotMapPage() {
    const [hotspots, setHotspots] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchHotspots() {
            try {
                const response = await fetch('http://localhost:8000/api/ai/hotspots');
                if (response.ok) {
                    const data = await response.json();
                    setHotspots(data.hotspots);
                }
            } catch (error) {
                console.error("Failed to fetch hotspots:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchHotspots();
    }, []);

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hotspot Intelligence Map</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                        <Filter className="w-4 h-4" /> Filter Wards
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
                        <Layers className="w-4 h-4" /> Heatmap Layer
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col">
                {/* Legend overlay */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl/90 backdrop-blur border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-lg z-10 w-48 space-y-3">
                    <h3 className="text-sm font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Priority Legend</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            <span className="text-xs font-semibold">High Priority</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                            <span className="text-xs font-semibold">Medium Priority</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-xs font-semibold">Low Priority</span>
                        </div>
                    </div>
                </div>

                {/* Map placeholder */}
                <div className="w-full h-full relative">
                    <img
                        className="w-full h-full object-cover opacity-90"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Pv02_xXUfVTtVmqYxnEfYkq1iunYkv2V6QuUyxxpOxw2DA7voL0Lf5elxRcWHm1PbhPeBqbVfYfSQgD-gqwEjMlRz1AnIoxLmfp1QKybGWx3Sc0F7YlO0al2pPR6hK02lgieOp9XpA3dYRaR3eu-uKv3BRQ3X-b6g7-sxEGj8FZC-EOXVf2f5JLkpLlA0NijvsJ1WSd7ea0VDoTXr3PDvpmGdKUC9FD-HHBdNXCZombfI7TdZxldqZby0wVcI7JzkRbgVoqv98c"
                        alt="City Hotspot Map"
                    />

                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                            <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
                        </div>
                    ) : (
                        hotspots.map((hotspot, idx) => (
                            <div key={idx} className="absolute transition-all" style={{
                                top: `${30 + (idx * 20)}%`,
                                left: `${40 + (idx * 15)}%`
                            }}>
                                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                                    <div className="w-5 h-5 bg-red-600 rounded-full shadow-lg border-2 border-white"></div>
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-slate-800 px-2 py-1 rounded text-[10px] font-bold shadow-md border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                    {hotspot.ward} Cluster ({hotspot.complaints})
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
