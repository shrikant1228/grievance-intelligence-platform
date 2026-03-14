"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Uses public anon key for frontend listeners
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zinmktgrajtzntzqhtwn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export function useRealtimeComplaints(onNewComplaint?: (payload: any) => void) {
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

    useEffect(() => {
        // Fallback if no actual key available during hackathon demo MVP
        if (supabaseKey === "public-anon-key") {
            console.warn("Using mock realtime - Supabase anon key not set");
            const interval = setInterval(() => setLastUpdate(new Date()), 30000);
            return () => clearInterval(interval);
        }

        const channel = supabase
            .channel("public-complaints")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "complaints" },
                (payload) => {
                    console.log("Realtime Update Received:", payload);
                    setLastUpdate(new Date());
                    if (onNewComplaint) onNewComplaint(payload);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [onNewComplaint]);

    return { lastUpdate };
}
