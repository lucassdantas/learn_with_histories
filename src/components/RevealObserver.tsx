'use client';

import { useEffect } from 'react';

// Scroll reveal for every element with the `reveal` class (CSS in globals.css):
// - elements already on screen when they mount stay as they are (no flash, no hidden content);
// - elements below the fold get `is-pending` (invisible) and, when they enter the viewport,
//   `is-revealed` (rise animation). Elements entering together cascade by ~80ms.
// New elements (route changes, filters, language switch) are picked up by a MutationObserver.
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        visible.forEach((el, i) => {
          el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 80}ms`);
          el.classList.remove('is-pending');
          el.classList.add('is-revealed');
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    const setup = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not([data-reveal])').forEach((el) => {
        el.dataset.reveal = '';
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add('is-pending');
          io.observe(el);
        }
      });
    };

    setup();
    const mo = new MutationObserver(setup);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
