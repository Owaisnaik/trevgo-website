(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header and reading progress
  const header = $('#siteHeader');
  const progress = $('#scrollProgress');
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Mobile navigation
  const menuToggle = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('is-open');
  };
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      mobileNav.classList.toggle('is-open', open);
    });
    $$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  // Reveal text only when it enters the viewport; motion is removed when requested by the OS.
  const revealItems = $$('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  // The ride selector is a single cinematic frame, not a set of illustrative cards.
  const rideData = {
    bike: {
      index: 'Bike rides', micro: 'Made for short trips', kicker: 'When you need to get going',
      title: 'A quicker way<br><em>through town.</em>',
      description: 'For short trips across town, busy mornings and getting through traffic with a little less fuss.',
      footer: 'A handy choice for shorter journeys.', linkText: 'Explore bike rides', link: 'rides.html#bike',
      poster: 'https://images.pexels.com/videos/34394431/pexels-photo-34394431.jpeg?auto=compress&cs=tinysrgb&w=2200',
      video: 'https://videos.pexels.com/video-files/34394431/14571126_3840_2160_60fps.mp4', alt: 'Motorcycle riders move through an Indian city street'
    },
    auto: {
      index: 'Auto rides', micro: 'Your everyday ride', kicker: 'For the familiar routes',
      title: 'The city,<br><em>within reach.</em>',
      description: 'For the everyday trip between where you are and where you need to be.',
      footer: 'For errands, work and trips across town.', linkText: 'Explore auto rides', link: 'rides.html#auto',
      poster: 'https://images.pexels.com/videos/35298890/pexels-photo-35298890.jpeg?auto=compress&cs=tinysrgb&w=2200',
      video: 'https://videos.pexels.com/video-files/35298890/14955862_3840_2160_30fps.mp4', alt: 'Auto-rickshaws travel through a busy Indian street'
    },
    taxi: {
      index: 'Taxi rides', micro: 'More room to relax', kicker: 'When you want more room',
      title: 'Settle in.<br><em>Enjoy the ride.</em>',
      description: 'For longer journeys, trips with company or days when a little extra room helps.',
      footer: 'A little more room for the road ahead.', linkText: 'Explore taxi rides', link: 'rides.html#taxi',
      poster: 'https://images.pexels.com/videos/18616134/pexels-photo-18616134.jpeg?auto=compress&cs=tinysrgb&w=2200',
      video: 'https://videos.pexels.com/video-files/18616134/18616134-uhd_3840_2160_25fps.mp4', alt: 'A car moves through a city at night'
    }
  };
  const rideStage = $('#rideStage');
  const rideVideo = $('#rideVideo');
  const rideImage = $('#rideStageImage');
  const modeButtons = $$('.ride-mode');
  let currentMode = 'auto';
  let rideVideoTimer = null;
  const setRideMode = (mode, playClip = true) => {
    const item = rideData[mode];
    if (!item || !rideStage || !rideImage) return;
    currentMode = mode;
    rideStage.classList.add('is-changing');
    rideStage.dataset.mode = mode;
    rideImage.style.backgroundImage = `url("${item.poster}")`;
    rideImage.setAttribute('aria-label', item.alt);
    $('#stageIndex').textContent = item.index;
    $('#stageMicro').textContent = item.micro;
    $('#stageKicker').textContent = item.kicker;
    $('#stageTitle').innerHTML = item.title;
    $('#stageDescription').textContent = item.description;
    $('#stageFooter').textContent = item.footer;
    const stageLink = $('#stageLink');
    stageLink.href = item.link;
    stageLink.innerHTML = `${item.linkText} <span>↗</span>`;
    modeButtons.forEach(button => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    if (reducedMotion) {
      rideStage.classList.remove('is-changing');
    } else {
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => rideStage.classList.remove('is-changing')));
    }
    if (rideVideo) {
      rideVideo.classList.remove('is-playing');
      rideVideo.pause();
      rideVideo.removeAttribute('src');
      rideVideo.load();
      if (rideVideoTimer) window.clearTimeout(rideVideoTimer);
      if (playClip && !reducedMotion) {
        rideVideoTimer = window.setTimeout(() => {
          if (currentMode !== mode) return;
          rideVideo.src = item.video;
          rideVideo.load();
          const playPromise = rideVideo.play();
          if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
          rideVideo.addEventListener('playing', () => rideVideo.classList.add('is-playing'), { once: true });
        }, 140);
      }
    }
  };
  modeButtons.forEach(button => {
    button.addEventListener('click', () => setRideMode(button.dataset.mode, true));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const index = modeButtons.indexOf(button);
      const next = modeButtons[(index + (event.key === 'ArrowRight' ? 1 : -1) + modeButtons.length) % modeButtons.length];
      next.focus(); setRideMode(next.dataset.mode, true);
    });
  });
  if (modeButtons.length) setRideMode('auto', false);

  // Scroll-controlled scene transitions: the image stays pinned while the story changes.
  const storyChapters = $$('.story-chapter');
  const storyImage = $('#storyImage');
  const storyVisual = $('#storyVisual');
  const storyVideo = $('#storyVideo');
  if (storyChapters.length && storyImage && storyVisual) {
    let activeStory = -1;
    const activateStory = chapter => {
      const index = Number(chapter.dataset.story);
      if (index === activeStory) return;
      activeStory = index;
      storyChapters.forEach(node => node.classList.toggle('is-current', node === chapter));
      storyVisual.classList.add('is-changing');
      window.setTimeout(() => {
        storyImage.style.backgroundImage = `url("${chapter.dataset.image}")`;
        $('#storyIndex').textContent = chapter.dataset.index;
        const words = (chapter.dataset.quote || '').split('|');
        $('#storyQuote').innerHTML = `${words[0] || ''}<br><em>${words[1] || ''}</em>`;
        storyVisual.classList.remove('is-changing');
        if (storyVideo) {
          storyVideo.classList.remove('is-playing');
          storyVideo.pause();
          storyVideo.removeAttribute('src');
          storyVideo.poster = chapter.dataset.image || '';
          storyVideo.load();
          if (!reducedMotion && chapter.dataset.video) {
            storyVideo.src = chapter.dataset.video;
            storyVideo.load();
            const playPromise = storyVideo.play();
            if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
            storyVideo.addEventListener('playing', () => storyVideo.classList.add('is-playing'), { once: true });
          }
        }
      }, reducedMotion ? 0 : 220);
    };
    if (reducedMotion || !('IntersectionObserver' in window)) {
      storyChapters.forEach(chapter => chapter.classList.add('is-current'));
    } else {
      const storyObserver = new IntersectionObserver(entries => {
        const candidates = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
        if (candidates[0]) activateStory(candidates[0].target);
      }, { threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: '-18% 0px -20% 0px' });
      storyChapters.forEach(chapter => storyObserver.observe(chapter));
    }
  }

  // Defer secondary film clips until their section is close to the viewport.
  const deferredFilms = $$('.deferred-film');
  const playDeferred = video => {
    if (!video.dataset.videoLoaded && video.dataset.src && !reducedMotion) {
      video.src = video.dataset.src;
      video.dataset.videoLoaded = 'true';
      video.load();
    }
    if (!reducedMotion && video.dataset.videoLoaded) {
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') promise.catch(() => {});
    }
  };
  if ('IntersectionObserver' in window && !reducedMotion) {
    const filmObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) playDeferred(video);
        else if (video.dataset.videoLoaded) video.pause();
      });
    }, { rootMargin: '220px 0px', threshold: 0.01 });
    deferredFilms.forEach(video => filmObserver.observe(video));
  }

  // Low-amplitude parallax for cinematic stills, disabled on touch/reduced-motion devices.
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const parallaxNodes = $$('.hero-film video, .manifesto-image, .partner-video-wrap video');
    let scheduled = false;
    const moveFilm = () => {
      const vh = window.innerHeight || 1;
      parallaxNodes.forEach(node => {
        const rect = node.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (rect.top - vh) / (vh + rect.height);
        node.style.transform = `scale(1.06) translateY(${progress * -24}px)`;
      });
      scheduled = false;
    };
    window.addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(moveFilm); }
    }, { passive: true });
  }

  // A soft pool of light follows the pointer in cinematic scenes on desktop.
  // It adds a little depth without affecting touch devices or reduced-motion settings.
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const lightScenes = $$('.cinema-hero, .ride-stage');
    lightScenes.forEach(scene => {
      scene.addEventListener('pointermove', event => {
        const rect = scene.getBoundingClientRect();
        scene.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        scene.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
        scene.classList.add('has-pointer');
      }, { passive: true });
      scene.addEventListener('pointerleave', () => scene.classList.remove('has-pointer'));
    });
  }

  // Contact form builds an email draft; it does not submit data to a backend.
  const contactForm = $('#contactForm');
  if (contactForm) {
    const requestedTopic = (new URLSearchParams(window.location.search).get('subject') || '').toLowerCase();
    const topicSelect = $('select[name="topic"]', contactForm);
    if (topicSelect && requestedTopic) {
      const topicMapping = [
        [/driver|partner/, 'Driver-partner interest'],
        [/launch|update/, 'Launch updates'],
        [/bike/, 'Ride options'], [/auto|taxi|ride/, 'Ride options'],
        [/privacy|policy|refund|safety/, 'Privacy or policy question']
      ];
      const match = topicMapping.find(([pattern]) => pattern.test(requestedTopic));
      if (match) topicSelect.value = match[1];
    }
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const topic = String(data.get('topic') || 'General enquiry').trim();
      const message = String(data.get('message') || '').trim();
      const subject = `[TREVGO website] ${topic}`;
      const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
      const status = $('#formStatus');
      if (status) status.textContent = 'Your email app should open with this message ready to send. Nothing has been sent by the website.';
      window.location.href = `mailto:hello@trevgo.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Footer year and accessible, deliberately non-transactional ride enquiry flow.
  const year = $('#currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
})();
