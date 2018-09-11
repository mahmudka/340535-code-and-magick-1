'use strict';

// Объявление Констант
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Показываем волшебника
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// Переменные
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');

// Функция нахождения случайного элемента в заданном диапазоне
window.getRandomValues = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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

// Документ Фрагмент
var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// Показываем волшебников
similarList.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');
