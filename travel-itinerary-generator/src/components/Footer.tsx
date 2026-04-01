import type { ReactNode } from "react";

interface SocialLinkProps {
  label: string;
  href: string;
  children: ReactNode;
}

function SocialLink({ label, href, children }: SocialLinkProps) {
  return (
    <a
      aria-label={label}
      className="social-link"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <a className="brand-mark brand-mark--footer" href="/">
          Travel
        </a>
        <p>Travel helps companies manage big journeys with style and clarity.</p>
        <div className="social-row">
          <SocialLink href="https://www.linkedin.com" label="LinkedIn">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.23-3.56A1.95 1.95 0 0 0 5.22 3 1.96 1.96 0 0 0 3.28 4.94c0 1.05.86 1.91 1.94 1.91a1.94 1.94 0 0 0 1.95-1.91ZM20.72 13.06c0-3.47-1.85-5.09-4.32-5.09-1.99 0-2.88 1.09-3.37 1.86V8.5H9.65c.04.88 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.68.12-.92.27-.68.89-1.38 1.93-1.38 1.36 0 1.9 1.04 1.9 2.57V20H20.72Z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://www.instagram.com" label="Instagram">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.9 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.14 5.14 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.34 3.34 0 0 0 12 8.66Z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://x.com" label="X">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M18.9 3H22l-6.78 7.74L23.2 21H16.9l-4.93-6.45L6.33 21H3.2l7.26-8.3L1 3h6.46l4.45 5.88L18.9 3Zm-1.1 16.12h1.72L6.54 4.78H4.7L17.8 19.12Z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://www.facebook.com" label="Facebook">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M13.5 21v-7.13h2.4l.36-2.78H13.5V9.32c0-.8.23-1.35 1.37-1.35h1.46V5.49c-.25-.03-1.12-.1-2.12-.1-2.1 0-3.55 1.28-3.55 3.64v2.06H8.27v2.78h2.39V21h2.84Z" />
            </svg>
          </SocialLink>
        </div>
      </div>

      <div className="site-footer__links">
        <div>
          <h4>Company</h4>
          <a href="/">About Us</a>
          <a href="/">Careers</a>
          <a href="/">Blog</a>
          <a href="/">Pricing</a>
        </div>

        <div>
          <h4>Destinations</h4>
          <a href="/">Maldives</a>
          <a href="/">Los Angeles</a>
          <a href="/">Las Vegas</a>
          <a href="/">Toronto</a>
        </div>
      </div>

      <div className="site-footer__newsletter">
        <h4>Join Our Newsletter</h4>
        <div className="newsletter-form">
          <input placeholder="Your email" type="email" />
          <button type="button">Subscribe</button>
        </div>
        <p>We will send you weekly updates for your better tour packages.</p>
      </div>
    </footer>
  );
}

export default Footer;
