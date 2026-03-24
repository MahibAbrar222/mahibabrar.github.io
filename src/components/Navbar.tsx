import { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: "/about", id: "about" },
    { name: "Projects", href: "/projects", id: "projects" },
    { name: "Contact", href: "/contact", id: "contact" },
    { name: "Blog", href: "/blog", id: "blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionChange = () => {
      const sections = navLinks.map(link => link.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 0) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSectionChange);
    return () => window.removeEventListener('scroll', handleSectionChange);
  }, []);
  // Also Check the current Route
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentLink = navLinks.find(link => link.href === currentPath);
    if (currentLink) {
      setActiveSection(currentLink.id);
    }
  }, [window.location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <><nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="#home" className="logo-text" onClick={handleLinkClick}>
            <span className="logo-icon">◈</span>
            <span className="logo-name">Mahib</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <span className="nav-link-text">{link.name}</span>
              <span className="nav-link-underline"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="navbar-cta desktop-nav">
          <a href="#contact" className="cta-btn" onClick={handleLinkClick}>
            Let's Talk
          </a>
        </div>

        {/* Hamburger Menu */}
        <div
          className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="mobile-cta-btn" onClick={handleLinkClick}>
            Let's Talk
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={handleLinkClick}></div>
      )}
    </nav>
    <div className="navbar-margin"></div></>
  );
}