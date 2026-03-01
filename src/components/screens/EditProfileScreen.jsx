import React, { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import './EditProfileScreen.css';

/**
 * EditProfileScreen Component
 * 
 * Implemented based on the provided "Edit Profile" UI.
 * Allows users to update personal info, address, and profile photo.
 */
const EditProfileScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const user = useAppStore(state => state.user);
    const updateUser = useAppStore(state => state.updateUser);
    const navigate = useAppStore(state => state.navigate);

    // Local state for form fields
    const [formData, setFormData] = useState({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        pinCode: user.pinCode,
        profileImage: user.profileImage
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateUser({
            ...formData,
            username: formData.fullName, // Syncing username for consistency in mock app
            location: `${formData.city}, ${formData.state.substring(0, 2).toUpperCase()}`
        });
        navigate('profile');
    };

    const handleBack = () => navigate('profile');

    return (
        <div className={`edit-profile-root ${!isMobile ? 'edit-profile-root--desktop' : 'edit-profile-root--mobile'}`}>

            {/* Header */}
            <header className="edit-profile-header">
                <button className="icon-btn-back" onClick={handleBack}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <h1 className="header-title-edit">Edit Profile</h1>
                <button className="save-link-btn" onClick={handleSave}>Save</button>
            </header>

            <main className="edit-profile-main custom-scrollbar">

                {/* Profile Photo Section */}
                <section className="photo-edit-section">
                    <div className="photo-edit-wrapper">
                        <img src={formData.profileImage} alt="Profile" className="edit-avatar-img" />
                        <div className="camera-badge">
                            <span className="material-symbols-outlined">photo_camera</span>
                        </div>
                    </div>
                    <button className="change-photo-text">Change Photo</button>
                </section>

                {/* Personal Information Group */}
                <section className="form-group-section">
                    <h3 className="section-label">PERSONAL INFORMATION</h3>
                    <div className="input-card">
                        <div className="input-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />
                        </div>
                        <div className="input-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="input-field">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>
                </section>

                {/* Address Details Group */}
                <section className="form-group-section">
                    <h3 className="section-label">ADDRESS DETAILS</h3>
                    <div className="input-card">
                        <div className="input-field">
                            <label>Street Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter street address"
                                rows="3"
                            />
                        </div>
                        <div className="input-row">
                            <div className="input-field">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-field">
                                <label>State</label>
                                <div className="relative-select">
                                    <select name="state" value={formData.state} onChange={handleChange}>
                                        <option value="Washington">Washington</option>
                                        <option value="California">California</option>
                                        <option value="New York">New York</option>
                                        <option value="Texas">Texas</option>
                                    </select>
                                    <span className="material-symbols-outlined select-icon">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="input-field">
                            <label>PIN Code</label>
                            <input
                                type="text"
                                name="pinCode"
                                value={formData.pinCode}
                                onChange={handleChange}
                                placeholder="Enter PIN code"
                            />
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section className="form-group-section">
                    <h3 className="section-label">SECURITY</h3>
                    <div className="input-card">
                        <div className="settings-row-edit">
                            <div className="row-left">
                                <span className="material-symbols-outlined sec-icon">lock</span>
                                <span>Change Password</span>
                            </div>
                            <span className="material-symbols-outlined chevron">chevron_right</span>
                        </div>
                    </div>
                </section>

                {/* Bottom Buttons - Mobile Shadow Look */}
                <div style={{ height: '20px' }} />
            </main>

            {/* Bottom Actions Fixed */}
            <footer className="edit-footer-fixed">
                <button className="primary-save-btn" onClick={handleSave}>Save Changes</button>
                <button className="cancel-outlined-btn" onClick={handleBack}>Cancel</button>
            </footer>
        </div>
    );
};

export default EditProfileScreen;
