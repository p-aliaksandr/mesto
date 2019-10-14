class CardList {
    constructor(container, initialCards) {
      this.playList = container;
      this.cards = initialCards;
      this.render();
    }
    addCard(item) {
      const newCard = new Card(item);
      this.playList.appendChild(newCard.card);  
    }

    render() {
      this.cards.forEach((item) => {this.addCard(item);
      });
    }
  }