import './App.css';
import useAppStore from './store/useAppStore';
import DualViewLayout from './components/layout/DualViewLayout';
import OnboardingScreen from './components/screens/OnboardingScreen';
import RoleSelectionScreen from './components/screens/RoleSelectionScreen';
import CitizenRegisterScreen from './components/screens/CitizenRegisterScreen';
import OfficialLoginScreen from './components/screens/OfficialLoginScreen';
import WorkerLoginScreen from './components/screens/WorkerLoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import IssueDetailScreen from './components/screens/IssueDetailScreen';
import IssueFullDetailsScreen from './components/screens/IssueFullDetailsScreen';
import ReportIssueScreen from './components/screens/ReportIssueScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import EditProfileScreen from './components/screens/EditProfileScreen';
import DraftDetailsScreen from './components/screens/DraftDetailsScreen';
import DraftListScreen from './components/screens/DraftListScreen';
import AiInsightPage from './components/screens/AiInsightPage';
import LocationModal from './components/modals/LocationModal';
import MockLoginScreen from './components/screens/MockLoginScreen';
import WorkerDashboardScreen from './components/screens/WorkerDashboardScreen';
import OfficialDashboardScreen from './components/screens/OfficialDashboardScreen';
import { useEffect } from 'react';

function App() {
  const currentRoute = useAppStore(state => state.currentRoute);
  const showLocationModal = useAppStore(state => state.showLocationModal);
  const locationPermission = useAppStore(state => state.locationPermission);
  const setShowLocationModal = useAppStore(state => state.setShowLocationModal);

  // Automatically trigger location detection prompt if not yet decided
  useEffect(() => {
    // We can delay it slightly for better UX (so it doesn't pop up immediately)
    const timer = setTimeout(() => {
      if (locationPermission === 'prompt') {
        setShowLocationModal(true);
      }
    }, 1500); // 1.5s delay

    return () => clearTimeout(timer);
  }, [locationPermission, setShowLocationModal]);

  // Basic route protection mock
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  const renderContent = (variant) => {
    // Unprotected routes
    if (['login', 'onboarding', 'role-selection', 'citizen-register', 'worker-login', 'official-login'].includes(currentRoute)) {
      // Proceed to switch block
    } else if (!isAuthenticated) {
      // Force redirect to login if attempting to access protected route without auth
      // Use timeout to avoid state updates during render
      setTimeout(() => useAppStore.getState().navigate('login'), 0);
      return <MockLoginScreen variant={variant} />;
    }

    switch (currentRoute) {
      case 'onboarding':
      case 'login':
        return <MockLoginScreen variant={variant} />;
      case 'home':
      case 'citizen-dashboard':
        // Assuming citizen-dashboard is home for now
        return <HomeScreen variant={variant} />;
      case 'worker-dashboard':
        return <WorkerDashboardScreen variant={variant} />; // Temp worker dashboard component (fallback)
      case 'official-dashboard':
        return <OfficialDashboardScreen variant={variant} />; // Temp official dashboard component (fallback)
      case 'issue-detail':
        return <IssueDetailScreen variant={variant} />;
      case 'full-issue-details':
        return <IssueFullDetailsScreen variant={variant} />;
      case 'report-issue':
        return <ReportIssueScreen variant={variant} />;
      case 'profile':
        return <ProfileScreen variant={variant} />;
      case 'edit-profile':
        return <EditProfileScreen variant={variant} />;
      case 'draft-details':
        return <DraftDetailsScreen variant={variant} />;
      case 'draft-list':
        return <DraftListScreen variant={variant} />;
      case 'ai-insight':
        return variant === 'mobile' ? <AiInsightPage variant={variant} /> : <HomeScreen variant={variant} />;
      case 'role-selection':
        return <RoleSelectionScreen variant={variant} />;
      case 'citizen-register':
        return <CitizenRegisterScreen variant={variant} />;
      case 'official-login':
        return <OfficialLoginScreen variant={variant} />;
      case 'worker-login':
        return <WorkerLoginScreen variant={variant} />;
      default:
        return <MockLoginScreen variant={variant} />;
    }
  };

  return (
    <>
      <DualViewLayout
        desktopContent={renderContent('desktop')}
        mobileContent={renderContent('mobile')}
      />
      {showLocationModal && <LocationModal />}
    </>
  );
}

export default App;
