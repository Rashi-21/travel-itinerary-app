import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import PackageCard from "../components/PackageCard";
import { destinationHighlights, scenicImages } from "../data/siteContent";

const sortOptions = [
  {
    label: "Date",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M7 2.75a.75.75 0 0 1 .75.75V5h8.5V3.5a.75.75 0 0 1 1.5 0V5h.75A2.5 2.5 0 0 1 21 7.5v11A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11A2.5 2.5 0 0 1 5.5 5h.75V3.5A.75.75 0 0 1 7 2.75ZM4.5 9v9.5c0 .55.45 1 1 1h13a1 1 0 0 0 1-1V9h-15Zm1-2.5a1 1 0 0 0-1 1V7.5h15v-.5a1 1 0 0 0-1-1h-13Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Price Low to High",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12 4a.75.75 0 0 1 .75.75v9.69l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 1.06-1.06l2.72 2.72V4.75A.75.75 0 0 1 12 4ZM6 19.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Price High to Low",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12 20a.75.75 0 0 1-.75-.75V9.56l-2.72 2.72a.75.75 0 0 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06l-2.72-2.72v9.69A.75.75 0 0 1 12 20ZM6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Name (A-Z)",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M6.34 18.5a.75.75 0 0 1-.7-.48l-1.07-2.7H2.75a.75.75 0 1 1 0-1.5h1.22l2.03-5.13a.75.75 0 0 1 1.4 0l2.87 7.26a.75.75 0 1 1-1.4.56l-.65-1.64H5.14l-.7 1.75a.75.75 0 0 1-.7.48Zm1.28-5.13-.95-2.4-.95 2.4h1.9ZM14.4 7.25a.75.75 0 0 1 .6.3l3.44 4.58V8a.75.75 0 0 1 1.5 0v6a.75.75 0 0 1-1.35.45l-3.44-4.58V14a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75Zm.1 10.25h5a.75.75 0 0 1 .58 1.22l-3.78 4.78h3.2a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.58-1.22l3.78-4.78h-3.2a.75.75 0 0 1 0-1.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

function PackagesPage() {
  return (
    <div className="site-page">
      <HeroBanner
        backgroundImage={scenicImages.archiveHero}
        size="page"
        eyebrow="Search Tour"
        title="Travel With Us"
        subtitle="Package archive inspired by the white content slab, filter row, and scenic hero from your screenshot."
      />

      <main className="content-shell">
        <section className="archive-panel">
          <div className="archive-toolbar">
            {sortOptions.map((option) => (
              <button key={option.label} className="archive-toolbar__item" type="button">
                <span className="archive-toolbar__icon">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          <div className="archive-layout">
            <div className="package-grid package-grid--two">
              {destinationHighlights.map((destination) => (
                <PackageCard
                  key={destination.title}
                  image={destination.image}
                  location={destination.location}
                  price={destination.price}
                  rating={destination.rating}
                  title={destination.title}
                />
              ))}
            </div>

            <aside className="archive-sidebar">
              <div className="sidebar-card sidebar-card--planner">
                <h3>Plan Your Trip</h3>
                <p>
                  Ex optio sequi qui voluptatem numquam eum maxime expedita
                  eos illo.
                </p>

                <div className="sidebar-card__fields">
                  <input placeholder="Search Tour" type="text" />
                  <input placeholder="Where To?" type="text" />
                  <input placeholder="Date" type="text" />
                </div>

                <div className="sidebar-card__filter">
                  <h4>Filter By Price</h4>
                  <div className="price-track">
                    <div />
                  </div>
                  <span>Price: $2000 - $3000</span>
                </div>

                <button className="button archive-sidebar__button" type="button">
                  Book Now
                </button>
              </div>

              <div className="archive-visual" aria-hidden="true">
                <img
                  alt=""
                  className="archive-visual__image"
                  src="/archive-visual.png"
                />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PackagesPage;
