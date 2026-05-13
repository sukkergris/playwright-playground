import { LitElement, html, css } from 'lit';

class PageHome extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .hero {
      padding: 3rem 0 2rem;
    }
    h1 {
      font-size: 2.5rem;
      margin: 0 0 1rem;
    }
    p {
      font-size: 1.1rem;
      color: #555;
      max-width: 540px;
      line-height: 1.6;
    }
    a {
      color: #1a1a2e;
      font-weight: 600;
    }
  `;

  render() {
    return html`
      <section class="hero">
        <h1>Pure Web</h1>
        <p>A minimal Lit + web components SPA for exploring Playwright-driven prerendering and SEO.</p>
        <p><a href="#/about">Learn about this project →</a></p>
      </section>
    `;
  }
}

customElements.define('page-home', PageHome);
