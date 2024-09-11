// js/components.js

// Función para cargar HTML en un elemento del DOM
function loadHTML(url, selector) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      const container = document.querySelector(selector);
      container.innerHTML = html;

      // Ejecutar scripts incluidos en el contenido
      const scripts = container.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.integrity = script.integrity;
        newScript.crossOrigin = script.crossOrigin;
        newScript.onload = () => console.log(`Script loaded: ${newScript.src}`);
        document.body.appendChild(newScript);
      });
    })
    .catch(error => console.error(`Error cargando ${url}:`, error));
}

// Cargar el contenido del <head>
document.addEventListener('DOMContentLoaded', () => {
  fetch('components/header.html')
    .then(response => response.text())
    .then(html => {
      const head = document.head;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      Array.from(doc.head.children).forEach(child => head.appendChild(child));
    })
    .catch(error => console.error('Error cargando el <head>:', error));

  // Cargar el contenido del <footer>
  loadHTML('components/footer.html', 'my-footer');
});

// Definición del componente MyHeader
class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    fetch('components/header.html')
      .then(response => response.text())
      .then(html => {
        this.shadowRoot.innerHTML = html;
      })
      .catch(error => console.error('Error cargando el header:', error));
  }
}

// Definición del componente MyFooter
class MyFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    fetch('components/footer.html')
      .then(response => response.text())
      .then(html => {
        this.shadowRoot.innerHTML = html;

        // Ejecutar scripts incluidos en el footer
        const scripts = this.shadowRoot.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.src = script.src;
          newScript.integrity = script.integrity;
          newScript.crossOrigin = script.crossOrigin;
          newScript.onload = () => console.log(`Script loaded: ${newScript.src}`);
          document.body.appendChild(newScript);
        });
      })
      .catch(error => console.error('Error cargando el footer:', error));
  }
}

// Registrar los componentes personalizados
customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);
