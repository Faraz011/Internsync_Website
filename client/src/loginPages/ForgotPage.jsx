import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import backImg from '../assets/backgroundImg.png';
import logoImg from '../assets/logo.svg';
import internImg from '../assets/intern-sync.svg';
import { useAuth } from '../hooks/useAuth';

function ForgotPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Function to generate random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Function to send OTP via your backend API
  const sendOTP = async (email, otpCode) => {
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const otpCode = generateOTP();
      await sendOTP(email, otpCode);
      
      // Navigate to verification page with email
      navigate('/verification', { state: { email } });
    } catch (error) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
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
              Enter your email for the verification process, we will send 6 digits code to your email.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="flex flex-col w-full" onSubmit={handleContinue}>
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
              }}
              className="flex w-[537px] px-[12px] py-[16px] items-center gap-[5px] mb-[20px]"
              placeholder="Enter your Email here"
              style={{
                borderRadius: "5px",
                border: "1px solid #A0A0A0",
                background: "#FFF"
              }}
              required
            />
           
            <button
              type="submit"
              disabled={loading}
              className={`flex w-[562px] px-8 py-[18px] justify-center items-center gap-[10px] 
                font-semibold text-white rounded-[5px] transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-lg'
              }`}
            >
              {loading ? 'Sending...' : 'Continue'}
            </button>
         
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPage;
