import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import NotificationPage from './pages/NotificationPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import PageLoader from './components/PageLoader';
import {useAuthUser} from './hooks/userAuthUser';
import Layout from './components/Layout';
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200 text-base-content">
      <Routes>
        {/* Home */}
        <Route 
          path="/" 
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
        />

        {/* Signup/Login */}
        <Route 
          path="/signup" 
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          } 
        />

        {/* Protected Pages */}
        <Route 
          path="/call/:id" 
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ):(
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route 
          path="/chat/:id" 
          element={
            isAuthenticated && isOnboarded ?(
              <Layout showSidebar={false}>
                <ChatPage/>
              </Layout>
            ):(
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route 
          path="/notification" 
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <NotificationPage/>
              </Layout>
            ):(
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* Onboarding */}
        <Route 
          path="/onboarding" 
          element={
            isAuthenticated ? (
              !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
