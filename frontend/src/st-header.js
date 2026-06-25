import { LitElement, css, html } from 'lit'
import { t, setLanguage, getLanguage } from './i18n.js'

export class StHeader extends LitElement {
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

  changeLanguage(lang) {
    setLanguage(lang)
  }

  static styles = css`
    :host {
      display: block;
      background: #fff;
      border-bottom: 1px solid #e0e0e8;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      height: 60px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1a1a2e;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }

    .logo-text {
      color: #c8a227;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
      white-space: nowrap;
    }

    .nav-link {
      background: none;
      border: none;
      cursor: pointer;
      font: inherit;
      font-size: 0.85rem;
      color: #1a1a2e;
      padding: 6px 10px;
      border-radius: 4px;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 3px;
      transition: background 0.15s;
    }

    .nav-link:hover {
      background: #f7f7fa;
    }

    .chevron {
      font-size: 0.65rem;
      opacity: 0.6;
    }

    .divider {
      width: 1px;
      height: 20px;
      background: #e0e0e8;
      margin: 0 4px;
      flex-shrink: 0;
    }

    .btn-booking {
      background: none;
      border: 1.5px solid #1a1a2e;
      border-radius: 20px;
      padding: 5px 14px;
      font: inherit;
      font-size: 0.85rem;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.15s, color 0.15s;
    }

    .btn-booking:hover {
      background: #1a1a2e;
      color: #fff;
    }

    .lang-buttons {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .lang-btn {
      background: none;
      border: 1px solid #e0e0e8;
      cursor: pointer;
      font: inherit;
      font-size: 0.85rem;
      color: #1a1a2e;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.15s;
    }

    .lang-btn:hover {
      background: #f7f7fa;
    }

    .lang-btn.active {
      background: #c8a227;
      color: #fff;
      border-color: #c8a227;
    }

    @media (max-width: 980px) {
      header {
        height: auto;
        padding: 10px 16px;
        flex-direction: column;
        align-items: stretch;
        row-gap: 10px;
      }

      nav {
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        white-space: normal;
      }

      .logo {
        justify-content: center;
      }

      .divider {
        display: none;
      }

      .nav-link,
      .btn-booking,
      .lang-buttons {
        border: 1px solid #dce3ec;
        border-radius: 999px;
        background: #f7f9fc;
      }

      .nav-link,
      .btn-booking {
        padding: 6px 12px;
      }

      .lang-buttons {
        padding: 2px;
      }
    }

    @media (max-width: 700px) {
      .logo {
        font-size: 0.98rem;
      }

      .logo-icon {
        width: 28px;
        height: 28px;
      }

      .nav-link {
        font-size: 0.78rem;
        padding: 6px 8px;
      }

      .lang-btn {
        font-size: 0.76rem;
        padding: 3px 6px;
      }

      .help-link,
      .currency-btn,
      .btn-booking {
        display: none;
      }

      nav {
        gap: 6px;
      }
    }
  `

  render() {
    const isArabic = this.language === 'ar'
    return html`
      <header>
        <a href="/" class="logo">
          <svg class="logo-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="20" fill="#c8a227"/>
            <text x="20" y="26" text-anchor="middle" font-size="18" fill="#1a1a2e">&#128662;</text>
          </svg>
          <span><span class="logo-text">Habibi</span> VIP Taxi</span>
        </a>

        <nav>
          <a class="nav-link" href="#about">${t('header.about')}</a>
          <a class="nav-link" href="#drivers">${t('header.drivers')}</a>
          <a class="nav-link help-link" href="#">${t('header.helpCentre')}</a>
          <div class="divider"></div>
          <div class="lang-buttons">
            <button class="lang-btn ${!isArabic ? 'active' : ''}" @click=${() => this.changeLanguage('en')}>EN</button>
            <button class="lang-btn ${isArabic ? 'active' : ''}" @click=${() => this.changeLanguage('ar')}>AR</button>
          </div>
          <button class="nav-link currency-btn">💶 EUR <span class="chevron">&#9662;</span></button>
          <div class="divider"></div>
          <button class="btn-booking">${t('header.myBooking')}</button>
        </nav>
      </header>
    `
  }
}

customElements.define('st-header', StHeader)
