import React from 'react';
import '../App.css'; 
import backImg from '../assets/backgroundImg.png';
import logoImg from '../assets/logo.svg';
import internImg from '../assets/intern-sync.svg';




function ForgotPage() {
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
        <div className="flex w-[596px] flex-col  justify-start px-[25px] ">
          
          <div className="flex flex-col items-center mt-[5px] gap-[5px] mt-0">
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
             <h1 className="text-left text-lg">
               Forgot Password
             </h1>
             <p>Enter your email for the verification process, we will send 6 digits code to your email.</p>
           </div>
          <form className="flex flex-col w-full ">

            <label htmlFor="username" className="text-gray-700 font-semibold mb-[5px]">E mail</label>
            <input
              id="username"
              type="text"
              className="flex w-[537px] px-[12px] py-[16px] items-center gap-[5px] mb-[20px]"

              placeholder="Enter your E mail here"
              style={{
              borderRadius: "5px",
              border: "1px solid #A0A0A0",
              background: "#FFF"
              }}

            />
           
           
            <button
            type="submit"
             className="flex w-[562px] px-8 py-[18px] justify-center items-center gap-[10px] 
             font-semibold text-white bg-black rounded-[5px] 
                        hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200"
                        >
                      Continue
            </button>
         
        </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPage;
