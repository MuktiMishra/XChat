import React from "react"; 
import Navbar from "../components/Navbar.jsx";
import {IoIosCheckmarkCircle} from "react-icons/io";

const Home = () => {
    return (
        <div className="w-full mx-auto h-screen bg-[#0A0F14]">
            <Navbar />
          <div className="max-w-7xl mx-auto">
            <div className="flex text-white justify-between items-center h-52">
               <div className="w-1/2 pl-5 pt-40 flex flex-col gap-2">
                    <p className="text-5xl font-bold tracking-tight ">Chat Freely .</p>
                    <p className="text-5xl mb-2 font-bold tracking-tight bg-gradient-to-r from-[#3D81F6] to-pink-500 bg-clip-text leading-13 inline-block text-transparent">Stay Anonymous .</p>
                    <p className="w-96 mb-2 tracking-wide text-gray-400">Experience true freedom of expression with our end-to-end encrypted, log-free chat platform. Connect instantly without compromising your identity.</p>
                    <div className="flex gap-3">
                        <button className="bg-blue-600 rounded-full cursor-pointer px-4 py-2">Start Chatting</button>
                        <button className="bg-slate-900 cursor-pointer px-4 py-2 rounded-full text-white">Learn more</button>
                    </div>
                   <p className="mt-2 flex gap-2 items-center"><IoIosCheckmarkCircle className="text-green-600" size={20}/> 100% Safe</p> 
               </div>
               <div className="w-1/2">
                    SECOND
               </div>
            </div>
           </div>
        </div>
    )
}

export default Home; 
