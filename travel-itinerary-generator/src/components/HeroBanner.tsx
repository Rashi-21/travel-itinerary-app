import type { CSSProperties, ReactNode } from "react";
import NavBar from "./NavBar";

interface HeroBannerProps {
  backgroundImage: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  size?: "hero" | "page";
  className?: string;
  children?: ReactNode;
}

function HeroBanner({
  backgroundImage,
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "page",
  className = "",
  children,
}: HeroBannerProps) {
  const style = {
    backgroundImage: `linear-gradient(180deg, rgba(12, 33, 55, 0.45), rgba(12, 33, 55, 0.08)), url(${backgroundImage})`,
  } satisfies CSSProperties;

  return (
    <header className={`hero-banner hero-banner--${size} ${className}`} style={style}>
      <div className="hero-banner__inner">
        <NavBar />

        <div className={`hero-banner__content hero-banner__content--${align}`}>
          {eyebrow ? <span className="section-eyebrow section-eyebrow--light">{eyebrow}</span> : null}
          <h1 className="hero-banner__title">{title}</h1>
          {subtitle ? <p className="hero-banner__subtitle">{subtitle}</p> : null}
          {children}
        </div>
      </div>
    </header>
  );
}

export default HeroBanner;
