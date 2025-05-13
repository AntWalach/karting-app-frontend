import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './services/auth.service';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import TrackListPage from './pages/tracks/TrackListPage';
import TrackCreatePage from './pages/tracks/TrackCreatePage';
import TrackEditPage from './pages/tracks/TrackEditPage';
import RaceDetailsPage from './pages/races/RaceDetailsPage';
import RaceEditPage from './pages/races/RaceEditPage';
import RaceCreatePage from './pages/races/RaceCreatePage';
import './App.css';
import TrackDetailsPage from './pages/tracks/TrackDetailsPage';
import LapCreatePage from './pages/laps/LapCreatePage';
import LapEditPage from './pages/laps/LapEditPage';
import LapDetailsPage from './pages/laps/LapDetailsPage';

// Komponent ochrony tras
const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setAuthChecked(true);
  }, []);

  if (!authChecked) return <div>Ładowanie...</div>;

  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  const [authState, setAuthState] = useState({ isAuthenticated: isAuthenticated() });

  const handleLoginSuccess = () => {
    setAuthState({ isAuthenticated: true });
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            
            <Route 
              path="/login" 
              element={
                authState.isAuthenticated ? (
                  <Navigate to="/users" />
                ) : (
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                )
              } 
            />
            
            <Route 
              path="/register" 
              element={
                authState.isAuthenticated ? (
                  <Navigate to="/users" />
                ) : (
                  <RegistrationForm />
                )
              } 
            />
            
            <Route 
              path="/users" 
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/tracks" 
              element={
                <ProtectedRoute>
                  <TrackListPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/tracks/:id" 
              element={
                <ProtectedRoute>
                  <TrackDetailsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/tracks/new" 
              element={
                <ProtectedRoute>
                  <TrackCreatePage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/tracks/edit/:id" 
              element={
                <ProtectedRoute>
                  <TrackEditPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/tracks/:trackId/races/new"  
              element={
                <ProtectedRoute>
                  <RaceCreatePage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/races/:id" 
              element={
                <ProtectedRoute>
                  <RaceDetailsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/races/:id/edit"
              element={
                <ProtectedRoute>
                  <RaceEditPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/races/:raceId/laps/new"
              element={
                <ProtectedRoute>
                  <LapCreatePage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/laps/:id/edit"
              element={
                <ProtectedRoute>
                  <LapEditPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/laps/:id"
              element={
                <ProtectedRoute>
                  <LapDetailsPage />
                </ProtectedRoute>
              } 
            />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;