import Popup from './Popup.js';
import {api, loader} from './index.js';

export default class Card {
    constructor(item, profileOwner ) {
      this.remove = this.remove.bind(this);
      this.like = this.like.bind(this);

      this.cardParametrs = Object.assign(item);

      this.cardOwner = Object.assign(profileOwner); // profile владельца для сравнения по id(корзина)

      this.link = item.link;
      this.name = item.name;

      this.card = this.create();

      this.likeButton = this.card
      .querySelector('.place-card__like-icon');
      this.likeButton
      .addEventListener('click', this.like);

      this.card
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove);
      this.card
      .querySelector('.place-card__image')
      .addEventListener('click', this.openImage);
    }
    create() { // создаем карточку

      const placeCard = document.createElement('div');
      const placeCardImage = document.createElement('div');
      const placeCardDeleteIcon = document.createElement('button');
      const placeCardDescription = document.createElement('div');
      const placeCardName = document.createElement('h3');
      const placeCardLikeIcon = document.createElement('button');
      const placeCardLikeContainer = document.createElement('div');
      const placeCardLikeCounter = document.createElement('span');

      placeCard.className = 'place-card';
      placeCardImage.className = 'place-card__image';
      placeCardDeleteIcon.className = 'place-card__delete-icon';
      placeCardDescription.className = 'place-card__description';
      placeCardName.className = 'place-card__name';
      placeCardName.textContent = this.name;
      placeCardLikeIcon.className = 'place-card__like-icon';
      placeCardLikeContainer.className = 'place-card__like-container';
      placeCardLikeCounter.className = 'place-card__like-counter';

      document.querySelector('.places-list').appendChild(placeCard);
      placeCard.appendChild(placeCardImage);
      placeCardImage.appendChild(placeCardDeleteIcon);
      placeCard.appendChild(placeCardDescription);
      placeCardDescription.appendChild(placeCardName);
      placeCardLikeContainer.appendChild(placeCardLikeIcon);
      placeCardDescription.appendChild(placeCardLikeContainer)
      placeCardLikeContainer.appendChild(placeCardLikeCounter);

      placeCardImage.setAttribute('style', `background-image: url(${this.link})`);

      placeCardLikeCounter.textContent = `${this.cardParametrs.likes.length}`;

      // Проверка по id(лайки), для сохранения наших лайков
      // после перезагрузки страницы 
      if (this.cardParametrs.likes.some(item => {
          return item._id === this.cardOwner._id}))
         { placeCard.querySelector('.place-card__like-icon')
          .classList.add('place-card__like-icon_liked');
      }

      // Проверка по id что карточка является нашей, если наша то
      // выводит корзину только на наших карточках
      if (this.cardParametrs.owner._id === this.cardOwner._id) {
        placeCard
          .querySelector('.place-card__delete-icon')
          .classList.add('place-card__delete-icon_owner');
      }

      return placeCard;
    }

    like() {
      if (!this.likeButton.classList.contains('place-card__like-icon_liked')) {
        loader.classList.add('popup_is-opened');
        api.likeCardOnServer(this.cardParametrs._id, 'PUT', this.card)
        .then(card => {
          this.card.querySelector('.place-card__like-counter').textContent = card.likes.length;
          this.card.querySelector('.place-card__like-icon')
          .classList.toggle('place-card__like-icon_liked');
          loader.classList.remove('popup_is-opened');
        })
      } else {
        loader.classList.add('popup_is-opened');
        api.likeCardOnServer(this.cardParametrs._id, 'DELETE', this.card)
        .then(card => {
          this.card.querySelector('.place-card__like-counter').textContent = card.likes.length;
          this.card.querySelector('.place-card__like-icon')
          .classList.toggle('place-card__like-icon_liked');
          loader.classList.remove('popup_is-opened');
        })
      }
    }
  
    remove() {
      const openDialog = confirm('Вы действительно хотите удалить карточку?');
    if (openDialog) {
      loader.classList.add('popup_is-opened');
      api.deleteCardFromServer(this.cardParametrs._id, this.card)
      .then(() => {
        this.card.parentNode.removeChild(this.card);
        loader.classList.remove('popup_is-opened');
      })
      .catch(err => {
        loader.classList.remove('popup_is-opened');
        alert('Ошибка: ' + err);
      })
      }
    }

    openImage(event) {
      if (!event.target.classList.contains('place-card__delete-icon')) {
        new Popup('.popup-image');
        const img = new Image();

        img.src = event.target.style.backgroundImage
  .split('')
  .slice(5, event.target.style.backgroundImage.length - 2)
  .join('');

  document.querySelector('.popup__content_img').setAttribute(
  'style',
  `width: ${img.naturalWidth}px; 
  height: ${img.naturalHeight}px; 
  background-image: ${event.target.style.backgroundImage};`,
        );
    }
  }
}