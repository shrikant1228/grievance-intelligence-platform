"use client";

import React from "react";
import { Locate, Map as MapIcon, MapPin } from "lucide-react";

interface LocationSelectorProps {
    latitude: number | null;
    longitude: number | null;
    setLatitude: (lat: number) => void;
    setLongitude: (lng: number) => void;
}

export default function LocationSelector({ latitude, longitude, setLatitude, setLongitude }: LocationSelectorProps) {
    const handleAutoDetect = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            alert("Geolocation is not supported by your browser");
        }
    };

    return (
        <section className="space-y-3">
            <span className="text-sm font-semibold block">Location</span>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={handleAutoDetect}
                    type="button"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#1a355b] text-white font-medium text-sm hover:bg-[#1a355b]/90 transition-colors"
                >
                    <Locate className="w-4 h-4" />
                    Auto-detect
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <MapIcon className="w-4 h-4" />
                    Manual
                </button>
            </div>
            <div className="relative rounded-xl overflow-hidden h-32 border border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-90 transition-opacity">
                {/* We use the image from reference to denote a map placeholder currently */}
                <img
                    className="w-full h-full object-cover opacity-60 grayscale"
                    alt="Abstract minimalist city map view"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Pv02_xXUfVTtVmqYxnEfYkq1iunYkv2V6QuUyxxpOxw2DA7voL0Lf5elxRcWHm1PbhPeBqbVfYfSQgD-gqwEjMlRz1AnIoxLmfp1QKybGWx3Sc0F7YlO0al2pPR6hK02lgieOp9XpA3dYRaR3eu-uKv3BRQ3X-b6g7-sxEGj8FZC-EOXVf2f5JLkpLlA0NijvsJ1WSd7ea0VDoTXr3PDvpmGdKUC9FD-HHBdNXCZombfI7TdZxldqZby0wVcI7JzkRbgVoqv98c"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="text-[#1a355b] w-8 h-8 drop-shadow-md" />
                </div>
            </div>
            {latitude && longitude && (
                <p className="text-xs text-slate-500 text-center font-mono">
                    Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
                </p>
            )}
        </section>
    );
}
