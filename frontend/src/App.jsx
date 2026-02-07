import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from "react-router"; 
import Home from "./pages/Home.jsx"; 

function App() {
    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>        
        </BrowserRouter>
    </div> 
  )
}

export default App
