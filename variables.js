// ключ авторизации
const authorization = '4422a986-6fc1-417b-86ac-e535571fd3cf';

// Формы +, Edit, Avatar
const form = document.forms.new;
const formInfo = document.forms.editProfile;
const formAvatar = document.forms.formAvatar;

// name, job формы Edit
const userName = document.querySelector('.user-info__name');
const userInfo = document.querySelector('.user-info__job');

// namePlus, link формы +
const nameFormPlus = document.querySelector('.popup__input_type_name');
const linkFormPlus = document.querySelector('.popup__input_type_link-url');

// linkFormAvatar формы popupAvatar
const linkFormAvatar = document.querySelector('.popup__input_type_link-avatar');

//контейнер для карточек
const placesList = document.querySelector('.places-list');

//ошибки
const ERROR_TEXT = 'Это обязательное поле';
const ERROR_LENGTH = 'Должно быть от 2 до 30 символов';
const ERROR_LINK = 'Здесь должна быть ссылка';

// Валидация мин. символов
const MIN_LENGTH_INPUT = 2;

// cardList для добавления карточек, функция newInfoPlus()
const cardList = new CardList(document.querySelector('.places-list'), []);

// profile из api.getInfoAboutUser()
const profileOwner = {};

// Кружок загрузка
const loader = document.querySelector('.popup-loader');