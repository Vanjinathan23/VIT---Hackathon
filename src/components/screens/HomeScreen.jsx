import React from 'react';
import useAppStore from '../../store/useAppStore';
import AiInsightPanel from './AiInsightPanel';
import './HomeScreen.css';

/**
 * HomeScreen Component (Instagram Layout Style)
 * 
 * Citizen View for civic issue reporting.
 * Adopts Instagram structure: Header, Media, Actions, Caption, Count.
 */
const HomeScreen = ({ variant = 'mobile' }) => {
    const isMobile = variant === 'mobile';

    // Global State
    const issues = useAppStore(state => state.issues);
    const user = useAppStore(state => state.user);
    const currentRoute = useAppStore(state => state.currentRoute);
    const navigate = useAppStore(state => state.navigate);
    const setSelectedIssueId = useAppStore(state => state.setSelectedIssueId);
    const currentAiIssueId = useAppStore(state => state.currentAiIssueId);
    const setAiIssueId = useAppStore(state => state.setAiIssueId);

    // Header Component
    const Header = () => (
        <header className="home-header">
            <div className="home-logo">CivicStream</div>

            <div className="home-header-icons">
                <div className="icon-btn">
                    <span className="material-symbols-outlined" style={{ fontSize: 26 }}>notifications</span>
                </div>
            </div>
        </header>
    );

    // Post Component
    const IssuePost = ({ issue }) => {
        const voteIssue = useAppStore(state => state.voteIssue);
        const addComment = useAppStore(state => state.addComment);
        const voteComment = useAppStore(state => state.voteComment);
        const [showComments, setShowComments] = React.useState(false);
        const [commentInput, setCommentInput] = React.useState('');

        const getStatusClass = (status) => {
            switch (status) {
                case 'Pending': return 'status-pending';
                case 'Processing': return 'status-inprogress';
                case 'Verified': return 'status-completed';
                default: return '';
            }
        };

        const handlePostClick = () => {
            setSelectedIssueId(issue.id);
            navigate('issue-detail'); // Navigate to map view with this issue selected
        };

        const handleVote = (e, type) => {
            e.stopPropagation();
            voteIssue(issue.id, type);
        };

        const handleCommentSubmit = () => {
            if (!commentInput.trim()) return;
            addComment(issue.id, {
                name: user.username,
                role: 'Citizen',
                text: commentInput,
                time: 'Just now',
                avatar: user.profileImage
            });
            setCommentInput('');
        };

        return (
            <article className="issue-post" onClick={handlePostClick} style={{ cursor: 'pointer', margin: isMobile ? '0 0 32px 0' : '0' }}>
                {/* 1. Header Row */}
                <div className="post-header">
                    <div className="post-user-info" onClick={(e) => { e.stopPropagation(); navigate('profile'); }}>
                        <div className="profile-circle">
                            {issue.profileImage ? (
                                <img src={issue.profileImage} alt={issue.author?.name || issue.username} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#1e3a8a' }}>account_balance</span>
                            )}
                        </div>
                        <div className="post-user-meta">
                            <span className="post-username">{issue.author?.name || issue.username}</span>
                            <span className="post-location">{issue.location}</span>
                        </div>
                    </div>
                    {user.id === (issue.citizen_id || issue.userId) ? (
                        <div className="icon-btn" style={{ display: 'flex', gap: '8px', zIndex: 10 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#3b82f6', cursor: 'pointer' }} title="Edit" onClick={(e) => { e.stopPropagation(); }}>edit</span>
                            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#ef4444', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); useAppStore.getState().deleteIssue(issue.id); }} title="Delete">delete</span>
                        </div>
                    ) : (
                        <div className="icon-btn">
                            <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#8e8e8e' }}>more_horiz</span>
                        </div>
                    )}
                </div>

                {/* Sub-header (Issue ID & Category) */}
                <div className="post-sub-header">
                    <span className="post-id">{issue.id}</span>
                    <span className="post-category-tag">{issue.category}</span>
                </div>

                {/* 2. Media Section */}
                <div className="post-media">
                    <img src={issue.image} alt={issue.title} className="post-img" />
                    <div className={`post-status-badge ${getStatusClass(issue.status)}`}>
                        {issue.status}
                    </div>
                </div>

                {/* 3. Action Row */}
                <div className="post-actions">
                    <div className="actions-left">
                        <span
                            className="material-symbols-outlined action-icon"
                            style={{
                                color: issue.userVote === 'up' ? '#3b82f6' : 'inherit',
                                fontVariationSettings: issue.userVote === 'up' ? "'FILL' 1" : "''"
                            }}
                            onClick={(e) => handleVote(e, 'up')}
                        >thumb_up</span>
                        <span
                            className="material-symbols-outlined action-icon"
                            style={{
                                color: issue.userVote === 'down' ? '#ef4444' : 'inherit',
                                fontVariationSettings: issue.userVote === 'down' ? "'FILL' 1" : "''"
                            }}
                            onClick={(e) => handleVote(e, 'down')}
                        >thumb_down</span>
                        <span
                            className="material-symbols-outlined action-icon"
                            style={{ fontVariationSettings: showComments ? "'FILL' 1" : "''" }}
                            onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}
                        >chat_bubble</span>

                        {/* AI Insight Button */}
                        <div
                            className={`ai-trigger-icon-btn ${currentAiIssueId === issue.id ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                const isActivating = issue.id !== currentAiIssueId;
                                setAiIssueId(isActivating ? issue.id : null);
                                setSelectedIssueId(isActivating ? issue.id : null);
                                navigate(isActivating ? 'ai-insight' : 'home');
                            }}
                            title="AI Insights"
                        >
                            <span className="material-symbols-outlined">auto_awesome</span>
                        </div>
                    </div>
                </div>

                {/* 4. Support Count */}
                <div className="post-support-count">
                    {issue.supportCount || 0} citizens supported this issue
                </div>

                {/* 5. Caption Section */}
                <div className="post-caption">
                    <span className="caption-username">{issue.author?.name || issue.username}</span>
                    <span className="caption-title">{issue.title}</span>
                    <p className="caption-body">{issue.description}</p>
                </div>

                {/* 6. Comment Section (Expandable) */}
                {showComments && (
                    <div className="post-comments-area" onClick={(e) => e.stopPropagation()}>
                        <div className="comments-mini-list">
                            {issue.comments.map(c => (
                                <div key={c.id} className="mini-comment">
                                    <img src={c.avatar} alt={c.name} className="comment-avatar-mini" />
                                    <div className="comment-bubble">
                                        <div className="comment-header-row">
                                            <span className="comment-user-name">{c.name}</span>
                                            <div className="comment-voting">
                                                <span
                                                    className="material-symbols-outlined comment-vote-icon"
                                                    style={{
                                                        color: c.userVote === 'up' ? '#3b82f6' : 'inherit',
                                                        fontVariationSettings: c.userVote === 'up' ? "'FILL' 1" : "''"
                                                    }}
                                                    onClick={() => voteComment(issue.id, c.id, 'up')}
                                                >thumb_up</span>
                                                <span className="comment-vote-count">{c.votes || 0}</span>
                                                <span
                                                    className="material-symbols-outlined comment-vote-icon"
                                                    style={{
                                                        color: c.userVote === 'down' ? '#ef4444' : 'inherit',
                                                        fontVariationSettings: c.userVote === 'down' ? "'FILL' 1" : "''"
                                                    }}
                                                    onClick={() => voteComment(issue.id, c.id, 'down')}
                                                >thumb_down</span>
                                            </div>
                                        </div>
                                        <p className="comment-text-mini">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <span className="post-details-link" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIssueId(issue.id);
                    navigate('issue-detail');
                }} style={{ marginBottom: 12 }}>View Full Details</span>
            </article>
        );
    };

    // Bottom Navigation (Mobile)
    const MobileNav = () => (
        <nav className="mobile-nav">
            <div className={`nav-item ${currentRoute === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>
                <span className="material-symbols-outlined" style={{ fontSize: 30, fontVariationSettings: currentRoute === 'home' ? "'FILL' 1" : "''" }}>home</span>
            </div>
            <div className={`nav-item ${currentRoute === 'issue-detail' ? 'active' : ''}`} onClick={() => { setAiIssueId(null); setSelectedIssueId(null); navigate('issue-detail'); }}>
                <span className="material-symbols-outlined" style={{ fontSize: 30, fontVariationSettings: currentRoute === 'issue-detail' ? "'FILL' 1" : "''" }}>map</span>
            </div>
            <div className="nav-plus-btn" onClick={() => { setAiIssueId(null); navigate('report-issue'); }}>
                <span className="material-symbols-outlined" style={{ fontSize: 30 }}>add</span>
            </div>
            <div className="nav-item">
                <span className="material-symbols-outlined" style={{ fontSize: 30 }}>notifications</span>
            </div>
            <div className={`nav-item ${currentRoute === 'profile' ? 'active' : ''}`} onClick={() => navigate('profile')}>
                <span className="material-symbols-outlined" style={{ fontSize: 30, fontVariationSettings: currentRoute === 'profile' ? "'FILL' 1" : "''" }}>person</span>
            </div>
        </nav>
    );

    // Sidebar Component (Desktop Only)
    const Sidebar = () => (
        <aside className="home-sidebar">
            <div className="sidebar-logo">CivicStream</div>
            <nav className="sidebar-nav">
                <div
                    className={`sidebar-item ${currentRoute === 'home' || currentRoute === 'ai-insight' ? 'active' : ''}`}
                    onClick={() => { setAiIssueId(null); navigate('home'); }}
                >
                    <span className="material-symbols-outlined">home</span>
                    <span>Home</span>
                </div>
                <div className={`sidebar-item ${currentRoute === 'issue-detail' ? 'active' : ''}`} onClick={() => { setAiIssueId(null); setSelectedIssueId(null); navigate('issue-detail'); }}>
                    <span className="material-symbols-outlined">map</span>
                    <span>Map View</span>
                </div>
                <div className="sidebar-item">
                    <span className="material-symbols-outlined">notifications</span>
                    <span>Notifications</span>
                </div>
                <div className={`sidebar-item ${currentRoute === 'report-issue' ? 'active' : ''}`} onClick={() => navigate('report-issue')}>
                    <span className="material-symbols-outlined">add_box</span>
                    <span>Issue Report</span>
                </div>
            </nav>
            <div className="sidebar-footer">
                <div className={`sidebar-item ${currentRoute === 'profile' ? 'active' : ''}`} onClick={() => { setAiIssueId(null); navigate('profile'); }}>
                    <span className="material-symbols-outlined">account_circle</span>
                    <span>Profile</span>
                </div>
            </div>
        </aside>
    );

    // Sidebar Components
    const SuggestedFriends = () => {
        const switchCitizenAccount = useAppStore(state => state.switchCitizenAccount);
        const myCitizenAccounts = useAppStore(state => state.myCitizenAccounts) || [];

        const availableAccounts = [
            { id: 'user_456', name: 'Sarah Civic', username: 'sarah_civic', img: 'https://i.pravatar.cc/150?u=sarah' },
            { id: 'user_789', name: 'Mike Chennai', username: 'mike_chennai', img: 'https://i.pravatar.cc/150?u=mike' },
            { id: 'user_101', name: 'Green Activist', username: 'green_activist', img: 'https://i.pravatar.cc/150?u=green' },
            { id: 'user_202', name: 'TN Commuter', username: 'tn_commuter', img: 'https://i.pravatar.cc/150?u=tn' },
            { id: 'user_303', name: 'Urban Planner', username: 'urban_planner', img: 'https://i.pravatar.cc/150?u=planner' }
        ];

        return (
            <div className="home-right-sidebar animate-fade-in" style={{ padding: '0 0 0 0' }}>
                <div className="user-profile-summary" onClick={() => navigate('profile')} style={{ cursor: 'pointer' }}>
                    <div className="profile-large-circle">
                        <img src={user.profileImage} alt={user.username} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                    <div className="user-text-info">
                        <span className="user-username">{user.username}</span>
                        <span className="user-fullname">{user.fullName || 'Chennai Citizen'}</span>
                    </div>
                    <button className="switch-btn" onClick={(e) => { e.stopPropagation(); /* optional trigger modal */ }}>Switch</button>
                </div>

                {myCitizenAccounts.length > 1 && (
                    <>
                        <div className="suggestions-header" style={{ marginTop: '16px' }}>
                            <span className="suggestions-title">My Citizen Accounts</span>
                        </div>
                        <div className="suggestions-list" style={{ marginBottom: '16px' }}>
                            {myCitizenAccounts.filter(a => a.id !== user.id).map(account => (
                                <div key={account.id} className="suggestion-item">
                                    <div className="profile-small-circle">
                                        <img src={account.img} alt={account.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="suggestion-text">
                                        <span className="suggestion-username">{account.username}</span>
                                        <span className="suggestion-subtext" style={{ fontSize: '11px', color: '#8e8e8e' }}>Previously Active</span>
                                    </div>
                                    <button className="follow-btn" onClick={() => switchCitizenAccount(account)}>Switch</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="suggestions-header" style={{ marginTop: myCitizenAccounts.length > 1 ? 0 : '16px' }}>
                    <span className="suggestions-title">Switch Accounts</span>
                    <span className="see-all-btn">See All</span>
                </div>

                <div className="suggestions-list">
                    {availableAccounts.filter(a => a.id !== user.id && !myCitizenAccounts.find(m => m.id === a.id)).map(item => (
                        <div key={item.id} className="suggestion-item">
                            <div className="profile-small-circle">
                                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            </div>
                            <div className="suggestion-text">
                                <span className="suggestion-username">{item.username}</span>
                            </div>
                            <button className="follow-btn" onClick={() => switchCitizenAccount(item)}>Switch</button>
                        </div>
                    ))}
                </div>

                <footer className="sidebar-links-footer">
                    <div className="footer-nav">
                        <span>About</span> • <span>Help</span> • <span>Press</span> • <span>API</span> • <span>Jobs</span> • <span>Privacy</span> • <span>Terms</span>
                    </div>
                    <div className="copyright">© 2026 CIVICSTREAM FROM TAMIL NADU</div>
                </footer>
            </div>
        );
    };

    // Stories Bar Component
    const StoriesBar = () => {
        const stories = useAppStore(state => state.stories);
        return (
            <div className="stories-container scrollbar-hide">
                {stories.map(story => (
                    <div key={story.id} className="story-item">
                        <div className={`story-ring ${story.isUser ? 'user-story' : ''}`}>
                            {story.image ? (
                                <div className="story-image" style={{ backgroundImage: `url(${story.image})` }} />
                            ) : (
                                <div className="story-placeholder">
                                    <span className="material-symbols-outlined" style={{ fontSize: 32 }}>{story.icon}</span>
                                </div>
                            )}
                            {story.isUser && (
                                <div className="story-add-badge">
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
                                </div>
                            )}
                        </div>
                        <span className="story-name">{story.name}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`home-root ${!isMobile ? 'home-root--desktop' : 'home-root--mobile'}`}>
            {!isMobile && <Sidebar />}

            <div className="home-content-area">
                <Header />
                <main className="home-feed-scroll scrollbar-hide">
                    <div className="feed-container">
                        {!isMobile ? (
                            // Desktop: Align Side-by-Side
                            issues.map((issue, index) => (
                                <div key={issue.id} className="home-feed-row">
                                    <div className="home-feed-col">
                                        {index === 0 && <StoriesBar />}
                                        <IssuePost issue={issue} />
                                    </div>
                                    <div className="home-side-col">
                                        {currentAiIssueId === issue.id ? (
                                            <AiInsightPanel issueId={issue.id} />
                                        ) : (
                                            !currentAiIssueId && index === 0 ? <SuggestedFriends /> : null
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Mobile: Standard Full Width Feed
                            <>
                                <StoriesBar />
                                {issues.map(issue => (
                                    <IssuePost key={issue.id} issue={issue} />
                                ))}
                            </>
                        )}
                    </div>
                </main>
            </div>

            {isMobile && <MobileNav />}
        </div>
    );
};

export default HomeScreen;
