import { LitElement, css, html } from 'lit'
import { t, getLanguage } from './i18n.js'

export class StAbout extends LitElement {
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
    }

    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 24px;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #1a1a2e;
    }

    .tagline {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 40px;
      max-width: 600px;
    }

    .about-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      margin-top: 50px;
    }

    .about-card {
      padding: 30px;
      border: 1px solid #e0e0e8;
      border-radius: 8px;
      background: #fafafa;
      transition: all 0.3s;
      text-align: center;
    }

    .about-card:hover {
      border-color: #c8a227;
      box-shadow: 0 4px 12px rgba(200, 162, 39, 0.1);
    }

    .about-card h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #1a1a2e;
    }

    .about-card p {
      color: #666;
      line-height: 1.6;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .section-title {
      font-size: 1.8rem;
      margin-top: 50px;
      margin-bottom: 30px;
      color: #1a1a2e;
    }

    .section-content {
      color: #555;
      line-height: 1.8;
      margin-bottom: 30px;
    }

    .cta-button {
      display: inline-block;
      background: #c8a227;
      color: #fff;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.3s;
      margin-top: 20px;
    }

    .cta-button:hover {
      background: #a68a1f;
    }

    @media (max-width: 700px) {
      .about-container {
        padding: 36px 16px;
      }

      h1 {
        font-size: 1.9rem;
      }

      .tagline {
        font-size: 1rem;
        margin-bottom: 28px;
      }

      .about-grid {
        gap: 16px;
        margin-top: 28px;
      }

      .about-card {
        padding: 20px;
      }
    }
  `

  render() {
    return html`
      <main class="about-container">
        <h1>${t('about.title')}</h1>
        <p class="tagline">${t('about.tagline')}</p>

        <div class="about-grid">
          <div class="about-card">
            <div class="icon">🌍</div>
            <h3>${t('about.globalCoverage')}</h3>
            <p>${t('about.globalCoverageDesc')}</p>
          </div>

          <div class="about-card">
            <div class="icon">💰</div>
            <h3>${t('about.transparentPricing')}</h3>
            <p>${t('about.transparentPricingDesc')}</p>
          </div>

          <div class="about-card">
            <div class="icon">⭐</div>
            <h3>${t('about.professionalDrivers')}</h3>
            <p>${t('about.professionalDriversDesc')}</p>
          </div>

          <div class="about-card">
            <div class="icon">🚗</div>
            <h3>${t('about.modernFleet')}</h3>
            <p>${t('about.modernFleetDesc')}</p>
          </div>

          <div class="about-card">
            <div class="icon">📱</div>
            <h3>${t('about.easyBooking')}</h3>
            <p>${t('about.easyBookingDesc')}</p>
          </div>

          <div class="about-card">
            <div class="icon">🛡️</div>
            <h3>${t('about.safeSecurity')}</h3>
            <p>${t('about.safeSecurityDesc')}</p>
          </div>
        </div>

        <h2 class="section-title">${t('about.mission')}</h2>
        <p class="section-content">
          ${t('about.missionDesc')}
        </p>

        <h2 class="section-title">${t('about.whyChooseUs')}</h2>
        <p class="section-content">
          ${t('about.whyChooseUsDesc')}
        </p>

        <a href="/" class="cta-button">${t('about.bookTransfer')}</a>
      </main>
    `
  }
}

customElements.define('st-about', StAbout)
