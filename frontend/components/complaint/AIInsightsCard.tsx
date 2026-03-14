"use client";

import React from "react";
import { Zap, Activity } from "lucide-react";

interface AIInsightsProps {
    complaintText: string;
    department: string | null;
    priority: string | null;
    confidence: number | null;
    onAnalyze: () => void;
    isAnalyzing: boolean;
}

export default function AIInsightsCard({ complaintText, department, priority, confidence, onAnalyze, isAnalyzing }: AIInsightsProps) {
    return (
        <section className="bg-[#1a355b]/5 dark:bg-[#1a355b]/10 border border-[#1a355b]/20 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
                <Zap className="text-[#1a355b] w-5 h-5 fill-current" />
                <h3 className="font-bold text-[#1a355b]">AI Insights</h3>
            </div>

            {!department ? (
                <div className="space-y-4">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        Click analyze to let CivicSense AI determine the department and priority based on your input.
                    </p>
                    <button
                        type="button"
                        onClick={onAnalyze}
                        disabled={!complaintText || isAnalyzing}
                        className="w-full py-3 px-4 bg-[#1a355b]/20 text-[#1a355b] hover:bg-[#1a355b]/30 disabled:opacity-50 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                        <Activity className="w-[18px] h-[18px]" />
                        {isAnalyzing ? "Analyzing..." : "Analyze Complaint"}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Dept</p>
                        <p className="text-xs font-bold text-[#1a355b]">{department}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Priority</p>
                        <p className={`text-xs font-bold ${priority === 'High' ? 'text-red-500' : priority === 'Low' ? 'text-green-500' : 'text-orange-500'}`}>
                            {priority}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">AI Conf.</p>
                        <p className="text-xs font-bold text-green-500">{confidence ? `${Math.round(confidence * 100)}%` : ''}</p>
                    </div>
                </div>
            )}
        </section>
    );
}
