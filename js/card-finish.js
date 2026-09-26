// Presentation only: pointer position changes the physical card's light and tilt.
export function mountCardFinish() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.wallet-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const box = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width));
      const y = Math.max(0, Math.min(1, (event.clientY - box.top) / box.height));
      card.style.setProperty('--rx', `${(0.5 - y) * 4}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 4}deg`);
      card.style.setProperty('--light-x', `${x * 100}%`);
      card.style.setProperty('--light-y', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      ['--rx', '--ry', '--light-x', '--light-y'].forEach((property) => card.style.removeProperty(property));
    });
  });
}
