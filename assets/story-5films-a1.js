const scenes = [
  {
    id: 'library',
    number: '01',
    title: 'Kütüphanede tanışma',
    text: 'Hikâyemiz, sessizce bir kütüphanede başladı.',
    video: '/assets/story-01-library.mp4',
    poster: '/assets/story-01-library-poster.webp',
    scroll: 270,
    captionAt: 0.63,
    tone: 'warm'
  },
  {
    id: 'cards',
    number: '02',
    title: 'Kartlar ve sohbetler',
    text: 'Kartlar açıldıkça, biz de birbirimize açıldık.',
    video: '/assets/story-02-cards.mp4',
    poster: '/assets/story-02-cards-poster.webp',
    scroll: 270,
    captionAt: 0.58,
    tone: 'cocoa'
  },
  {
    id: 'graduation',
    number: '03',
    title: 'Mezuniyet',
    text: 'Birlikte büyüdük; artık gelecek, ikimizin ortak hayaliydi.',
    video: '/assets/story-03-graduation.mp4',
    poster: '/assets/story-03-graduation-poster.webp',
    scroll: 320,
    captionAt: 0.68,
    tone: 'sky'
  },
  {
    id: 'proposal',
    number: '04',
    title: 'Evlilik teklifi',
    text: 'Yüzük o akşam geldi; biz çoktan birbirimizi seçmiştik.',
    video: '/assets/story-04-proposal.mp4',
    poster: '/assets/story-04-proposal-poster.webp',
    scroll: 360,
    captionAt: 0.67,
    tone: 'vineyard'
  },
  {
    id: 'final',
    number: '05',
    title: 'Bugüne doğru',
    text: 'Biz hazırız; bu mutluluğu sizinle yaşayalım.',
    video: '/assets/story-05-final.mp4',
    poster: '/assets/story-05-final-poster.webp',
    scroll: 270,
    captionAt: 0.66,
    tone: 'sunset'
  }
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (from, to, value) => {
  const x = clamp((value - from) / (to - from));
  return x * x * (3 - 2 * x);
};

function sceneMarkup(scene, index) {
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
            <h3 id="story-scene-${scene.id}">${scene.text}</h3>
          </div>
          <div class="video-story-progress" aria-hidden="true"><span data-story-progress></span></div>
          <a class="video-story-skip" href="#story-end">Hikâyeyi geç <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>`;
}

function setPreload(video, mode = 'auto') {
  if (!video || video.dataset.preloadArmed === mode) return;
  video.dataset.preloadArmed = mode;
  video.preload = mode;
  try { video.load(); } catch (_) {}
}

function initStory() {
  const root = document.getElementById('storyScenes');
  if (!root) return Promise.resolve();

  root.innerHTML = scenes.map(sceneMarkup).join('');

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
  const sceneEls = [...root.querySelectorAll('[data-story-video-scene]')];
  const videoEls = sceneEls.map(el => el.querySelector('[data-story-video]'));

  // The story module itself is lazy-loaded near the disclosure; only the first
  // clip is eagerly buffered. Nearby scenes arm themselves as the user scrolls.
  setPreload(videoEls[0], 'auto');

  const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = sceneEls.indexOf(entry.target);
      [index, index + 1].forEach(i => {
        if (i >= 0 && i < videoEls.length) setPreload(videoEls[i], 'auto');
      });
    });
  }, { rootMargin: '140% 0px', threshold: 0.01 });
  sceneEls.forEach(el => preloadObserver.observe(el));

  let raf = 0;
  const update = () => {
    raf = 0;
    const viewportH = Math.max(1, window.innerHeight);
    const reduce = reducedMotion.matches;

    sceneEls.forEach((sceneEl, index) => {
      const rect = sceneEl.getBoundingClientRect();
      // Ignore distant scenes; this keeps seeking work limited to the active chapter.
      if (rect.bottom < -viewportH * 0.25 || rect.top > viewportH * 1.25) return;

      const scrollDistance = Math.max(1, sceneEl.offsetHeight - viewportH);
      const progress = clamp(-rect.top / scrollDistance);
      const video = videoEls[index];
      const copy = sceneEl.querySelector('[data-story-copy]');
      const progressBar = sceneEl.querySelector('[data-story-progress]');
      const cfg = scenes[index];

      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        const mediaProgress = reduce ? 0.78 : progress;
        const targetTime = Math.min(Math.max(0, video.duration - 0.045), mediaProgress * Math.max(0, video.duration - 0.045));
        if (Math.abs(video.currentTime - targetTime) > 0.035) {
          try { video.currentTime = targetTime; } catch (_) {}
        }
      }

      if (progressBar) progressBar.style.transform = `scaleY(${progress})`;

      if (copy) {
        const reveal = reduce ? 1 : smoothstep(cfg.captionAt - 0.06, cfg.captionAt + 0.08, progress);
        const exit = reduce ? 1 : 1 - smoothstep(0.965, 1, progress);
        const opacity = clamp(reveal * exit);
        copy.style.setProperty('--copy-reveal', opacity.toFixed(3));
        copy.style.setProperty('--copy-shift', `${((1 - opacity) * 18).toFixed(1)}px`);
      }

      sceneEl.style.setProperty('--scene-progress', progress.toFixed(4));
    });
  };

  const requestUpdate = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener?.('change', requestUpdate);

  videoEls.forEach(video => {
    video.addEventListener('loadedmetadata', requestUpdate, { passive: true });
    video.addEventListener('canplay', requestUpdate, { passive: true });
    video.addEventListener('error', () => video.closest('.video-story-media')?.classList.add('is-video-error'));
  });

  requestUpdate();

  // Metadata lives at the front of the optimized MP4, so this resolves quickly
  // without forcing all five clips to download before the story can open.
  return new Promise(resolve => {
    const first = videoEls[0];
    if (!first || first.readyState >= 1) return resolve();
    const done = () => resolve();
    first.addEventListener('loadedmetadata', done, { once: true });
    first.addEventListener('error', done, { once: true });
    window.setTimeout(done, 2200);
  });
}

export const storyAssetsReady = initStory();
