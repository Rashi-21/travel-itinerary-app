import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

const secondaryLink = { label: "Upcoming Packages", to: "/packages" };

const serviceLinks = [
  { label: "Honeymoon Packages", to: "/packages" },
  { label: "Tours Packages", to: "/packages" },
  { label: "Musical Events", to: "/packages" },
  { label: "Build Package", to: "/create-package" },
];

function NavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  return (
    <div className="site-nav">
      <div className="site-nav__brand-row">
        <NavLink className="brand-mark" to="/">
          Travel
        </NavLink>

        <button
          aria-controls="site-nav-panel"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`site-nav__menu-toggle${isMenuOpen ? " site-nav__menu-toggle--open" : ""}`}
          type="button"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="site-nav-panel"
        className={`site-nav__panel${isMenuOpen ? " site-nav__panel--open" : ""}`}
      >
        <nav className="site-nav__links" aria-label="Primary">
          {primaryLinks.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `site-nav__link${isActive ? " site-nav__link--active" : ""}`
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}

          <div className={`site-nav__dropdown${isServicesOpen ? " site-nav__dropdown--open" : ""}`}>
            <button
              aria-expanded={isServicesOpen}
              className="site-nav__link site-nav__dropdown-trigger"
              type="button"
              onClick={() => setIsServicesOpen((currentValue) => !currentValue)}
            >
              <span>Services</span>
              <span className="site-nav__caret" />
            </button>

            <div className="site-nav__dropdown-menu">
              {serviceLinks.map((item) => (
                <Link key={item.label} className="site-nav__dropdown-link" to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            className={({ isActive }) =>
              `site-nav__link${isActive ? " site-nav__link--active" : ""}`
            }
            to={secondaryLink.to}
          >
            {secondaryLink.label}
          </NavLink>
        </nav>

        <NavLink className="site-nav__cta" to="/tour/information">
          Get In Touch
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
