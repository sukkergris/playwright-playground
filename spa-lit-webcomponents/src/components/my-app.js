import { LitElement, html, css } from 'lit';
import './page-home.js';
import './page-about.js';
import './page-questions.js';

class MyApp extends LitElement {
  static properties = {
    route: {},
  };

  static styles = css`
    :host {
      display: block;
    }
    nav {
      background: #1a1a2e;
      padding: 1rem 2rem;
      display: flex;
      gap: 1.5rem;
    }
    nav a {
      color: #c0c0d0;
      text-decoration: none;
      font-size: 0.95rem;
    }
    nav a:hover,
    nav a.active {
      color: #fff;
      text-decoration: underline;
    }
    main {
      max-width: 760px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
  `;

  constructor() {
    super();
    this.route = location.hash || '#/';
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', () => {
      this.route = location.hash || '#/';
    });
  }

  render() {
    const r = this.route;
    return html`
      <nav>
        <a href="#/" class=${r === '#/' || r === '' ? 'active' : ''}>Home</a>
        <a href="#/about" class=${r === '#/about' ? 'active' : ''}>About</a>
        <a href="#/questions" class=${r === '#/questions' ? 'active' : ''}>Questions</a>
      </nav>
      <main>
        ${r === '#/about'
          ? html`<page-about></page-about>`
          : r === '#/questions'
            ? html`<page-questions></page-questions>`
            : html`<page-home></page-home>`}
      </main>
    `;
  }
}

customElements.define('my-app', MyApp);
