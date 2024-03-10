import { LitElement, html, css } from 'lit';

export class Alert extends LitElement {
    static get tag() {
        return 'alert-app';
      }

  constructor() {
    super();
    this.isOpen = localStorage.getItem('campusAlertOpen') !== 'false';
    this.status = this.getAttribute('status') || 'notice' || 'warning';
    this.date =  'November';
    this.sticky = this.hasAttribute('sticky');
  }

  static get styles() {
    return css`
    :host {
        position: static;
      } 

      :host([sticky]) {
        position: sticky;
        top: 0;
      }

      :host {
        display: block;
        padding: 5px;
        background-color: var(--background-color, #bf8226);
        transform: skew(20deg);
        color: var(--text-color, #ffffff);
       // border-left: 100px solid var(--border-color, #333);
        font-family: 'Roboto',Helvetica,Arial,Lucida,sans-serif;
        top: 0;
        position: relative;
      }

      :host([status="warning"]) {
        background-color: #bf8226;
        color: black;
      }

      :host([status="warning"])::before,
      :host([status="warning"])::after {
        border-color: darkbrown;
      }

      :host([status="notice"]) {
        background-color: blue;
        color: white;
        //border-left: 10px solid darkblue;
      }
      
      :host([status="notice"])::before,
      :host([status="notice"])::after {
        border-color: darkblue;
      }

      :host([status="alert"]) {
        background-color: red;
        color: white;
        //border-left: 10px solid darkblue;
      }
      
      :host([status="alert"])::before,
      :host([status="alert"])::after {
        border-color: darkblue;
      }


      :host::before,
      :host::after {
        content: "";
        position: absolute;
        top: 0;
        width: 0;
        height: 0;
      }

      :host::before {
        left: -5px;
        border-top: 50px solid transparent;
        border-bottom: 20px solid transparent;
        border-right: 10px solid var(--background-color, #99753f);
      }

      :host::after {
        right: -10px;
        border-top: 55px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 10px solid var(--background-color, #99753f);
      }


      #alert {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
     
      #alert-content {
        flex-grow: 1;
        margin-right: 10px;
        transform: skew(-20deg);
      }
      #close-button {
        cursor: pointer;
        padding: 5px;
        background-color: var(--close-button-background-color, #e81111);
        border-radius: 5px;
      }

      #close-button[open] {
        background-color: green;
      }

      
      /* Add additional CSS here */
    `;
  }
  

  render() {
    return (   
    html`
      <div id="alert">
        <div id="alert-content">
          <p>${this.date}</p>
          <slot></slot>
        </div>
        <div id="close-button" @click="${this.toggle}">X CLOSE</div>
      </div>
    ` 
    )

  }

  // toggle() {
  //   this.isOpen = !this.isOpen;
  //   console.log('Toggled:', this.isOpen);  
  //   localStorage.setItem('campusAlertOpen', this.isOpen);
  //   this.requestUpdate();
  // }

  toggleAlert() {
    this.isOpen = !this.isOpen;
    localStorage.setItem('campusAlertOpen', this.isOpen);
    this.requestUpdate();
    if (this.isOpen) {
      this.shadowRoot.host.style.height = 'auto';
      this.shadowRoot.host.style.overflow = 'visible';
    } else {
      this.shadowRoot.host.style.height = '20px';
      this.shadowRoot.host.style.overflow = 'hidden';
    }
  }

  closeAlert() {
    this.isOpen = false;
    localStorage.setItem('campusAlertOpen', this.isOpen);
    this.requestUpdate();
    this.shadowRoot.host.style.height = '20px';
    this.shadowRoot.host.style.overflow = 'hidden';
  }

  render() {
    return html`
      <div id="alert">
        <div id="alert-content">
          ${this.isOpen ? html`<p>${this.date}</p><slot></slot>` : html`TEST CAMPUS ALERT`}
        </div>
        <div id="close-button" ?open="${!this.isOpen}" @click="${this.toggleAlert}">
          ${this.isOpen ? 'X CLOSE' : 'OPEN'}
        </div>
      </div>
    `;
  }


static get properties() {
  return {
    isOpen: { type: Boolean, reflect: true },
    status: { type: String },
    date: { type: String },
    sticky: { type: Boolean }
  };
}
}


globalThis.customElements.define(Alert.tag, Alert);
