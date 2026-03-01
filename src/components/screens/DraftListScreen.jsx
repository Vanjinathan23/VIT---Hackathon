import React from 'react';
import useAppStore from '../../store/useAppStore';
import './DraftListScreen.css';

/**
 * DraftListScreen Component
 * 
 * Displays a list of all saved drafts.
 */
const DraftListScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const navigate = useAppStore(state => state.navigate);
    const drafts = useAppStore(state => state.drafts);
    const setSelectedIssueId = useAppStore(state => state.setSelectedIssueId);
    const deleteDraft = useAppStore(state => state.deleteDraft);

    const handleDraftClick = (draftId) => {
        setSelectedIssueId(draftId);
        navigate('draft-details');
    };

    return (
        <div className={`draft-list-root ${!isMobile ? 'root--desktop' : 'root--mobile'}`}>
            <header className="draft-header">
                <button className="back-btn-circle" onClick={() => navigate('profile')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">My Drafts ({drafts.length})</h1>
                <div style={{ width: 40 }}></div>
            </header>

            <main className="draft-main custom-scrollbar">
                {drafts.length > 0 ? (
                    <div className="draft-grid">
                        {drafts.map(draft => (
                            <div key={draft.id} className="draft-item-card" onClick={() => handleDraftClick(draft.id)}>
                                <div className="draft-item-media">
                                    {draft.image ? (
                                        <img src={draft.image} alt={draft.title} className="draft-thumbnail" />
                                    ) : (
                                        <div className="draft-placeholder-icon">
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                    )}
                                    <div className="draft-category-badge">{draft.category}</div>
                                </div>
                                <div className="draft-item-info">
                                    <h3 className="draft-item-title">{draft.title}</h3>
                                    <p className="draft-item-desc">{draft.description?.substring(0, 60)}...</p>
                                    <div className="draft-item-footer">
                                        <div className="draft-location-mini">
                                            <span className="material-symbols-outlined">location_on</span>
                                            <span>{draft.location?.split(',')[0]}</span>
                                        </div>
                                        <button className="draft-delete-mini" onClick={(e) => {
                                            e.stopPropagation();
                                            if(confirm('Delete this draft?')) deleteDraft(draft.id);
                                        }}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-drafts">
                        <span className="material-symbols-outlined">auto_stories</span>
                        <h2>No Saved Drafts</h2>
                        <p>Drafts you save while reporting will appear here.</p>
                        <button className="start-report-btn" onClick={() => navigate('report-issue')}>
                            Start New Report
                        </button>
                    </div>
                )}
                <div style={{ height: '40px' }} />
            </main>
        </div>
    );
};

export default DraftListScreen;
