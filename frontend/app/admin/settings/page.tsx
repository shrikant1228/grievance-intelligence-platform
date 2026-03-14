"use client";

import React from "react";
import { Settings as SettingsIcon, Save, Database, Shield, Brain, BellRing } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full">
                    <SettingsIcon className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Settings</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Manage global platform configurations.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Settings Nav */}
                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg font-semibold text-sm transition-colors text-left">
                        <Brain className="w-4 h-4" /> AI Configuration
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg font-medium text-sm transition-colors text-left">
                        <Shield className="w-4 h-4" /> Priority Rules
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg font-medium text-sm transition-colors text-left">
                        <Database className="w-4 h-4" /> Departments & Wards
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg font-medium text-sm transition-colors text-left">
                        <BellRing className="w-4 h-4" /> Notifications
                    </button>
                </div>

                {/* Settings Content Area */}
                <div className="md:col-span-3 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">AI Model Configuration</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Confidence Threshold</label>
                            <input type="range" min="0" max="100" defaultValue="85" className="w-full accent-purple-600" />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>Lenient (0%)</span>
                                <span className="font-bold text-purple-600">85% Minimum Required</span>
                                <span>Strict (100%)</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Complaints with AI confidence below this threshold will require manual admin approval before department routing.</p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <label className="flex items-center gap-3">
                                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-purple-600 border-slate-300 focus:ring-purple-600" />
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Auto-escalate repeated keywords</span>
                            </label>
                            <p className="text-xs text-slate-500 ml-7 mt-1">If &gt;5 complaints in 24h match identical semantic clusters, immediately flag as High Priority.</p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                                <Save className="w-4 h-4" /> Save Configurations
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
