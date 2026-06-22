import { LitElement, html } from 'lit'
import './st-header.js'
import './st-hero-search.js'
import './st-trust-bar.js'
import './st-stats-bar.js'
import './st-features.js'
import './st-about.js'
import './st-drivers.js'

export class StApp extends LitElement {
  constructor() {
    super()
    this.page = 'home'
    this.handleNavigation = this.handleNavigation.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('hashchange', this.handleNavigation)
    this.handleNavigation()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('hashchange', this.handleNavigation)
  }

  handleNavigation() {
    const hash = window.location.hash.slice(1) || 'home'
    this.page = hash
    this.requestUpdate()
  }

  // No shadow DOM — let global CSS apply to children
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <st-header></st-header>
      ${this.page === 'about' ? html`<st-about></st-about>` : this.page === 'drivers' ? html`<st-drivers></st-drivers>` : html`
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
