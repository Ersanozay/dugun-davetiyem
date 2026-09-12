const scenes = [
  {
    id: 'library',
    number: '01',
    title: 'Kütüphanede tanışma',
    text: 'Hikâyemiz, sessizce bir kütüphanede başladı.',
    html: '<span>Hikâyemiz, sessizce bir</span><br class="story-mobile-break"> <span>kütüphanede başladı.</span>',
    video: '/assets/story-01-library.mp4',
    poster: '/assets/story-01-library-poster.webp',
    scroll: 270,
    captionAt: 0.34,
    captionAtMobile: 0.30,
    tone: 'warm'
  },
  {
    id: 'cards',
    number: '02',
    title: 'Kartlar ve sohbetler',
    text: 'Kartlar açıldıkça, biz de birbirimize açıldık.',
    html: '<span>Kartlar açıldıkça, biz de</span><br class="story-mobile-break"> <span>birbirimize açıldık.</span>',
    video: '/assets/story-02-cards.mp4',
    poster: '/assets/story-02-cards-poster.webp',
    scroll: 270,
    captionAt: 0.33,
    captionAtMobile: 0.29,
    tone: 'cocoa'
  },
  {
    id: 'graduation',
    number: '03',
    title: 'Mezuniyet',
    text: 'Birlikte büyüdük, ortak hayaller kurduk.',
    html: '<span>Birlikte büyüdük,</span><br class="story-mobile-break"> <span>ortak hayaller kurduk.</span>',
    video: '/assets/story-03-graduation.mp4',
    poster: '/assets/story-03-graduation-poster.webp',
    scroll: 320,
    captionAt: 0.35,
    captionAtMobile: 0.31,
    tone: 'sky'
  },
  {
    id: 'proposal',
    number: '04',
    title: 'Evlilik teklifi',
    text: 'Bir bağ bahçesinde geldi teklif, ardından da... Evet',
    html: '<span class="story-proposal-line">Bir bağ bahçesinde geldi teklif,</span><br class="story-proposal-break"> <span class="story-proposal-line">ardından da... <em class="story-emphasis--yes">Evet</em></span>',
    video: '/assets/story-04-proposal.mp4',
    poster: '/assets/story-04-proposal-poster.webp',
    scroll: 360,
    captionAt: 0.34,
    captionAtMobile: 0.30,
    tone: 'vineyard'
  },
  {
    id: 'final',
    number: '05',
    title: 'Bugüne doğru',
    text: 'Biz hazırız, sizleri bekliyoruz...',
    html: '<span class="story-final-line">Biz hazırız, sizleri bekliyoruz...</span>',
    video: '/assets/story-05-final.mp4',
    poster: '/assets/story-05-final-poster.webp',
    scroll: 270,
    captionAt: 0.33,
    captionAtMobile: 0.28,
    tone: 'sunset'
  }
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (from, to, value) => {
  const x = clamp((value - from) / Math.max(0.0001, to - from));
  return x * x * (3 - 2 * x);
};

function mobileSceneMarkup(scene, index) {
  const reverse = index % 2 === 1 ? ' video-story-scene--reverse' : '';
  return `
    <section class="video-story-scene video-story-scene--${scene.tone}${reverse}" data-story-video-scene style="--story-scroll:${scene.scroll}svh" aria-labelledby="story-scene-${scene.id}">
      <div class="video-story-stage">
        <div class="video-story-layout">
          <div class="video-story-media">
            <video
              class="video-story-video"
              data-story-video
              muted
              playsinline
              webkit-playsinline
              preload="metadata"
              disablepictureinpicture
              poster="${scene.poster}"
              aria-hidden="true"
              tabindex="-1"
            >
              <source src="${scene.video}" type="video/mp4">
            </video>
            <div class="video-story-media-shade" aria-hidden="true"></div>
          </div>
          <div class="video-story-copy" data-story-copy>
            <p class="video-story-meta"><span>${scene.number}</span><i aria-hidden="true"></i>${scene.title}</p>
            <h3 id="story-scene-${scene.id}">${scene.html ?? scene.text}</h3>
          </div>
          <div class="video-story-progress" aria-hidden="true"><span data-story-progress></span></div>
          <a class="video-story-skip" href="#story-end">Hikâyeyi geç <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>`;
}

function desktopCardMarkup(scene, index) {
  return `
    <article class="desktop-story-card desktop-story-card--${scene.tone}" data-desktop-story-card data-story-index="${index}" aria-labelledby="desktop-story-title-${scene.id}" tabindex="0">
      <div class="desktop-story-card__media">
        <video
          class="desktop-story-card__video"
          data-desktop-story-video
          muted
          playsinline
          webkit-playsinline
          preload="metadata"
          disablepictureinpicture
          poster="${scene.poster}"
          aria-hidden="true"
          tabindex="-1"
        >
          <source src="${scene.video}" type="video/mp4">
        </video>
        <div class="desktop-story-card__shade" aria-hidden="true"></div>
        <span class="desktop-story-card__number" aria-hidden="true">${scene.number}</span>
        <div class="desktop-story-card__copy" data-desktop-story-copy>
          <p class="desktop-story-card__meta"><span>${scene.number}</span><i aria-hidden="true"></i>${scene.title}</p>
          <h3 id="desktop-story-title-${scene.id}">${scene.html ?? scene.text}</h3>
        </div>
      </div>
    </article>`;
}

function desktopMarkup() {
  const totalScroll = scenes.reduce((sum, scene) => sum + scene.scroll, 0);
  return `
    <section class="desktop-story-shell" data-desktop-story-shell style="--desktop-story-scroll:${totalScroll}svh" aria-label="Hikâyemiz">
      <div class="desktop-story-stage">
        <div class="desktop-story-track-wrap" data-desktop-story-track-wrap>
          <div class="desktop-story-track" data-desktop-story-track>
            ${scenes.map(desktopCardMarkup).join('')}
          </div>
        </div>
        <div class="desktop-story-progress" aria-hidden="true"><span data-desktop-story-progress></span></div>
        <a class="desktop-story-skip" href="#story-end">Hikâyeyi geç <span aria-hidden="true">↓</span></a>
      </div>
    </section>`;
}

function setPreload(video, mode = 'auto') {
  if (!video || video.dataset.preloadArmed === mode) return;
  video.dataset.preloadArmed = mode;
  video.preload = mode;
  try { video.load(); } catch (_) {}
}

function mobileHorizontalSlideMarkup(scene, index) {
  return `
    <article class="mobile-story-horizontal-slide video-story-scene--${scene.tone}" data-mobile-horizontal-slide data-story-index="${index}" aria-labelledby="story-scene-${scene.id}">
      <div class="video-story-layout">
        <div class="video-story-media">
          <video
            class="video-story-video"
            data-story-video
            muted
            playsinline
            webkit-playsinline
            preload="metadata"
            disablepictureinpicture
            poster="${scene.poster}"
            aria-hidden="true"
            tabindex="-1"
          >
            <source src="${scene.video}" type="video/mp4">
          </video>
          <div class="video-story-media-shade" aria-hidden="true"></div>
        </div>
        <div class="video-story-copy" data-story-copy>
          <p class="video-story-meta"><span>${scene.number}</span><i aria-hidden="true"></i>${scene.title}</p>
          <h3 id="story-scene-${scene.id}">${scene.html ?? scene.text}</h3>
        </div>
      </div>
    </article>`;
}

function mobileHorizontalMarkup() {
  const introScenes = scenes.slice(0, 3);
  const totalScroll = introScenes.reduce((sum, scene) => sum + scene.scroll, 0);
  return `
    <section class="mobile-story-horizontal-shell" data-mobile-story-horizontal-shell style="--mobile-story-scroll:${totalScroll}svh" aria-label="Hikâyemizin ilk üç anı">
      <div class="mobile-story-horizontal-stage" data-mobile-story-horizontal-stage>
        <div class="mobile-story-horizontal-track" data-mobile-story-horizontal-track>
          ${introScenes.map(mobileHorizontalSlideMarkup).join('')}
        </div>
        <div class="video-story-progress mobile-story-horizontal-progress" aria-hidden="true"><span data-mobile-horizontal-progress></span></div>
        <a class="video-story-skip mobile-story-horizontal-skip" href="#story-end">Hikâyeyi geç <span aria-hidden="true">↓</span></a>
      </div>
    </section>`;
}

function mountMobile(root, reducedMotion) {
  root.innerHTML = mobileHorizontalMarkup() + scenes.slice(3).map((scene, index) => mobileSceneMarkup(scene, index + 3)).join('');

  const introScenes = scenes.slice(0, 3);
  const introTotalWeight = introScenes.reduce((sum, scene) => sum + scene.scroll, 0);
  const introCumulative = [];
  let introRunning = 0;
  introScenes.forEach(scene => { introCumulative.push(introRunning); introRunning += scene.scroll; });

  const horizontalShell = root.querySelector('[data-mobile-story-horizontal-shell]');
  const horizontalStage = root.querySelector('[data-mobile-story-horizontal-stage]');
  const horizontalTrack = root.querySelector('[data-mobile-story-horizontal-track]');
  const horizontalSlides = [...root.querySelectorAll('[data-mobile-horizontal-slide]')];
  const horizontalVideos = horizontalSlides.map(el => el.querySelector('[data-story-video]'));
  const horizontalProgress = root.querySelector('[data-mobile-horizontal-progress]');

  const verticalSceneEls = [...root.querySelectorAll('[data-story-video-scene]')];
  const verticalVideos = verticalSceneEls.map(el => el.querySelector('[data-story-video]'));
  const allVideos = [...horizontalVideos, ...verticalVideos];

  setPreload(horizontalVideos[0], 'auto');
  setPreload(horizontalVideos[1], 'auto');
  setPreload(horizontalVideos[2], 'metadata');

  const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (entry.target === horizontalShell) {
        horizontalVideos.forEach((video, index) => setPreload(video, index < 2 ? 'auto' : 'metadata'));
        return;
      }
      const index = verticalSceneEls.indexOf(entry.target);
      [index, index + 1].forEach(i => {
        if (i >= 0 && i < verticalVideos.length) setPreload(verticalVideos[i], 'auto');
      });
    });
  }, { rootMargin: '150% 0px', threshold: 0.01 });

  if (horizontalShell) preloadObserver.observe(horizontalShell);
  verticalSceneEls.forEach(el => preloadObserver.observe(el));

  const setVideoTime = (video, progress, reduce) => {
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const mediaProgress = reduce ? 0.78 : progress;
    const targetTime = Math.min(Math.max(0, video.duration - 0.045), mediaProgress * Math.max(0, video.duration - 0.045));
    if (Math.abs(video.currentTime - targetTime) > 0.035) {
      try { video.currentTime = targetTime; } catch (_) {}
    }
  };

  const setCopy = (copy, cfg, progress, reduce, horizontal = false, index = 0) => {
    if (!copy) return;
    const captionAt = cfg.captionAtMobile ?? cfg.captionAt;
    const reveal = reduce ? 1 : smoothstep(captionAt - 0.06, captionAt + 0.06, progress);
    const exitStart = horizontal && index < 2 ? 0.80 : 0.965;
    const exitEnd = horizontal && index < 2 ? 0.93 : 1;
    const exit = reduce ? 1 : 1 - smoothstep(exitStart, exitEnd, progress);
    const opacity = clamp(reveal * exit);
    copy.style.setProperty('--copy-reveal', opacity.toFixed(3));
    copy.style.setProperty('--copy-shift', `${((1 - opacity) * 14).toFixed(1)}px`);
  };

  let raf = 0;
  const update = () => {
    raf = 0;
    const viewportH = Math.max(1, window.innerHeight);
    const reduce = reducedMotion.matches;

    if (horizontalShell && horizontalStage && horizontalTrack) {
      const rect = horizontalShell.getBoundingClientRect();
      if (!(rect.bottom < -viewportH * 0.3 || rect.top > viewportH * 1.3)) {
        const scrollDistance = Math.max(1, horizontalShell.offsetHeight - viewportH);
        const overall = clamp(-rect.top / scrollDistance);
        const weighted = overall * introTotalWeight;

        let activeIndex = introScenes.length - 1;
        for (let i = 0; i < introScenes.length; i += 1) {
          if (weighted < introCumulative[i] + introScenes[i].scroll || i === introScenes.length - 1) {
            activeIndex = i;
            break;
          }
        }
        const activeLocal = clamp((weighted - introCumulative[activeIndex]) / introScenes[activeIndex].scroll);
        const transition = activeIndex < 2 ? smoothstep(0.82, 1, activeLocal) : 0;
        const slidePosition = reduce ? activeIndex : activeIndex + transition;
        const stageWidth = Math.max(1, horizontalStage.clientWidth);
        horizontalTrack.style.transform = `translate3d(${(-slidePosition * stageWidth).toFixed(1)}px,0,0)`;

        horizontalSlides.forEach((slide, index) => {
          const local = clamp((weighted - introCumulative[index]) / introScenes[index].scroll);
          const video = horizontalVideos[index];
          const copy = slide.querySelector('[data-story-copy]');
          setVideoTime(video, local, reduce);
          setCopy(copy, introScenes[index], local, reduce, true, index);
          slide.classList.toggle('is-active', index === activeIndex);
          slide.style.setProperty('--scene-progress', local.toFixed(4));
        });

        if (horizontalProgress) horizontalProgress.style.transform = `scaleY(${overall})`;
      }
    }

    verticalSceneEls.forEach((sceneEl, verticalIndex) => {
      const rect = sceneEl.getBoundingClientRect();
      if (rect.bottom < -viewportH * 0.25 || rect.top > viewportH * 1.25) return;

      const scrollDistance = Math.max(1, sceneEl.offsetHeight - viewportH);
      const progress = clamp(-rect.top / scrollDistance);
      const sceneIndex = verticalIndex + 3;
      const cfg = scenes[sceneIndex];
      const video = verticalVideos[verticalIndex];
      const copy = sceneEl.querySelector('[data-story-copy]');
      const progressBar = sceneEl.querySelector('[data-story-progress]');

      setVideoTime(video, progress, reduce);
      setCopy(copy, cfg, progress, reduce, false, sceneIndex);
      if (progressBar) progressBar.style.transform = `scaleY(${progress})`;
      sceneEl.style.setProperty('--scene-progress', progress.toFixed(4));
    });
  };

  const requestUpdate = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener?.('change', requestUpdate);

  allVideos.forEach(video => {
    video.addEventListener('loadedmetadata', requestUpdate, { passive: true });
    video.addEventListener('canplay', requestUpdate, { passive: true });
    video.addEventListener('error', () => video.closest('.video-story-media')?.classList.add('is-video-error'));
  });

  requestUpdate();

  return {
    videos: allVideos,
    cleanup() {
      preloadObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener?.('change', requestUpdate);
    }
  };
}

function mountDesktop(root, reducedMotion) {
  root.innerHTML = desktopMarkup();
  const shell = root.querySelector('[data-desktop-story-shell]');
  const wrap = root.querySelector('[data-desktop-story-track-wrap]');
  const track = root.querySelector('[data-desktop-story-track]');
  const cards = [...root.querySelectorAll('[data-desktop-story-card]')];
  const videos = [...root.querySelectorAll('[data-desktop-story-video]')];
  const progressBar = root.querySelector('[data-desktop-story-progress]');
  const totalWeight = scenes.reduce((sum, scene) => sum + scene.scroll, 0);
  const cumulative = [];
  let running = 0;
  scenes.forEach(scene => { cumulative.push(running); running += scene.scroll; });

  setPreload(videos[0], 'auto');
  setPreload(videos[1], 'metadata');

  let raf = 0;
  let activeIndex = -1;

  const setActive = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;
    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.toggle('is-active', active);
      card.classList.toggle('is-neighbor', Math.abs(i - index) === 1);
      card.setAttribute('aria-current', active ? 'step' : 'false');
    });
    [index, index + 1].forEach(i => {
      if (i >= 0 && i < videos.length) setPreload(videos[i], 'auto');
    });

    requestAnimationFrame(() => {
      const card = cards[index];
      if (!card || !wrap || !track) return;
      const desired = wrap.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
      const minX = Math.min(0, wrap.clientWidth - track.scrollWidth);
      const x = clamp(desired, minX, 0);
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    });
  };

  const locate = (weightedProgress) => {
    let index = scenes.length - 1;
    for (let i = 0; i < scenes.length; i += 1) {
      if (weightedProgress < cumulative[i] + scenes[i].scroll || i === scenes.length - 1) {
        index = i;
        break;
      }
    }
    const local = clamp((weightedProgress - cumulative[index]) / scenes[index].scroll);
    return { index, local };
  };

  const update = () => {
    raf = 0;
    if (!shell) return;
    const viewportH = Math.max(1, window.innerHeight);
    const rect = shell.getBoundingClientRect();
    const scrollDistance = Math.max(1, shell.offsetHeight - viewportH);
    const overall = clamp(-rect.top / scrollDistance);
    const weighted = overall * totalWeight;
    const { index, local } = locate(weighted);
    setActive(index);

    const reduce = reducedMotion.matches;
    const cfg = scenes[index];
    const video = videos[index];
    const card = cards[index];
    const copy = card?.querySelector('[data-desktop-story-copy]');

    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      const mediaProgress = reduce ? 0.78 : local;
      const targetTime = Math.min(Math.max(0, video.duration - 0.045), mediaProgress * Math.max(0, video.duration - 0.045));
      if (Math.abs(video.currentTime - targetTime) > 0.035) {
        try { video.currentTime = targetTime; } catch (_) {}
      }
    }

    if (copy) {
      const reveal = reduce ? 1 : smoothstep(cfg.captionAt - 0.055, cfg.captionAt + 0.065, local);
      const exit = reduce ? 1 : 1 - smoothstep(0.95, 0.995, local);
      const opacity = clamp(reveal * exit);
      copy.style.setProperty('--desktop-copy-reveal', opacity.toFixed(3));
      copy.style.setProperty('--desktop-copy-shift', `${((1 - opacity) * 14).toFixed(1)}px`);
    }

    if (progressBar) progressBar.style.transform = `scaleY(${overall})`;
  };

  const requestUpdate = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener?.('change', requestUpdate);

  videos.forEach(video => {
    video.addEventListener('loadedmetadata', requestUpdate, { passive: true });
    video.addEventListener('canplay', requestUpdate, { passive: true });
    video.addEventListener('error', () => video.closest('.desktop-story-card')?.classList.add('is-video-error'));
  });

  cards.forEach((card, index) => {
    const jump = () => {
      if (!shell) return;
      const viewportH = Math.max(1, window.innerHeight);
      const scrollDistance = Math.max(1, shell.offsetHeight - viewportH);
      const targetOverall = cumulative[index] / totalWeight;
      const shellTop = window.scrollY + shell.getBoundingClientRect().top;
      window.scrollTo({ top: shellTop + scrollDistance * targetOverall + 2, behavior: 'smooth' });
    };
    card.addEventListener('click', () => { if (index !== activeIndex) jump(); });
    card.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && index !== activeIndex) {
        event.preventDefault();
        jump();
      }
    });
  });

  requestAnimationFrame(() => { setActive(0); requestUpdate(); });

  return {
    videos,
    cleanup() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener?.('change', requestUpdate);
    }
  };
}

function initStory() {
  const root = document.getElementById('storyScenes');
  if (!root) return Promise.resolve();

  const disclosure = document.getElementById('storyDisclosure');
  const disclosureSection = document.getElementById('hikayemiz');
  const syncDisclosureState = () => {
    const open = !disclosure || disclosure.open;
    disclosureSection?.classList.toggle('is-story-open', open);
    disclosure?.classList.toggle('is-panel-ready', open);
  };
  disclosure?.addEventListener('toggle', syncDisclosureState);
  syncDisclosureState();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery = window.matchMedia('(max-width: 820px)');
  let mounted = null;

  const mount = () => {
    mounted?.cleanup?.();
    mounted = mobileQuery.matches ? mountMobile(root, reducedMotion) : mountDesktop(root, reducedMotion);
  };
  mount();
  mobileQuery.addEventListener?.('change', mount);

  return new Promise(resolve => {
    const first = mounted?.videos?.[0];
    if (!first || first.readyState >= 1) return resolve();
    const done = () => resolve();
    first.addEventListener('loadedmetadata', done, { once: true });
    first.addEventListener('error', done, { once: true });
    window.setTimeout(done, 2200);
  });
}

export const storyAssetsReady = initStory();
