const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
});
const config = window.LEGIO_CONFIG || {};
if (config.gladiatore) {
  document.querySelector('#leader-name').textContent = config.gladiatore;
  document.querySelector('[data-koris]').textContent = config.gladiatore;
  document.querySelector('.leader-mark').textContent = config.gladiatore[0];
  document.querySelectorAll('.leader p, #discord-dialog p').forEach(p => p.textContent = p.textContent.replaceAll('Koris', config.gladiatore));
}
const dialog = document.querySelector('#discord-dialog');
document.querySelectorAll('.discord').forEach(button => button.addEventListener('click', () => {
  let invite;
  try { invite = new URL(config.discordUrl); } catch {}
  if (invite && invite.protocol === 'https:' && ((invite.hostname === 'discord.gg' && invite.pathname.length > 1) || (invite.hostname === 'discord.com' && invite.pathname.startsWith('/invite/') && invite.pathname.length > 8))) {
    window.open(invite.href, '_blank', 'noopener,noreferrer');
  } else dialog.showModal();
}));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(a => {
    if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
}), {rootMargin: '-15% 0px -65% 0px'});
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
