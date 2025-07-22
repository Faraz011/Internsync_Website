import React from 'react';
import './App.css'; 
import backImg from './assets/backgroundImg.png';
import logoImg from './assets/logo.svg';
import internImg from './assets/intern-sync.svg';
import react from './assets/react.svg';
import { FcGoogle } from "react-icons/fc"; 
import { FaLinkedin } from "react-icons/fa";


function Home() {
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
        <div className="flex w-[596px] flex-col items-center justify-start px-[25px] ">
          
          <div className="flex flex-col items-center mt-[5px] gap-[5px] mt-0">
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
          <form className="flex flex-col w-full ">

            <label htmlFor="username" className="text-gray-700 font-semibold mb-[5px]">User Name</label>
            <input
              id="username"
              type="text"
              className="flex w-[537px] px-[12px] py-[16px] items-center gap-[5px]"

              placeholder="Enter your employee email id here"
              style={{
              borderRadius: "5px",
              border: "1px solid #A0A0A0",
              background: "#FFF"
              }}

            />
            <label htmlFor="password" className="text-gray-700 font-semibold mb-[5px] mt-[16px]">Password</label>
            <input
              id="password"
              type="password"
             className="flex w-[537px] px-[12px] py-[16px] items-center gap-[10px]"
             style={{
              borderRadius: "5px",
              border: "1px solid #A0A0A0",
              background: "#FFF"
              }}

              placeholder="Enter your password"
            />
            {/* Security text and captcha */}
            <label htmlFor="security" className="text-gray-700 font-semibold mt-[16px] mb-[5px]">Security Text</label>
            <div className="flex   items-center gap-[10px]">
              <input
                id="security"
                type="text"
               className="flex w-[360px] px-[12px] py-[16px] items-center gap-[10px]"
                placeholder="Enter the shown text"
                style={{
              borderRadius: "5px",
              border: "1px solid #A0A0A0",
              background: "#FFF"
              }}
              />
              <div className="flex h-[48px] w-[165px] items-center  justify-center "
                style={{
                  background: "#FFF",
                  borderRadius: "5px",
                  border: "1px solid #A0A0A0"  
                }}>
                4Gk7q
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="remember" className="form-checkbox h-4 w-4 text-blue-600 mt-[10px] mb-[10px]" />
              <label htmlFor="remember" className="text-gray-700 mt-[10px] mb-[10px]">Remember me</label>
            </div>
            
            {/* Login Button */}
            <button
            type="submit"
           className="flex w-[562px] px-8 py-[18px] justify-center items-center gap-[10px] font-semibold text-white  rounded-[5px] 
            hover:scale-102 hover:shadow-lg transition-all duration-200"
              >
               Login
             </button>

            <div className="text-center text-gray-500 mt-[12px] text-sm semi-bold">Trouble logging in ?</div>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm mt-[20px] mb-[20px]">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <div className="flex justify-center gap-6">
              <button type="button" className="px-[2px] border rounded-full hover:bg-gray-100 transition">
                <img src={FcGoogle} alt="Google" className="w-6 h-6" />
              </button>
              <button type="button" className="px-[2px] border rounded-full hover:bg-gray-100 transition">
                <img src={FaLinkedin} alt="LinkedIn" className="w-6 h-6" />
              </button>
              </div>


            </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
