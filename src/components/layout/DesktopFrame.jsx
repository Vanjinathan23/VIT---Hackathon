import React from 'react';

/**
 * DesktopFrame
 *
 * Fills the 70% left pane entirely. The host (DualViewLayout) owns
 * the width/height constraints; this component just fills them.
 */
const DesktopFrame = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
            overflow: 'hidden',
        }}>
            {/* Simulated browser chrome top bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                backgroundColor: '#1e293b',
                flexShrink: 0,
            }}>
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#facc15' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', letterSpacing: '0.04em' }}>
                    Desktop View (70%)
                </span>
                {/* Invisible spacer to keep label centred */}
                <div style={{ width: 52 }} />
            </div>

            {/* Full-bleed content — let the child (e.g. SplashScreen) own its own layout */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                {children}
            </div>
        </div>
    );
};

export default DesktopFrame;
