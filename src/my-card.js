import { LitElement, html, css } from 'lit';

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
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .card {
  width: 400px;
  border: 1px solid black;
  padding: 16px;
  margin: 8px;
  background-color: turquoise;
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

.details-button {
}

@media (min-width: 500px) and (max-width: 800px) {
  .details-button {
    display: block;
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
    
<h1>Card changing 'app'</h1>
<h2>Controls</h2>
<div class="control-wrapper">
  <button class="duplicate">Clone Card</button>
  <button id="changetitle">Change title</button>
  <button id="changeimage">Change image</button>
  <button id="changebg">Change background</button>
  <button id="delete">Delete card</button>
</div>
<h2>Awesome profs</h2>
<div id="cardlist">
  <div class="card">
    <img class="card-image" src="https://www.abc27.com/wp-content/uploads/sites/55/2020/01/PSU-Logo-10.20.17-1.jpg?w=1752&h=986&crop=1" />
    <div class="card-text">
      <h3 class="card-title">Week 3 IST256</h3>
      <div class="card-details">
        <p>
        This is the assignment for week 3.
        </p>
        <h4>The goals</h4>
        <ul>
          <li>Figure out why it won't clone to the right</li>
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

  static get properties() {
    return {
      title: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
