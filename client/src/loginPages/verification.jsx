import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import backImg from '../assets/backgroundImg.png';
import logoImg from '../assets/logo.svg';
import internImg from '../assets/intern-sync.svg';

function VerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  // Create refs for each input
  const inputRefs = useRef([]);

  useEffect(() => {
    // If no email is passed, redirect to forgot password page
    if (!email) {
      navigate('/forgot-password');
      return;
    }

    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current.focus();
    }
  }, [email, navigate]);

  // Function to verify OTP via backend API
  const verifyOTP = async (email, otpCode) => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // Function to resend OTP
  const resendOTP = async () => {
    setLoading(true);
    setError('');
    
    try {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend OTP');
      }

      setSuccess('New verification code sent to your email!');
      setOtp(['', '', '', '', '', '']); // Clear current OTP
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      setError('Failed to resend verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error when user types
    setSuccess(''); // Clear success message

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      
      if (otp[index] !== '') {
        // Clear current field
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      
      // Focus on the next empty field or last field
      const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyOTP(email, otpCode);
      setSuccess('OTP verified successfully!');
      
      // Navigate to reset password page or back to login after success
      setTimeout(() => {
        navigate('/reset-password', { state: { email, verified: true } });
      }, 1500);
    } catch (error) {
      setError('Invalid or expired verification code. Please try again.');
      // Clear OTP fields on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForgotPassword = () => {
    navigate('/forgot-password');
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
              Enter Verification Code
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              We have sent a 6-digit verification code to <span className="font-medium">{email}</span>
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

          <form className="flex flex-col w-full" onSubmit={handleVerify}>
            
            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-3 mb-6 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-[60px] h-[60px] text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  style={{
                    border: digit ? "2px solid #4F46E5" : "2px solid #D1D5DB",
                    background: "#FFF"
                  }}
                  maxLength="1"
                />
              ))}
            </div>
           
            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className={`flex w-[562px] px-8 py-[18px] justify-center items-center gap-[10px] 
                font-semibold text-white rounded-[5px] transition-all duration-200 mb-4 ${
                loading || otp.join('').length !== 6
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-lg'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            {/* Resend Code */}
            <div className="text-center mb-4">
              <span className="text-gray-600 text-sm">Didn't receive the code? </span>
              <button
                type="button"
                onClick={resendOTP}
                disabled={loading}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors duration-200"
              >
                {loading ? 'Sending...' : 'Resend Code'}
              </button>
            </div>

            {/* Back to Forgot Password */}
            <button
              type="button"
              onClick={handleBackToForgotPassword}
              className="text-center text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200"
            >
              ← Back to Email Entry
            </button>
         
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerificationPage;
