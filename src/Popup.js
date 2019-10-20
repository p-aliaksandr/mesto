  export default class Popup {
    constructor(popupImg) {
      this.popup = document.querySelector(popupImg);
      this.open();
      this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    }
  
    open() {
      this.popup.classList.add('popup_is-opened');
    }
  
    close(event) {
      event.target.closest('.popup').classList.remove('popup_is-opened');
    }
  }