import React, { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import './MockLoginScreen.css';

const MockLoginScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Store actions
    const login = useAppStore(state => state.login);
    const navigate = useAppStore(state => state.navigate);
    const setWorkerDashboardTab = useAppStore(state => state.setWorkerDashboardTab);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);

        if (result.success) {
            // Redirect based on role
            switch (result.role) {
                case 'citizen':
                    navigate('citizen-dashboard');
                    break;
                case 'worker':
                    setWorkerDashboardTab('HOME');
                    navigate('worker-dashboard');
                    break;
                case 'official':
                    navigate('official-dashboard');
                    break;
                default:
                    navigate('citizen-dashboard');
            }
        } else {
            setError('Invalid mock credentials. Please try again.');
        }
    };

    return (
        <div className={`mock-login-root ${!isMobile ? 'mock-login-desktop' : ''}`}>
            <div className="mock-login-container">
                <div className="mock-login-header">
                    <h2>System Login <span className="mock-badge">MOCK</span></h2>
                    <p>Development phase authentication</p>
                </div>

                <form className="mock-login-form" onSubmit={handleSubmit}>
                    {error && <div className="mock-login-error">{error}</div>}

                    <div className="mock-input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter mock email"
                            required
                        />
                    </div>

                    <div className="mock-input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter mock password"
                            required
                        />
                    </div>

                    <button type="submit" className="mock-login-btn">
                        Login
                    </button>
                </form>

                <div className="mock-credentials">
                    <h3>Mock Users Available:</h3>
                    <ul>
                        <li><b>Citizen:</b> citizen1@test.com / 123456</li>
                        <li><b>Worker:</b> worker1@test.com / 123456</li>
                        <li><b>Official:</b> official1@test.com / 123456</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MockLoginScreen;
