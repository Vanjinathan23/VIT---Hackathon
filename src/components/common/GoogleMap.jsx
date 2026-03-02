import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 13.0827,
    lng: 80.2707
};

const GoogleMapWrapper = ({
    center = defaultCenter,
    zoom = 13,
    onLoad,
    onUnmount,
    markers = [],
    onMarkerClick,
    draggableMarker = false,
    onDragEnd,
    options = {}
}) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const [map, setMap] = useState(null);

    const internalOnLoad = useCallback(function callback(mapInstance) {
        setMap(mapInstance);
        if (onLoad) onLoad(mapInstance);
    }, [onLoad]);

    const internalOnUnmount = useCallback(function callback(mapInstance) {
        setMap(null);
        if (onUnmount) onUnmount(mapInstance);
    }, [onUnmount]);

    if (loadError) {
        console.error("Google Maps Load Error:", loadError);
        return <div className="map-error">Error loading Google Maps. Check console for details.</div>;
    }

    if (!isLoaded) return <div className="map-loading">Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={internalOnLoad}
            onUnmount={internalOnUnmount}
            options={{
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                ...options
            }}
        >
            {markers.map((marker, index) => (
                <MarkerF
                    key={index}
                    position={marker.position}
                    draggable={draggableMarker}
                    onDragEnd={onDragEnd}
                    onClick={() => onMarkerClick && onMarkerClick(marker)}
                    icon={marker.icon}
                />
            ))}
        </GoogleMap>
    );
};

export default React.memo(GoogleMapWrapper);
