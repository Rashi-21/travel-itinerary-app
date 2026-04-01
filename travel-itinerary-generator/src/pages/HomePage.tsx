import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import PackageCard from "../components/PackageCard";
import SectionTitle from "../components/SectionTitle";
import {
  destinationHighlights,
  scenicImages,
  services,
  testimonials,
} from "../data/siteContent";

function HomePage() {
  return (
    <div className="site-page">
      <HeroBanner
        backgroundImage={scenicImages.homeHero}
        size="hero"
        align="left"
        title={
          <>
            No matter where
            <br />
            you're going, we'll
            <br />
            take you there.
          </>
        }
        subtitle="Intentional trips, premium pacing, and a travel UI inspired by the supplied references."
      >
        <div className="hero-search-card">
          <div>
            <strong>Adventure</strong>
            <span>Find your destination</span>
          </div>
          <div>
            <strong>Flexible</strong>
            <span>Choose your dates</span>
          </div>
          <div>
            <strong>Comfort</strong>
            <span>Tailored packages</span>
          </div>
        </div>
      </HeroBanner>

      <section className="partner-strip partner-strip--image">
        <img
          alt="Travel partners including Emirates, trivago, airbnb, Turkish Airlines, and SWISS"
          className="partner-strip__image"
          src="/partners-strip.png"
        />
      </section>

      <main className="content-shell content-shell--stacked">
        <section className="content-block">
          <SectionTitle
            eyebrow="Best Services"
            title="We Offer Best Services"
            description="A clean editorial mix of cards, spotlights, and sections to echo the overall Figma language."
            align="center"
          />

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <span className="service-card__icon">{service.title.charAt(0)}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-split">
          <div className="feature-media">
            <div
              className="feature-media__large"
              style={{ backgroundImage: `url(${scenicImages.alpineLake})` }}
            />
            <div
              className="feature-media__small"
              style={{ backgroundImage: `url(${scenicImages.tropicalBeach})` }}
            />
          </div>

          <div className="feature-copy">
            <SectionTitle
              eyebrow="Honeymoon Specials"
              title="Our Romantic Tropical Destinations"
              description="The home page uses an asymmetrical split layout and warm editorial colors to get closer to your references."
            />
            <p>
              The composition is intentionally spacious, with layered cards,
              rounded imagery, and travel merchandising blocks instead of generic
              landing-page sections.
            </p>
            <button className="button" type="button">
              View Package
            </button>
          </div>
        </section>

        <section className="booking-showcase">
          <div className="booking-showcase__copy">
            <SectionTitle
              eyebrow="Easy Planning"
              title="Get Your Favorite Resort Bookings"
              description="A slimmer booking module and card stack hint at the richer builder flow you shared in the package form screen."
            />
            <ul className="bullet-points">
              <li>Warm visual tone with coral CTAs</li>
              <li>Soft cards, scenic imagery, and airy spacing</li>
              <li>Content blocks composed like a travel editorial spread</li>
            </ul>
          </div>

          <div className="booking-showcase__card">
            <div className="mini-board">
              <div className="mini-board__header">
                <strong>Upcoming Highlights</strong>
                <span>7 days</span>
              </div>
              <div className="mini-board__images">
                <div style={{ backgroundImage: `url(${scenicImages.galleryFour})` }} />
                <div style={{ backgroundImage: `url(${scenicImages.galleryTwo})` }} />
                <div style={{ backgroundImage: `url(${scenicImages.gallerySix})` }} />
              </div>
              <div className="mini-board__footer">
                <span>Paris</span>
                <span>Rome</span>
                <span>Zurich</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="nature-banner"
          style={{ backgroundImage: `url(${scenicImages.mountainRoad})` }}
        >
          <div className="nature-banner__overlay">
            <span className="section-eyebrow section-eyebrow--light">Explore Nature</span>
            <h2>Make Every Journey Feel Like A Story Worth Keeping.</h2>
          </div>
        </section>

        <section className="content-block">
          <SectionTitle
            eyebrow="Trending Tours"
            title="Our Trending Tour Packages"
            description="Cards and captions intentionally echo the package archive structure so the site feels like one system."
            align="center"
          />

          <div className="package-grid package-grid--three">
            {destinationHighlights.slice(0, 3).map((destination) => (
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
        </section>

        <section className="content-block">
          <SectionTitle
            eyebrow="Testimonials"
            title="See What Our Clients Say About Us"
            description="The testimonial area is kept airy and centered to mimic the lower section of the home and about designs."
            align="center"
          />

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
                <p>{testimonial.quote}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
