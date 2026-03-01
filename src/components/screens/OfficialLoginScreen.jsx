import React from 'react';
import useAppStore from '../../store/useAppStore';
import './OfficialLoginScreen.css';

/**
 * OfficialLoginScreen
 * 
 * Official Role Login view.
 * Redesigned to match the "Official Login" mockup with shield icon and premium styling.
 * 
 * @param {object} props
 * @param {'desktop'|'mobile'} props.variant - Sizing context (desktop 70% vs mobile 30%)
 */
const OfficialLoginScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const navigate = useAppStore(state => state.navigate);
    const login = useAppStore(state => state.login);

    const [email, setEmail] = React.useState('official1@test.com');
    const [password, setPassword] = React.useState('123456');

    const handleBack = () => {
        navigate('role-selection');
    };

    const handleWorkerLogin = () => {
        navigate('worker-login');
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const res = login(email, password);
        if (res.success) {
            navigate('official-dashboard');
        } else {
            alert('Invalid credentials');
        }
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
                    <span className="material-symbols-outlined" style={{ fontSize: 40 }}>shield_person</span>
                </div>
                <h1 className="login-title">Official Login</h1>
                <p className="login-subtitle">Access your official dashboard.</p>
            </div>

            {/* Login Card */}
            <div className="login-card">
                <form className="login-form" onSubmit={handleLoginSubmit}>
                    <div className="input-group">
                        <label className="input-label-login" htmlFor="email">Official Email</label>
                        <input
                            id="email"
                            type="email"
                            className="input-field-login"
                            placeholder="name@department.gov"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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

            {/* Switch to Worker Login */}
            <div className="login-footer-actions">
                <button className="worker-login-btn" onClick={handleWorkerLogin}>
                    Worker Login
                </button>
            </div>

            {/* Mobile Footer Indicator */}
            {isMobile && <div className="home-indicator-login" aria-hidden="true" />}

        </div>
    );
};

export default OfficialLoginScreen;
