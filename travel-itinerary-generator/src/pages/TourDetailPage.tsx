import Footer from "../components/Footer";
import BookingCard from "../components/BookingCard";
import HeroBanner from "../components/HeroBanner";
import TourTabs from "../components/TourTabs";
import {
  scenicImages,
  tourExcluded,
  tourFacts,
  tourIncluded,
  tourTimeline,
} from "../data/siteContent";

type TourMode = "information" | "plan" | "location" | "gallery";

interface TourDetailPageProps {
  mode: TourMode;
}

function TourDetailPage({ mode }: TourDetailPageProps) {
  return (
    <div className="site-page">
      <HeroBanner
        backgroundImage={scenicImages.tourHero}
        size="page"
        eyebrow="Explore"
        title="Landscapes"
        subtitle="The detail views share one shell and swap the main content to match the four reference screens."
      />

      <main className="content-shell">
        <section className="tour-panel">
          <TourTabs />

          <div className="tour-layout">
            <div className="tour-main">
              {mode === "information" ? <InformationSection /> : null}
              {mode === "plan" ? <PlanSection /> : null}
              {mode === "location" ? <LocationSection /> : null}
              {mode === "gallery" ? <GallerySection /> : null}
            </div>

            <BookingCard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function InformationSection() {
  return (
    <section className="tour-section">
      <div className="tour-section__heading">
        <div>
          <h2>Switzerland</h2>
          <span className="tour-price">1,000 $ / Per Couple</span>
        </div>
        <span className="rating-pill">5.0</span>
      </div>

      <p className="tour-copy">
        This information panel mirrors the wide left-column layout from the
        reference: description copy, practical details, and a compact gallery at
        the bottom of the section.
      </p>

      <div className="facts-grid">
        {tourFacts.map((fact) => (
          <div key={fact.label} className="fact-row">
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
        <div className="fact-row">
          <span>Not Included</span>
          <strong>{tourExcluded.join(" / ")}</strong>
        </div>
        <div className="fact-row">
          <span>Included</span>
          <strong>{tourIncluded.join(" / ")}</strong>
        </div>
      </div>

      <h3>From our gallery</h3>
      <div className="gallery-strip">
        {[scenicImages.galleryOne, scenicImages.galleryTwo, scenicImages.galleryThree, scenicImages.galleryFour].map(
          (image) => (
            <div
              key={image}
              className="gallery-strip__item"
              style={{ backgroundImage: `url(${image})` }}
            />
          ),
        )}
      </div>
    </section>
  );
}

function PlanSection() {
  return (
    <section className="tour-section">
      <h2>Tour Plan</h2>
      <div className="timeline">
        {tourTimeline.map((entry) => (
          <article key={entry.day} className="timeline-entry">
            <span className="timeline-entry__day">{entry.day}</span>
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <ul className="bullet-points bullet-points--compact">
                <li>5 star accommodation</li>
                <li>Breakfast</li>
                <li>Personal guide</li>
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="tour-section">
      <h2>Tour Plan</h2>
      <p className="tour-copy">
        A location-heavy layout with a large map block and descriptive text,
        matching the overall balance from the location mock.
      </p>
      <div
        className="map-frame"
        style={{
          backgroundImage:
            "url(https://staticmap.openstreetmap.de/staticmap.php?center=46.948,7.4474&zoom=6&size=900x520&markers=46.948,7.4474,red-pushpin)",
        }}
      />
      <p className="tour-copy">
        Scenic transfer routes, clustered attractions, and smooth movement between
        stops are emphasized so this section feels useful rather than decorative.
      </p>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="tour-section">
      <div className="gallery-masonry">
        <div
          className="gallery-masonry__tall"
          style={{ backgroundImage: `url(${scenicImages.galleryThree})` }}
        />
        <div
          className="gallery-masonry__small"
          style={{ backgroundImage: `url(${scenicImages.galleryOne})` }}
        />
        <div
          className="gallery-masonry__small"
          style={{ backgroundImage: `url(${scenicImages.galleryTwo})` }}
        />
        <div
          className="gallery-masonry__wide"
          style={{ backgroundImage: `url(${scenicImages.galleryFour})` }}
        />
        <div
          className="gallery-masonry__wide"
          style={{ backgroundImage: `url(${scenicImages.galleryFive})` }}
        />
      </div>

      <div className="pager-row">
        <span>(</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>)</span>
      </div>
    </section>
  );
}

export default TourDetailPage;
