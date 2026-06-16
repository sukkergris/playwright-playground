import { LitElement, css, html } from 'lit'

const ITEMS = [
  { icon: '✓', label: 'Free cancellation' },
  { icon: '✈', label: 'Flight monitoring' },
  { icon: '▣', label: 'No hidden fees' },
  { icon: '☎', label: '24/7 support' },
]

export class StTrustBar extends LitElement {
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
      gap: 8px 32px;
      max-width: 900px;
      margin: 0 auto;
      padding: 14px 24px;
      list-style: none;
    }

    li {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 0.88rem;
      color: var(--st-text, #1a1a2e);
    }

    .icon {
      color: var(--st-green, #00b140);
      font-size: 1rem;
    }
  `

  render() {
    return html`
      <ul>
        ${ITEMS.map(item => html`
          <li>
            <span class="icon">${item.icon}</span>
            ${item.label}
          </li>
        `)}
      </ul>
    `
  }
}

customElements.define('st-trust-bar', StTrustBar)
