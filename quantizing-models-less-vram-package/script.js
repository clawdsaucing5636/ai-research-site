const links = [...document.querySelectorAll('.nav a')];
const sections = links
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const activate = () => {
  const offset = window.scrollY + 140;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= offset) current = section.id;
  }

  links.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
  });
};

window.addEventListener('scroll', activate);
window.addEventListener('load', activate);
