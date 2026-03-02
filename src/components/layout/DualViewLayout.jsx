import React from 'react';
import DesktopFrame from './DesktopFrame';
import MobileFrame from './MobileFrame';

/**
 * DualViewLayout
 *
 * Strict 70% / 30% horizontal split. Never collapses vertically.
 * Uses explicit inline styles with `flex: 0 0 X%` so the ratio is
 * non-negotiable regardless of content or viewport size.
 *
 * @param {object}    props
 * @param {ReactNode} props.desktopContent  - Content for the desktop (70%) frame
 * @param {ReactNode} props.mobileContent   - Content for the mobile (30%) frame
 * @param {ReactNode} [props.children]      - Fallback: same content for both frames
 */
const DualViewLayout = ({ desktopContent, mobileContent, children }) => {
    const desktop = desktopContent ?? children;
    const mobile = mobileContent ?? children;

    return (
        /* Root: full-viewport horizontal flex — never wraps, never stacks */
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
        }}>

            {/* ── LEFT 70% — Desktop ── */}
            <div style={{
                flex: '0 0 70%',
                width: '70%',
                height: '100%',
                overflow: 'hidden',
                borderRight: '1px solid #334155',
            }}>
                <DesktopFrame>
                    {desktop}
                </DesktopFrame>
            </div>

            {/* ── RIGHT 30% — Mobile ── */}
            <div style={{
                flex: '0 0 30%',
                width: '30%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0f172a',
            }}>
                <MobileFrame>
                    {mobile}
                </MobileFrame>
            </div>
        </div>
    );
};

export default DualViewLayout;
