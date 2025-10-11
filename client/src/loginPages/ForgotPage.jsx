import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import '../App.css'; 
import backImg from '../assets/backgroundImg.png';
import logoImg from '../assets/logo.svg';
import internImg from '../assets/intern-sync.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    // FIXED: Corrected email regex (removed extra backslashes)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      console.log('Attempting to send password reset email to:', email); // Debug log
      
      await sendPasswordResetEmail(auth, email);
      
      console.log('Password reset email sent successfully'); // Debug log
      setSuccess('Password reset email sent! Please check your inbox and spam folder for the reset link.');
      
      // Optional: Clear the email field after success
      setEmail('');
    } catch (error) {
      console.error('Password reset error:', error.code, error.message); // Enhanced debug log
      let errorMessage = 'Failed to send password reset email. Please try again.';
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address. Please check your email or sign up first.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/'); // Navigate back to your login page
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div
        className="flex w-[610px] h-[680px] flex-shrink-0"
        style={{
          borderRadius: "17.778px",
          border: "5px solid rgba(213, 213, 213, 0.25)",
          background: "#FFF"
        }}
      >
        <div className="flex w-[596px] flex-col justify-start px-[25px]">
          
          <div className="flex flex-col items-center mt-[5px] gap-[5px]">
            <div
              className="w-[80px] h-[80px] aspect-square"
              style={{
                backgroundImage: `url(${logoImg})`,
                backgroundRepeat: "no-repeat"
              }}
            ></div>
            <div
              className="w-[218px] h-[80px] aspect-square"
              style={{
                backgroundImage: `url(${internImg})`,
                backgroundRepeat: "no-repeat"
              }}
            ></div> 
          </div>

          <div className="mb-[5px] mt-[16px]">
            <h1 className="text-left text-lg font-semibold">
              Forgot Password
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
              {success}
            </div>
          )}

          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-gray-700 font-semibold mb-[5px]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Clear error when user types
                setSuccess(''); // Clear success message when user types
              }}
              className="flex w-[537px] px-[12px] py-[16px] items-center gap-[5px] mb-[20px]"
              placeholder="Enter your employee email id here"
              style={{
                borderRadius: "5px",
                border: "1px solid #A0A0A0",
                background: "#FFF"
              }}
              required
              disabled={loading}
            />
           
            <button
              type="submit"
              disabled={loading}
              className={`flex w-[562px] px-8 py-[18px] justify-center items-center gap-[10px] 
                font-semibold text-white rounded-[5px] transition-all duration-200 mb-4 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-lg'
              }`}
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>

            <button
              type="button"
              onClick={handleBackToLogin}
              disabled={loading}
              className="text-center text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200"
            >
              ← Back to Login
            </button>
         
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
