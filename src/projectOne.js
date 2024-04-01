import {html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/multiple-choice/lib/confetti-container.js";
// import copy from 'rollup-plugin-copy';

// copy({
//   targets: [
//     {
//       src: 'node_modules/@lrnwebcomponents/rpg-character/lib',
//       dest: 'dist',
//     },
//     {
//       src: 'src/dltBtn.png',
//       dest: 'dist',
//     },
//   ],
// });

class projectOne extends DDD {
  static properties = {
    items: { type: Array },
    userName: { type: String },
    seed: { type: Number },
    deleteQueue: { type: Array }
  }

  static styles = css`
    :host {
     display: block;
     background-color: rgba(255, 0, 0, 0.1); /* Faint red background */
     padding: 16px;
     align-items: center;
     justify-content: center;
    }

    .character-container {
      display: flex;
      flex-wrap: wrap;
      background-color: rgba(255, 0, 0, 0.1); /* Faint red background */
      border: 4px solid black; /* Thicker black border */
      padding: 16px;
      margin: 16px;
    }

    .user {
      margin: 16px;
      position: relative;
    }

    .delete-button {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background-image: url('src/dltBtn.png');
      background-size: cover;
      cursor: pointer;
    }

    .opaque {
      opacity: 0.5;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.userName = '';
    this.deleteQueue = [];
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
    console.log(this.items.map(item => item.id)); // Print the array of IDs to console
    this.requestUpdate();
  }

  deleteUser(e, id) {
    this.deleteQueue.push(id);
    this.requestUpdate();
  }

  saveDeletions() {
    this.deleteQueue.forEach(id => {
      const index = this.items.findIndex((item) => {
        return item.id === id;
      });
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    });
    console.log(this.deleteQueue);
    this.deleteQueue = [];
    this.makeItRain(); // Add confetti effect when save button is clicked
    this.requestUpdate();
  }

  cancelDeletions() {
    this.deleteQueue = [];
    this.requestUpdate();
  }

  handleInput(e) {
    this.userName = e.target.value;
  }

  makeItRain() {
    setTimeout(() => {
      this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
    }, 0);
  }

  render() {
    return html`
     <confetti-container id="confetti">
      <div>
        <input type="text" .value="${this.userName}" @input="${this.handleInput}" placeholder="Type user's name here">
        <button @click="${this.addUser}">Add User</button>
      </div>
      <div class="character-container">
        ${this.items.map((item) => html`
          <div class="user ${this.deleteQueue.includes(item.id) ? 'opaque' : ''}">
            <rpg-character name="${item.title}" seed="${item.id}"></rpg-character>
            <p>${item.title}</p>
            <div class="delete-button" @click="${(e) => this.deleteUser(e, item.id)}"></div>
          </div>
        `)}
      </div>
      <div>
        <button @click="${this.saveDeletions}">Save</button>
        <button @click="${this.cancelDeletions}">Cancel</button>
      </div>
     </confetti-container>
    `;
  }
}

customElements.define('project-one', projectOne);
