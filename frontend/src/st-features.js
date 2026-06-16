import { LitElement, css, html } from 'lit'

const FEATURES = [
  {
    img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400&q=80',
    alt: 'Family arriving at hotel',
    title: 'Peace of mind',
    desc: 'No surprises. Your price is confirmed at the time of booking, free cancellation up to 48 hours before pickup, and 24/7 support.',
  },
  {
    img: 'https://images.unsplash.com/photo-1536584754829-12214d404f32?w=400&q=80',
    alt: 'Couple in airport',
    title: 'On time, every time',
    desc: 'We track your flight and coordinate your pickup around it. No queues, no delays, just a direct ride to your hotel door.',
  },
  {
    img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80',
    alt: 'Traveller with luggage',
    title: 'Whatever your trip needs',
    desc: 'Child seats, group vehicles, wheelchair access. Just tell us what you need and we\'ll take care of the rest.',
  },
]

export class StFeatures extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--st-white, #fff);
    }

    section {
      max-width: 1100px;
      margin: 0 auto;
      padding: 48px 24px;
    }

    h2 {
      font-size: clamp(1.3rem, 3vw, 2rem);
      font-weight: 700;
      margin: 0 0 32px;
      color: var(--st-text, #1a1a2e);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
    }

    article {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--st-border, #e0e0e8);
      background: var(--st-white, #fff);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }

    .body {
      padding: 20px;
    }

    h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0 0 10px;
      color: var(--st-text, #1a1a2e);
    }

    p {
      font-size: 0.88rem;
      color: var(--st-muted, #5a5a72);
      margin: 0;
      line-height: 1.6;
    }
  `

  render() {
    return html`
      <section>
        <h2>All set before you land</h2>
        <div class="grid">
          ${FEATURES.map(f => html`
            <article>
              <img src="${f.img}" alt="${f.alt}" loading="lazy" />
              <div class="body">
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
              </div>
            </article>
          `)}
        </div>
      </section>
    `
  }
}

customElements.define('st-features', StFeatures)
