import React from 'react';
import useAppStore from '../../store/useAppStore';
import './DraftDetailsScreen.css';

/**
 * DraftDetailsScreen Component
 * 
 * Shows details of a saved draft and allows posting it.
 */
const DraftDetailsScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';
    const navigate = useAppStore(state => state.navigate);
    const drafts = useAppStore(state => state.drafts);
    const selectedIssueId = useAppStore(state => state.selectedIssueId);
    const addIssue = useAppStore(state => state.addIssue);
    const deleteDraft = useAppStore(state => state.deleteDraft);

    const draft = drafts.find(d => d.id === selectedIssueId);

    if (!draft) {
        return (
            <div className="draft-details-root">
                <header className="draft-header">
                    <button className="back-btn-circle" onClick={() => navigate('draft-list')}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="header-title">Draft Not Found</h1>
                </header>
                <div className="empty-state">
                    <span className="material-symbols-outlined">error</span>
                    <p>Draft was not found or has been deleted.</p>
                </div>
            </div>
        );
    }

    const handlePostDraft = () => {
        // Post the draft as a real issue
        addIssue({
            title: draft.title,
            category: draft.category,
            description: draft.description,
            location: draft.location,
            image: draft.image || '/assets/pothole.png',
            coordinates: draft.coordinates,
            priority: draft.priority
        });

        // Delete the draft from store
        deleteDraft(draft.id);

        // Success state / feedback could be added here
        alert('Draft posted successfully!');
        navigate('home');
    };

    return (
        <div className={`draft-details-root ${!isMobile ? 'root--desktop' : 'root--mobile'}`}>
            <header className="draft-header">
                <button className="back-btn-circle" onClick={() => navigate('draft-list')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="header-title">Draft Details</h1>
                <div style={{ width: 40 }}></div>
            </header>

            <main className="draft-main custom-scrollbar">
                {draft.image && (
                    <div className="draft-media">
                        <img src={draft.image} alt="Draft" className="draft-img" />
                    </div>
                )}

                <div className="draft-content">
                    <div className="content-row">
                        <span className="label">Title</span>
                        <h2 className="value">{draft.title}</h2>
                    </div>

                    <div className="content-row">
                        <span className="label">Category</span>
                        <div className="tag">{draft.category}</div>
                    </div>

                    <div className="content-row">
                        <span className="label">Location</span>
                        <div className="value-with-icon">
                            <span className="material-symbols-outlined">location_on</span>
                            <span>{draft.location}</span>
                        </div>
                    </div>

                    <div className="content-row">
                        <span className="label">Priority</span>
                        <div className={`priority-badge ${draft.priority.toLowerCase()}`}>
                            {draft.priority}
                        </div>
                    </div>

                    <div className="content-row">
                        <span className="label">Description</span>
                        <div className="description-text">{draft.description}</div>
                    </div>
                </div>
                
                <div style={{ height: '100px' }} />
            </main>

            <footer className="draft-footer">
                <button className="post-btn" onClick={handlePostDraft}>
                    <span className="material-symbols-outlined">send</span>
                    Post This
                </button>
                <button className="delete-btn" onClick={() => {
                    if(confirm('Are you sure you want to delete this draft?')) {
                        deleteDraft(draft.id);
                        navigate('profile');
                    }
                }}>
                    <span className="material-symbols-outlined">delete</span>
                    Delete Draft
                </button>
            </footer>
        </div>
    );
};

export default DraftDetailsScreen;
