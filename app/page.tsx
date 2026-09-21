"use client";

import { useMemo, useState } from "react";

type Category = "Alles" | "CPU" | "GPU" | "Geheugen" | "Opslag" | "Voeding";

type Part = {
  id: number;
  name: string;
  brand: string;
  category: Exclude<Category, "Alles">;
  price: number;
  rating: string;
  code: string;
  tone: string;
};

const categories: Category[] = ["Alles", "CPU", "GPU", "Geheugen", "Opslag", "Voeding"];

const parts: Part[] = [
  { id: 1, name: "Ryzen 7 7800X3D", brand: "AMD", category: "CPU", price: 359, rating: "4.9", code: "CPU / 7800", tone: "coral" },
  { id: 2, name: "GeForce RTX 4070 SUPER", brand: "NVIDIA", category: "GPU", price: 649, rating: "4.8", code: "GPU / 4070", tone: "lime" },
  { id: 3, name: "Vengeance 32GB DDR5", brand: "Corsair", category: "Geheugen", price: 109, rating: "4.7", code: "RAM / 32GB", tone: "violet" },
  { id: 4, name: "990 PRO 2TB NVMe", brand: "Samsung", category: "Opslag", price: 159, rating: "4.9", code: "SSD / 2TB", tone: "blue" },
  { id: 5, name: "RM850x Gold Modular", brand: "Corsair", category: "Voeding", price: 139, rating: "4.8", code: "PSU / 850W", tone: "yellow" },
  { id: 6, name: "Core i5-14600K", brand: "Intel", category: "CPU", price: 289, rating: "4.6", code: "CPU / 14600", tone: "cyan" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("Alles");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(700);
  const [cart, setCart] = useState<Part[]>([]);

  const visibleParts = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return parts.filter((part) => {
      const matchesCategory = activeCategory === "Alles" || part.category === activeCategory;
      const matchesSearch = !normalizedQuery || `${part.name} ${part.brand}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch && part.price <= maxPrice;
    });
  }, [activeCategory, maxPrice, query]);

  function addToCart(part: Part) {
    setCart((currentCart) => [...currentCart, part]);
  }

  return (
    <main className="storefront">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">PCPARTS / BUILD LAB 01</p>
          <h1>Build it<br /><span>your way.</span></h1>
          <p className="hero-description">Vind de juiste onderdelen voor een PC die precies doet wat jij wilt. Van eerste build tot ultieme upgrade.</p>
          <a className="hero-link" href="#catalogus">Bekijk onderdelen <span aria-hidden="true">-&gt;</span></a>
        </div>
        <div className="hero-specs" aria-label="Winkelstatistieken">
          <div><strong>120+</strong><span>onderdelen</span></div>
          <div><strong>24u</strong><span>verzending</span></div>
          <div><strong>4.8/5</strong><span>reviews</span></div>
        </div>
        <div className="hero-orbit hero-orbit--one" />
        <div className="hero-orbit hero-orbit--two" />
        <div className="hero-chip">NEW<br /><strong>01</strong></div>
      </section>

      <section className="catalog-section" id="catalogus">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CURATED COMPONENTS</p>
            <h2>Find your <em>edge.</em></h2>
          </div>
          <div className="cart-status" aria-live="polite"><span>{cart.length.toString().padStart(2, "0")}</span> in winkelmand</div>
        </div>

        <div className="catalog-tools">
          <label className="search-box">
            <span aria-hidden="true">/</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek onderdeel of merk" />
          </label>
          <div className="category-list" aria-label="Filter op categorie">
            {categories.map((category) => (
              <button className={activeCategory === category ? "category-button is-active" : "category-button"} key={category} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <label className="price-filter">
            <span>Max. €{maxPrice}</span>
            <input type="range" min="100" max="700" step="10" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} aria-label="Maximale prijs" />
          </label>
        </div>

        <div className="catalog-layout">
          <div className="product-grid">
            {visibleParts.map((part, index) => (
              <article className="product-card" key={part.id}>
                <div className={`product-visual product-visual--${part.tone}`}>
                  <span className="product-index">0{index + 1}</span>
                  <span className="product-code">{part.code}</span>
                  <div className="product-mark">{part.category === "GPU" ? "GPU" : part.category === "Geheugen" ? "RAM" : part.category}</div>
                </div>
                <div className="product-info">
                  <div className="product-meta"><span>{part.category}</span><span>★ {part.rating}</span></div>
                  <p className="product-brand">{part.brand}</p>
                  <h3>{part.name}</h3>
                  <div className="product-buy"><strong>€{part.price}</strong><button onClick={() => addToCart(part)} aria-label={`${part.name} toevoegen aan winkelmand`}>+</button></div>
                </div>
              </article>
            ))}
          </div>

          <aside className="build-aside">
            <p className="eyebrow">YOUR BUILD</p>
            <h3>Maak ruimte<br />voor meer.</h3>
            <p>Je winkelmand wordt hier bijgehouden. Voeg onderdelen toe om je build samen te stellen.</p>
            <div className="build-line"><span>Onderdelen</span><strong>{cart.length}</strong></div>
            <div className="build-line"><span>Totaal</span><strong>€{cart.reduce((total, part) => total + part.price, 0)}</strong></div>
            <button className="checkout-button" disabled={!cart.length}>Bekijk build <span>-&gt;</span></button>
          </aside>
        </div>

        {!visibleParts.length && <p className="empty-state">Geen onderdelen gevonden. Probeer een andere zoekterm of pas je filters aan.</p>}
      </section>
    </main>
  );
}
