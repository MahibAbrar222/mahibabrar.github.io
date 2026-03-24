import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from './Home';
import Blog from './Blog';
import { useEffect } from 'react';
import About from './About';

export default function App(){
    const location = useLocation();
    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event("render-event"));
        }, 100); // small delay to ensure DOM ready
        }, []);
    useEffect(() => {
    console.log("Route rendered:", location.pathname);
  }, [location]);
    return (<>
        <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="/blog" element={<Blog />} />
        </Routes>

        <footer className="footer">
            <p>&copy; 2026 Mahib Abrar. All rights reserved.</p>
        </footer>
    </>);
}