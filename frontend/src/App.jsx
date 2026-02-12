import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from "react-router"; 
import Home from "./pages/Home.jsx"; 
import Create from "./pages/Create.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<Create />} /> 
                <Route path="/chat/:roomId" element={<Chat />} /> 
            </Routes>        
        </BrowserRouter>
    </div> 
  )
}

export default App
