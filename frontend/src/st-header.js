import { LitElement, css, html } from 'lit'

export class StHeader extends LitElement {
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
  `

  render() {
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
          <a class="nav-link" href="#about">About</a>
          <a class="nav-link" href="#drivers">Drivers</a>
          <a class="nav-link" href="#">Help Centre</a>
          <div class="divider"></div>
          <button class="nav-link">&#127468;&#127463; English <span class="chevron">&#9662;</span></button>
          <button class="nav-link">&#8364; EUR <span class="chevron">&#9662;</span></button>
          <div class="divider"></div>
          <button class="btn-booking">My booking</button>
        </nav>
      </header>
    `
  }
}

customElements.define('st-header', StHeader)
