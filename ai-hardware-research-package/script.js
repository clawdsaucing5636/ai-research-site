const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const panels = Array.from(document.querySelectorAll('.panel'));

function activatePanel(targetId) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.target === targetId;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === targetId);
  });

  const activePanel = document.getElementById(targetId);
  if (activePanel) {
    activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${targetId}`);
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => activatePanel(link.dataset.target));
});

const initialTarget = window.location.hash.replace('#', '');
const validTarget = panels.some((panel) => panel.id === initialTarget) ? initialTarget : 'summary';
activatePanel(validTarget);