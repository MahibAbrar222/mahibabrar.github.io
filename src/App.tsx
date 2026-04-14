import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from './Home';
import Blog from './Blog';
import { useEffect } from 'react';
import About from './About';
import BlogPost from './BlogPost';

export default function App(){
    const location = useLocation();
    useEffect(() => {
        requestAnimationFrame(() => {
            window.dispatchEvent(new Event("render-event"));
            console.log("Render event dispatched for route change to:", location.pathname)
        });
        }, [location.pathname]);
    return (<>
        <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/bn/blog" element={<Blog />} />
            <Route path="/bn/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

        <footer className="footer">
            <p>&copy; 2026 Mahib Abrar. All rights reserved.</p>
        </footer>
    </>);
}