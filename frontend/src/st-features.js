import { LitElement, css, html } from 'lit'
import { t, getLanguage } from './i18n.js'

const FEATURES = [
  {
    img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400&q=80',
    alt: 'Family arriving at hotel',
    key: 'features.peaceMind',
    descKey: 'features.peaceMindDesc',
  },
  {
    img: 'https://images.unsplash.com/photo-1536584754829-12214d404f32?w=400&q=80',
    alt: 'Couple in airport',
    key: 'features.onTime',
    descKey: 'features.onTimeDesc',
  },
  {
    img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80',
    alt: 'Traveller with luggage',
    key: 'features.forYourTrip',
    descKey: 'features.forYourTripDesc',
  },
]

export class StFeatures extends LitElement {
  constructor() {
    super()
    this.language = getLanguage()
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('language-changed', this.handleLanguageChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('language-changed', this.handleLanguageChange)
  }

  handleLanguageChange(e) {
    this.language = e.detail.language
    this.requestUpdate()
  }

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
        <h2>${t('features.title')}</h2>
        <div class="grid">
          ${FEATURES.map(f => html`
            <article>
              <img src="${f.img}" alt="${f.alt}" loading="lazy" />
              <div class="body">
                <h3>${t(f.key)}</h3>
                <p>${t(f.descKey)}</p>
              </div>
            </article>
          `)}
        </div>
      </section>
    `
  }
}

customElements.define('st-features', StFeatures)
