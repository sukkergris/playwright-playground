import { LitElement, css, html } from 'lit'

export class StDrivers extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .drivers-container {
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

    .drivers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .driver-card {
      padding: 30px;
      border: 1px solid #e0e0e8;
      border-radius: 8px;
      background: #fafafa;
      text-align: center;
      transition: all 0.3s;
    }

    .driver-card:hover {
      border-color: #c8a227;
      box-shadow: 0 4px 12px rgba(200, 162, 39, 0.1);
      transform: translateY(-2px);
    }

    .driver-avatar {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .driver-card h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: #1a1a2e;
    }

    .driver-role {
      color: #c8a227;
      font-weight: 600;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }

    .driver-bio {
      color: #666;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin-top: 40px;
    }

    .benefit-item {
      padding: 20px;
      background: #f0f9ff;
      border-left: 4px solid #c8a227;
      border-radius: 4px;
    }

    .benefit-item h4 {
      color: #1a1a2e;
      margin-bottom: 10px;
      font-size: 1.1rem;
    }

    .benefit-item p {
      color: #555;
      line-height: 1.6;
      font-size: 0.95rem;
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
      <main class="drivers-container">
        <h1>Meet Our Drivers</h1>
        <p class="tagline">Professional, vetted, and dedicated to your safe and comfortable journey</p>

        <section>
          <h2 class="section-title">Our Team</h2>
          <div class="drivers-grid">
            <div class="driver-card">
              <div class="driver-avatar">👨‍✈️</div>
              <h3>Ahmed Hassan</h3>
              <div class="driver-role">Senior Driver - Cairo Region</div>
              <p class="driver-bio">15+ years of experience in airport transfers. Ahmed specializes in premium customer service and knows Cairo's routes like the back of his hand.</p>
            </div>

            <div class="driver-card">
              <div class="driver-avatar">👩‍💼</div>
              <h3>Fatima Mohamed</h3>
              <div class="driver-role">Executive Driver - Hurghada</div>
              <p class="driver-bio">Expert in luxury transfers with a focus on guest satisfaction. Fluent in English, Arabic, and German. 8+ years experience.</p>
            </div>

            <div class="driver-card">
              <div class="driver-avatar">👨‍💻</div>
              <h3>Karim Ibrahim</h3>
              <div class="driver-role">Professional Driver - Sharm el-Sheikh</div>
              <p class="driver-bio">Known for punctuality and reliability. Karim has maintained a 5-star rating for over 3 years and speaks multiple languages.</p>
            </div>

            <div class="driver-card">
              <div class="driver-avatar">👩‍🚗</div>
              <h3>Laila Abdullah</h3>
              <div class="driver-role">Premium Driver - Luxor</div>
              <p class="driver-bio">Specializes in cultural tours combined with transfers. Laila provides insider knowledge of local attractions and hospitality.</p>
            </div>

            <div class="driver-card">
              <div class="driver-avatar">👨‍🔧</div>
              <h3>Mustafa Salem</h3>
              <div class="driver-role">VIP Driver - Port Said</div>
              <p class="driver-bio">Expert chauffeur for corporate clients and executives. Discreet, professional, and committed to premium service excellence.</p>
            </div>

            <div class="driver-card">
              <div class="driver-avatar">👩‍⚕️</div>
              <h3>Noor Jamal</h3>
              <div class="driver-role">Support Driver - Alexandria</div>
              <p class="driver-bio">Specialized training in passenger assistance. Noor is trained to help elderly passengers and those with special needs.</p>
            </div>
          </div>
        </section>

        <h2 class="section-title">Why Our Drivers Stand Out</h2>
        <p class="section-content">
          Every driver on the Habibi VIP Taxi team undergoes rigorous vetting and continuous training to ensure they meet our high standards for professionalism, safety, and customer service.
        </p>

        <div class="benefits-grid">
          <div class="benefit-item">
            <h4>🎓 Trained & Certified</h4>
            <p>All drivers complete comprehensive training programs covering safety, customer service, and local knowledge.</p>
          </div>

          <div class="benefit-item">
            <h4>✓ Background Checked</h4>
            <p>Every driver undergoes thorough background verification and criminal history checks for your peace of mind.</p>
          </div>

          <div class="benefit-item">
            <h4>🚗 Vehicle Inspected</h4>
            <p>Regular vehicle maintenance and inspections ensure your journey is safe, comfortable, and reliable.</p>
          </div>

          <div class="benefit-item">
            <h4>⭐ Highly Rated</h4>
            <p>Our drivers maintain an average 4.8+ star rating across thousands of customer reviews and feedback.</p>
          </div>

          <div class="benefit-item">
            <h4>🌍 Multi-Lingual</h4>
            <p>Many of our drivers speak multiple languages to serve international travelers with ease and confidence.</p>
          </div>

          <div class="benefit-item">
            <h4>💬 Responsive Support</h4>
            <p>24/7 customer support team ready to assist with any requests or concerns during your transfer.</p>
          </div>
        </div>

        <h2 class="section-title">Want to Join Our Team?</h2>
        <p class="section-content">
          We're always looking for professional drivers who share our commitment to excellence and customer satisfaction. If you're interested in becoming part of Habibi VIP Taxi, we'd love to hear from you. Applications are evaluated based on driving record, experience, customer service skills, and local knowledge.
        </p>

        <a href="/" class="cta-button">Book with Our Drivers Today</a>
      </main>
    `
  }
}

customElements.define('st-drivers', StDrivers)
