import { LitElement, html, css } from 'lit';

class PageQuestions extends LitElement {
  static properties = {
    submitted: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }
    h1 {
      font-size: 2rem;
      margin: 0 0 1.5rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 480px;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.9rem;
      color: #555;
    }
    input,
    textarea {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
    }
    textarea {
      resize: vertical;
    }
    button {
      align-self: flex-start;
      padding: 0.6rem 1.5rem;
      background: #1a1a2e;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:hover {
      background: #2d2d50;
    }
    .success {
      color: #2d6a2d;
      font-size: 1.1rem;
    }
  `;

  constructor() {
    super();
    this.submitted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.submitted = true;
  }

  render() {
    if (this.submitted) {
      return html`
        <section>
          <h1>Ask a Question</h1>
          <p class="success">Thanks — your question has been submitted!</p>
        </section>
      `;
    }
    return html`
      <section>
        <h1>Ask a Question</h1>
        <form @submit=${this.handleSubmit}>
          <label>Name <input type="text" name="name" required /></label>
          <label>Email <input type="email" name="email" required /></label>
          <label>Question <textarea name="question" rows="5" required></textarea></label>
          <button type="submit">Submit</button>
        </form>
      </section>
    `;
  }
}

customElements.define('page-questions', PageQuestions);
