import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import SectionTitle from "../components/SectionTitle";
import { galleryPackages, scenicImages, stats, testimonials } from "../data/siteContent";

function AboutPage() {
  return (
    <div className="site-page">
      <HeroBanner
        backgroundImage={scenicImages.aboutHero}
        size="page"
        title="About Us"
        subtitle="An editorial travel brand built with sweeping hero imagery, rounded cutouts, and soft gallery sections."
      />

      <main className="content-shell content-shell--stacked">
        <section className="feature-split feature-split--about">
          <div className="feature-copy">
            <SectionTitle
              eyebrow="Why We Travel"
              title="We Provide You Best Europe Sightseeing Tours"
              description="The about page follows your screenshot with a scenic hero, an intro split block, a mid-page banner, and a grid-led lower half."
            />
            <button className="button" type="button">
              View Packages
            </button>
          </div>

          <div
            className="circle-photo"
            style={{ backgroundImage: `url(${scenicImages.alpineLake})` }}
          />
        </section>

        <section
          className="wanderlust-banner"
          style={{ backgroundImage: `url(${scenicImages.canyon})` }}
        >
          <div className="wanderlust-banner__overlay">
            <h2>Wanderlust</h2>
          </div>
        </section>

        <section className="about-stats">
          <div
            className="about-stats__polaroid"
            style={{ backgroundImage: `url(${scenicImages.galleryFour})` }}
          />

          <div className="about-stats__copy">
            <SectionTitle
              eyebrow="Tour Plans"
              title="Our Popular Tour Plans"
              description="Circular accents, percentages, and a package gallery mirror the personality of the design without copying it literally."
            />
            <div className="stat-row">
              {stats.map((stat) => (
                <article key={stat.label} className="stat-pill">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-block">
          <SectionTitle
            eyebrow="International Packages"
            title="Our International Packages"
            description="A collage layout keeps the page from feeling templated and gives us the same scrapbook travel vibe."
            align="center"
          />

          <div className="mosaic-grid">
            {galleryPackages.map((item) => (
              <article key={item.title} className="mosaic-card">
                <div
                  className="mosaic-card__image"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="mosaic-card__caption">
                  <span>{item.title}</span>
                  <strong>$680</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-block">
          <SectionTitle
            eyebrow="Testimonials"
            title="See What Our Clients Say About Us"
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

export default AboutPage;
