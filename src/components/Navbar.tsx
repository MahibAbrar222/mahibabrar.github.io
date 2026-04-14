import { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

type Theme = 'light' | 'dark';

const navLinks = [
  { name: 'Home', to: '/', id: 'home' },
  { name: 'About', to: '/about', id: 'about' },
  { name: 'Projects', to: '/#projects', id: 'projects' },
  { name: 'Contact', to: '/#contact', id: 'contact' },
  { name: 'Blog', to: '/blog', id: 'blog' },
];

function getPreferredTheme(): Theme {
  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getActiveSectionId(pathname: string, hash: string, fallbackSection: string): string {
  if (pathname.startsWith('/blog') || pathname.startsWith('/bn/blog')) {
    return 'blog';
  }

  if (pathname === '/about') {
    return 'about';
  }

  if (pathname === '/') {
    if (hash === '#projects') {
      return 'projects';
    }

    if (hash === '#contact') {
      return 'contact';
    }

    if (hash === '#about') {
      return 'about';
    }

    return fallbackSection;
  }

  return '';
}

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionFromScroll, setActiveSectionFromScroll] = useState('home');
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const sections = [
      { id: 'hero', navId: 'home' },
      { id: 'about', navId: 'about' },
      { id: 'projects', navId: 'projects' },
      { id: 'contact', navId: 'contact' },
    ];

    const handleSectionChange = () => {
      const offsetY = window.scrollY + 140;
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= offsetY) {
          currentSection = section.navId;
        }
      }

      setActiveSectionFromScroll(currentSection);
    };

    handleSectionChange();
    window.addEventListener('scroll', handleSectionChange);
    window.addEventListener('resize', handleSectionChange);

    return () => {
      window.removeEventListener('scroll', handleSectionChange);
      window.removeEventListener('resize', handleSectionChange);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const activeSection = getActiveSectionId(location.pathname, location.hash, activeSectionFromScroll);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const themeButtonLabel = theme === 'dark' ? 'Use light mode' : 'Use dark mode';

  return (
    <><nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-text" onClick={handleLinkClick}>
            <span className="logo-icon">◈</span>
            <span className="logo-name">Mahib</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <span className="nav-link-text">{link.name}</span>
              <span className="nav-link-underline"></span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions desktop-nav">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={themeButtonLabel}
            title={themeButtonLabel}
          >
            <span aria-hidden="true">{theme === 'dark' ? 'SUN' : 'MOON'}</span>
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <Link to="/#contact" className="cta-btn" onClick={handleLinkClick}>
            Let's Talk
          </Link>
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
            <Link
              key={link.id}
              to={link.to}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/#contact" className="mobile-cta-btn" onClick={handleLinkClick}>
            Let's Talk
          </Link>
          <button
            type="button"
            className="theme-toggle-btn mobile-theme-toggle"
            onClick={toggleTheme}
            aria-label={themeButtonLabel}
          >
            <span aria-hidden="true">{theme === 'dark' ? 'SUN' : 'MOON'}</span>
            <span>{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
          </button>
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