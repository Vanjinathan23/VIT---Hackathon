import React, { useState, useCallback, useRef } from 'react';
import useAppStore from '../../store/useAppStore';
import GoogleMap from '../common/GoogleMap';
import './ReportIssueScreen.css';

/**
 * ReportIssueScreen Component
 * 
 * Features:
 * 1. Fixed layout with proper icon alignment.
 * 2. Integrated Google Maps for location selection.
 * 3. Photo upload with preview functionality.
 * 4. REAL storage integration via useAppStore.addIssue.
 */
const ReportIssueScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const navigate = useAppStore(state => state.navigate);
    const addIssue = useAppStore(state => state.addIssue);
    const addDraft = useAppStore(state => state.addDraft);
    const currentUser = useAppStore(state => state.currentUser);

    // Local State
    const [priority, setPriority] = useState('Medium');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [locationText, setLocationText] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [center, setCenter] = useState({ lat: 13.0850, lng: 80.2201 });
    const [coords, setCoords] = useState([80.2201, 13.0850]);
    const [showToast, setShowToast] = useState(false);

    // Refs
    const fileInputRef = useRef(null);
    const mapRef = useRef(null);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCoords([lng, lat]);
        setLocationText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                const newCenter = { lat: latitude, lng: longitude };
                setCenter(newCenter);
                setCoords([longitude, latitude]);
                setLocationText(`Reported Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
                if (mapRef.current) {
                    mapRef.current.panTo(newCenter);
                }
            });
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!title || !category || !description) {
            alert('Please fill in all required fields (Title, Category, Description)');
            return;
        }

        const newIssue = {
            title,
            category,
            description,
            location: locationText || 'Unknown Location',
            image: previewImage || '/assets/pothole.png', // Fallback to a high-quality local image
            coordinates: coords,
            priority
        };

        addIssue(newIssue);
        navigate('home');
    };

    const handleSaveDraft = () => {
        const draft = {
            title: title || 'Untitled Draft',
            category: category || 'Uncategorized',
            description,
            location: locationText,
            image: previewImage,
            coordinates: coords,
            priority
        };
        addDraft(draft);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            navigate('profile');
        }, 1500);
    };

    const handleBack = () => navigate('home');

    return (
        <div className={`report-root ${!isMobile ? 'report-root--desktop' : 'report-root--mobile'}`}>
            {/* Header */}
            <header className="report-header">
                <button className="back-btn-circle" onClick={handleBack}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">Report New Issue</h1>
                <div style={{ width: 40 }}></div>
            </header>

            {/* Scrollable Content */}
            <main className="report-main custom-scrollbar">

                {/* 1. Issue Title */}
                <div className="form-group">
                    <label>Issue Title</label>
                    <input
                        type="text"
                        placeholder="e.g., Broken streetlight"
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* 2. Category */}
                <div className="form-group">
                    <label>Category</label>
                    <div className="relative-select">
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            <option value="Road">Roads & Sidewalks</option>
                            <option value="Lighting">Public Lighting</option>
                            <option value="Waste">Waste Management</option>
                            <option value="Parks">Parks & Recreation</option>
                            <option value="Other">Other</option>
                        </select>
                        <span className="material-symbols-outlined select-arrow">expand_more</span>
                    </div>
                </div>

                {/* 3. Description */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Provide more details about the issue..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* 4. Image Upload */}
                <div className="upload-section">
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div className="upload-card" onClick={handleUploadClick}>
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="upload-preview-img" />
                        ) : (
                            <>
                                <div className="upload-icon-container">
                                    <span className="material-symbols-outlined">photo_camera</span>
                                </div>
                                <div className="upload-text">
                                    <p className="upload-title">Tap to upload photo</p>
                                    <p className="upload-subtitle">JPG, PNG up to 10MB</p>
                                </div>
                            </>
                        )}
                        {previewImage && (
                            <div className="change-photo-overlay">
                                <span className="material-symbols-outlined">cached</span>
                                Tap to change
                            </div>
                        )}
                    </div>
                </div>

                {/* 5. Location with Map Integration */}
                <div className="form-group">
                    <label>Location</label>
                    <div className="relative-input">
                        <span className="material-symbols-outlined input-icon">location_on</span>
                        <input
                            type="text"
                            className="form-input icon-padding"
                            placeholder="Address or coordinates..."
                            value={locationText}
                            onChange={(e) => setLocationText(e.target.value)}
                        />
                    </div>

                    <div className="map-selector-container">
                        <GoogleMap
                            center={center}
                            zoom={13}
                            onLoad={onMapLoad}
                            markers={[{ position: { lat: coords[1], lng: coords[0] } }]}
                            draggableMarker={true}
                            onDragEnd={onMarkerDragEnd}
                        />
                        <div className="map-hint">Drag marker to pinpoint issue</div>

                        <button className="map-floating-loc-btn" onClick={handleUseCurrentLocation}>
                            <span className="material-symbols-outlined">my_location</span>
                        </button>
                    </div>
                </div>

                {/* 6. Priority */}
                <div className="form-group">
                    <label>Priority</label>
                    <div className="priority-toggle">
                        <button className={`priority-btn ${priority === 'Low' ? 'active' : ''}`} onClick={() => setPriority('Low')}>Low</button>
                        <button className={`priority-btn ${priority === 'Medium' ? 'active' : ''}`} onClick={() => setPriority('Medium')}>Medium</button>
                        <button className={`priority-btn ${priority === 'High' ? 'active' : ''}`} onClick={() => setPriority('High')}>High</button>
                    </div>
                </div>

                <div style={{ height: '40px' }} />
            </main>

            {/* Fixed Footer */}
            <footer className="report-footer">
                <button className="submit-btn" onClick={handleSubmit}>
                    Submit Issue
                </button>
                <button className="draft-btn" onClick={handleSaveDraft}>
                    Save as Draft
                </button>
            </footer>

            {/* Toast Notification */}
            {showToast && (
                <div className="save-toast">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Draft saved</span>
                </div>
            )}
        </div>
    );
};

export default ReportIssueScreen;
