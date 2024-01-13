const initApp = () => {
  const { body } = document;
  const createElement = (elTag, elClass, elId, elInnerText, elSrc) => {
    const element = document.createElement(elTag);
    if (elClass) element.classList.add(elClass);
    if (elId) element.id = elId;
    if (elInnerText) element.innerText = elInnerText;
    if (elSrc) element.src = elSrc;

    return element;
  };

  const container = document.createElement('div');
  const gallows = document.createElement('div');
  const quiz = document.createElement('div');

  container.classList.add('container');
  gallows.classList.add('gallows');
  gallows.append(createElement('img', 'gallows-img', null, null, './assets/img/gallows.png'));
  const wrapper = createElement('div', 'wrapper', null, null);
  gallows.append(wrapper);
  wrapper.append(createElement('div', 'body-parts-container', 'body-parts-container', null, null));
  quiz.classList.add('quiz');
  const content = createElement('div', 'content', null, null, null);
  quiz.append(content);
  quiz.append(createElement('div', 'keyboard', 'keyboard', null, null));
  content.append(createElement('h1', null, null, 'Hangman Game', null));
  content.append(createElement('ul', 'word', 'word', null, null));
  const hint = createElement('p', 'hint', null, 'Hint: ', null);
  content.append(hint);
  hint.append(createElement('span', 'hint-question', 'hint', null, null));
  createElement();
  const guessesText = createElement('p', 'guesses-text', null, 'Incorrect guesses: ', null);
  content.append(guessesText);
  guessesText.append(createElement('span', 'guesses-counter', 'guesses-counter', null, null));
  body.prepend(container);
  container.append(gallows);
  container.append(quiz);
};

export default initApp;