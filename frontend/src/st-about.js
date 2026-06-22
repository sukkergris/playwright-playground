import { LitElement, css, html } from 'lit'

export class StAbout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 24px;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #1a1a2e;
    }

    .tagline {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 40px;
      max-width: 600px;
    }

    .about-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      margin-top: 50px;
    }

    .about-card {
      padding: 30px;
      border: 1px solid #e0e0e8;
      border-radius: 8px;
      background: #fafafa;
      transition: all 0.3s;
    }

    .about-card:hover {
      border-color: #c8a227;
      box-shadow: 0 4px 12px rgba(200, 162, 39, 0.1);
    }

    .about-card h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #1a1a2e;
    }

    .about-card p {
      color: #666;
      line-height: 1.6;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .section-title {
      font-size: 1.8rem;
      margin-top: 50px;
      margin-bottom: 30px;
      color: #1a1a2e;
    }

    .section-content {
      color: #555;
      line-height: 1.8;
      margin-bottom: 30px;
    }

    .cta-button {
      display: inline-block;
      background: #c8a227;
      color: #fff;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.3s;
      margin-top: 20px;
    }

    .cta-button:hover {
      background: #a68a1f;
    }
  `

  render() {
    return html`
      <main class="about-container">
        <h1>About Habibi VIP Taxi</h1>
        <p class="tagline">Your trusted partner for reliable, affordable airport transfers worldwide</p>

        <div class="about-grid">
          <div class="about-card">
            <div class="icon">🌍</div>
            <h3>Global Coverage</h3>
            <p>Operating in major cities across the globe, we bring you reliable airport transfers wherever you travel.</p>
          </div>

          <div class="about-card">
            <div class="icon">💰</div>
            <h3>Transparent Pricing</h3>
            <p>No hidden fees. What you see is what you pay. Fair prices guaranteed for all routes and destinations.</p>
          </div>

          <div class="about-card">
            <div class="icon">⭐</div>
            <h3>Professional Drivers</h3>
            <p>Vetted and experienced drivers committed to delivering excellent service every single time.</p>
          </div>

          <div class="about-card">
            <div class="icon">🚗</div>
            <h3>Modern Fleet</h3>
            <p>Well-maintained vehicles with comfort features to ensure your ride is smooth and enjoyable.</p>
          </div>

          <div class="about-card">
            <div class="icon">📱</div>
            <h3>Easy Booking</h3>
            <p>Book in seconds with our simple app. Track your ride in real-time and manage your bookings effortlessly.</p>
          </div>

          <div class="about-card">
            <div class="icon">🛡️</div>
            <h3>Safe & Secure</h3>
            <p>Your safety is our priority. All drivers are background-checked and vehicles are fully insured.</p>
          </div>
        </div>

        <h2 class="section-title">Our Mission</h2>
        <p class="section-content">
          At Habibi VIP Taxi, we believe everyone deserves a reliable, affordable way to get to and from the airport. We're committed to making airport transfers hassle-free, transparent, and convenient for travelers around the world.
        </p>

        <h2 class="section-title">Why Choose Us?</h2>
        <p class="section-content">
          Whether you're traveling for business or pleasure, we've got you covered. With thousands of satisfied customers and years of experience in the transportation industry, we know exactly what travelers need. Our 24/7 customer support team is always ready to help.
        </p>

        <a href="/" class="cta-button">Book Your Transfer Today</a>
      </main>
    `
  }
}

customElements.define('st-about', StAbout)
