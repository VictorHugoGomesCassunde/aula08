import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Registro from './pages/Registro';
import Alterar from './pages/Alterar';
import Header from './components/Header';
import './global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registro" element={<Registro />} />
            <Route path="/alterar/:id" element={<Alterar/>} />
            <Route path="/components"element={<Header/>}/>
            
       </Routes>
    </BrowserRouter>
  </StrictMode>,
)
