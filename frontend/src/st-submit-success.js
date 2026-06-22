import { LitElement, css, html } from 'lit'
import { t, getLanguage } from './i18n.js'

export class StSubmitSuccess extends LitElement {
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

    .wrap {
      min-height: 60vh;
      display: grid;
      place-items: center;
      padding: 56px 24px;
      background: linear-gradient(180deg, #f6fbff 0%, #ffffff 100%);
    }

    .card {
      width: min(760px, 100%);
      background: #fff;
      border: 1px solid #dbe7f3;
      border-radius: 16px;
      padding: 36px 28px;
      box-shadow: 0 14px 36px rgba(16, 44, 87, 0.08);
      text-align: center;
    }

    .icon {
      width: 72px;
      height: 72px;
      border-radius: 999px;
      display: inline-grid;
      place-items: center;
      font-size: 34px;
      margin-bottom: 16px;
      background: #e9fff2;
      color: #0d9d52;
      border: 2px solid #b4efcc;
    }

    h1 {
      margin: 0 0 10px;
      color: #14243d;
      font-size: clamp(1.6rem, 3vw, 2rem);
    }

    p {
      margin: 0;
      color: #4a5a73;
      line-height: 1.75;
      font-size: 1rem;
    }

    .actions {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn {
      text-decoration: none;
      border-radius: 10px;
      padding: 10px 16px;
      font-weight: 600;
      border: 1px solid #d0deea;
      color: #19385c;
      background: #fff;
    }

    .btn-primary {
      background: #0d9d52;
      color: #fff;
      border-color: #0d9d52;
    }
  `

  render() {
    return html`
      <main class="wrap">
        <section class="card" aria-live="polite">
          <div class="icon" aria-hidden="true">✓</div>
          <h1>${t('submitSuccess.title')}</h1>
          <p>${t('submitSuccess.description')}</p>
          <div class="actions">
            <a class="btn btn-primary" href="#home">${t('submitSuccess.bookAnother')}</a>
            <a class="btn" href="#drivers">${t('submitSuccess.viewDrivers')}</a>
          </div>
        </section>
      </main>
    `
  }
}

customElements.define('st-submit-success', StSubmitSuccess)