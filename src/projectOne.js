import {html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


class projectOne extends DDD {
  static properties = {
    items: { type: Array },
    userName: { type: String },
    seed: { type: Number }
  }

  static styles = css`
    :host {
     display: block
    }

    my-item  {
      display: block;
      background-color: orange;
      padding: 16px;
    }

    .user-container {
      display: flex;
      flex-wrap: wrap;
      background-color: rgba(255, 0, 0, 0.1); /* Faint red background */
      padding: 16px;
    }

    .user {
      margin: 16px;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.userName = '';
  }

  addUser(e) {
    const randomNumber = Math.random(); // Generate a new random number for each user

    const item = {
      id: randomNumber,
      title: this.userName,
      content: this.userName,
      coolness: 7
    }
    this.items.push(item);
    this.requestUpdate();
  }

  deleteUser(e) {
    const index = this.items.findIndex((item) => {
      return item.title === this.userName;
    });
    if (index !== -1) {
      this.items.splice(index, 1);
      this.requestUpdate();
    }
  }

  handleInput(e) {
    this.userName = e.target.value;
  }

  render() {
    return html`
     <div>
      <input type="text" .value="${this.userName}" @input="${this.handleInput}" placeholder="Type user's name here">
      <button @click="${this.addUser}">Add User</button>
      <button @click="${this.deleteUser}">Delete User</button>
     </div>
     <div class="user-container">
        ${this.items.map((item) => html`
          <div class="user">
            <rpg-character name="${item.title}" seed="${item.id}"></rpg-character>
            <p>${item.title}</p>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('project-one', projectOne);
