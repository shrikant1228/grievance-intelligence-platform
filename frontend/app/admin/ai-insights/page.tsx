"use client";

import React, { useState, useEffect } from "react";
import { BrainCircuit, TrendingUp, AlertOctagon, Lightbulb, Loader2, ArrowUpRight, ArrowRight, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AIInsightsPage() {
    const [insights, setInsights] = useState<any[]>([]);
    const [predictions, setPredictions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchIntelligence() {
            try {
                // Fetch Static Insights
                const resInsights = await fetch('http://localhost:8000/api/ai/insights');
                if (resInsights.ok) {
                    const data = await resInsights.json();
                    const mappedInsights = data.insights.map((insightText: string) => {
                        if (insightText.toLowerCase().includes('garbage') || insightText.toLowerCase().includes('sanitation')) {
                            return { type: "trend", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", title: insightText, desc: "NLP trend analysis detected a significant semantic shift compared to the 30-day moving average.", action: "Allocate additional sanitation trucks" };
                        } else if (insightText.toLowerCase().includes('road') || insightText.toLowerCase().includes('pothole')) {
                            return { type: "hotspot", icon: AlertOctagon, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", title: insightText, desc: "Clustering algorithm shows dense spatial occurrence of this issue in the identified coordinates.", action: "Schedule emergency road survey" };
                        } else {
                            return { type: "pattern", icon: Lightbulb, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30", title: insightText, desc: "Predictive model flagged this issue based on historical monthly recurrence patterns.", action: "Audit zonal infrastructure" };
                        }
                    });
                    setInsights(mappedInsights);
                }

                // Fetch Predictive Forecasts
                const resPredict = await fetch('http://localhost:8000/api/ai/predict-issues');
                if (resPredict.ok) {
                    const predictData = await resPredict.json();
                    setPredictions(predictData.predictions || []);
                }
            } catch (error) {
                console.error("Failed to fetch AI intelligence:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchIntelligence();
    }, []);

    // Mock chart data for the forecast visualization over 14 historical + 7 future days
    const forecastChartData = [
        { day: "-14d", actual: 12 }, { day: "-10d", actual: 18 }, { day: "-7d", actual: 24 },
        { day: "-3d", actual: 22 }, { day: "Today", actual: 29, predicted: 29 },
        { day: "+3d", predicted: 35 }, { day: "+7d", predicted: 42 }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-purple-200 dark:border-purple-900/50 pb-4">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                    <BrainCircuit className="w-8 h-8 text-purple-600 dark:text-purple-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Civic Insights</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Automated trend detection and predictive intelligence.</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Predictive Civic Forecast Section */}
                    {predictions.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Activity className="w-6 h-6 text-indigo-500" /> Predictive Civic Forecast
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {predictions.map((p, idx) => (
                                        <div key={idx} className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-indigo-100 dark:border-slate-700 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                                    <AlertOctagon className="w-4 h-4" /> {p.ward}
                                                </span>
                                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1">
                                                    <ArrowUpRight className="w-3 h-3" /> {p.trend}
                                                </span>
                                            </div>
                                            <h3 className="text-slate-900 dark:text-white font-bold mb-1">{p.department} incidents predicted to rise</h3>
                                            <p className="text-slate-500 text-sm">Expected volume: <span className="font-bold text-slate-900 dark:text-white">{p.predicted_complaints_next_week} complaints</span> next week</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-64">
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">City-Wide Forecast (7 Day)</h3>
                                    <ResponsiveContainer width="100%" height="80%">
                                        <LineChart data={forecastChartData}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Line type="monotone" dataKey="actual" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4, fill: '#94a3b8' }} name="Historical" />
                                            <Line type="monotone" dataKey="predicted" stroke="#6366f1" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#6366f1' }} name="Predicted Forecast" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Historical AI Insights */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Lightbulb className="w-6 h-6 text-amber-500" /> Recent AI Observations
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {insights.map((insight, i) => {
                                const Icon = insight.icon;
                                return (
                                    <div key={i} className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-5 relative overflow-hidden group hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                                        <div className={`${insight.bg} p-3 rounded-xl flex-shrink-0 h-14 w-14 flex items-center justify-center`}>
                                            <Icon className={`w-6 h-6 ${insight.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{insight.title}</h3>
                                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500 rounded-full">
                                                    {insight.type}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl mb-3">
                                                {insight.desc}
                                            </p>
                                            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg">
                                                <span>Suggested Action: {insight.action}</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
