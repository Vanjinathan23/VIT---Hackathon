import React, { useEffect, useState } from 'react';
import useAppStore from '../../store/useAppStore';
import { fetchAIInsights } from '../../services/aiService';
import './AiInsightPanel.css';

/**
 * AiInsightPanel - Modern AI Detail Card
 * Redesigned for SaaS aesthetic with gradients, confidence bar, and structured insights.
 */
const AiInsightPanel = ({ issueId }) => {
    const issues = useAppStore(state => state.issues);
    const aiInsightsCache = useAppStore(state => state.aiInsightsCache);
    const cacheAiResult = useAppStore(state => state.cacheAiResult);
    const setAiIssueId = useAppStore(state => state.setAiIssueId);
    const setSelectedIssueId = useAppStore(state => state.setSelectedIssueId);
    const navigate = useAppStore(state => state.navigate);

    const [loading, setLoading] = useState(false);
    const [insight, setInsight] = useState(null);
    const [showReasoning, setShowReasoning] = useState(false);

    const issue = issues.find(i => i.id === issueId);

    // Centralized confidence score from the insight object
    const confidenceScore = insight?.confidenceScore || 92;

    useEffect(() => {
        if (!issueId || !issue) return;

        if (aiInsightsCache[issueId]) {
            setInsight(aiInsightsCache[issueId]);
        } else {
            const loadInsights = async () => {
                setLoading(true);
                const data = await fetchAIInsights(issue, issues);
                cacheAiResult(issueId, data);
                setInsight(data);
                setLoading(false);
            };
            loadInsights();
        }
    }, [issueId, issue, aiInsightsCache, cacheAiResult, issues]);

    if (!issueId || !issue) return null;

    const getProgClass = (score) => {
        if (score >= 80) return 'high';
        if (score >= 50) return 'medium';
        return 'low';
    };

    return (
        <div className="ai-insight-panel">
            {/* 1. Header Section */}
            <div className="ai-panel-header">
                <div className="ai-header-top">
                    <div className="ai-header-left">
                        <div className="ai-title-row">
                            <span className="material-symbols-outlined ai-spark-icon">auto_awesome</span>
                            <span className="ai-title">AI Analysis</span>
                        </div>
                        <span className="ai-subtitle">Automated Risk Evaluation</span>
                    </div>
                    <div className="ai-header-right">
                        <button className="ai-close-btn" onClick={() => {
                            setAiIssueId(null);
                            setSelectedIssueId(null);
                            navigate('home');
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                        </button>
                    </div>
                </div>

                {/* Confidence Bar */}
                <div className="ai-confidence-container">
                    <div className="ai-bar-label">
                        <span>AI Confidence: {confidenceScore}%</span>
                        <span>{confidenceScore >= 80 ? 'HIGH CONFIDENCE' : confidenceScore >= 50 ? 'STABLE' : 'LOW'}</span>
                    </div>
                    <div className="ai-progress-bg">
                        <div 
                            className={`ai-progress-fill ${getProgClass(confidenceScore)}`} 
                            style={{ width: `${confidenceScore}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="ai-loading-container">
                    <div className="ai-spinner"></div>
                    <p>Generating smart insights...</p>
                </div>
            ) : insight ? (
                <>
                <div className="ai-insight-content">
                    {/* Section 1: Classification & Risk Score */}
                    <div className="ai-content-section">
                        <div className="section-header-flex">
                            <span className="section-label">Analysis & Risk</span>
                            <div className="risk-score-badge">
                                <span className="risk-label">Combined Risk Score</span>
                                <span className="risk-value">{insight.riskScore}/100</span>
                            </div>
                        </div>
                        <div className="classification-grid">
                            <div className="mini-badge-card">
                                <span className="badge-label">Verified Category</span>
                                <span className="badge-value">{insight.verifiedCategory}</span>
                            </div>
                            <div className="mini-badge-card">
                                <span className="badge-label">Severity Level</span>
                                <span className={`badge-value severity-${insight.severity.toLowerCase()}`}>
                                    {insight.severity}
                                </span>
                            </div>
                            <div className="mini-badge-card">
                                <span className="badge-label">Escalation Priority</span>
                                <span className={`badge-value priority-${insight.escalation.toLowerCase()}`}>{insight.escalation}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Real Weather Data Section */}
                    <div className="ai-content-section">
                        <span className="section-label">Environmental Conditions</span>
                        {insight.weatherData ? (
                            <div className="weather-detail-card">
                                <div className="weather-main-row">
                                    <div className="weather-primary">
                                        <span className="weather-temp">{insight.weatherData.current.temp}°C</span>
                                        <span className="weather-desc">{insight.weatherData.current.condition}</span>
                                    </div>
                                    <div className="weather-stats">
                                        <div className="w-stat">
                                            <span className="material-symbols-outlined">umbrella</span>
                                            <span>{insight.weatherData.forecast.rainProbability}% Rain</span>
                                        </div>
                                        <div className="w-stat">
                                            <span className="material-symbols-outlined">humidity_percentage</span>
                                            <span>{insight.weatherData.current.humidity}% Humid</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="weather-forecast-line">
                                    <span className="material-symbols-outlined">info</span>
                                    <p>{insight.weatherData.forecast.shortSummary}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="weather-fallback-card">
                                <span className="material-symbols-outlined">cloud_off</span>
                                <span>Live weather data unavailable.</span>
                            </div>
                        )}
                    </div>

                    {/* Section 3: Impact Analysis */}
                    <div className="ai-content-section">
                        <span className="section-label">Impact Analysis</span>
                        <div className="impact-list">
                            <div className="impact-item">
                                <div className="impact-icon-wrapper">
                                    <span className="material-symbols-outlined">radar</span>
                                </div>
                                <div className="impact-data">
                                    <span className="impact-label">Impact Radius</span>
                                    <span className="impact-val">{insight.impactRadius} area</span>
                                </div>
                            </div>
                            <div className="impact-item">
                                <div className="impact-icon-wrapper">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <div className="impact-data">
                                    <span className="impact-label">Weather Multiplier</span>
                                    <span className="impact-val">+{Math.round((insight.weatherMultiplier - 1) * 100)}% Risk Impact</span>
                                </div>
                            </div>
                            <div className="impact-item">
                                <div className="impact-icon-wrapper">
                                    <span className="material-symbols-outlined">account_balance_wallet</span>
                                </div>
                                <div className="impact-data">
                                    <span className="impact-label">Economic Estimate</span>
                                    <span className="impact-val">{insight.economicEstimate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Risk Context */}
                    <div className="ai-content-section">
                        <span className="section-label">Risk Context</span>
                        <div className="context-box">
                            <div className="context-item highlight">
                                <span className="ctx-label">Nearby risk</span>
                                <span className="ctx-value">{insight.riskContext}</span>
                            </div>
                            <div className="context-item">
                                <span className="ctx-label">Duplicate detection</span>
                                <span className="ctx-value">
                                    {insight.isDuplicate ? `Likely duplicate (${insight.duplicateRef})` : 'No duplicates found'}
                                </span>
                            </div>
                            <div className="context-item highlight">
                                <span className="ctx-label">Est. Resolution</span>
                                <span className="ctx-value">{insight.resolutionTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Expandable Reasoning */}
                    <div className="ai-reasoning-accordion">
                        <button 
                            className="reasoning-trigger" 
                            onClick={() => setShowReasoning(!showReasoning)}
                        >
                            <span>View AI Reasoning</span>
                            <span className={`material-symbols-outlined chevron-icon ${showReasoning ? 'rotated' : ''}`}>
                                expand_more
                            </span>
                        </button>
                        <div className={`reasoning-content ${showReasoning ? 'open' : ''}`}>
                            <div className="weather-impact-note">
                                <strong>Weather Context:</strong> {insight.weatherImpact}
                            </div>
                            <div className="main-reasoning">
                                {insight.reasoning}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions Removed per user request */}
                <div style={{ paddingBottom: 20 }}></div>
                </>
            ) : (
                <div className="ai-error-state" style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
                    <p>Failed to load insights.</p>
                </div>
            )}
        </div>
    );
};

export default AiInsightPanel;
