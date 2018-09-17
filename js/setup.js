'use strict';

// Объявление Констант

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Имена

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

// Фамилии

var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

// Цвет плащей

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

// Цвет глаз

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Цвет Файербола

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Функция нахождения случайного элемента в заданном диапазоне

window.getRandomValues = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Показываем волшебника

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');

// Куртка, глаза и файерболл

var wizardCoat = document.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('input[name=coat-color]');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('input[name=eyes-color]');
var wizardFireBall = document.querySelector('.setup-fireball-wrap');
var wizardFireBallInput = setup.querySelector('input[name=fireball-color]');

// Находим Template и его Content

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Находим куда вставляем волшебников

var similarList = document.querySelector('.setup-similar-list');

// Создаем Массив Волшебников

var wizards = [];

// Заполняем его элемнтами

for (var i = 0; i < 4; i++) {
  wizards.push({
    name: NAMES[window.getRandomValues(0, NAMES.length)] + '\n' + LAST_NAMES[window.getRandomValues(0, LAST_NAMES.length)],
    coatColor: COAT_COLORS[window.getRandomValues(0, COAT_COLORS.length)],
    eyesColor: EYES_COLORS[window.getRandomValues(0, EYES_COLORS.length)]
  });
}

// Функция отрисовки волшебников

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Сщздаем документ Фрагмент

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// Показываем волшебников

similarList.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');

// Функция закрытия окна по ESC

var popupEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
    closePopupHandler();
  }
};

// Функция открытия окна по нажатию на Enter

var popupEnterHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopupHandler();
  }
};

// Функция открытия окна

var openPopupHandler = function () {
  setup.classList.remove('hidden');
};

// Функция закрытия окна

var closePopupHandler = function () {
  setup.classList.add('hidden');
  document.addEventListener('keydown', popupEscHandler);
};

// Добавляем фунции на элементы

setupOpen.addEventListener('click', openPopupHandler);
setupOpen.addEventListener('keydown', popupEnterHandler);
setupClose.addEventListener('click', closePopupHandler);
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopupHandler();
  }
});

// Валидация введенных значений

setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя персонажа должно быть больше 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя персонажа должно быть меньще 25 символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательно заполните поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

setupUserName.addEventListener('input', function (evt) {
  if (evt.target.value.length < 2) {
    evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    evt.target.setCustomValidity('');
  }
});


wizardCoat.addEventListener('click', function () {
  var color = COAT_COLORS[window.getRandomValues(0, COAT_COLORS.length)];
  wizardCoat.style.fill = color;
  wizardCoatInput.setAttribute('value', color);
});

wizardEyes.addEventListener('click', function () {
  var color = EYES_COLORS[window.getRandomValues(0, EYES_COLORS.length)];
  wizardEyes.style.fill = color;
  wizardEyesInput.setAttribute('value', color);
});

wizardFireBall.addEventListener('click', function () {
  var color = FIREBALL_COLORS[window.getRandomValues(0, FIREBALL_COLORS.length)];
  wizardFireBall.style.backgroundColor = color;
  wizardFireBallInput.setAttribute('value', color);
});

