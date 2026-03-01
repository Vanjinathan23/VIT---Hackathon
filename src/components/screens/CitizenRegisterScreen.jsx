import React, { useCallback, useRef, useState } from 'react';
import useAppStore from '../../store/useAppStore';
import GoogleMap from '../common/GoogleMap';
import './CitizenRegisterScreen.css';

/**
 * CitizenRegisterScreen
 * 
 * Provides a localized registration form for citizens.
 * Follows the "Create Citizen Profile" layout from the redesigned mobile mockups.
 * 
 * @param {object} props
 * @param {'desktop'|'mobile'} props.variant - Sizing context
 */
const CitizenRegisterScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';

    // Zustand synchronization
    const formData = useAppStore(state => state.formData);
    const updateFormField = useAppStore(state => state.updateFormField);
    const navigate = useAppStore(state => state.navigate);

    const [center, setCenter] = useState({ lat: 13.0850, lng: 80.2201 });
    const mapRef = useRef(null);

    const handleInputChange = (field, value) => {
        updateFormField(field, value);
    };

    const handleBack = () => {
        navigate('role-selection');
    };

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                const newCenter = { lat: latitude, lng: longitude };
                setCenter(newCenter);
                updateFormField('location', `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                if (mapRef.current) {
                    mapRef.current.panTo(newCenter);
                }
            });
        }
    };

    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        updateFormField('location', `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        console.log('Registering citizen:', formData);
        // Navigate to home screen
        navigate('home');
    };

    return (
        <div className={`register-root ${!isMobile ? 'register-desktop' : ''}`}>

            {/* Nav Header / Back Button */}
            <div className="register-header-nav">
                <button className="register-back-btn" onClick={handleBack} aria-label="Go back">
                    <span className="material-icons">arrow_back</span>
                </button>
            </div>

            {/* iOS Status Bar Placeholder — only inside mobile frame */}
            {isMobile && (
                <div className="register-status-bar">
                    <span className="status-time">9:41</span>
                    <div className="status-icons">
                        <span className="material-icons">signal_cellular_alt</span>
                        <span className="material-icons">wifi</span>
                        <span className="material-icons">battery_full</span>
                    </div>
                </div>
            )}

            {/* Header branding */}
            <div className="register-header">
                <h1 className="register-title">Create Citizen Profile</h1>
                <p className="register-subtitle">Provide basic details to start reporting issues.</p>
            </div>

            {/* Main scrollable form area */}
            <div className="register-card">
                <div className="register-form">

                    {/* Photo Upload Interaction */}
                    <div className="photo-upload-container">
                        <div className="photo-upload-circle" role="button" aria-label="Upload profile photo">
                            <img
                                src="https://i.pravatar.cc/150?u=new_user"
                                alt="Profile avatar silhouette"
                                className="photo-placeholder"
                            />
                            <div className="photo-overlay">
                                <span className="material-icons">add_a_photo</span>
                            </div>
                        </div>
                        <span className="photo-upload-text">Upload Photo</span>
                    </div>

                    {/* Full Name Input */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="fullName">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            className="input-field"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                    </div>

                    {/* Mobile Number Input */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="phone">Mobile Number</label>
                        <input
                            id="phone"
                            type="tel"
                            className="input-field"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    </div>

                    {/* Location Selection with geolocation nudge */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="location">Location</label>
                        <div className="input-with-icon">
                            <input
                                id="location"
                                type="text"
                                className="input-field"
                                placeholder="City, State"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                            />
                            <button className="location-btn" type="button" aria-label="Use current location" onClick={handleUseCurrentLocation}>
                                <span className="material-icons" style={{ color: '#3c3cf6' }}>my_location</span>
                            </button>
                        </div>

                        {/* Add map here */}
                        <div className="register-map-container" style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', marginTop: '12px', border: '1px solid #e2e8f0' }}>
                            <GoogleMap
                                center={center}
                                zoom={13}
                                onLoad={onMapLoad}
                                markers={[{ position: center }]}
                                draggableMarker={true}
                                onDragEnd={onMarkerDragEnd}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* User Privacy Reinforcement */}
            <div className="privacy-note">
                <span className="material-icons">lock</span>
                <span className="privacy-text">Your personal information will not be publicly visible.</span>
            </div>

            {/* Call to action footer */}
            <div className="register-footer">
                <button className="register-submit-btn" onClick={handleSubmit}>
                    Create Account
                </button>
                {isMobile && <div className="home-indicator" aria-hidden="true" />}
            </div>

        </div>
    );
};

export default CitizenRegisterScreen;
