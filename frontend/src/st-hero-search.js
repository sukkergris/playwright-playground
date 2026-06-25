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
    _adults: { state: true },
    _fromOpen: { state: true },
    _fromSelected: { state: true },
    _toOpen: { state: true },
    _withReturn: { state: true },
    language: { state: true },
    _dateOpen: { state: true },
    _calYear: { state: true },
    _calMonth: { state: true },
    _pickerDate: { state: true },
    _pickerTime: { state: true },
  }

  constructor() {
    super()
    this._from = ''
    this._to = ''
    this._adults = 2
    this._fromOpen = false
    this._fromSelected = false
    this._toOpen = false
    this._withReturn = false
    this.language = getLanguage()
    const now = new Date()
    this._dateOpen = false
    this._calYear = now.getFullYear()
    this._calMonth = now.getMonth()
    this._pickerDate = null
    this._pickerTime = '12:00'
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

    /* ── Date picker ─────────────────────────────── */

    .date-field {
      cursor: pointer;
      user-select: none;
    }

    .date-placeholder { color: #aaa; }

    .date-picker {
      position: absolute;
      top: calc(100% + 6px);
      left: -3px;
      width: 288px;
      background: #fff;
      border: 1px solid #e0e0e8;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      z-index: 200;
      padding: 14px;
      text-align: left;
    }

    .cal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .cal-nav {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      color: #555;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.1s;
    }

    .cal-nav:hover { background: #f0f0f5; }

    .cal-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #1a1a2e;
    }

    .cal-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      margin-bottom: 12px;
    }

    .cal-day-lbl {
      text-align: center;
      font-size: 0.68rem;
      color: #bbb;
      font-weight: 600;
      padding: 3px 0;
    }

    .cal-day {
      background: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font: inherit;
      font-size: 0.8rem;
      color: #1a1a2e;
      padding: 5px 0;
      text-align: center;
      transition: background 0.1s, color 0.1s;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cal-day:hover { background: #f0f0f5; }

    .cal-day.today {
      font-weight: 700;
      color: #0077a8;
    }

    .cal-day.sel {
      background: #00b140;
      color: #fff;
      font-weight: 600;
    }

    .cal-day.sel:hover { background: #009a38; }

    .time-section {
      border-top: 1px solid #f0f0f5;
      padding-top: 10px;
    }

    .time-label {
      font-size: 0.7rem;
      color: #bbb;
      font-weight: 600;
      display: block;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .hour-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 3px;
      margin-bottom: 8px;
    }

    .hour-btn {
      background: #f7f7fa;
      border: 1px solid #e8e8f0;
      border-radius: 5px;
      cursor: pointer;
      font: inherit;
      font-size: 0.74rem;
      color: #1a1a2e;
      padding: 5px 2px;
      text-align: center;
      transition: background 0.1s;
    }

    .hour-btn:hover { background: #e0e0ea; }

    .hour-btn.sel {
      background: #0077a8;
      border-color: #0077a8;
      color: #fff;
      font-weight: 600;
    }

    .min-row {
      display: flex;
      gap: 6px;
    }

    .min-btn {
      flex: 1;
      background: #f7f7fa;
      border: 1px solid #e8e8f0;
      border-radius: 7px;
      cursor: pointer;
      font: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      color: #1a1a2e;
      padding: 7px 0;
      text-align: center;
      transition: background 0.1s;
    }

    .min-btn:hover { background: #e0e0ea; }

    .min-btn.sel {
      background: #00b140;
      border-color: #00b140;
      color: #fff;
    }

    @media (max-width: 700px) {
      .date-picker {
        left: 0;
        right: auto;
        width: 272px;
      }
    }
  `

  _swap() {
    const tmp = this._from
    this._from = this._to
    this._to = tmp
  }

  get _dateDisplay() {
    if (!this._pickerDate) return null
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const d = this._pickerDate
    return `${MONTHS[d.getMonth()]} ${d.getDate()} · ${this._pickerTime}`
  }

  _prevMonth() {
    if (this._calMonth === 0) { this._calMonth = 11; this._calYear-- }
    else this._calMonth--
  }

  _nextMonth() {
    if (this._calMonth === 11) { this._calMonth = 0; this._calYear++ }
    else this._calMonth++
  }

  _selectDay(year, month, day) {
    this._pickerDate = new Date(year, month, day)
  }

  _renderDatePicker() {
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const DAY_LABELS = ['Mo','Tu','We','Th','Fr','Sa','Su']
    const year = this._calYear
    const month = this._calMonth
    const firstDow = new Date(year, month, 1).getDay()
    const startOffset = (firstDow + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = []
    for (let i = 0; i < startOffset; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    const today = new Date()
    const tY = today.getFullYear(), tM = today.getMonth(), tD = today.getDate()
    const pd = this._pickerDate

    return html`
      <div class="date-picker" @mousedown=${e => e.preventDefault()}>
        <div class="cal-header">
          <button class="cal-nav" @click=${this._prevMonth}>&#8249;</button>
          <span class="cal-title">${MONTHS[month]} ${year}</span>
          <button class="cal-nav" @click=${this._nextMonth}>&#8250;</button>
        </div>
        <div class="cal-grid">
          ${DAY_LABELS.map(l => html`<span class="cal-day-lbl">${l}</span>`)}
          ${cells.map(d => d === null
            ? html`<span></span>`
            : html`<button
                class="cal-day ${pd && pd.getFullYear()===year && pd.getMonth()===month && pd.getDate()===d ? 'sel' : ''} ${year===tY && month===tM && d===tD ? 'today' : ''}"
                @click=${() => this._selectDay(year, month, d)}
              >${d}</button>`
          )}
        </div>
        <div class="time-section">
          <span class="time-label">Time of arrival</span>
          <div class="hour-grid">
            ${Array.from({length: 24}, (_, h) => {
              const selH = Number(this._pickerTime.split(':')[0])
              return html`<button
                class="hour-btn ${h === selH ? 'sel' : ''}"
                @click=${() => this._pickerTime = `${String(h).padStart(2,'0')}:${this._pickerTime.split(':')[1]}`}
              >${String(h).padStart(2,'0')}</button>`
            })}
          </div>
          <div class="min-row">
            ${['00','30'].map(m => {
              const selM = this._pickerTime.split(':')[1]
              const h = this._pickerTime.split(':')[0]
              return html`<button
                class="min-btn ${selM === m ? 'sel' : ''}"
                @click=${() => {
                  this._pickerTime = `${h}:${m}`
                  if (!this._pickerDate) this._pickerDate = new Date()
                  this._dateOpen = false
                }}
              >${m === '00' ? ':00 — on the hour' : ':30 — half past'}</button>`
            })}
          </div>
        </div>
      </div>
    `
  }

  async _submitSearch() {
    const payload = {
      arrival: this._from,
      destination: this._to,
      flightArrival: this._dateDisplay ?? '',
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

          <div
            class="field date-field"
            tabindex="0"
            role="button"
            aria-label="${t('home.flightArrival')}"
            aria-expanded=${this._dateOpen}
            @click=${() => this._dateOpen = !this._dateOpen}
            @blur=${() => setTimeout(() => this._dateOpen = false, 150)}
          >
            <span class="field-icon">&#128197;</span>
            <div>
              <span class="date-label">${t('home.flightArrival')}</span>
              <span class="${this._dateDisplay ? 'date-value' : 'date-placeholder'}">
                ${this._dateDisplay ?? 'Select date & time'}
              </span>
            </div>
            ${this._dateOpen ? this._renderDatePicker() : ''}
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
