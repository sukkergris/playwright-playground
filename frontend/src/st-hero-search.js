import { LitElement, css, html } from 'lit'
import { t, getLanguage } from './i18n.js'

const AIRPORTS = [
  { code: 'CAI', name: 'Cairo International Airport', city: 'Cairo' },
  { code: 'HRG', name: 'Hurghada International Airport', city: 'Hurghada' },
  { code: 'SSH', name: 'Sharm el-Sheikh International Airport', city: 'Sharm el-Sheikh' },
  { code: 'LXR', name: 'Luxor International Airport', city: 'Luxor' },
  { code: 'ASW', name: 'Aswan International Airport', city: 'Aswan' },
  { code: 'HBE', name: 'Alexandria Borg El Arab Airport', city: 'Alexandria' },
  { code: 'RMF', name: 'Marsa Alam International Airport', city: 'Marsa Alam' },
  { code: 'SPX', name: 'Sphinx International Airport', city: 'Cairo (Sphinx)' },
  { code: 'TCP', name: 'Taba International Airport', city: 'Taba' },
  { code: 'HMB', name: 'Sohag International Airport', city: 'Sohag' },
]

const HURGHADA_HOTELS = [
  { name: 'Steigenberger ALDAU Beach Hotel', area: 'Touristic Promenade' },
  { name: 'Jaz Aquamarine Resort', area: 'South Hurghada' },
  { name: 'Sunrise Crystal Bay Resort', area: 'Village Road' },
  { name: 'Baron Palace Sahl Hasheesh', area: 'Sahl Hasheesh' },
  { name: 'Rixos Premium Magawish Suites & Villas', area: 'Magawish' },
  { name: 'Hilton Hurghada Plaza', area: 'Dahar / City Center' },
  { name: 'Desert Rose Resort', area: 'Village Road' },
  { name: 'Prima Life Makadi', area: 'Makadi Bay' },
  { name: 'Serenity Alpha Beach', area: 'Makadi Bay' },
  { name: 'Pickalbatros White Beach Resort', area: 'Touristic Promenade' },
]

export class StHeroSearch extends LitElement {
  static properties = {
    _from: { state: true },
    _to: { state: true },
    _date: { state: true },
    _adults: { state: true },
    _fromOpen: { state: true },
    _fromSelected: { state: true },
    _toOpen: { state: true },
    _withReturn: { state: true },
    language: { state: true },
  }

  constructor() {
    super()
    this._from = ''
    this._to = ''
    this._date = 'Jun 19 - 12:00'
    this._adults = 2
    this._fromOpen = false
    this._fromSelected = false
    this._toOpen = false
    this._withReturn = false
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

  get _filteredAirports() {
    if (this._fromSelected) return AIRPORTS

    const q = this._from.toLowerCase()
    if (!q) return AIRPORTS
    return AIRPORTS.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q)
    )
  }

  _selectAirport(a) {
    this._from = a.city + ' – ' + a.code
    this._fromSelected = true
    this._fromOpen = false
  }

  get _filteredHotels() {
    const q = this._to.toLowerCase()
    if (!q) return HURGHADA_HOTELS
    return HURGHADA_HOTELS.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.area.toLowerCase().includes(q)
    )
  }

  _selectHotel(h) {
    this._to = `${h.name}, ${h.area}`
    this._toOpen = false
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 360px;
      background: linear-gradient(
        135deg,
        #0077a8 0%,
        #00a0c8 35%,
        #4dbfe0 60%,
        #87d4e8 100%
      );
      overflow: visible;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 60%, rgba(0,60,100,0.4) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 40%, rgba(100,200,240,0.3) 0%, transparent 50%);
    }

    .content {
      position: relative;
      z-index: 1;
      max-width: 1240px;
      margin: 0 auto;
      padding: 56px 24px 48px;
      text-align: center;
    }

    h1 {
      color: #fff;
      font-size: clamp(1.5rem, 4vw, 2.4rem);
      font-weight: 700;
      margin: 0 0 10px;
      text-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }

    .subtitle {
      color: rgba(255,255,255,0.9);
      font-size: clamp(0.85rem, 2vw, 1rem);
      margin: 0 0 28px;
    }

    .search-box {
      display: flex;
      align-items: center;
      background: #fff;
      border: 3px solid #f7c72d;
      border-radius: 8px;
      overflow: visible;
      box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    }

    .field {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 12px;
      flex: 1;
      min-width: 0;
      border-right: 1px solid #e0e0e8;
      height: 56px;
      position: relative;
    }

    .field:last-of-type {
      border-right: none;
    }

    .field-icon {
      color: #aaa;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .field input,
    .field select {
      border: none;
      outline: none;
      font: inherit;
      font-size: 0.9rem;
      color: #1a1a2e;
      background: transparent;
      width: 100%;
      min-width: 0;
    }

    .field input::placeholder {
      color: #aaa;
    }

    .airport-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: -3px;
      right: 0;
      background: #fff;
      border: 1px solid #e0e0e8;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: 100;
      max-height: 280px;
      overflow-y: auto;
      text-align: left;
    }

    .airport-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      cursor: pointer;
      transition: background 0.1s;
      border: none;
      background: none;
      width: 100%;
      font: inherit;
      text-align: left;
    }

    .airport-option:hover {
      background: #f7f7fa;
    }

    .airport-code {
      font-weight: 700;
      font-size: 0.85rem;
      color: #00b140;
      min-width: 36px;
    }

    .airport-info {
      flex: 1;
    }

    .airport-city {
      font-size: 0.9rem;
      color: #1a1a2e;
      font-weight: 600;
    }

    .airport-name {
      font-size: 0.78rem;
      color: #888;
    }

    .hotel-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: -3px;
      right: 0;
      background: #fff;
      border: 1px solid #e0e0e8;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: 100;
      max-height: 280px;
      overflow-y: auto;
      text-align: left;
    }

    .hotel-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      cursor: pointer;
      transition: background 0.1s;
      border: none;
      background: none;
      width: 100%;
      font: inherit;
      text-align: left;
    }

    .hotel-option:hover {
      background: #f7f7fa;
    }

    .hotel-badge {
      font-weight: 700;
      font-size: 0.75rem;
      color: #00b140;
      min-width: 42px;
    }

    .hotel-name {
      font-size: 0.88rem;
      color: #1a1a2e;
      font-weight: 600;
    }

    .hotel-area {
      font-size: 0.78rem;
      color: #888;
    }

    .swap-btn {
      background: #f0f0f5;
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      font-size: 0.9rem;
      transition: background 0.15s;
    }

    .swap-btn:hover { background: #e0e0e8; }

    .date-field { flex: 0 0 180px; white-space: nowrap; }
    .date-label { font-size: 0.7rem; color: #aaa; display: block; line-height: 1; }
    .date-value { font-size: 0.9rem; color: #1a1a2e; }

    .return-field {
      flex: 0 0 205px;
      justify-content: center;
      color: #1a1a2e;
      font-size: 0.86rem;
      gap: 6px;
    }

    .trip-toggle {
      display: inline-flex;
      align-items: center;
      background: #f3f6fa;
      border-radius: 999px;
      padding: 3px;
      border: 1px solid #e2e7ee;
    }

    .trip-btn {
      border: none;
      background: transparent;
      color: #647089;
      font: inherit;
      font-size: 0.78rem;
      padding: 6px 10px;
      border-radius: 999px;
      cursor: pointer;
      line-height: 1;
      white-space: nowrap;
      transition: background 0.15s, color 0.15s;
    }

    .trip-btn.active {
      background: #fff;
      color: #16324a;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      font-weight: 600;
    }
    .adults-field { flex: 0 0 160px; }
    .adults-select { flex: 1; }

    .btn-search {
      background: #00b140;
      color: #fff;
      border: none;
      padding: 0 30px;
      height: 56px;
      font: inherit;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      flex: 0 0 160px;
      transition: background 0.15s;
      white-space: nowrap;
      border-radius: 0 5px 5px 0;
    }

    .btn-search:hover { background: #009a38; }

    @media (max-width: 1180px) {
      .search-box {
        flex-wrap: wrap;
      }

      .field {
        flex: 1 1 220px;
      }

      .date-field,
      .return-field,
      .adults-field {
        flex: 1 1 180px;
      }

      .btn-search {
        flex: 1 1 100%;
        border-radius: 0 0 5px 5px;
      }
    }

    @media (max-width: 700px) {
      .content {
        padding: 28px 16px 24px;
      }

      h1 {
        line-height: 1.2;
      }

      .subtitle {
        margin-bottom: 18px;
      }

      .search-box {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        padding: 10px;
        gap: 8px;
        border: 2px solid #f7c72d;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.96);
      }

      .field {
        flex: 1 1 100%;
        border: 1px solid #d8e1ec;
        border-radius: 10px;
        background: #f8fbff;
        min-height: 52px;
        height: auto;
        padding: 8px 10px;
      }

      .field input,
      .field select {
        font-size: 16px;
      }

      .date-field,
      .return-field {
        flex: 1 1 calc(50% - 4px);
        white-space: normal;
      }

      .adults-field {
        flex: 1 1 100%;
      }

      .return-field {
        justify-content: flex-start;
      }

      .trip-toggle {
        width: 100%;
      }

      .trip-btn {
        flex: 1;
        text-align: center;
        font-size: 0.72rem;
        padding: 5px 6px;
      }

      .swap-btn {
        display: none;
      }

      .airport-dropdown,
      .hotel-dropdown {
        left: 0;
        right: 0;
        max-height: 220px;
      }

      .btn-search {
        flex: 1 1 100%;
        height: 52px;
        border-radius: 10px;
      }
    }
  `

  _swap() {
    const tmp = this._from
    this._from = this._to
    this._to = tmp
  }

  async _submitSearch() {
    const payload = {
      arrival: this._from,
      destination: this._to,
      flightArrival: this._date,
      roundTrip: this._withReturn,
      adults: this._adults,
      language: this.language,
    }

    try {
      const response = await fetch('/api/transfer-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Search request failed with status ${response.status}`)
      }

      window.location.hash = 'submitted'
    } catch (error) {
      console.error('Failed to submit transfer request', error)
    }
  }

  render() {
    const airports = this._filteredAirports
    const hotels = this._filteredHotels
    return html`
      <div class="hero-bg"></div>
      <div class="content">
        <h1>${t('home.title')}</h1>
        <p class="subtitle">${t('home.subtitle')}</p>

        <div class="search-box" role="search">

          <div class="field">
            <span class="field-icon">&#9992;</span>
            <input
              type="text"
              placeholder="${t('home.arrivalAirport')}"
              .value=${this._from}
              @input=${e => { this._from = e.target.value; this._fromSelected = false; this._fromOpen = true }}
              @focus=${() => this._fromOpen = true}
              @blur=${() => setTimeout(() => this._fromOpen = false, 150)}
              aria-label="${t('home.arrivalAirport')}"
              aria-autocomplete="list"
              autocomplete="off"
            />
            ${this._fromOpen && airports.length ? html`
              <div class="airport-dropdown" role="listbox">
                ${airports.map(a => html`
                  <button
                    class="airport-option"
                    role="option"
                    @mousedown=${() => this._selectAirport(a)}
                  >
                    <span class="airport-code">${a.code}</span>
                    <span class="airport-info">
                      <div class="airport-city">${a.city}</div>
                      <div class="airport-name">${a.name}</div>
                    </span>
                  </button>
                `)}
              </div>
            ` : ''}
          </div>

          <button class="swap-btn" @click=${this._swap} aria-label="Swap">&#8644;</button>

          <div class="field">
            <span class="field-icon">&#128205;</span>
            <input
              type="text"
              placeholder="${t('home.destinationPlaceholder')}"
              .value=${this._to}
              @input=${e => { this._to = e.target.value; this._toOpen = true }}
              @focus=${() => this._toOpen = true}
              @blur=${() => setTimeout(() => this._toOpen = false, 150)}
              aria-label="${t('home.destination')}"
              aria-autocomplete="list"
              autocomplete="off"
            />
            ${this._toOpen && hotels.length ? html`
              <div class="hotel-dropdown" role="listbox">
                ${hotels.map(h => html`
                  <button
                    class="hotel-option"
                    role="option"
                    @mousedown=${() => this._selectHotel(h)}
                  >
                    <span class="hotel-badge">HOTEL</span>
                    <span>
                      <div class="hotel-name">${h.name}</div>
                      <div class="hotel-area">${h.area}, Hurghada</div>
                    </span>
                  </button>
                `)}
              </div>
            ` : ''}
          </div>

          <div class="field date-field">
            <span class="field-icon">&#128197;</span>
            <div>
              <span class="date-label">${t('home.flightArrival')}</span>
              <span class="date-value">${this._date}</span>
            </div>
          </div>

          <div class="field return-field">
            <span class="field-icon">&#128197;</span>
            <div class="trip-toggle" role="group" aria-label="${t('home.tripType')}">
              <button
                class="trip-btn ${this._withReturn ? '' : 'active'}"
                type="button"
                @click=${() => this._withReturn = false}
                aria-pressed=${this._withReturn ? 'false' : 'true'}
              >
                ${t('home.oneWay')}
              </button>
              <button
                class="trip-btn ${this._withReturn ? 'active' : ''}"
                type="button"
                @click=${() => this._withReturn = true}
                aria-pressed=${this._withReturn ? 'true' : 'false'}
              >
                ${t('home.roundTrip')}
              </button>
            </div>
          </div>

          <div class="field adults-field">
            <span class="field-icon">&#128100;</span>
            <select
              class="adults-select"
              aria-label="${t('home.passengers')}"
              .value=${String(this._adults)}
              @change=${e => this._adults = Number(e.target.value)}
            >
              <option value="1">1 adult</option>
              <option value="2">2 adults</option>
              <option value="3">3 adults</option>
              <option value="4">4 adults</option>
              <option value="5">5+ adults</option>
            </select>
            <span>&#9662;</span>
          </div>

          <button class="btn-search" type="button" @click=${() => this._submitSearch()}>${t('home.search')}</button>
        </div>
      </div>
    `
  }
}

customElements.define('st-hero-search', StHeroSearch)
