import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storyScenes } from "./story-data.js";
import { renderScene } from "./scenes.js";

gsap.registerPlugin(ScrollTrigger);

const storyRoot = document.getElementById("storyScenes");
const storyEnd = document.getElementById("story-end");
const storyDisclosure = document.getElementById("storyDisclosure");
const storyDisclosureRoot = storyDisclosure?.closest(".story-disclosure");

if (!storyRoot) {
  throw new Error("Hikâyemiz bölümü için #storyScenes bulunamadı.");
}

storyRoot.innerHTML = storyScenes.map(renderScene).join("");

const sceneElements = [...storyRoot.querySelectorAll("[data-story-scene]")];
const contexts = [];
let refreshFrame = 0;
let refreshTimer = 0;
let disclosureReadyTimer = 0;

function addProgress(timeline, scene) {
  const progress = scene.querySelector(".story-progress span");
  timeline.fromTo(progress, { scaleY: 0 }, { scaleY: 1, duration: timeline.duration(), ease: "none" }, 0);
}

function commonIntro(timeline, scene) {
  const lines = scene.querySelectorAll(".scene-bg-line");
  const leaves = scene.querySelectorAll(".scene-leaf");
  timeline
    .from(lines, { autoAlpha: 0, scaleX: .94, transformOrigin: "50% 50%", stagger: .025, duration: .75, ease: "power1.out" }, 0)
    .from(leaves, { autoAlpha: 0, scale: .8, transformOrigin: "center", stagger: .05, duration: .55 }, .22);
}

function libraryTimeline(scene) {
  const tl = gsap.timeline();
  const background = scene.querySelector(".story-library-bg");
  const table = scene.querySelector(".story-library-table");
  const readingWoman = scene.querySelector(".story-library-woman--reading");
  const walkingMan = scene.querySelector(".story-library-man--walking");
  const pausedMan = scene.querySelector(".story-library-man--paused");
  const eyeContactWoman = scene.querySelector(".story-library-pair--woman");
  const lampGlow = scene.querySelector(".story-library-lamp-glow");
  const heart = scene.querySelector(".story-heart");
  const copy = scene.querySelector(".story-copy");

  tl
    .set([pausedMan, eyeContactWoman, heart, copy], { autoAlpha: 0 }, 0)
    .set(lampGlow, { autoAlpha: 0, scale: .72 }, 0)
    .from(background, { autoAlpha: 0, scale: 1.045, duration: .82, ease: "power1.out" }, 0)
    .from(table, { autoAlpha: 0, y: 22, duration: .72, ease: "power2.out" }, .1)
    .from(readingWoman, { autoAlpha: 0, y: 26, duration: .74, ease: "power2.out" }, .22)
    .to(readingWoman, { y: -2, duration: .55, ease: "sine.inOut" }, .76)
    .set(walkingMan, { autoAlpha: 0, x: () => window.innerWidth * .46, y: 0 }, .88)
    .to(walkingMan, { autoAlpha: 1, duration: .32, ease: "power1.out" }, .88)
    .to(walkingMan, { x: 0, duration: 1.62, ease: "none" }, .88)
    .to(walkingMan, { y: -5, repeat: 4, yoyo: true, duration: .18, ease: "sine.inOut" }, .96)
    .to(walkingMan, {
      x: () => window.innerWidth <= 640 ? -14 : -28,
      duration: .44,
      ease: "none"
    }, 2.5)
    .to(walkingMan, { y: -5, repeat: 1, yoyo: true, duration: .2, ease: "sine.inOut" }, 2.5)
    .to(walkingMan, { autoAlpha: 0, duration: .44, ease: "power1.inOut" }, 2.94)
    .fromTo(pausedMan,
      { autoAlpha: 0, y: 6, scale: .99 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .52, ease: "power2.out" },
      2.84
    )
    .to(readingWoman, { autoAlpha: 0, duration: .46, ease: "power1.inOut" }, 2.96)
    .fromTo(eyeContactWoman,
      { autoAlpha: 0, xPercent: -50, y: 10, scale: .99 },
      { autoAlpha: 1, xPercent: -50, y: 0, scale: 1, duration: .62, ease: "power2.out" },
      2.86
    )
    .fromTo(heart,
      { autoAlpha: 0, scale: .45, rotation: -6 },
      { autoAlpha: 1, scale: 1, rotation: 1, duration: .52, ease: "back.out(1.5)" },
      3.42
    )
    .to([eyeContactWoman, pausedMan], { y: -2, duration: .48, ease: "sine.inOut" }, 3.66)
    .to(lampGlow, { autoAlpha: .9, scale: 1, duration: .62, ease: "sine.out" }, 3.82)
    .fromTo(copy,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: .62, ease: "power2.out" },
      3.86
    )
    .to(heart, { autoAlpha: 0, scale: .82, duration: .32, ease: "power1.in" }, 4.5)
    .to(pausedMan, { autoAlpha: 0, duration: .32, ease: "power1.inOut" }, 4.52)
    .fromTo(walkingMan,
      { autoAlpha: 0, x: () => window.innerWidth <= 640 ? -14 : -28, y: 0 },
      { autoAlpha: 1, x: () => window.innerWidth <= 640 ? -14 : -28, y: 0, duration: .32, ease: "power1.out" },
      4.5
    )
    .to(walkingMan, {
      x: () => window.innerWidth * .62,
      duration: 1.18,
      ease: "none"
    }, 4.76)
    .to(walkingMan, { y: -6, repeat: 3, yoyo: true, duration: .17, ease: "sine.inOut" }, 4.78)
    .to(eyeContactWoman, { y: -2, duration: 1.05, ease: "none" }, 4.76);
  return tl;
}

function picnicTimeline(scene) {
  const tl = gsap.timeline();
  const background = scene.querySelector(".story-picnic-bg");
  const blanket = scene.querySelector(".story-picnic-blanket");
  const woman = scene.querySelector(".story-picnic-woman .story-picnic-motion");
  const man = scene.querySelector(".story-picnic-man .story-picnic-motion");
  const cards = scene.querySelector(".story-picnic-card-focus");
  const copy = scene.querySelector(".story-copy");

  tl
    .from(background, { autoAlpha: 0, scale: 1.035, duration: .9, ease: "power1.out" }, 0)
    .from(blanket, { autoAlpha: 0, y: 34, scale: .96, duration: .78, ease: "power2.out" }, .1)
    .from(woman, { autoAlpha: 0, xPercent: -16, y: 38, duration: .8, ease: "power2.out" }, .28)
    .from(man, { autoAlpha: 0, xPercent: 13, y: 38, duration: .8, ease: "power2.out" }, .42)
    .fromTo(cards,
      { autoAlpha: 0, xPercent: -50, y: -16, rotation: 7, scale: .72 },
      { autoAlpha: 1, xPercent: -50, y: 0, rotation: 0, scale: 1, duration: .72, ease: "back.out(1.45)" },
      .58
    )
    .to(woman, { x: 6, rotation: 2, y: -8, duration: .48, ease: "power2.inOut" }, 1.18)
    .to(man, { x: -8, rotation: -1.8, y: -7, duration: .48, ease: "power2.inOut" }, 1.38)
    .to(woman, { rotation: -1.6, y: -11, repeat: 1, yoyo: true, duration: .34, ease: "sine.inOut" }, 1.82)
    .to(man, { x: -14, y: 1, rotation: -3.8, scale: 1.015, duration: .7, ease: "power2.inOut" }, 2.14)
    .to(cards, { rotation: -4, scale: 1.08, duration: .42, ease: "back.out(1.5)" }, 2.32)
    .to(cards, { rotation: 0, scale: 1, duration: .38, ease: "sine.inOut" }, 2.7)
    .to(woman, { x: 8, rotation: 2.8, y: -15, scale: 1.025, duration: .45, ease: "back.out(1.55)" }, 2.76)
    .to(man, { x: -6, y: -6, rotation: -1.4, scale: 1, duration: .52, ease: "power2.out" }, 2.9)
    .to(woman, { x: 4, y: -8, rotation: .8, scale: 1, duration: .46, ease: "sine.inOut" }, 3.18)
    .from(copy, { autoAlpha: 0, y: 22, duration: .72, ease: "power2.out" }, 2.42)
    .to([woman, man], { y: -4, duration: .58, ease: "sine.inOut" }, 3.58);
  return tl;
}

function graduationTimeline(scene) {
  const tl = gsap.timeline();
  const background = scene.querySelector(".story-graduation-bg");
  const tossPose = scene.querySelector(".story-graduation-pose--toss");
  const hugPose = scene.querySelector(".story-graduation-pose--hug");
  const womanCap = scene.querySelector(".story-graduation-cap--woman");
  const manCap = scene.querySelector(".story-graduation-cap--man");
  const copy = scene.querySelector(".story-copy");

  tl
    .set(hugPose, { autoAlpha: 0 })
    .set([womanCap, manCap], { autoAlpha: 0, x: 0, y: 18, scale: .52, rotation: 0 }, 0)
    .from(background, { autoAlpha: 0, scale: 1.035, duration: .9, ease: "power1.out" }, 0)
    .from(tossPose, { autoAlpha: 0, y: 28, scale: .985, duration: .72, ease: "power2.out" }, .24)
    .fromTo([womanCap, manCap],
      { autoAlpha: 0, y: 18, scale: .52 },
      { autoAlpha: 1, y: 0, scale: .72, stagger: .04, duration: .36, ease: "back.out(1.45)" },
      .74
    )
    .to(womanCap, {
      x: () => -Math.min(window.innerWidth * .035, 68),
      y: () => window.innerWidth <= 640
        ? -Math.min(window.innerHeight * .23, 190)
        : -Math.min(window.innerHeight * .13, 112),
      rotation: -120,
      scale: 1,
      duration: .74,
      ease: "power2.out"
    }, 1.1)
    .to(manCap, {
      x: () => Math.min(window.innerWidth * .032, 62),
      y: () => window.innerWidth <= 640
        ? -Math.min(window.innerHeight * .24, 200)
        : -Math.min(window.innerHeight * .14, 118),
      rotation: 132,
      scale: 1,
      duration: .74,
      ease: "power2.out"
    }, 1.1)
    .to(womanCap, {
      x: () => -Math.min(window.innerWidth * .05, 92),
      y: () => window.innerWidth <= 640
        ? -Math.min(window.innerHeight * .17, 145)
        : -Math.min(window.innerHeight * .065, 56),
      rotation: -205,
      scale: .92,
      duration: .5,
      ease: "power1.in"
    }, 1.84)
    .to(manCap, {
      x: () => Math.min(window.innerWidth * .047, 86),
      y: () => window.innerWidth <= 640
        ? -Math.min(window.innerHeight * .18, 152)
        : -Math.min(window.innerHeight * .072, 62),
      rotation: 218,
      scale: .92,
      duration: .5,
      ease: "power1.in"
    }, 1.84)
    .to(tossPose, { rotation: .8, y: -7, scale: 1.012, duration: .64, ease: "sine.inOut" }, 1.55)
    .to([womanCap, manCap], { autoAlpha: 0, scale: .82, duration: .32, ease: "power1.in" }, 2.28)
    .from(copy, { autoAlpha: 0, y: 22, duration: .72, ease: "power2.out" }, 2.24)
    .to(tossPose, { autoAlpha: 0, scale: .99, duration: .45, ease: "power1.inOut" }, 2.62)
    .fromTo(hugPose, { autoAlpha: 0, y: 18, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .66, ease: "power2.out" }, 2.78)
    .to(hugPose, { y: -5, duration: .48, ease: "sine.inOut" }, 3.42);
  return tl;
}

function proposalTimeline(scene) {
  const tl = gsap.timeline();
  const background = scene.querySelector(".story-proposal-bg");
  const dinnerPose = scene.querySelector(".story-proposal-pose--dinner");
  const kneelPose = scene.querySelector(".story-proposal-pose--kneel");
  const ringPose = scene.querySelector(".story-proposal-pose--ring");
  const risePose = scene.querySelector(".story-proposal-pose--rise");
  const foreheadPose = scene.querySelector(".story-proposal-pose--forehead");
  const ringGlow = scene.querySelector(".story-proposal-ring-glow");
  const copy = scene.querySelector(".story-copy");

  tl
    .set([kneelPose, ringPose, risePose, foreheadPose], { autoAlpha: 0 })
    .set(ringGlow, { autoAlpha: 0, scale: .35 })
    .from(background, { autoAlpha: 0, scale: 1.035, duration: .9, ease: "power1.out" }, 0)
    .from(dinnerPose, { autoAlpha: 0, y: 26, scale: .975, duration: .78, ease: "power2.out" }, .24)
    .to(dinnerPose, { y: -5, scale: 1.008, duration: .7, ease: "sine.inOut" }, 1.05)
    .to(dinnerPose, { autoAlpha: 0, x: -20, scale: .985, duration: .5, ease: "power1.inOut" }, 1.72)
    .fromTo(kneelPose,
      { autoAlpha: 0, y: 28, scale: .95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .68, ease: "power2.out" },
      1.9
    )
    .fromTo(ringGlow,
      { autoAlpha: 0, scale: .35 },
      { autoAlpha: 1, scale: 1, duration: .55, ease: "back.out(1.7)" },
      2.32
    )
    .to(ringGlow, { scale: 1.16, opacity: .72, repeat: 1, yoyo: true, duration: .4, ease: "sine.inOut" }, 2.78)
    .from(copy, { autoAlpha: 0, y: 22, duration: .72, ease: "power2.out" }, 2.42)
    .to(kneelPose, { y: -5, scale: 1.01, duration: .55, ease: "sine.inOut" }, 3.04)
    .to(kneelPose, { autoAlpha: 0, scale: .99, duration: .42, ease: "power1.inOut" }, 3.43)
    .fromTo(ringPose,
      { autoAlpha: 0, y: 18, scale: .975 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .52, ease: "power2.out" },
      3.45
    )
    .to(ringPose, { y: -4, scale: 1.008, duration: .48, ease: "sine.inOut" }, 3.98)
    .to(ringPose, { autoAlpha: 0, scale: .99, duration: .38, ease: "power1.inOut" }, 4.27)
    .fromTo(risePose,
      { autoAlpha: 0, y: 18, scale: .975 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .5, ease: "power2.out" },
      4.3
    )
    .to(risePose, { y: -5, scale: 1.006, duration: .46, ease: "sine.inOut" }, 4.78)
    .to(risePose, { autoAlpha: 0, scale: .99, duration: .38, ease: "power1.inOut" }, 5.08)
    .fromTo(foreheadPose,
      { autoAlpha: 0, y: 20, scale: .96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .62, ease: "power2.out" },
      5.1
    )
    .to(foreheadPose, { y: -5, scale: 1.008, duration: .52, ease: "sine.inOut" }, 5.68);
  return tl;
}

function weddingTimeline(scene) {
  const tl = gsap.timeline();
  const background = scene.querySelector(".story-wedding-bg");
  const bride = scene.querySelector(".story-wedding-bride");
  const groom = scene.querySelector(".story-wedding-groom");
  const liftPose = scene.querySelector(".story-wedding-pose--lift");
  const confetti = scene.querySelector(".story-confetti");
  const copy = scene.querySelector(".story-copy");
  const mobile = () => window.innerWidth <= 640;

  tl
    .set(liftPose, { autoAlpha: 0 })
    .set(confetti, { autoAlpha: 0 })
    .from(background, { autoAlpha: 0, scale: 1.035, duration: .9, ease: "power1.out" }, 0)
    .fromTo(bride,
      {
        autoAlpha: 0,
        x: () => mobile() ? -window.innerWidth * .53 : -window.innerWidth * .6,
        y: 14,
        rotation: -2.2
      },
      { autoAlpha: 1, duration: .4, ease: "power2.out" },
      .24
    )
    .fromTo(groom,
      {
        autoAlpha: 0,
        x: () => mobile() ? window.innerWidth * .52 : window.innerWidth * .38,
        y: 14,
        rotation: 2
      },
      { autoAlpha: 1, duration: .4, ease: "power2.out" },
      .3
    )
    .to(bride, {
      x: () => mobile() ? -window.innerWidth * .16 : -window.innerWidth * .075,
      rotation: .8,
      duration: 1.9,
      ease: "none"
    }, .55)
    .to(groom, {
      x: () => mobile() ? window.innerWidth * .16 : window.innerWidth * .07,
      rotation: -.8,
      duration: 1.9,
      ease: "none"
    }, .55)
    .to([bride, groom], { y: -7, repeat: 5, yoyo: true, duration: .18, ease: "sine.inOut" }, .58)
    .to([bride, groom], { autoAlpha: 0, scale: .985, duration: .38, ease: "power1.inOut" }, 2.42)
    .fromTo(liftPose,
      { autoAlpha: 0, y: 22, scale: .94, rotation: -2 },
      { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: .62, ease: "power2.out" },
      2.5
    )
    .to(liftPose, { rotation: 4.5, y: -18, duration: .55, ease: "power2.out" }, 3.03)
    .to(liftPose, { rotation: -1.5, y: -7, duration: .62, ease: "sine.inOut" }, 3.58)
    .fromTo(confetti, { autoAlpha: 0, scale: .72 }, { autoAlpha: 1, scale: 1, duration: .72, ease: "power2.out" }, 3.06)
    .from(copy, { autoAlpha: 0, y: 22, duration: .72, ease: "power2.out" }, 2.78)
    .to(liftPose, { rotation: 0, y: 0, duration: .6, ease: "sine.inOut" }, 4.2);
  return tl;
}

const builders = {
  library: libraryTimeline,
  picnic: picnicTimeline,
  graduation: graduationTimeline,
  proposal: proposalTimeline,
  wedding: weddingTimeline
};

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const storyIsOpen = () => !storyDisclosure || storyDisclosure.open;

function initializeMotion() {
  if (motionQuery.matches || !storyIsOpen() || contexts.length) return;

  sceneElements.forEach((scene) => {
    const context = gsap.context(() => {
      const timeline = builders[scene.dataset.storyScene](scene);
      addProgress(timeline, scene);
      timeline.scrollTrigger = ScrollTrigger.create({
        trigger: scene,
        start: "top top",
        end: "bottom bottom",
        animation: timeline,
        scrub: .28,
        invalidateOnRefresh: true
      });
    }, scene);
    contexts.push(context);
  });

  ScrollTrigger.refresh();
}

function cleanupMotion() {
  while (contexts.length) contexts.pop().revert();
}

function resetMotion() {
  cleanupMotion();
  gsap.set(sceneElements.flatMap(scene => [...scene.querySelectorAll("[style]")]), { clearProps: "transform,opacity,visibility" });
  if (storyIsOpen()) initializeMotion();
}

function scheduleRefresh() {
  window.clearTimeout(refreshTimer);
  window.cancelAnimationFrame(refreshFrame);
  refreshFrame = window.requestAnimationFrame(() => {
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
  });
}

function handleMotionChange() {
  cleanupMotion();
  if (!motionQuery.matches && storyIsOpen()) initializeMotion();
}

function handleDisclosureToggle() {
  window.clearTimeout(disclosureReadyTimer);
  storyDisclosure?.classList.remove("is-panel-ready");
  storyDisclosureRoot?.classList.toggle("is-story-open", storyIsOpen());

  if (storyIsOpen()) {
    window.requestAnimationFrame(() => {
      initializeMotion();
      scheduleRefresh();
      disclosureReadyTimer = window.setTimeout(() => {
        storyDisclosure?.classList.add("is-panel-ready");
        scheduleRefresh();
      }, 760);
    });
    return;
  }
  cleanupMotion();
}

function handlePageHide() {
  window.clearTimeout(disclosureReadyTimer);
  cleanupMotion();
}

sceneElements.forEach((scene) => {
  const skip = scene.querySelector(".story-skip");
  skip.addEventListener("click", () => {
    window.setTimeout(() => storyEnd?.focus({ preventScroll: true }), 450);
  });
});

window.addEventListener("resize", scheduleRefresh, { passive: true });
window.addEventListener("orientationchange", scheduleRefresh, { passive: true });
motionQuery.addEventListener?.("change", handleMotionChange);
storyDisclosure?.addEventListener("toggle", handleDisclosureToggle);
window.addEventListener("pagehide", handlePageHide, { once: true });

storyDisclosureRoot?.classList.toggle("is-story-open", storyIsOpen());
if (storyIsOpen()) {
  storyDisclosure?.classList.add("is-panel-ready");
  initializeMotion();
}

window.__storyDebug = {
  scenes: storyScenes.map(({ id, scrollHeight }) => ({ id, scrollHeight })),
  refresh: scheduleRefresh,
  reset: resetMotion,
  cleanup: cleanupMotion
};
