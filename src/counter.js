import { LitElement, html, css } from 'lit';

export class Counter extends LitElement {

  static get tag() {
    return 'my-counter';
  }

  constructor() {
    super();
    this.count = 10;
    this.min = 10;
    this.max = 25;
    this.name= "Counter";
  }

  static get properties() {
    return {
      count: { type: Number },
      min: {type: Number},
      max: {type: Number},
      name: {type: String},
    }
  }

  static get styles() {
    return css`
    :host{
        display: inline-flex
    }
      .counter-container {
        width: 400px;
        border: 1px solid black;
        padding: 16px;
        margin: 8px;
        background-color: turquoise;
        align-items: center;
      }

      #counter-value {
        height: 80px;
        width: 100px;
        font-size: 55px;
        border: 1px solid black;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--counter-color, black);
      }

      button {
        font-size: 35px;
        padding: 30px;
        margin: 8px;
      }

      button:hover, button:focus{
        background-color: red;
      }


    `;
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="counter-container">
          <h1>${this.name}</h1>
          <div id="counter-value">${this.count}</div>
          <button id="decrement-btn" @click="${this.decrement}" ?disabled="${this.count === this.min}">-</button>
          <button id="increment-btn" @click="${this.increment}" ?disabled="${this.count === this.max}">+</button>
        </div>
      </confetti-container>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('count')) {
      if (this.count === 21) {
        this.makeItRain();
      }
      this.updateCounterColor();
    }
  }

  updateCounterColor() {
    let color = 'black';
    if (this.count === 18) {
      color = 'red';
    } else if (this.count === 21) {
      color = 'blue';
    } else if (this.count === this.min || this.count === this.max) {
      color = 'green';
    }
    this.style.setProperty('--counter-color', color);
  }

  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  increment() {
    if (this.count < this.max) {
      this.count++;
    }
  }

  decrement() {
    if (this.count > this.min) {
      this.count--;
    }
  }
}

customElements.define(Counter.tag, Counter);
