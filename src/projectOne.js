import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";


class projectOne extends LitElement {
  static properties = {
    items: { type: Array },
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
  `;

  constructor() {
    super();
    // MUST have array initialized as empty or it'll break in console
    this.items = [];
  }

  addItem(e) {
    const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];

    const item = {
      id: randomNumber,
      title: "Cool",
      content: "Some content of some kind",
      coolness: 7
    }
    console.log(item);
    // push by itself is not a mutating operation
    this.items.push(item);
    this.requestUpdate();
    //this.items = [...this.items, item];
    console.log(this.items);
  }

  targetClicked(e) {
    // what item bubbled the event
    console.log(e.target);
    // a way of seleecting the closest tag relative to what you clicked
    console.log(e.target.closest('my-item'));
    console.log(e.target.closest('my-item').getAttribute('data-id'));
    // other ways of knowing what to eliminate but this is one method
    this.shadowRoot.querySelectorAll('my-item').forEach((item) => {
      if (item === e.target.closest('my-item')) {
        console.log(item);
        console.log('found the thing clicked in the array');
      }
    });

    // another way of finding the index that matches what was clicked if you have a unique value in your items as added
    // which... seed / name of the user should be enforced to be unique so.....
    const index = this.items.findIndex((item) => {
      return item.id === parseInt(e.target.closest('my-item').getAttribute('data-id'));
    });
    console.log(index);
  }

  render() {
    return html`
     <div>
      <button @click="${this.addItem}">Add item</button>
     </div>
     <div>
        ${this.items.map((item) => html`
          <my-item title="${item.title}" @click="${this.targetClicked}" data-id="${item.id}">
          ${item.content}
          <strong>${item.coolness}</strong>
          </my-item>
        `)}
      </div>
    `;
  }
}

customElements.define('project-one', projectOne);