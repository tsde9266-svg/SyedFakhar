/* ============================================================
   PHOTOGRAPHY PORTFOLIO — main.js
   ============================================================ */

/* ----------------------------------------------------------
   IMAGE DATA — flat assets/ folder distributed into categories
   Images are in assets/ root (no subfolders detected).
   ---------------------------------------------------------- */
// PLACEHOLDER: photo-captions → add captions/alt text per photo
const IMAGES = [
  {
    src: 'assets/WhatsApp Image 2026-05-24 at 21.59.04 (1).jpeg',
    category: 'portrait',
    alt: 'Syed Fakhar Abbas — Portrait photography'
  },
  {
    src: 'assets/WhatsApp Image 2026-05-24 at 21.59.04 (2).jpeg',
    category: 'portrait',
    alt: 'Syed Fakhar Abbas — Portrait photography'
  },
  {
    src: 'assets/WhatsApp Image 2026-05-24 at 21.59.04.jpeg',
    category: 'editorial',
    alt: 'Syed Fakhar Abbas — Editorial photography'
  },
  {
    src: 'assets/WhatsApp Image 2026-05-24 at 21.59.05 (1).jpeg',
    category: 'editorial',
    alt: 'Syed Fakhar Abbas — Editorial photography'
  },
  {
    src: 'assets/WhatsApp Image 2026-05-24 at 21.59.05 (2).jpeg',
    category: 'commercial',
    alt: 'Syed Fakhar Abbas — Commercial photography'
  },
  {
    src: 'assets/WhatsApp Image 2026-05-24 at 21.59.05 (3).jpeg',
    category: 'commercial',
    alt: 'Syed Fakhar Abbas — Commercial photography'
  },
  {
    src: 'assets/WhatsApp Image 2026-05-24 at 21.59.05.jpeg',
    category: 'events',
    alt: 'Syed Fakhar Abbas — Events photography'
  }
];

/* ----------------------------------------------------------
   GALLERY — build grid items
   ---------------------------------------------------------- */
function buildGallery() {
  const grid = document.getElementById('gallery');
  if (!grid) return;

  IMAGES.forEach((img, index) => {
    const item = document.createElement('figure');
    // Items 0 and 5 are "wide" featured tiles (span 2 cols) in the all-view grid
    const isWide = index === 0 || index === 5;
    item.className = 'gallery-item reveal-x' + (isWide ? ' gallery-item--wide' : '');
    item.setAttribute('role', 'listitem');
    item.setAttribute('data-category', img.category);
    item.setAttribute('data-index', index);
    item.style.transitionDelay = `${(index % 3) * 0.08}s`;

    const image = document.createElement('img');
    // encodeURI handles spaces/special chars in filenames
    image.src = encodeURI(img.src);
    image.alt = img.alt;
    image.loading = 'lazy';
    image.decoding = 'async';

    const overlay = document.createElement('div');
    overlay.className = 'gallery-item__overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const caption = document.createElement('span');
    caption.className = 'gallery-item__caption';
    caption.textContent = img.category.charAt(0).toUpperCase() + img.category.slice(1);

    overlay.appendChild(caption);
    item.appendChild(image);
    item.appendChild(overlay);

    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Open ${img.alt} in lightbox`);

    grid.appendChild(item);
  });
}

/* ----------------------------------------------------------
   GALLERY FILTER
   ---------------------------------------------------------- */
function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('gallery');
  if (!grid) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active state
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter items with crossfade
      const items = grid.querySelectorAll('.gallery-item');
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        const visible = filter === 'all' || cat === filter;

        if (!visible) {
          item.classList.add('fade-out');
          setTimeout(() => {
            item.classList.add('hidden');
            item.classList.remove('fade-out');
          }, 260);
        } else {
          item.classList.remove('hidden');
          // trigger reflow
          void item.offsetWidth;
          item.classList.remove('fade-out');
        }
      });
    });
  });
}

/* ----------------------------------------------------------
   LIGHTBOX
   ---------------------------------------------------------- */
let currentIndex = 0;
let visibleImages = [];

function getVisibleImages() {
  const activeFilter = document.querySelector('.filter-btn.active');
  const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
  return filter === 'all' ? IMAGES : IMAGES.filter(img => img.category === filter);
}

function openLightbox(globalIndex) {
  visibleImages = getVisibleImages();
  const src = IMAGES[globalIndex].src;
  currentIndex = visibleImages.findIndex(img => img.src === src);
  if (currentIndex === -1) currentIndex = 0;

  const lb = document.getElementById('lightbox');
  lb.setAttribute('aria-hidden', 'false');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateLightboxImage();

  // Focus close button for accessibility
  document.getElementById('lightbox-close').focus();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightboxImage(direction = 0) {
  const imgEl = document.getElementById('lightbox-img');
  const capEl = document.getElementById('lightbox-caption');
  const ctrEl = document.getElementById('lightbox-counter');

  const data = visibleImages[currentIndex];
  if (!data) return;

  // Crossfade transition
  imgEl.classList.add('crossfade');

  setTimeout(() => {
    imgEl.src = encodeURI(data.src);
    imgEl.alt = data.alt;
    capEl.textContent = data.alt;
    ctrEl.textContent = `${currentIndex + 1} / ${visibleImages.length}`;
    imgEl.classList.remove('crossfade');
  }, 280);
}

function lightboxPrev() {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  updateLightboxImage(-1);
}

function lightboxNext() {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  updateLightboxImage(1);
}

function initLightbox() {
  const lb     = document.getElementById('lightbox');
  const close  = document.getElementById('lightbox-close');
  const prev   = document.getElementById('lightbox-prev');
  const next   = document.getElementById('lightbox-next');

  close.addEventListener('click', closeLightbox);
  prev.addEventListener('click', lightboxPrev);
  next.addEventListener('click', lightboxNext);

  // Close on backdrop click
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   lightboxPrev();
    if (e.key === 'ArrowRight')  lightboxNext();
  });

  // Swipe support (touch devices)
  let touchStartX = 0;
  let touchStartY = 0;

  lb.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? lightboxNext() : lightboxPrev();
    }
    if (dy > 80 && Math.abs(dx) < 40) closeLightbox();
  }, { passive: true });
}

/* ----------------------------------------------------------
   SCROLL REVEAL — IntersectionObserver, horizontal slide-in
   ---------------------------------------------------------- */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-x').forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------
   NAVIGATION — sticky + hamburger
   ---------------------------------------------------------- */
function initNav() {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll: add .scrolled class after threshold
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.setAttribute('aria-hidden', String(expanded));
    mobileMenu.classList.toggle('open', !expanded);
    document.body.style.overflow = !expanded ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ----------------------------------------------------------
   CUSTOM CURSOR
   ---------------------------------------------------------- */
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  if (!dot || window.matchMedia('(hover: none)').matches) {
    if (dot) dot.style.display = 'none';
    return;
  }

  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    dot.classList.remove('hidden');
  }, { passive: true });

  document.addEventListener('mouseleave', () => dot.classList.add('hidden'));

  document.querySelectorAll('a, button, .gallery-item, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('expanded'));
    el.addEventListener('mouseleave', () => dot.classList.remove('expanded'));
  });
}

/* ----------------------------------------------------------
   FOOTER YEAR
   ---------------------------------------------------------- */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------
   SMOOTH SCROLL — override default for nav links
   ---------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  buildGallery();
  initFilter();
  initLightbox();
  initScrollReveal();
  initNav();
  initCursor();
  setFooterYear();
  initSmoothScroll();
});
