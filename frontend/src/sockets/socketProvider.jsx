import {createContext, useContext, useEffect} from "react";
import {socket} from "./socket.js";


const SocketContext = createContext(null); 

export const SocketProvider = ({children}) => {
    useEffect(() => {
        socket.connect(); 

        return () => {
            console.log("this ran");
            socket.disconnect(); 
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}> 
            {children} 
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext); 
