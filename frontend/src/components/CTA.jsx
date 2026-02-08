import React from "react"; 

const CTA = () => {
    return (
        <div className="w-full p-15 h-96 flex flex-col justify-center items-center"> 
            <div className="w-7/8 relative flex flex-col pt-10 items-center bg-white rounded-lg bg-gradient-to-br from-[#1559EA] to-[#6823AA] h-96" >
        <div
        className={
          "absolute z-1 inset-0 [background-size:20px_20px] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        }
      />
            <div className="z-10 flex flex-col items-center gap-2">
                <p className="text-5xl  text-white text-center font-extrabold">Ready to Dive In!</p>
                <p className="text-[#D8E7FD]  tracking-tight">Join the number 1 Anonymous Chat Platform and start chatting Securely. No Login Required.</p> 
                <button className="bg-white mt-4 py-4 px-6 rounded-2xl text-[#1559EA] text-lg tracking-wide cursor-pointer">Start Chatting!</button>
                <p className="text-[#A7BAF2]">By Starting, You agree to our terms and conditions.</p>
            </div>
            </div>
        </div> 
    )
}

export default CTA;
