/* JavaScript pequeño: sólo controla el menú en móvil. */
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

const arStatus = document.querySelector('#ar-status');
document.querySelector('#copy-ar-link').addEventListener('click', async () => {
  const input = document.querySelector('#ar-link');
  try {
    await navigator.clipboard.writeText(input.value);
    arStatus.textContent = 'Enlace copiado.';
  } catch {
    input.focus();
    input.select();
    arStatus.textContent = 'Selecciona y copia el enlace con Ctrl+C.';
  }
});

document.querySelector('#fullscreen-preview').addEventListener('click', async () => {
  const preview = document.querySelector('#ar-preview');
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await preview.requestFullscreen();
  } catch {
    arStatus.textContent = 'La pantalla completa no está disponible en este navegador.';
  }
});

document.querySelector('#rotate-preview').addEventListener('click', () => {
  arStatus.textContent = 'Vista 3D interactiva: próximamente.';
});

document.querySelectorAll('[data-store]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#app-status').textContent = 'La app estará disponible próximamente en ' + button.dataset.store + '.';
  });
});
