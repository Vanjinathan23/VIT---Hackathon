import React, { useEffect, useState } from 'react';
import useAppStore from '../../store/useAppStore';
import { fetchAIInsights } from '../../services/aiService';
import './AiInsightPage.css';

/**
 * AiInsightPage - Dedicated Mobile View for AI Insights
 * Redesigned for mobile-first SaaS aesthetic with a clean structured layout.
 */
const AiInsightPage = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const selectedIssueId = useAppStore(state => state.selectedIssueId);
    const issues = useAppStore(state => state.issues);
    const aiInsightsCache = useAppStore(state => state.aiInsightsCache);
    const cacheAiResult = useAppStore(state => state.cacheAiResult);
    const navigate = useAppStore(state => state.navigate);
    const setAiIssueId = useAppStore(state => state.setAiIssueId);
    const setSelectedIssueId = useAppStore(state => state.setSelectedIssueId);

    const [loading, setLoading] = useState(false);
    const [insight, setInsight] = useState(null);

    const issue = issues.find(i => i.id === selectedIssueId);

    // Centralized confidence score from the insight object
    const confidenceScore = insight?.confidenceScore || 92;

    useEffect(() => {
        if (!selectedIssueId || !issue) return;

        if (aiInsightsCache[selectedIssueId]) {
            setInsight(aiInsightsCache[selectedIssueId]);
        } else {
            const loadInsights = async () => {
                setLoading(true);
                const data = await fetchAIInsights(issue, issues);
                cacheAiResult(selectedIssueId, data);
                setInsight(data);
                setLoading(false);
            };
            loadInsights();
        }
    }, [selectedIssueId, issue, aiInsightsCache, cacheAiResult, issues]);

    const handleBack = () => {
        setAiIssueId(null);
        setSelectedIssueId(null);
        navigate('home');
    };

    if (!issue) return <div className="ai-page-error">Issue not found</div>;

    const getSevClass = (s) => (s ? `sev-${s.toLowerCase()}` : '');

    return (
        <div className="ai-page-root">
            {/* 1. Header with Back Button */}
            <header className="ai-page-header">
                <button className="ai-back-btn" onClick={handleBack} aria-label="Go back">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">AI Insight</h1>
                <div style={{ width: 40 }}></div> {/* Balance spacer */}
            </header>

            {/* 2. Content Area */}
            <main className="ai-page-content scrollbar-hide">
                {/* Hero Gradient Header */}
                <div className="ai-page-hero">
                    <span className="material-symbols-outlined ai-page-hero-icon">auto_awesome</span>
                    <h1>Smart Insight</h1>
                    <p>Evaluating risk for issue {selectedIssueId}</p>
                    <div className="ai-page-confidence-pill">AI Confidence: {confidenceScore}%</div>
                </div>

                {loading ? (
                    <div className="ai-page-loading">
                        <div className="spinner-outer"></div>
                        <p>Our AI is analyzing the situaton in real-time...</p>
                    </div>
                ) : insight ? (
                    <>
                        <div className="ai-page-insight-list">
                            {/* Combined Risk Score Pill */}
                            <div className="mobile-risk-badge">
                                <span className="m-risk-label">Combined Risk Score</span>
                                <span className="m-risk-value">{insight.riskScore}/100</span>
                            </div>

                            {/* Section: Classification */}
                            <div className="card-title-row">Core Classification</div>
                            <div className="ai-detail-card">
                                <div className="detail-item-row">
                                    <div className="detail-icon-box">
                                        <span className="material-symbols-outlined">category</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Verified Category</span>
                                        <span className="detail-val">{insight.verifiedCategory}</span>
                                    </div>
                                </div>
                                <div className="detail-item-row">
                                    <div className="detail-icon-box">
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Severity Level</span>
                                        <span className={`detail-val sev-badge ${getSevClass(insight.severity)}`}>
                                            {insight.severity}
                                        </span>
                                    </div>
                                </div>
                                <div className="detail-item-row">
                                    <div className="detail-icon-box">
                                        <span className="material-symbols-outlined">send</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Escalation Rec.</span>
                                        <span className="detail-val">{insight.escalation}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Real Weather Data Section */}
                            <div className="card-title-row">Real-Time Weather</div>
                            {insight.weatherData ? (
                                <div className="mobile-weather-card">
                                    <div className="m-weather-header">
                                        <div className="m-weather-main">
                                            <span className="m-weather-temp">{insight.weatherData.current.temp}°C</span>
                                            <span className="m-weather-condition">{insight.weatherData.current.condition}</span>
                                        </div>
                                        <div className="m-weather-icon">
                                            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>cloudy_snowing</span>
                                        </div>
                                    </div>
                                    <div className="m-weather-grid">
                                        <div className="m-weather-stat">
                                            <span className="material-symbols-outlined">umbrella</span>
                                            <span className="stat-v">{insight.weatherData.forecast.rainProbability}%</span>
                                            <span className="stat-l">Rain Prob.</span>
                                        </div>
                                        <div className="m-weather-stat">
                                            <span className="material-symbols-outlined">humidity_high</span>
                                            <span className="stat-v">{insight.weatherData.current.humidity}%</span>
                                            <span className="stat-l">Humidity</span>
                                        </div>
                                    </div>
                                    <div className="m-weather-summary">
                                        <p>{insight.weatherData.forecast.shortSummary}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mobile-weather-fallback">
                                    <span className="material-symbols-outlined">cloud_off</span>
                                    <p>Live weather data unavailable.</p>
                                </div>
                            )}

                            {/* Section: Impacts */}
                            <div className="card-title-row">Environmental & Local Impact</div>
                            <div className="ai-detail-card">
                                <div className="detail-item-row">
                                    <div className="detail-icon-box" style={{ color: '#0ea5e9', background: '#e0f2fe' }}>
                                        <span className="material-symbols-outlined">radar</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Impact Radius</span>
                                        <span className="detail-val">{insight.impactRadius} area</span>
                                    </div>
                                </div>
                                <div className="detail-item-row">
                                    <div className="detail-icon-box" style={{ color: '#f59e0b', background: '#fffbeb' }}>
                                        <span className="material-symbols-outlined">bolt</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Weather Risk Multiplier</span>
                                        <span className="detail-val">+{Math.round((insight.weatherMultiplier - 1) * 100)}% Severity Hike</span>
                                    </div>
                                </div>
                                <div className="detail-item-row">
                                    <div className="detail-icon-box" style={{ color: '#10b981', background: '#ecfdf5' }}>
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Economic Loss Est.</span>
                                        <span className="detail-val">{insight.economicEstimate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Context */}
                            <div className="card-title-row">Operational Context</div>
                            <div className="ai-detail-card">
                                <div className="detail-item-row">
                                    <div className="detail-icon-box" style={{ color: '#312e81', background: '#e0e7ff' }}>
                                        <span className="material-symbols-outlined">apartment</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Nearby Risk Context</span>
                                        <span className="detail-val" style={{ fontSize: 14 }}>{insight.riskContext}</span>
                                    </div>
                                </div>
                                <div className="detail-item-row">
                                    <div className="detail-icon-box" style={{ color: '#ec4899', background: '#fce7f3' }}>
                                        <span className="material-symbols-outlined">copy_all</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Duplicate Detection</span>
                                        <span className="detail-val" style={{ fontSize: 14 }}>
                                            {insight.isDuplicate ? `Likely duplicate of ${insight.duplicateRef}` : 'No similar reports nearby'}
                                        </span>
                                    </div>
                                </div>
                                <div className="detail-item-row">
                                    <div className="detail-icon-box" style={{ color: '#8b5cf6', background: '#f5f3ff' }}>
                                        <span className="material-symbols-outlined">event_available</span>
                                    </div>
                                    <div className="detail-text-stack">
                                        <span className="detail-label">Expected Resolution</span>
                                        <span className="detail-val">{insight.resolutionTime}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reasoning Bubble */}
                            <div className="ai-mobile-reasoning">
                                <div className="mobile-weather-impact-note">
                                    <strong>Weather Impact:</strong> {insight.weatherImpact}
                                </div>
                                <h3>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lightbulb</span>
                                    AI Reasoning
                                </h3>
                                <p>{insight.reasoning}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="ai-page-error" style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
                        Failed to fetch insights. Please check your connection.
                    </div>
                )}
            </main>
        </div>
    );
};

export default AiInsightPage;
