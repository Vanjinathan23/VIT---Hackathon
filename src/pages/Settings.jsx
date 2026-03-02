import React from 'react';
import useAppStore from '../store/useAppStore';
import { ArrowLeft, User, Bell, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
    const { navigate, activeTab, setActiveTab } = useAppStore();

    const tabs = [
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'notifications', icon: Bell, label: 'Notifications' },
        { id: 'security', icon: Shield, label: 'Security' },
        { id: 'devices', icon: Smartphone, label: 'Devices' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <button
                    onClick={() => navigate('home')}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="font-bold text-xl text-slate-800">Settings</div>
            </div>

            {/* Settings Layout */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Sidebar Nav */}
                <div className="w-full md:w-48 space-y-1">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px]">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 capitalize">{activeTab} Configuration</h2>

                    {/* Dummy content per tab */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <div className="font-semibold text-slate-800">Enable Feature X</div>
                                <div className="text-sm text-slate-500">This setting syncs across all views</div>
                            </div>
                            <div className="w-12 h-6 bg-indigo-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <div className="font-semibold text-slate-800">Demo Setting Y</div>
                                <div className="text-sm text-slate-500">Notice how fast the state updates</div>
                            </div>
                            <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 bottom-1 w-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
