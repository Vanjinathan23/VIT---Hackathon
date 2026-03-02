import React from 'react';
import useAppStore from '../store/useAppStore';
import { Settings, Home as HomeIcon, MessageSquare } from 'lucide-react';

const Home = () => {
    const {
        navigate,
        formData,
        updateFormField,
        counter,
        incrementCounter,
        resetCounter
    } = useAppStore();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 text-indigo-600 font-bold text-xl">
                    <HomeIcon className="w-6 h-6" />
                    <span>Dashboard</span>
                </div>
                <button
                    onClick={() => navigate('settings')}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="text-indigo-100 text-sm font-medium mb-1">Total Interactions</div>
                    <div className="text-4xl font-bold">{counter}</div>
                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={incrementCounter}
                            className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
                        >
                            Increment
                        </button>
                        <button
                            onClick={resetCounter}
                            className="bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
                    <div className="text-slate-500 text-sm font-medium mb-1">Active User</div>
                    <div className="text-lg font-semibold text-slate-800 truncate">
                        {formData.username || 'Anonymous User'}
                    </div>
                </div>
            </div>

            {/* Form Area */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/50 p-4 font-semibold text-slate-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    Profile Data Sync
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => updateFormField('username', e.target.value)}
                            placeholder="Start typing..."
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormField('email', e.target.value)}
                            placeholder="name@example.com"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => updateFormField('message', e.target.value)}
                            placeholder="These notes will sync instantly..."
                            rows={3}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 resize-none"
                        />
                    </div>
                    <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-sm">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
