document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.tool-card');
  const sparkleEmojis = ['✨', '🌟', '💫', '🫧'];

  const resetCard = (card) => {
    card.style.transform = '';
  };

  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const percentX = (offsetX / rect.width) * 2 - 1;
      const percentY = (offsetY / rect.height) * 2 - 1;
      const rotateX = percentY * -12;
      const rotateY = percentX * 12;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      if (!card.dataset.sparkleCooldown) {
        card.dataset.sparkleCooldown = 'true';
        spawnGlitter(card, offsetX, offsetY);
        setTimeout(() => {
          delete card.dataset.sparkleCooldown;
        }, 260);
      }
    });

    card.addEventListener('mouseleave', () => {
      resetCard(card);
    });

    card.addEventListener('touchend', () => {
      resetCard(card);
    });
  });

  function spawnGlitter(card, x, y) {
    const glitter = document.createElement('span');
    glitter.className = 'glitter';
    glitter.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
    glitter.style.left = `${x - 10}px`;
    glitter.style.top = `${y - 10}px`;
    card.appendChild(glitter);
    setTimeout(() => {
      glitter.remove();
    }, 1000);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
});
