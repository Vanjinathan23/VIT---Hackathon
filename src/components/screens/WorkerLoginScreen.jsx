import React from 'react';
import useAppStore from '../../store/useAppStore';
import './WorkerLoginScreen.css';

/**
 * WorkerLoginScreen
 * 
 * Worker Role Login view.
 * Matches the same premium styling as Official Login but uses a worker-specific icon (HardHat).
 * 
 * @param {object} props
 * @param {'desktop'|'mobile'} props.variant - Sizing context
 */
const WorkerLoginScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const navigate = useAppStore(state => state.navigate);
    const login = useAppStore(state => state.login);
    const setWorkerDashboardTab = useAppStore(state => state.setWorkerDashboardTab);

    const [email, setEmail] = React.useState('worker1@test.com');
    const [password, setPassword] = React.useState('123456');

    const handleBack = () => {
        navigate('role-selection');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = login(email, password);
        if (res.success) {
            setWorkerDashboardTab('HOME');
            navigate('worker-dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleOfficialLogin = () => {
        navigate('official-login');
    };

    return (
        <div className={`login-root ${!isMobile ? 'login-desktop' : ''}`}>

            {/* Nav Header */}
            <div className="login-header-nav">
                <button className="login-back-btn" onClick={handleBack} aria-label="Go back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            {/* Branding Section */}
            <div className="login-branding">
                <div className="login-icon-box">
                    <span className="material-symbols-outlined" style={{ fontSize: 40 }}>engineering</span>
                </div>
                <h1 className="login-title">Worker Login</h1>
                <p className="login-subtitle">Access your worker dashboard.</p>
            </div>

            {/* Login Card */}
            <div className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label-login" htmlFor="workerId">Email / Mobile</label>
                        <input
                            id="workerId"
                            type="text"
                            className="input-field-login"
                            placeholder="e.g. worker1@test.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label-login" htmlFor="password">Password</label>
                        <div className="password-input-wrap">
                            <input
                                id="password"
                                type="password"
                                className="input-field-login"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="password-toggle" type="button" aria-label="Toggle password visibility">
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                            </button>
                        </div>
                    </div>

                    <a href="#forgot" className="forgot-password-link">Forgot Password?</a>

                    <button className="login-submit-btn" type="submit">
                        Login
                    </button>
                </form>
            </div>

            {/* Switch to Official Login */}
            <div className="login-footer-actions">
                <button className="official-login-btn" onClick={handleOfficialLogin}>
                    Official Login
                </button>
            </div>

            {/* Mobile Footer Indicator */}
            {isMobile && <div className="home-indicator-login" aria-hidden="true" />}

        </div>
    );
};

export default WorkerLoginScreen;
