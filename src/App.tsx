
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Welcome from './pages/onboarding/Welcome';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import FeatureTour from './pages/onboarding/FeatureTour';
import AssessmentMBTI from './pages/onboarding/AssessmentMBTI';
import AssessmentADHD from './pages/onboarding/AssessmentADHD';
import Goals from './pages/onboarding/Goals';
import Dashboard from './pages/Dashboard';
import FocusMode from './pages/FocusMode';
import TaskCalendar from './pages/TaskCalendar';
import RewardsRoom from './pages/RewardsRoom';
import Analytics from './pages/Analytics';
import MoodCheck from './pages/MoodCheck';
import DistractionBlocker from './pages/DistractionBlocker';

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <UserProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/onboarding/tour" element={<FeatureTour />} />
                <Route path="/onboarding/mbti" element={<AssessmentMBTI />} />
                <Route path="/onboarding/adhd" element={<AssessmentADHD />} />
                <Route path="/onboarding/goals" element={<Goals />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/focus" element={<ProtectedRoute><FocusMode /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><TaskCalendar /></ProtectedRoute>} />
                <Route path="/rewards" element={<ProtectedRoute><RewardsRoom /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/mood" element={<ProtectedRoute><MoodCheck /></ProtectedRoute>} />
                <Route path="/blocker" element={<ProtectedRoute><DistractionBlocker /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </UserProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
