import React from 'react';
import './SplashScreen.css';

/**
 * SplashScreen
 *
 * @param {object}  props
 * @param {'desktop'|'mobile'} props.variant  - Controls sizing tweaks between the two frames
 */
const SplashScreen = ({ variant = 'desktop' }) => {
    const isMobile = variant === 'mobile';

    return (
        <div className={`splash-root ${isMobile ? 'splash-mobile' : 'splash-desktop'}`}>

            {/* ── Subtle radial glow behind logo ── */}
            <div className="splash-glow" aria-hidden="true" />

            {/* ── Decorative grid lines (desktop only) ── */}
            {!isMobile && (
                <div className="splash-grid" aria-hidden="true">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="splash-grid-line" style={{ '--delay': `${i * 0.1}s` }} />
                    ))}
                </div>
            )}

            {/* ── Main branding block ── */}
            <div className="splash-content">

                {/* Icon */}
                <div className={`splash-icon-wrap ${isMobile ? 'splash-icon-sm' : 'splash-icon-lg'}`}>
                    <span
                        className="material-symbols-outlined splash-icon"
                        style={{ fontVariationSettings: "'wght' 200, 'opsz' 48" }}
                    >
                        location_city
                    </span>
                </div>

                {/* App name */}
                <h1 className={`splash-title ${isMobile ? 'splash-title-sm' : 'splash-title-lg'}`}>
                    CivicStream
                </h1>

                {/* Tagline */}
                <p className={`splash-tagline ${isMobile ? 'splash-tagline-sm' : 'splash-tagline-lg'}`}>
                    See it.&nbsp; Report it.&nbsp; Fix it.
                </p>

                {/* Progress bar */}
                <div className={`splash-progress-wrap ${isMobile ? 'splash-progress-sm' : 'splash-progress-lg'}`}>
                    <div className="splash-progress-track">
                        <div className="splash-progress-fill" />
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="splash-footer">
                <span className="splash-footer-text">Government Services</span>
            </footer>
        </div>
    );
};

export default SplashScreen;
