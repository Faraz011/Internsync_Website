import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backImg from '../assets/backgroundImg.png';
import logoImg from '../assets/logo.svg';
import internImg from '../assets/intern-sync.svg';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Get signIn method from the hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use the signIn method from authService via useAuth hook
      await signIn(email, password);
      navigate('/'); // Navigate to dashboard instead of '/'
    } catch (error) {
      setError(error.message); // Error is already formatted by authService
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
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
        <div className="flex w-[596px] flex-col items-center justify-start px-[25px]">
          
          <div className="flex flex-col items-center mt-[0px] gap-[5px]">
            <div
              className="w-[80px] h-[80px] aspect-square"
              style={{
                backgroundImage: `url(${logoImg})`,
                backgroundRepeat: "no-repeat"
              }}
            ></div>
            <div
              className="w-[230px] h-[80px] aspect-square"
              style={{
                backgroundImage: `url(${internImg})`,
                backgroundRepeat: "no-repeat"
              }}
            ></div>
          </div>

          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <label htmlFor="username" className="text-gray-700 font-semibold mb-[5px]">
              User Name
            </label>
            <input
              id="username"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="flex w-[537px] px-[12px] py-[16px] items-center gap-[5px]"
              placeholder="Enter your employee email id here"
              style={{
                borderRadius: "5px",
                border: "1px solid #A0A0A0",
                background: "#FFF"
              }}
              required
            />

            <label htmlFor="password" className="text-gray-700 font-semibold mb-[5px] mt-[16px]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="flex w-[537px] px-[12px] py-[16px] items-center gap-[10px] mb-[20px]"
              style={{
                borderRadius: "5px",
                border: "1px solid #A0A0A0",
                background: "#FFF"
              }}
              placeholder="Enter your password"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className={`flex w-[538px] px-8 py-[18px] justify-center items-center gap-[10px] font-semibold text-white rounded-[5px] transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:scale-102 hover:shadow-lg'
              }`}
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>

            <div 
              className="text-center text-black mt-[12px] text-sm font-semibold cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
