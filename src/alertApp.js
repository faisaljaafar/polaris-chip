import { LitElement, html, css } from 'lit';

export class alertApp extends LitElement {
  static get properties() {
    return {
      isOpen: { type: Boolean },
      status: { type: String },
      date: { type: String },
      sticky: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.isOpen = localStorage.getItem('campusAlertOpen') !== 'false';
    this.status = this.getAttribute('status') || 'notice';
    this.date = this.getAttribute('date') || '';
    this.sticky = this.hasAttribute('sticky');
  }

  static get styles() {
    return css`
    :host {
        position: static;
      }
      :host([sticky]) {
        position: fixed;
      }
      :host {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: var(--background-color, #f30303);
        color: var(--text-color, #333);
        border-left: 10px solid var(--border-color, #333);
        font-family: Arial, sans-serif;
        position: ${this.sticky ? 'fixed' : 'static'};
        top: 0;
      }
      #alert {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--border-color, #333);
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
      }
      #alert-content {
        flex-grow: 1;
        margin-right: 10px;
      }
      #close-button {
        cursor: pointer;
        padding: 5px;
        background-color: var(--close-button-background-color, #9eb217);
        border-radius: 5px;
      }
      /* Add your additional CSS here */
    `;
  }
  

  render() {
    return this.isOpen ? html`
      <div id="alert">
        <div id="alert-content">
          <strong>${this.date}</strong>
          <slot></slot>
        </div>
        <div id="close-button" @click="${this.toggle}">X CLOSE</div>
      </div>
    ` : '';
  }

  toggle() {
    this.isOpen = !this.isOpen;
    localStorage.setItem('campusAlertOpen', this.isOpen);
    this.requestUpdate();
  }
}

customElements.define('alert-app', alertApp);
