import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './services/auth.service';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import './App.css';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;