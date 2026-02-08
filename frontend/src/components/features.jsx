import React from "react"; 
import {CiLock, CiClock2} from "react-icons/ci";
import {SlEnergy} from "react-icons/sl"; 

const cards = [
    {bgColor: "#312826", color: "blue", icon: <CiLock />, head: "End to end encryption", description: "Your messages are encrypted locally before they leave your device. Only you and the recipient have the keys."}, 
    {bgColor: "#2A243D", color: "purple", icon: <CiClock2 />, head: "No logs policy", description: "We never store your personal data, IP addresses or chat history. Once the chat ends it's gone forever."}, 
    {bgColor: "#1B243B", color: "orange", icon: <SlEnergy />, head: "Instant Connection", description: "Connect with anyone using a link with a single click instantly. You can connect instantly."}
]; 

const Features = () => {
    return (
        <div className=" bg-[#161B26] mt-40 py-10 flex flex-col space-y-20 items-center w-full mt-5 p-2 text-white">
            <div className="max-w-7xl mx-auto">
            <div className="text-3xl font-bold text-center mb-12">
                Why choose Xchat?
                <p className="text-lg text-gray-500 text-center mt-4 font-light">Security and Anonymity are our top priorities. We built a platform where security isn't just <br />a feature, it's the foundation.</p>
            </div>
            <div className="flex space-x-20 mt-2">
                {cards.map((item, idx) => {
                    return <div className="gap-2  flex flex-col justify-center bg-[#1D1F27] rounded-lg p-4 items-start">
                            <p className={`text-3xl text-${item.color}-600 mb-3`}>{item.icon}</p>
                            <p className="text-xl font-semibold tracking-tight">{item.head}</p>
                            <p className="text-md font-regular text-[#757D8C] ">{item.description}</p>
                        </div>
                })}
            </div> 
            </div>
        </div> 
    )
}

export default Features;
