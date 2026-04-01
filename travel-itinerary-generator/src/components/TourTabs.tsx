import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Information", to: "/tour/information" },
  { label: "Tour Plan", to: "/tour/plan" },
  { label: "Location", to: "/tour/location" },
  { label: "Gallery", to: "/tour/gallery" },
];

function TourTabs() {
  return (
    <div className="tour-tabs" role="tablist" aria-label="Tour details">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          className={({ isActive }) => `tour-tab${isActive ? " tour-tab--active" : ""}`}
          to={tab.to}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default TourTabs;
