import { LitElement, css, html } from 'lit'

const STATS = [
  { icon: '⭐', value: '18+', label: 'Years of experience' },
  { icon: '👥', value: '4M+', label: 'Satisfied travellers yearly' },
  { icon: '🌍', value: '700+', label: 'Locations worldwide' },
]

export class StStatsBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--st-white, #fff);
      border-bottom: 1px solid var(--st-border, #e0e0e8);
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 48px;
      max-width: 900px;
      margin: 0 auto;
      padding: 18px 24px;
      list-style: none;
    }

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--st-text, #1a1a2e);
    }

    .icon {
      font-size: 1.3rem;
    }

    .value {
      font-weight: 700;
      color: var(--st-green, #00b140);
    }
  `

  render() {
    return html`
      <ul>
        ${STATS.map(s => html`
          <li>
            <span class="icon">${s.icon}</span>
            <span><span class="value">${s.value}</span> ${s.label}</span>
          </li>
        `)}
      </ul>
    `
  }
}

customElements.define('st-stats-bar', StStatsBar)
