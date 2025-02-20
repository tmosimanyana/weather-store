import { createElement } from './utils/createElement';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';

const routes = {
  '/home': HomePage,
  '/products': ProductsPage,
  '/about': AboutPage,
};

export function initRouter(main) {
  function render() {
    const path = location.hash.replace('#', '') || '/home';
    main.innerHTML = '';
    main.appendChild(routes[path] ? routes[path]() : createElement('h2', { textContent: 'Page Not Found' }));
  }

  window.addEventListener('hashchange', render);
  render();
}
