import { LitElement, html, css } from 'lit';

class PageAbout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    h1 {
      font-size: 2rem;
      margin: 0 0 1rem;
    }
    p {
      line-height: 1.7;
      color: #444;
      max-width: 600px;
    }
  `;

  render() {
    return html`
      <section>
        <h1>About</h1>
        <p>
          Pure Web is a lightweight SPA built with Lit and web components. It exists as a
          learning target for Playwright-based prerendering — demonstrating how
          JavaScript-rendered content can be captured as static HTML for search engine indexing.
        </p>
        <p>
          When a crawler fetches this page, it receives an empty shell. The Playwright prerender
          step navigates each route, waits for the content to render, and saves the populated HTML.
        </p>
      </section>
    `;
  }
}

customElements.define('page-about', PageAbout);
