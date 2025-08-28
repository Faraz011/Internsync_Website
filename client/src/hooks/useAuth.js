// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
  const [authState, setAuthState] = useState(authService.getAuthState());

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.subscribe((newAuthState) => {
      setAuthState(newAuthState);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return {
    // State
    user: authState.user,
    authToken: authState.authToken,
    loading: authState.loading,
    isAuthenticated: authState.isAuthenticated,
    
    // Methods
    signIn: authService.signIn.bind(authService),
    signUp: authService.signUp.bind(authService),
    signOut: authService.signOut.bind(authService),
    sendOTP: authService.sendOTP.bind(authService),
    verifyOTP: authService.verifyOTP.bind(authService),
    getIdToken: authService.getIdToken.bind(authService)
  };
};
