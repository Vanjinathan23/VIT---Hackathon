import React from 'react';
import { ChevronLeft, User, Landmark, HardHat } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import './RoleSelectionScreen.css';

const RoleSelectionScreen = ({ variant = 'mobile' }) => {
    // Global state
    const selectedRole = useAppStore(state => state.selectedRole);
    const setSelectedRole = useAppStore(state => state.setSelectedRole);
    const setCurrentRole = useAppStore(state => state.setCurrentRole);
    const navigate = useAppStore(state => state.navigate);

    const roles = [
        {
            id: 'citizen',
            title: 'Citizen',
            icon: <User size={24} color="#555" />,
            description: 'Report issues, track progress, and stay informed about your community.'
        },
        {
            id: 'worker',
            title: 'Worker',
            icon: <HardHat size={24} color="#555" />,
            description: 'View assigned tasks, update status, and upload completion proof.'
        },
        {
            id: 'official',
            title: 'Official',
            icon: <Landmark size={24} color="#555" />,
            description: 'Manage reports, assign workers, and oversee resolution workflows.'
        }
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
    };

    const handleContinue = () => {
        if (selectedRole) {
            setCurrentRole(selectedRole);
            if (selectedRole === 'citizen') {
                navigate('citizen-register');
            } else if (selectedRole === 'worker') {
                navigate('worker-login');
            } else if (selectedRole === 'official') {
                navigate('official-login');
            }
        }
    };

    const handleBack = () => {
        navigate('onboarding');
    };

    return (
        <div className="role-selection-root">
            {/* Custom Header */}
            <div className="role-header">
                <button className="role-back-btn" onClick={handleBack} aria-label="Go back">
                    <ChevronLeft size={28} />
                </button>
                <h2>CivicStream</h2>
            </div>

            {/* Title Section */}
            <div className="role-title-section">
                <h1>Select Your Role</h1>
                <p>Choose how you want to access CivicStream.</p>
            </div>

            {/* Role List */}
            <div className="role-list">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        className={`role-card ${selectedRole === role.id ? 'role-card--active' : ''}`}
                        onClick={() => handleRoleSelect(role.id)}
                    >
                        <div className="role-icon-box">
                            {role.icon}
                        </div>
                        <div className="role-content">
                            <h3>{role.title}</h3>
                            <p>{role.description}</p>
                        </div>
                        <div className="role-radio">
                            <div className="role-radio-inner" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer & Continue Action */}
            <div className="role-footer">
                <button
                    className="role-btn-primary"
                    onClick={handleContinue}
                    disabled={!selectedRole}
                >
                    Continue
                </button>
                <div className="role-home-indicator" />
            </div>
        </div>
    );
};

export default RoleSelectionScreen;
