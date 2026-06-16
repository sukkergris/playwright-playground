import { LitElement, html } from 'lit'
import './st-header.js'
import './st-hero-search.js'
import './st-trust-bar.js'
import './st-stats-bar.js'
import './st-features.js'

export class StApp extends LitElement {
  // No shadow DOM — let global CSS apply to children
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <st-header></st-header>
      <main>
        <st-hero-search></st-hero-search>
        <st-trust-bar></st-trust-bar>
        <st-features></st-features>
      </main>
    `
  }
}

customElements.define('st-app', StApp)
