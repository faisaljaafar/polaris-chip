import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.image = "https://cdn2.thecatapi.com/images/9j5.jpg";
    this.cardTitle = "Week 5 - IST256";
    this.cardText = "This section is card text where I am able to add things without having to open description";
    this.backgroundColor = 'turqoise';
    this.fancy = false;
    this.description = "This is the description section to my card.";
  }

  openChanged(e) {
    if (e.target.getAttribute('open') !== null) {
      this.fancy = true;
    } else {
      this.fancy = false;
    }
  }

  static get properties() {
    return {
      fancy: { type: Boolean, reflect: true }
    }
  }

  static get styles() {
    return css`
      :host {
      }
      :host([fancy]) {
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

      

  .card {
  width: 400px;
  border: 1px solid black;
  padding: 16px;
  margin: 8px;
  background-color: turquoise;
}

.cardlist{
  display: inline-flex;
}
.control-wrapper{
}

.card.change-color {
background-color: green;
}


.card img {
  width: 100%;
  height: 200px; 
}


.btn-wrapper {
  background-color: orange;
  border-style: dashed;
  border-radius: 10px;
  padding: 10px;
  width: 100px;

}

.card{

}

@media (min-width: 500px) and (max-width: 800px) {
  .details-button {
    display: flex;
  }
}

@media (max-width: 500px) {
  .card {
    width: 100%;
  }

  .card img {
    width: 100%;
    height: auto; 
  }
}
    `;
  }

  render() {
    return html`

<!-- <h2>Controls</h2> -->

<div class="cardlist">

<div class="card" style="background-color: ${this.backgroundColor}">
    <h3 class="card-title">${this.cardTitle}</h3>
    <!-- <img class="card-image" src=${this.image}> -->
    <meme-maker alt="Cat stalking a small toy" image-url="${this.image}" top-text="I bring you" bottom-text="the death">
</meme-maker>
    <div class="card-text">
    <details ?open="${this.fancy}" @toggle="${this.openChanged}">
        <summary>Description</summary>
        <div>
          <slot>${this.description}</slot>
        </div>
      </details>

      <div class="card-details">
        <p>
        ${this.cardText}
        </p>
        <h4>The goals</h4>
        <ul>
          <li>To get my card working right</li>
        <h4>Learn more</h4>
        <ul class="links">
          <li>
            <a href="https://hax.psu.edu">
            HAX [dot] PSU</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
    `;
  }

  changeBackgroundColor(color) {
    this.backgroundColor = color;
    this.requestUpdate();
  }

  static get properties() {
    return {
      title: { type: String },
      image: {type: String},
    cardTitle: {type: String},
    cardText: {type: String},
    backgroundColor: {type: String},
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
customElements.define('my-card', MyCard);
