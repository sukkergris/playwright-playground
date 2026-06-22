import { LitElement, html } from 'lit'
import './st-header.js'
import './st-hero-search.js'
import './st-trust-bar.js'
import './st-stats-bar.js'
import './st-features.js'
import './st-about.js'
import './st-drivers.js'
import './st-submit-success.js'
import { getLanguage } from './i18n.js'

export class StApp extends LitElement {
  constructor() {
    super()
    this.page = 'home'
    this.language = getLanguage()
    this.handleNavigation = this.handleNavigation.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('hashchange', this.handleNavigation)
    window.addEventListener('language-changed', this.handleLanguageChange)
    this.handleNavigation()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('hashchange', this.handleNavigation)
    window.removeEventListener('language-changed', this.handleLanguageChange)
  }

  handleNavigation() {
    const hash = window.location.hash.slice(1) || 'home'
    this.page = hash === 'submitted' ? 'submitted' : hash
    this.requestUpdate()
  }

  handleLanguageChange(e) {
    this.language = e.detail.language
    this.requestUpdate()
  }

  // No shadow DOM — let global CSS apply to children
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <st-header></st-header>
      ${this.page === 'about' ? html`<st-about></st-about>` : this.page === 'drivers' ? html`<st-drivers></st-drivers>` : this.page === 'submitted' ? html`<st-submit-success></st-submit-success>` : html`
        <main>
          <st-hero-search></st-hero-search>
          <st-trust-bar></st-trust-bar>
          <st-features></st-features>
        </main>
      `}
    `
  }
}

customElements.define('st-app', StApp)
