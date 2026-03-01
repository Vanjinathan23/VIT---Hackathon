import React, { useState, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import { getCurrentPosition, fetchLocationByIP } from '../../services/locationService';

const LocationModal = () => {
    const { setShowLocationModal, setLocation, setLocationPermission } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEnableGPS = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const gpsLocation = await getCurrentPosition();
            setLocation(gpsLocation);
            setLocationPermission('granted');
            setShowLocationModal(false);
        } catch (err) {
            console.warn("GPS Access Denied or Failed, Falling back to IP:", err);
            setLocationPermission('denied');

            // Fallback to IP detection
            const ipLocation = await fetchLocationByIP();
            if (ipLocation) {
                setLocation(ipLocation);
            }
            setShowLocationModal(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = async () => {
        setIsLoading(true);
        try {
            const ipLocation = await fetchLocationByIP();
            if (ipLocation) {
                setLocation(ipLocation);
            }
            setLocationPermission('denied');
            setShowLocationModal(false);
        } catch (err) {
            console.error("IP fallback also failed:", err);
            setShowLocationModal(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex flex-col items-center text-center">
                    {/* Location Icon Wrapper */}
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 relative">
                        <span className="material-symbols-rounded text-blue-600 dark:text-blue-400 text-5xl">
                            my_location
                        </span>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-25"></div>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">
                        Enable Location?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        We use your location to provide accurate local data and show reports near you.
                        Your privacy is our priority.
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={handleEnableGPS}
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all active:scale-95 ${isLoading
                                ? 'bg-blue-400 cursor-not-allowed text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                    Detecting...
                                </>
                            ) : (
                                "Allow Precise Location"
                            )}
                        </button>

                        <button
                            onClick={handleSkip}
                            disabled={isLoading}
                            className="w-full py-3 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                            No thanks, use approximate
                        </button>
                    </div>

                    <p className="mt-6 text-[11px] text-slate-400 dark:text-slate-500 px-4">
                        Modern browsers require permission for precise GPS. We don't track you silently.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
