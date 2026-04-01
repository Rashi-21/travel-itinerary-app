import { Link } from "react-router-dom";

interface PackageCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  rating: string;
}

function PackageCard({ image, title, location, price, rating }: PackageCardProps) {
  return (
    <article className="package-card">
      <div className="package-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="package-card__body">
        <div className="package-card__meta">
          <span>12 September 2026</span>
          <span>12+ People</span>
        </div>
        <h3>{title}</h3>
        <p>{location}</p>
        <div className="package-card__footer">
          <strong>{price}</strong>
          <span>{rating}</span>
        </div>
        <Link className="inline-link" to="/tour/information">
          View tour
        </Link>
      </div>
    </article>
  );
}

export default PackageCard;
