import {html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/multiple-choice/lib/confetti-container.js";

class projectOne extends DDD {
  static properties = {
    items: { type: Array },
    userName: { type: String },
    seed: { type: Number },
    deleteQueue: { type: Array },
    showRules: { type: Boolean },
    partyCount: { type: Number }, // Add a new property to keep track of the party count
    savedParties: { type: Array } // Add a new property to store the saved parties
  }

  static styles = css`
    :host {
     display: block;
     background-color: rgba(255, 0, 0, 0.1); /* Faint red background */
     padding: var(--ddd-spacing-6);
     align-items: center;
     text-align: center;
     justify-content: center;
     font-family: "Press Start 2P", system-ui;
    }

    .character-container {
      display: flex;
      flex-wrap: wrap;
      max-width: var(--haxcms-party-ui-party-width, 90vw);
      height: var(--haxcms-party-ui-party-height, 250px);
      background-color: rgba(255, 0, 0, 0.1); /* Faint red background */
      border: 10px solid var(--ddd-theme-default-nittanyNavy); 
      padding: var(--ddd-spacing-6);
      margin: var(--ddd-spacing-10);
      box-shadow: -5px 0 0 0 black, 5px 0 0 0 black, 0 -5px 0 0 black, 0 5px 0 0 black;
    }

    .user {
      margin: 16px;
      position: relative;
    }

    .delete-button {
      position: absolute;
      top: 0;
      right: 0;
      width: 35px;
      height: 35px;
      background-color: red; /* Red background for Delete button */
      color: white; /* White color for the text */
      font-family: "Press Start 2P", system-ui;
      font-size: 17px;
      text-align: center; /* Center the text */
      line-height: 20px; /* Align the text vertically */
      cursor: pointer;
    }

    .opaque {
      opacity: 0.5;
    }

    .coolness {
      font-size: 0.8em;
    }

    .add-button, .save-button, .cancel-button, .save-party-button, .rules-button, input[type="text"] {
      font-family: "Press Start 2P", system-ui;
      font-size: var(--ddd-font-size-3xs);
      min-width: 100px; 
      max-width: var(--haxcms-party-ui-party-width, 90vw);
      margin: var(--ddd-spacing-3);
      padding: var(--ddd-spacing-5);
      color: var(--ddd-theme-default-wonderPurple);
      box-shadow: -5px 0 0 0 black, 5px 0 0 0 black, 0 -5px 0 0 black, 0 5px 0 0 black;
    }

    .add-button, .save-button {
      background-color: var(--ddd-theme-default-futureLime); /* Green for Add and Save */
      color: var(--ddd-theme-default-slateMaxDark);
    }

    .cancel-button {
      background-color: var(--ddd-theme-default-original87Pink); /* Red for Cancel */
      color: var(--ddd-theme-default-slateMaxDark);
    }

    .rules-button {
      background-color: var(--ddd-theme-default-keystoneYellow); /* Yellow for Username Rules */
      color: var(--ddd-theme-default-slateMaxDark);
    }

    .save-party-button {
      background-color: blue; /* Blue for Save Party */
      color: var(--ddd-theme-default-slateMaxLight);
    }

    input[type="text"] {
      background-color: white; /* White background for input field */
    }

    p {
      font-size: 0.8em; /* Smaller font size for the paragraph */
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.userName = '';
    this.deleteQueue = [];
    this.showRules = false;
    this.partyCount = 0; // Initialize the party count to 0
    this.savedParties = []; // Initialize the saved parties array
  }

  addUser(e) {
    let value = this.userName;
    let originalValue = value;
    value = value.replace(/\s/g, ''); // Remove spaces
    value = value.replace(/[^\w\s]/gi, ''); // Remove special characters
    value = value.toLowerCase(); // Convert to lowercase
  
    if (value !== originalValue || !value) {
      alert("Your username does not meet the requirements:\n- No capital letters\n- No special characters\n- No spaces");
      return;
    }
  
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a new random number for each user
    const randomCoolness = Math.floor(Math.random() * 4) + 7; // Generate a random coolness level between 7 and 10
  
    const item = {
      id: randomNumber,
      title: this.userName,
      content: this.userName,
      coolness: randomCoolness
    }
    this.items.push(item);
    console.log(this.items.map(item => item.title)); // Print the array of usernames to console
    this.userName = ''; // Clear the input box
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
    console.log(this.items.map(item => item.title)); // Print the array of usernames
    this.deleteQueue = [];
    this.makeItRain(); // Add confetti effect when save button is clicked
    this.requestUpdate();
  }

  cancelDeletions() {
    this.deleteQueue = [];
    this.requestUpdate();
  }

  handleInput(e) {
    let value = e.target.value;
    value = value.replace(/\s/g, ''); // Remove spaces
    value = value.replace(/[^\w\s]/gi, ''); // Remove special characters
    value = value.toLowerCase(); // Convert to lowercase
    this.userName = value;
  }

  toggleRules() {
    this.showRules = !this.showRules;
    this.requestUpdate();
  }

  makeItRain() {
    setTimeout(() => {
      this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
    }, 0);
  }

  saveParty() {
    this.partyCount++; // Increment the party count
    const party = {
      id: this.partyCount,
      title: `Party ${this.partyCount}`,
      members: [...this.items] // Copy the current party members
    };
    this.savedParties.push(party); // Save the current party
    this.requestUpdate();
  }

  render() {
    return html`
     <confetti-container id="confetti">
      <div>
        <p>Anything which does not meet these rules will automatically be adjusted!</p>
        <button class="rules-button" @click="${this.toggleRules}">Username rules +</button>
        <p></p>
        ${this.showRules ? html`
          <ul>
            <li>No spaces</li>
            <li>No special characters</li>
            <li>No capital letters</li>
          </ul>
        ` : ''}
        <input type="text" .value="${this.userName}" @input="${this.handleInput}" placeholder="Type username here">
        <button class="add-button" @click="${this.addUser}">Add User</button>
      </div>
      <div class="character-container">
        ${this.items.map((item) => html`
          <div class="user ${this.deleteQueue.includes(item.id) ? 'opaque' : ''}">
            <rpg-character name="${item.title}" seed="${item.id}"></rpg-character>
            <p>${item.title}</p>
            <p class="coolness">Coolness: ${item.coolness}</p>
            <button class="delete-button" @click="${(e) => this.deleteUser(e, item.id)}">X</button>
          </div>
        `)}
      </div>
      <div>
        <button class="save-button" @click="${this.saveDeletions}">Save</button>
        <button class="cancel-button" @click="${this.cancelDeletions}">Cancel</button>
        <p></p>
        <button class="save-party-button" @click="${this.saveParty}">Save Party</button> <!-- Add the Save Party button -->
      </div>
      <div>
        ${this.savedParties.map((party) => html`
          <div class="party">
            <h2>${party.title}</h2>
            <div class="party-members">
              ${party.members.map((member) => html`
                <div class="party-member">
                  <p>${member.title}</p>
                </div>
              `)}
            </div>
          </div>
        `)}
      </div>
     </confetti-container>
    `;
  }
}

customElements.define('project-one', projectOne);
