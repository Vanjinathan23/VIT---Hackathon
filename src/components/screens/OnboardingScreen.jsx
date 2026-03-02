import React, { useEffect, useRef, useCallback } from 'react';
import useAppStore from '../../store/useAppStore';
import './OnboardingScreen.css';

/* ─────────────────────────────────────────────────────────────────
   Slide 1 — Report Issues in Seconds
───────────────────────────────────────────────────────────────── */
function Slide1({ isMobile, onNext, onSkip }) {
    return (
        <div className="ob-slide-container">
            <div className="ob-header">
                <h2 className="ob-app-name">CivicStream</h2>
            </div>

            <div className={`ob-illustration-wrap ${isMobile ? '' : 'ob-illustration-wrap--lg'}`}>
                <div className="ob-illustration-bg">
                    <div className="ob-illustration-gradient" />
                    <img
                        src="/assets/pothole.png"
                        alt="Person using a mobile camera to capture a road issue"
                        className="ob-illustration-img"
                    />
                </div>
            </div>

            <div className="ob-content">
                <h3 className={`ob-title ${isMobile ? 'ob-title--sm' : 'ob-title--lg'}`}>
                    Report Issues in Seconds
                </h3>
                <p className={`ob-body ${isMobile ? 'ob-body--sm' : 'ob-body--lg'}`}>
                    Capture and report city infrastructure problems instantly with AI-assisted
                    categorization and location detection.
                </p>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────
   Slide 2 — Track Progress Transparently
───────────────────────────────────────────────────────────────── */
function Slide2({ isMobile }) {
    return (
        <div className="ob-slide-container">
            <div className="ob-status-spacer" />

            <div className={`ob-timeline-wrap ${isMobile ? '' : 'ob-timeline-wrap--lg'}`}>
                <div className="ob-timeline-card">
                    <div className="ob-timeline-row">
                        <div className="ob-timeline-icon-col">
                            <div className="ob-timeline-icon ob-timeline-icon--red">
                                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>priority_high</span>
                            </div>
                            <div className="ob-timeline-line" />
                        </div>
                        <div className="ob-timeline-text">
                            <p className="ob-timeline-label">Reported</p>
                            <p className="ob-timeline-sub">Pothole on Main St.</p>
                        </div>
                    </div>

                    <div className="ob-timeline-row">
                        <div className="ob-timeline-icon-col">
                            <div className="ob-timeline-icon ob-timeline-icon--amber">
                                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>sync</span>
                            </div>
                            <div className="ob-timeline-line" />
                        </div>
                        <div className="ob-timeline-text">
                            <p className="ob-timeline-label">In Progress</p>
                            <p className="ob-timeline-sub">Assigned to Public Works</p>
                        </div>
                    </div>

                    <div className="ob-timeline-row">
                        <div className="ob-timeline-icon-col">
                            <div className="ob-timeline-icon ob-timeline-icon--green">
                                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>check_circle</span>
                            </div>
                        </div>
                        <div className="ob-timeline-text">
                            <p className="ob-timeline-label">Completed</p>
                            <p className="ob-timeline-sub">Issue resolved</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ob-content">
                <h3 className={`ob-title ${isMobile ? 'ob-title--sm' : 'ob-title--lg'}`}>
                    Track Progress Transparently
                </h3>
                <p className={`ob-body ${isMobile ? 'ob-body--sm' : 'ob-body--lg'}`}>
                    Monitor every issue with real-time updates, assignment details, and clear status
                    tracking from start to resolution.
                </p>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────
   Slide 3 — See Before & After Proof
───────────────────────────────────────────────────────────────── */
function Slide3({ isMobile }) {
    return (
        <div className="ob-slide-container">
            <div className="ob-header ob-header--space-between">
                <div style={{ width: 24 }} />
                <h2 className="ob-app-name">CivicStream</h2>
                <div style={{ width: 24 }} />
            </div>

            <div className={`ob-before-after ${isMobile ? '' : 'ob-before-after--lg'}`}>
                <div className="ob-ba-card">
                    <div
                        className="ob-ba-img"
                        style={{ backgroundImage: 'url("/assets/pothole.png")' }}
                        aria-label="Pothole on road — before"
                    />
                    <p className="ob-ba-label">Before</p>
                    <p className="ob-ba-sub">Initial report</p>
                </div>

                <div className="ob-ba-card">
                    <div
                        className="ob-ba-img"
                        style={{ backgroundImage: 'url("/assets/story_roads.png")' }}
                        aria-label="Repaired road — after"
                    >
                        <div className="ob-ba-badge">
                            <span className="material-symbols-outlined" style={{ color: '#10B981', fontSize: 18 }}>check_circle</span>
                        </div>
                    </div>
                    <p className="ob-ba-label">After</p>
                    <p className="ob-ba-sub">Work complete</p>
                </div>
            </div>

            <div className="ob-content">
                <h3 className={`ob-title ${isMobile ? 'ob-title--sm' : 'ob-title--lg'}`}>
                    See Before &amp; After Proof
                </h3>
                <p className={`ob-body ${isMobile ? 'ob-body--sm' : 'ob-body--lg'}`}>
                    Our platform provides visual verification of all resolved issues so you can
                    see the impact of your reports.
                </p>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────
   Root Onboarding Screen
───────────────────────────────────────────────────────────────── */
const OnboardingScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';

    // Global State
    const currentSlide = useAppStore(state => state.currentSlide);
    const nextSlide = useAppStore(state => state.nextSlide);
    const prevSlide = useAppStore(state => state.prevSlide);
    const setCurrentSlide = useAppStore(state => state.setCurrentSlide);
    const isAutoPlaying = useAppStore(state => state.isAutoPlaying);
    const setIsAutoPlaying = useAppStore(state => state.setIsAutoPlaying);
    const navigate = useAppStore(state => state.navigate);

    const autoPlayRef = useRef(null);
    const pauseTimerRef = useRef(null);

    // Swipe/Drag Refs
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const isDragging = useRef(false);

    // Auto Slide Logic
    const startAutoPlay = useCallback(() => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            nextSlide();
        }, 4000);
    }, [nextSlide]);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, []);

    const pauseAutoPlay = useCallback(() => {
        stopAutoPlay();
        if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = setTimeout(() => {
            startAutoPlay();
        }, 5000);
    }, [startAutoPlay, stopAutoPlay]);

    useEffect(() => {
        if (isAutoPlaying) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
        return () => stopAutoPlay();
    }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

    // Interaction Handlers
    const handleNext = () => {
        nextSlide();
        pauseAutoPlay();
    };

    const handleSkip = () => {
        setCurrentSlide(2);
        pauseAutoPlay();
    };

    const handleGetStarted = () => {
        navigate('role-selection');
    };

    // Swipe Threshold
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) nextSlide();
            else prevSlide();
            pauseAutoPlay();
        }
        touchStartX.current = null;
    };

    const onMouseDown = (e) => {
        isDragging.current = true;
        touchStartX.current = e.clientX;
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        touchEndX.current = e.clientX;
    };

    const onMouseUp = () => {
        if (!isDragging.current) return;
        if (touchStartX.current && touchEndX.current) {
            const distance = touchStartX.current - touchEndX.current;
            if (Math.abs(distance) > minSwipeDistance) {
                if (distance > 0) nextSlide();
                else prevSlide();
                pauseAutoPlay();
            }
        }
        isDragging.current = false;
        touchStartX.current = null;
    };

    return (
        <div className={`ob-root ${!isMobile ? 'ob-root--desktop' : ''}`}>
            <div
                className="ob-slider-track"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                <div className="ob-slide"><Slide1 isMobile={isMobile} /></div>
                <div className="ob-slide"><Slide2 isMobile={isMobile} /></div>
                <div className="ob-slide"><Slide3 isMobile={isMobile} /></div>
            </div>

            {/* Pagination & Buttons — Fixed at bottom */}
            <div className="ob-footer">
                <div className="ob-dots">
                    {[0, 1, 2].map(idx => (
                        <div
                            key={idx}
                            className={`ob-dot ${currentSlide === idx ? 'ob-dot--active' : ''}`}
                            onClick={() => { setCurrentSlide(idx); pauseAutoPlay(); }}
                        />
                    ))}
                </div>

                <div className="ob-actions">
                    {currentSlide < 2 ? (
                        <>
                            <button className="ob-btn-primary" onClick={handleNext}>Next</button>
                            <button className="ob-btn-skip" onClick={handleSkip}>Skip</button>
                        </>
                    ) : (
                        <button className="ob-btn-primary" onClick={handleGetStarted}>Get Started</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;
