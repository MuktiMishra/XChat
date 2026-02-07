import React from "react"; 

const Navbar = () => {
    return (
            <div className="w-full border-b border-[#262A2D] h-16 p-4"> 
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-semibold w-96 tracking-tighter">
                XChat
            </div>
            <div className="flex items-center w-96 gap-10 text-white text-xl font-semibold "> 
                <div className="flex gap-6 items-center text-lg text-gray-500 font-light">
                    {["About", "Safety", "Terms"].map((item, idx) => {
                        return <p key={idx}>{item}</p>
                    })}
                </div>
                <button className="bg-blue-600 text-sm rounded-full cursor-pointer text-white font-light px-4 py-2">
                    Start Chatting! 
                </button>
            </div>
           </div>
        </div> 
    )
} 

export default Navbar; 
