import React from 'react';

/**
 * MobileFrame
 *
 * Centered phone preview inside the 30% right pane.
 * Spec: max-width 375px, height 85% of parent, border-radius 24px,
 * white background, subtle shadow, overflow-y auto.
 */
const MobileFrame = ({ children }) => {
    return (
        /* Outer centering wrapper — fills the 30% pane */
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
        }}>
            {/* Phone shell */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: 375,
                height: '85%',
                backgroundColor: '#1e293b',   /* outer bezel */
                borderRadius: 36,
                padding: 12,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
                {/* Dynamic Island notch */}
                <div style={{
                    position: 'absolute',
                    top: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '34%',
                    height: 28,
                    backgroundColor: '#0f172a',
                    borderRadius: '0 0 20px 20px',
                    zIndex: 10,
                }} />

                {/* Status bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 20px',
                    height: 36,
                    flexShrink: 0,
                    color: '#e2e8f0',
                    fontSize: 11,
                    fontWeight: 500,
                    backgroundColor: '#0f172a',
                    borderRadius: '24px 24px 0 0',
                    marginBottom: 0,
                }}>
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <span>5G</span>
                        <span>▌▌▌</span>
                        <span>🔋</span>
                    </div>
                </div>

                {/* Screen — white, rounded bottom corners, scrollable */}
                <div className="mobile-frame-screen scrollbar-hide" style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: '#f8fafc',
                    borderRadius: 24,
                    overflowY: 'auto',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {children}
                </div>

                {/* Home indicator */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    flexShrink: 0,
                }}>
                    <div style={{
                        width: '36%',
                        height: 5,
                        borderRadius: 99,
                        backgroundColor: 'rgba(255,255,255,0.18)',
                    }} />
                </div>
            </div>

            {/* Label below phone */}
            <span style={{ color: '#64748b', fontSize: 12, fontWeight: 500 }}>
                Mobile View (30%)
            </span>
        </div>
    );
};

export default MobileFrame;
