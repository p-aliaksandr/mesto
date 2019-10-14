// Открытие формы Avatar
function openFormAvatar() {
  const avatar = formAvatar.elements.linkAvatar;
  avatar.value = linkFormAvatar;
  document.querySelector('.popup__error_link-avatar').textContent = '';
  document.querySelector('.popup__button_avatar').setAttribute('disabled', true);
  document.forms.formAvatar.reset();
  new Popup('.popup-avatar');
}

// Открытие формы +
function openForm() {
  const name = form.elements.namePlus;
  const link = form.elements.link;
  name.value = nameFormPlus.textContent;
  link.value = linkFormPlus.textContent;
  document.querySelector('.popup__error_name').textContent = '';
  document.querySelector('.popup__error_link').textContent = '';
  document.querySelector('.popup__button_plus').setAttribute('disabled', true);
  document.forms.new.reset();
  new Popup('.popup-plus');
}

// Открытие формы Edit
function openFormEdit() {
  const user = formInfo.elements.name;
  const about = formInfo.elements.job;
  user.value = userName.textContent;
  about.value = userInfo.textContent;
  document.querySelector('.popup__button_edit').setAttribute('disabled', true);
  new Popup('.popup-edit');
}

// функция обновления информации на странице(кнопка Avatar)
function newInfoAvatar(event) {
 loader.classList.add('popup_is-opened');
  api.editAvatarOnServer()
  .then(profile => {
    document.querySelector('.user-info__photo')
    .style.backgroundImage = `url(${profile.avatar})`;
    loader.classList.remove('popup_is-opened');
    })
  .catch(err => {
    loader.classList.remove('popup_is-opened');
    alert('Ошибка: ' + err);
    })
  linkFormAvatar.textContent = formAvatar.elements.linkAvatar.value;
  event.preventDefault(event);
  new Popup('.popup-avatar')
}

// функция обновления информации на странице(кнопка Edit)
function newInfo(event) {
  loader.classList.add('popup_is-opened');
  api.editProfileUser().then(profile => {
    loader.classList.remove('popup_is-opened');
  if(profile.name && profile.about) {
  document.querySelector('.user-info__name').textContent = profile.name;
  document.querySelector('.user-info__job').textContent = profile.about;
  } else {
    alert('Ошибка: данные не найдены!')
  }
  })
  .catch(err => {
    loader.classList.remove('popup_is-opened');
    alert('Ошибка: ' + err);
  })
  event.preventDefault();
  userName.textContent = formInfo.elements.name.value;
  userInfo.textContent = formInfo.elements.job.value;
  new Popup('.popup-edit');
}

// функция обновления информации на странице(кнопка +)
function newInfoPlus(event) {
  event.preventDefault();
  loader.classList.add('popup_is-opened');
  api.postCardOnServer()
  .then(card => {
    cardList.addCard(card)
    loader.classList.remove('popup_is-opened');
  })
  .catch(err => {
    loader.classList.remove('popup_is-opened');
    alert('Ошибка: ' + err);
  })
  nameFormPlus.textContent = form.elements.namePlus.value;
  linkFormPlus.textContent = form.elements.link.value;
  new Popup('.popup-plus');
}

// Валидация формы Avatar
function validFormAvatar(link,errorLabel) {
  if(link.value.length === 0) {
    document.querySelector(errorLabel).textContent = ERROR_TEXT;
  } else if(!link.validity.valid) {
    document.querySelector(errorLabel).textContent = ERROR_LINK;
  } else {
    document.querySelector(errorLabel).textContent = '';
    return true;
  }
  return false;
}

// Валидация формы Edit
function validLengthInput(length, errorLabel) {
  if(length === 0) {
    document.querySelector(errorLabel).textContent = ERROR_TEXT;
  } else if(length < MIN_LENGTH_INPUT) {
    document.querySelector(errorLabel).textContent = ERROR_LENGTH;
  } else {
    document.querySelector(errorLabel).textContent = '';
    return true;
  }
  return false;
}

// Валидация формы +
function validLinkInput(link, errorLabel) {
  if(link.value.length === 0) {
    document.querySelector(errorLabel).textContent = ERROR_TEXT;
  } else if(!link.validity.valid) {
    document.querySelector(errorLabel).textContent = ERROR_LINK;
  } else {
    document.querySelector(errorLabel).textContent = '';
    return true;
  }
  return false;
  }

  // Редактирование формы Avatar
  function inputFormAvatar(event) {
    const form = event.currentTarget;
    const { linkAvatar } = form.elements;
    document.querySelector('.popup__button_avatar').setAttribute('disabled', true);

    const ValidLink = validFormAvatar(linkAvatar, '.popup__error_link-avatar');

    if(ValidLink) {
      document.querySelector('.popup__button_avatar').removeAttribute('disabled');
    }
  }

// Редактирование формы +
function inputFormPlus(event) {
  const form = event.currentTarget;
  const {namePlus, link} = form.elements;
  document.querySelector('.popup__button_plus').setAttribute('disabled', true);

  const ValidName = validLengthInput(namePlus.value.length, '.popup__error_name');
  const ValidLink = validLinkInput(link, '.popup__error_link');

  if(ValidName && ValidLink) {
  document.querySelector('.popup__button_plus').removeAttribute('disabled');
  }
}

// Редактирование формы Edit
function inputFormEdit(event) {
  const form = event.currentTarget;
  const {name, job} = form.elements;
  document.querySelector('.popup__button_edit').setAttribute('disabled', true);

  const ValidName = validLengthInput(name.value.length, '.popup__error_name-edit');
  const ValidLink = validLengthInput(job.value.length, '.popup__error_job');

  if(ValidName && ValidLink) {
    document.querySelector('.popup__button_edit').removeAttribute('disabled');
  }
}

// Добавление аватара
function submitFormAvatar(event) {
  const form = event.currentTarget;
  const linkForm = form.elements.linkAvatar;
  if(linkForm.length === 0) {
    form.setAttribute('disabled', true);
  } else {
    form.removeAttribute('disabled');
    event.preventDefault();
    form.reset();
    document.querySelector('.popup-avatar').classList.remove('popup_is-opened');
  }
}

// Добавление карточки
function submitFormPlus (event) {
  const form = event.currentTarget;
  const nameForm = form.elements.namePlus;
  const linkForm = form.elements.link;
  if(nameForm.length === 0 || linkForm.length === 0) {
    form.setAttribute('disabled', true);
  } else {
    form.removeAttribute('disabled');
    event.preventDefault();
    }
};

// Создание карточки через форму +
function createCardForm(event) {
  const form = event.currentTarget;
  const nameForm = form.elements.namePlus;
  const linkForm = form.elements.link;
  const item = {};
  item.link = linkForm.value;
  item.name= nameForm.value;
  const img = document.createElement('img');
  img.src = item.link;
  event.preventDefault();
  form.reset();
  document.querySelector('.popup-plus').classList.remove('popup_is-opened');
}

// Отображение измененного текста на странице по кнопке Edit
function submitFormEdit(event) {
  const form = event.currentTarget;
  const { name, job } = form.elements;

  document.querySelector('.user-info__name').textContent = name.value;
  document.querySelector('.user-info__job').textContent = job.value;

  event.preventDefault();
  form.reset();
  document.querySelector('.popup-edit').classList.remove('popup_is-opened');
}

// Слушатели
formInfo.addEventListener('submit', newInfo);
form.addEventListener('submit', newInfoPlus);
formAvatar.addEventListener('submit', newInfoAvatar);

document.querySelector('.user-info__button').addEventListener('click', openForm);
document.querySelector('.user-info__edit-button').addEventListener('click', openFormEdit);
document.querySelector('.user-info__photo').addEventListener('click', openFormAvatar);

document.forms.new.addEventListener('input', inputFormPlus);
document.forms.new.addEventListener('input', submitFormPlus);

document.forms.editProfile.addEventListener('input', inputFormEdit);
document.forms.editProfile.addEventListener('submit', submitFormEdit);

document.forms.formAvatar.addEventListener('input', inputFormAvatar);
document.forms.formAvatar.addEventListener('submit', submitFormAvatar);

document.forms.new.addEventListener('submit', createCardForm);