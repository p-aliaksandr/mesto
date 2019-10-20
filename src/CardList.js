import Card from './Card.js';

export default class CardList {
    constructor(container, initialCards, profileOwner) {
      this.playList = container;
      this.cards = initialCards;
      this.profileOwner = Object.assign(profileOwner);
      this.render();
    }
    addCard(item) {
      const newCard = new Card(item, this.profileOwner);
      this.playList.appendChild(newCard.card);  
    }

    render() {
      this.cards.forEach((item) => {this.addCard(item);
      });
    }
  }