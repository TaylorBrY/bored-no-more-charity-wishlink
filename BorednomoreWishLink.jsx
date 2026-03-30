import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
// type: "wishlist" = direct Amazon wish list link
// type: "page"     = hospital/rescue donation page (find their current Amazon list there)
const hospitals = [
  { name: "Boston Children's Hospital", location: "Boston, MA", url: "https://www.childrenshospital.org/services/child-life-services/donations-fundraising", type: "page" },
  { name: "St. Jude Children's Research Hospital", location: "Memphis, TN", url: "https://www.stjude.org/get-involved/other-ways/volunteer-at-the-hospital/donate-toys.html", type: "page" },
  { name: "Duke Children's Hospital", location: "Durham, NC", url: "https://www.dukehealth.org/giving/child-life", type: "page" },
  { name: "Lucile Packard Children's Hospital at Stanford", location: "Palo Alto, CA", url: "https://www.supportlpch.org/give", type: "page" },
  { name: "St. Louis Children's Hospital", location: "St. Louis, MO", url: "https://www.stlouischildrens.org/giving/give/donate-items-from-our-wish-list", type: "page" },
  { name: "Phoenix Children's Hospital", location: "Phoenix, AZ", url: "https://www.phoenixchildrensfoundation.org/ways-to-give", type: "page" },
  { name: "CHOP – Children's Hospital of Philadelphia", location: "Philadelphia, PA", url: "https://www.chop.edu/centers-programs/child-life-education-and-creative-arts-therapy/donate", type: "page" },
  { name: "St. Christopher's Hospital for Children", location: "Philadelphia, PA", url: "https://www.stchristophershospital.com/giving", type: "page" },
  { name: "UPMC Children's Hospital of Pittsburgh", location: "Pittsburgh, PA", url: "https://www.chp.edu/giving", type: "page" },
  { name: "Cincinnati Children's Hospital", location: "Cincinnati, OH", url: "https://www.cincinnatichildrens.org/giving/ways-to-give/items", type: "page" },
  { name: "Texas Children's Hospital – Austin", location: "Austin, TX", url: "https://www.texaschildrens.org/giving", type: "page" },
  { name: "Texas Children's Hospital – Houston", location: "Houston, TX", url: "https://www.texaschildrens.org/giving", type: "page" },
  { name: "Nationwide Children's Hospital", location: "Columbus, OH", url: "https://give.nationwidechildrens.org/site/SPageNavigator/General%20Content/Wish_List_Resources.html", type: "wishlist" },
  { name: "NewYork-Presbyterian Hospital", location: "New York, NY", url: "https://www.nyp.org/giving", type: "page" },
  { name: "University of Chicago – Comer Children's", location: "Chicago, IL", url: "https://www.uchicagomedicine.org/comer/give/donation-wish-lists", type: "page" },
  { name: "UNC Children's Hospital", location: "Chapel Hill, NC", url: "https://uncchildrens.org/child-life/donations", type: "page" },
  { name: "Holtz Jackson Memorial Hospital – Pediatrics", location: "Miami, FL", url: "https://umiamihealth.org/jackson-health-system/giving", type: "page" },
  { name: "UCSF Benioff Children's Hospital", location: "San Francisco, CA", url: "https://www.ucsfbenioffchildrens.org/giving", type: "page" },
  { name: "Cedars-Sinai", location: "Los Angeles, CA", url: "https://www.cedars-sinai.org/giving.html", type: "page" },
  { name: "Monroe Carell Jr. Children's Hospital at Vanderbilt", location: "Nashville, TN", url: "https://www.vanderbiltchildrens.com/giving", type: "page" },
  { name: "University of Virginia Children's Hospital", location: "Charlottesville, VA", url: "https://www.uvahealth.com/giving", type: "page" },
  { name: "Children's Mercy Kansas City", location: "Kansas City, MO", url: "https://www.childrensmercy.org/giving/ways-to-give/gift-in-kind/", type: "page" },
  { name: "Le Bonheur Children's Hospital", location: "Memphis, TN", url: "https://www.lebonheur.org/giving", type: "page" },
  { name: "Yale New Haven Children's Hospital", location: "New Haven, CT", url: "https://www.ynhh.org/about/giving.aspx", type: "page" },
  { name: "Seattle Children's Hospital", location: "Seattle, WA", url: "https://www.seattlechildrens.org/donate/", type: "page" },
  { name: "Arkansas Children's Hospital", location: "Little Rock, AR", url: "https://www.archildrens.org/giving", type: "page" },
  { name: "Children's of Alabama", location: "Birmingham, AL", url: "https://www.childrensal.org/giving", type: "page" },
  { name: "The Children's Hospital at Providence", location: "Anchorage, AK", url: "https://alaska.providence.org/giving", type: "page" },
  { name: "Rocky Mountain Hospital for Children", location: "Denver, CO", url: "https://www.healthonecares.com/rocky-mountain-hospital-for-children/giving.dot", type: "page" },
  { name: "Connecticut Children's Medical Center", location: "Hartford, CT", url: "https://www.connecticutchildrens.org/giving/", type: "page" },
  { name: "Hoops Family Children's Hospital", location: "Huntington, WV", url: "https://www.cabellhuntington.org/give", type: "page" },
  { name: "American Family Children's Hospital – UW Health", location: "Madison, WI", url: "https://www.uwhealth.org/giving/american-family-childrens-hospital", type: "page" },
  { name: "North Carolina Children's Hospital at UNC", location: "Chapel Hill, NC", url: "https://uncchildrens.org/child-life/donations", type: "page" },
  { name: "Kapi'olani Medical Center for Women & Children", location: "Honolulu, HI", url: "https://kapiolani.org/giving/", type: "page" },
  { name: "Golisano Children's Hospital – UVM Health", location: "Burlington, VT", url: "https://www.uvmhealth.org/medcenter/giving", type: "page" },
  { name: "Northern Light Eastern Maine Medical Center – Pediatric Services", location: "Bangor, ME", url: "https://northernlighthealth.org/giving", type: "page" },
  { name: "Hackensack Meridian Children's Health Hospitals", location: "Hackensack, NJ", url: "https://www.hackensackmeridianhealth.org/giving", type: "page" },
];

const rescues = [
  { name: "Lucky Dog Animal Rescue", location: "Washington, DC", url: "https://www.luckydoganimalrescue.org/donate", type: "page" },
  { name: "Secondhand Hounds", location: "Eden Prairie, MN", url: "https://www.secondhandhounds.org/wishlist", type: "page" },
  { name: "Mutt Misfits Animal Rescue", location: "Chicago, IL", url: "https://www.muttmisfits.com/donate", type: "page" },
  { name: "PAWS Adoption Center", location: "Chicago, IL", url: "https://www.paws.org/support/wishlist/", type: "page" },
  { name: "Street Tails Animal Rescue", location: "Philadelphia, PA", url: "https://streettails.org/donate", type: "page" },
  { name: "Rescue Rocks", location: "New Jersey", url: "https://www.rescuerocks.org/donate", type: "page" },
  { name: "ACCT Philly", location: "Philadelphia, PA", url: "https://www.acctphilly.org/donate/", type: "page" },
  { name: "Main Line Animal Rescue", location: "Phoenixville, PA", url: "https://www.mlar.org/ways-to-help/donate/wishlist/", type: "page" },
  { name: "Hart 2 Heart Animal Rescue", location: "Pennsylvania", url: "https://www.hart2heartrescue.org/donate", type: "page" },
  { name: "FoMA – Friends of Miami Animals", location: "Miami, FL", url: "https://www.friendsofmiamianimals.org/donate", type: "page" },
  { name: "Maui Humane Society", location: "Puunene, HI", url: "https://www.mauihumanesociety.org/donate/", type: "page" },
  { name: "North Shore Animal League America", location: "Port Washington, NY", url: "https://www.nsalamerica.org/donate/", type: "page" },
  { name: "Bunny's Buddies", location: "New Jersey", url: "https://bunnysbuddies.rescuegroups.org/donate", type: "page" },
  { name: "Vanderpump Dogs Foundation", location: "Los Angeles, CA", url: "https://www.vanderpumpdogs.org/donate", type: "page" },
  { name: "Dalis To The Rescue", location: "New York, NY", url: "https://www.dalistotheresuue.org/donate", type: "page" },
  { name: "Sky Sanctuary Rescue", location: "Texas", url: "https://www.skysanctuaryrescue.org/donate", type: "page" },
  { name: "Southampton Animal Shelter", location: "Southampton, NY", url: "https://www.southamptonanimalshelter.org/donate", type: "page" },
  { name: "Emotional Rescue Animal Foundation", location: "California", url: "https://emotionalrescue.org/donate", type: "page" },
  { name: "Texas Husky Rescue", location: "Dallas, TX", url: "https://texashuskyrescue.org/donate/", type: "page" },
  { name: "South Coast Humane Society", location: "Bandon, OR", url: "https://www.southcoasthumane.org/donate", type: "page" },
  { name: "Golden Rescue South Florida", location: "South Florida, FL", url: "https://goldenrescuesouthflorida.com/donate/", type: "page" },
  { name: "MatchDog Rescue", location: "Arlington, VA", url: "https://www.matchdogrescue.org/donate", type: "page" },
  { name: "Mikey's Chance Canine Rescue", location: "New Jersey", url: "https://mikeyschance.org/donate", type: "page" },
  { name: "Pawfect Match Rescue & Rehabilitation", location: "New York", url: "https://www.pawfectmatchrescue.org/donate", type: "page" },
  { name: "Lucky Farms Animal Rescue", location: "Nashville, TN", url: "https://www.luckyfarmsrescue.org/donate", type: "page" },
  { name: "Juneau Animal Rescue", location: "Juneau, AK", url: "https://www.juneauanimalrescue.org/donate", type: "page" },
  { name: "Rescue Road", location: "Central Arkansas, AR", url: "https://rescueroadtrips.com/donate/", type: "page" },
  { name: "Last Chance Arkansas", location: "Arkansas", url: "https://lastchancearkansas.org/donate/", type: "page" },
  { name: "Morris Animal Refuge", location: "Philadelphia, PA", url: "https://www.morrisanimalrefuge.org/donate/", type: "page" },
  { name: "Kitty Cottage Adoption Center", location: "Norristown, PA", url: "https://www.kittycottagepa.org/donate", type: "page" },
  { name: "PURR Philly – Philadelphia Urgent Rescue & Relief", location: "Philadelphia, PA", url: "https://purrphilly.org/donate", type: "page" },
  { name: "SAFE Haven for Cats", location: "Raleigh, NC", url: "https://www.safehavenforcats.org/donate/", type: "page" },
  { name: "San Francisco SPCA", location: "San Francisco, CA", url: "https://www.sfspca.org/donate/", type: "page" },
  { name: "Humane Society Silicon Valley", location: "Milpitas, CA", url: "https://www.hssv.org/donate/", type: "page" },
  { name: "Rocket Dog Rescue", location: "San Francisco, CA", url: "https://www.rocketdogrescue.org/donate/", type: "page" },
  { name: "Muttville Senior Dog Rescue", location: "San Francisco, CA", url: "https://muttville.org/donate/", type: "page" },
  { name: "Animal Protection Society of Durham", location: "Durham, NC", url: "https://www.apsofdurham.org/donate", type: "page" },
  { name: "Paws for Life NC", location: "North Carolina", url: "https://www.pawsforlifenc.org/donate", type: "page" },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const PawIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-7.5-5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 10c-3.5 0-7 3-7 6.5C5 19.5 8 22 12 22s7-2.5 7-5.5C19 13 15.5 10 12 10z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

// ─── CARD ─────────────────────────────────────────────────────────────────────
function OrgCard({ org, hoverAccent, badgeColor }) {
  return (
    <a
      href={org.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px",
        padding: "14px 18px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        textDecoration: "none",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `rgba(${hoverAccent}, 0.1)`;
        e.currentTarget.style.borderColor = `rgba(${hoverAccent}, 0.35)`;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Left: name + location */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#e8e0f0", lineHeight: 1.35, marginBottom: "5px" }}>
          {org.name}
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "11.5px",
          color: "rgba(255,255,255,0.38)",
          fontWeight: "500",
        }}>
          <MapPinIcon />
          {org.location}
        </div>
      </div>

      {/* Right: colored badge */}
      <span style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "11px",
        fontWeight: "700",
        color: "#fff",
        background: badgeColor,
        padding: "4px 10px",
        borderRadius: "20px",
        whiteSpace: "nowrap",
        flexShrink: 0,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginTop: "2px",
      }}>
        {org.type === "wishlist" ? "Wish List" : "Donate"} <ExternalIcon />
      </span>
    </a>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
function Section({ title, icon, items, hoverAccent, badgeColor, sectionAccent, filterText }) {
  const filtered = items.filter(o =>
    o.name.toLowerCase().includes(filterText.toLowerCase()) ||
    o.location.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <section style={{ marginBottom: "56px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "24px",
        paddingBottom: "14px",
        borderBottom: `2px solid rgba(${sectionAccent}, 0.35)`,
      }}>
        <span style={{ color: `rgb(${sectionAccent})` }}>{icon}</span>
        <h2 style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: "700",
          color: "#f0e6ff",
          letterSpacing: "0.02em",
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          {title}
        </h2>
        <span style={{
          marginLeft: "auto",
          fontSize: "12px",
          fontWeight: "600",
          color: `rgb(${sectionAccent})`,
          background: `rgba(${sectionAccent}, 0.15)`,
          padding: "3px 10px",
          borderRadius: "20px",
        }}>
          {filtered.length} {filtered.length === 1 ? "org" : "orgs"}
        </span>
      </div>
      {filtered.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px", fontStyle: "italic" }}>
          No results match your search.
        </p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "10px",
        }}>
          {filtered.map(org => (
            <OrgCard
              key={org.name + org.location}
              org={org}
              hoverAccent={hoverAccent}
              badgeColor={badgeColor}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const showHospitals = tab === "all" || tab === "hospitals";
  const showRescues   = tab === "all" || tab === "rescues";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d0618 0%, #150d2e 40%, #0d1a25 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#f0e6ff",
    }}>

      {/* ── HEADER ── */}
      <header style={{
        textAlign: "center",
        padding: "60px 24px 40px",
        background: "linear-gradient(180deg, rgba(120,60,200,0.15) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "48px",
      }}>
        <div style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#a78bfa",
          background: "rgba(167,139,250,0.1)",
          border: "1px solid rgba(167,139,250,0.25)",
          padding: "5px 16px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}>
          Bored No More Charity
        </div>

        <h1 style={{
          margin: "0 0 12px",
          fontSize: "clamp(32px, 6vw, 58px)",
          fontWeight: "900",
          fontFamily: "'Playfair Display', Georgia, serif",
          lineHeight: 1.1,
          background: "linear-gradient(135deg, #f0e6ff 20%, #c084fc 60%, #38bdf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          WishLink
        </h1>

        <p style={{
          margin: "0 auto 8px",
          fontSize: "17px",
          color: "rgba(240,230,255,0.6)",
          maxWidth: "520px",
          lineHeight: 1.6,
        }}>
          Shop Amazon wish lists for children's hospitals &amp; dog rescues.
          <br />Every click makes a difference.
        </p>

        {/* ✦ UPDATED CREATOR CREDIT ✦ */}
        <p style={{
          margin: "0 auto 28px",
          fontSize: "12px",
          color: "rgba(167,139,250,0.6)",
          fontStyle: "italic",
        }}>
          Created by Taylor Brady &amp; Alexis Brady ✦ borednomorecharity.org
        </p>

        {/* Search */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          maxWidth: "440px",
          margin: "0 auto 24px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "50px",
          padding: "10px 18px",
        }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search by name or city/state…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "15px",
              color: "#f0e6ff",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all",       label: `All (${hospitals.length + rescues.length})` },
            { id: "hospitals", label: `🏥 Hospitals (${hospitals.length})` },
            { id: "rescues",   label: `🐾 Rescues (${rescues.length})` },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 20px",
                borderRadius: "50px",
                border: tab === t.id ? "1px solid rgba(167,139,250,0.6)" : "1px solid rgba(255,255,255,0.1)",
                background: tab === t.id ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.04)",
                color: tab === t.id ? "#c084fc" : "rgba(255,255,255,0.5)",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 60px" }}>

        {/* Hospitals — dark blue badges */}
        {showHospitals && (
          <Section
            title="Children's Hospitals"
            icon={<HeartIcon />}
            items={hospitals}
            hoverAccent="30, 90, 180"
            badgeColor="#1a4f9c"
            sectionAccent="100, 160, 255"
            filterText={search}
          />
        )}

        {/* Rescues — red badges */}
        {showRescues && (
          <Section
            title="Dog Rescue Organizations"
            icon={<PawIcon />}
            items={rescues}
            hoverAccent="200, 40, 40"
            badgeColor="#b91c1c"
            sectionAccent="248, 113, 113"
            filterText={search}
          />
        )}

        {/* Legend / how it works */}
        <div style={{
          marginTop: "8px",
          padding: "20px 24px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.8,
          textAlign: "center",
        }}>
          <strong style={{ color: "rgba(255,255,255,0.55)" }}>How it works:</strong> Each link takes you to the organization's donation or Amazon wish list page.
          <br />
          <span style={{ color: "#fff", background: "#1a4f9c", padding: "2px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700", marginRight: "6px" }}>
            DARK BLUE
          </span>
          = Children's Hospital links &nbsp;·&nbsp;
          <span style={{ color: "#fff", background: "#b91c1c", padding: "2px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700", marginLeft: "6px" }}>
            RED
          </span>
          = Animal Rescue links
          <br />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)" }}>
            "Wish List" = direct Amazon registry · "Donate" = official page with their latest wish list
          </span>
        </div>
      </main>

      {/* ── FOOTER / CONTACT ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "44px 24px 48px",
        textAlign: "center",
        background: "rgba(0,0,0,0.35)",
      }}>
        <p style={{
          margin: "0 0 16px",
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}>
          Contact
        </p>

        <a
          href="https://www.BoredNoMoreCharity.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontSize: "16px",
            fontWeight: "700",
            color: "#a78bfa",
            textDecoration: "none",
            marginBottom: "10px",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
          onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
        >
          www.BoredNoMoreCharity.org
        </a>

        <br />

        <a
          href="mailto:borednomore01@gmail.com"
          style={{
            display: "inline-block",
            fontSize: "14px",
            fontWeight: "500",
            color: "rgba(167,139,250,0.65)",
            textDecoration: "none",
            marginBottom: "28px",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(167,139,250,0.65)"}
        >
          borednomore01@gmail.com
        </a>

        <p style={{
          margin: 0,
          fontSize: "12px",
          color: "rgba(255,255,255,0.18)",
          fontStyle: "italic",
        }}>
          Created by Taylor Brady &amp; Alexis Brady · Bored No More Charity WishLink
        </p>
      </footer>

    </div>
  );
}
