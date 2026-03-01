import React, { useState, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import { fetchWeather } from '../../services/weatherService';

const LocationWeatherBadge = ({ variant = 'default' }) => {
    const location = useAppStore(state => state.location);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWeather = async () => {
            setLoading(true);
            try {
                const data = await fetchWeather(location.lat, location.lon);
                setWeather(data);
            } catch (err) {
                console.error("Failed to load weather for badge:", err);
            } finally {
                setLoading(false);
            }
        };

        if (location.lat && location.lon) {
            loadWeather();
        }
    }, [location.lat, location.lon]);

    if (loading && !weather) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse">
                <div className="w-4 h-4 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                <div className="w-16 h-3 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            </div>
        );
    }

    if (!weather) return null;

    const isDesktop = variant === 'desktop';

    return (
        <div className={`flex items-center gap-2 group transition-all duration-300 ${isDesktop ? 'px-4 py-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-800/20 mb-6' : 'px-3 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800'}`}>
            <div className="relative">
                <span className="material-symbols-rounded text-blue-500 dark:text-blue-400 text-xl group-hover:scale-110 transition-transform">
                    {weather.current.condition === 'Rainy' || weather.current.condition === 'Thunderstorm' ? 'umbrella' : 
                     weather.current.condition === 'Cloudy' ? 'cloud' : 'wb_sunny'}
                </span>
                {location.type === 'gps' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-slate-900"></div>
                )}
            </div>
            
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {weather.current.temp}°C
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {weather.current.condition}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="material-symbols-rounded text-[10px] text-slate-400">location_on</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[80px]">
                        {location.city}
                    </span>
                </div>
            </div>

            {isDesktop && (
                <div className="ml-auto pl-4 border-l border-blue-100 dark:border-blue-800/30">
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mb-0.5">Humidity</div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{weather.current.humidity}%</div>
                </div>
            )}
        </div>
    );
};

export default LocationWeatherBadge;
