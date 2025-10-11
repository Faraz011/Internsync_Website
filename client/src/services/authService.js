// src/services/authService.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

class AuthService {
  constructor() {
    // Initialize Firebase
    this.firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
    this.functions = getFunctions(this.app);
    
    // State management
    this.user = null;
    this.authToken = null;
    this.loading = true;
    this.listeners = new Set(); // Store component listeners
    
    // Initialize auth state listener
    this.initAuthStateListener();
  }

  // Initialize Firebase auth state listener
  initAuthStateListener() {
    onAuthStateChanged(this.auth, async (user) => {
      this.user = user;
      this.loading = false;
      
      if (user) {
        try {
          const token = await user.getIdToken();
          this.authToken = token;
          localStorage.setItem('authToken', token);
        } catch (error) {
          console.error('Error getting token:', error);
          this.authToken = null;
          localStorage.removeItem('authToken');
        }
      } else {
        this.authToken = null;
        localStorage.removeItem('authToken');
      }
      
      // Notify all subscribed components
      this.notifyListeners();
    });
  }

  // Subscribe component to auth state changes
  subscribe(callback) {
    this.listeners.add(callback);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  // Notify all subscribed components of state change
  notifyListeners() {
    this.listeners.forEach(callback => {
      callback({
        user: this.user,
        authToken: this.authToken,
        loading: this.loading,
        isAuthenticated: !!this.user
      });
    });
  }

  // Get current auth state
  getAuthState() {
    return {
      user: this.user,
      authToken: this.authToken,
      loading: this.loading,
      isAuthenticated: !!this.user
    };
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      // State will be updated automatically by the auth state listener
      return userCredential;
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  // Sign up with email and password
  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  // Sign out
  async signOut() {
    try {
      await signOut(this.auth);
      // State will be updated automatically by the auth state listener
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  // Send OTP via Firebase Functions
  async sendOTP(email) {
    try {
      const otp = this.generateOTP();
      const sendOTPFunction = httpsCallable(this.functions, 'sendOTP');
      const result = await sendOTPFunction({ email, otp });
      return result.data;
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }

  // Verify OTP via Firebase Functions
  async verifyOTP(email, otp) {
    try {
      const verifyOTPFunction = httpsCallable(this.functions, 'verifyOTP');
      const result = await verifyOTPFunction({ email, otp });
      return result.data;
    } catch (error) {
      throw this.handleFirebaseError(error);
    }
  }
  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Get current user's ID token
  async getIdToken(forceRefresh = false) {
    try {
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(forceRefresh);
        this.authToken = token;
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error getting ID token:', error);
      this.authToken = null;
      return null;
    }
  }

  // Force refresh the token
  async refreshToken() {
    try {
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(true); // Force refresh
        this.authToken = token;
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.authToken = null;
      return null;
    }
  }

  // Handle Firebase errors
  handleFirebaseError(error) {
    let message = 'An error occurred';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email address';
        break;
      case 'auth/wrong-password':
        message = 'Invalid password';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid email or password';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters';
        break;
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists';
        break;
      // Firebase Functions errors
      case 'not-found':
        message = 'OTP not found or expired';
        break;
      case 'deadline-exceeded':
        message = 'OTP has expired';
        break;
      case 'invalid-argument':
        message = 'Invalid OTP';
        break;
      default:
        message = error.message || message;
    }
    
    return new Error(message);
  }
}

// Create and export singleton instance
export default new AuthService();
