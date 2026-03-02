/**
 * Location Service for CivicStream
 * Handles both GPS-based (Geolocator API) and IP-based location detection.
 */

// Fallback API: IP-Based Detection
const IP_API_URL = "https://ipapi.co/json/";

/**
 * Detect Location from IP Address (Approximate)
 * Use as a fallback when GPS permission is denied or unavailable.
 */
export const fetchLocationByIP = async () => {
    try {
        const response = await fetch(IP_API_URL);
        if (!response.ok) throw new Error("IP Geolocation Failed");
        
        const data = await response.json();
        return {
            lat: parseFloat(data.latitude),
            lon: parseFloat(data.longitude),
            city: data.city,
            country: data.country_name,
            accuracy: 'approximate',
            type: 'ip'
        };
    } catch (error) {
        console.error("IP Location Fallback Failed:", error);
        return null;
    }
};

/**
 * Detect Location using Browser Geolocation API (Precise)
 * Requires user permission.
 */
export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                // Reverse geocoding could be added here, but for now we'll just return coords.
                // We'll use a public reverse geocoding API or a mock if needed.
                
                try {
                   // Mock reverse geocoding for city name or use OSM Nominatim (be careful with rate limits)
                   const cityInfo = await getCityFromCoords(latitude, longitude);
                   
                   resolve({
                       lat: latitude,
                       lon: longitude,
                       city: cityInfo.city || 'Unknown',
                       country: cityInfo.country || 'Unknown',
                       accuracy: accuracy,
                       type: 'gps'
                   });
                } catch (e) {
                    resolve({
                        lat: latitude,
                        lon: longitude,
                        city: 'Near you',
                        country: '',
                        accuracy: accuracy,
                        type: 'gps'
                    });
                }
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
};

/**
 * Simple reverse geocoding using OpenStreetMap Nominatim
 */
async function getCityFromCoords(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`, {
            headers: {
                'Accept-Language': 'en-US,en;q=0.9',
                'User-Agent': 'CivicStreamApp/1.0'
            }
        });
        if (!response.ok) return { city: 'Detected Location', country: '' };
        
        const data = await response.json();
        const address = data.address;
        const city = address.city || address.town || address.village || address.suburb || address.state_district;
        const country = address.country;
        
        return { city, country };
    } catch (error) {
        return { city: 'Detected Location', country: '' };
    }
}
