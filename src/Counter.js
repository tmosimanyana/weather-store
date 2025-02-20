import { createElement } from '../utils/createElement';

function Counter(productId) {
  const storageKey = `product-${productId}-count`;
  let count = parseInt(localStorage.getItem(storageKey)) || 0;

  function updateCount(value) {
    count = value;
    label.textContent = count;
    localStorage.setItem(storageKey, count);
  }

  const label = createElement('label', {
    className: 'counter-label',
    textContent: count,
  });

  const incButton = createElement('button', {
    className: 'counter-button',
    textContent: '+',
  });
  const decButton = createElement('button', {
    className: 'counter-button',
    textContent: '-',
  });

  incButton.addEventListener('click', () => updateCount(count + 1));
  decButton.addEventListener('click', () => {
    if (count > 0) updateCount(count - 1);
  });

  return createElement('div', { className: 'counter' }, [
    label,
    createElement('div', { className: 'counter-controls' }, [incButton, decButton]),
  ]);
}

export default Counter;
