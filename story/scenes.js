import libraryBackgroundUrl from "../assets/story/library/library-room-v2.png";
import libraryTableUrl from "../assets/story/library/library-table-v2.png";
import sabriyeReadingUrl from "../assets/story/library/sabriye-reading-v1.png";
import ersanWalkingUrl from "../assets/story/library/ersan-walking-v1.png";
import ersanPausedUrl from "../assets/story/library/ersan-paused-v1.png";
import libraryEyeContactUrl from "../assets/story/library/library-eye-contact-v1.png";
import picnicBackgroundUrl from "../assets/story/picnic/picnic-background-v1.png";
import picnicBlanketUrl from "../assets/story/picnic/picnic-blanket-cards-v1.png";
import picnicSabriyeUrl from "../assets/story/picnic/picnic-sabriye-v2.png";
import picnicErsanUrl from "../assets/story/picnic/picnic-ersan-v2.png";
import picnicCardFocusUrl from "../assets/story/picnic/picnic-blanket-card-focus-v1.png";
import graduationBackgroundUrl from "../assets/story/graduation/graduation-background-v1.png";
import graduationTossUrl from "../assets/story/graduation/graduation-couple-toss-v5.png";
import graduationHugUrl from "../assets/story/graduation/graduation-couple-hug-v5.png";
import graduationCapUrl from "../assets/story/graduation/graduation-cap-v3.png";
import proposalBackgroundUrl from "../assets/story/proposal/vineyard-background-v1.png";
import proposalDinnerUrl from "../assets/story/proposal/proposal-dinner-v1.png";
import proposalKneelUrl from "../assets/story/proposal/proposal-kneel-v1.png";
import proposalRingUrl from "../assets/story/proposal/proposal-ring-v1.png";
import proposalRiseUrl from "../assets/story/proposal/proposal-rise-v1.png";
import proposalForeheadUrl from "../assets/story/proposal/proposal-forehead-v1.png";
import weddingBackgroundUrl from "../assets/story/wedding/wedding-background-v1.png";
import weddingBrideUrl from "../assets/story/wedding/wedding-bride-run-v1.png";
import weddingGroomUrl from "../assets/story/wedding/wedding-groom-run-v1.png";
import weddingLiftUrl from "../assets/story/wedding/wedding-lift-v1.png";

function backgroundSvg(scene) {
  const common = 'class="story-background" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"';

  if (scene === "library") {
    return `<svg ${common}>
      <g class="scene-bg-line" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".48">
        <path d="M68 680h1304"/><path d="M122 164v455M450 164v455M122 164h328M122 315h328M122 466h328"/>
        <path d="M166 185v104M196 193v96M229 181v108M274 199v90M309 185v104M351 193v96M390 179v110"/>
        <path d="M166 337v103M207 350v90M248 332v108M291 344v96M337 331v109M382 349v91"/>
        <path d="M1004 158v462M1317 158v462M1004 158h313M1004 315h313M1004 470h313"/>
        <path d="M1040 185v104M1082 194v95M1123 180v109M1162 198v91M1203 186v103M1245 176v113M1282 194v95"/>
        <path d="M1040 340v105M1080 350v95M1120 330v115M1167 342v103M1210 335v110M1251 350v95"/>
      </g>
      <g class="scene-bg-line story-faint" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M536 187q183-49 367 0M585 164v-34h271v34"/>
        <circle cx="721" cy="129" r="8"/>
      </g>
    </svg>`;
  }

  if (scene === "picnic") {
    return `<svg ${common}>
      <g class="scene-bg-line" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".42">
        <path d="M0 703q190-57 389-7t397 3 365-1 289 8"/>
        <path d="M99 696q70-128 40-309M144 388q-21-108 46-204M142 381q63-81 139-96M141 436q-67-86-119-88"/>
        <path d="M1210 704q-45-138-4-273M1205 435q-65-65-143-66M1207 385q28-110 101-174M1204 480q74-70 157-73"/>
      </g>
      <g class="scene-leaf story-sage-stroke" fill="none" stroke-width="5" stroke-linecap="round">
        <path d="M173 294q39-24 72 4-34 30-72-4ZM78 350q32-27 63-2-24 32-63 2ZM1259 321q42-21 72 12-39 25-72-12ZM1159 377q33-26 66 3-28 30-66-3Z"/>
      </g>
    </svg>`;
  }

  if (scene === "graduation") {
    return `<svg ${common}>
      <g class="scene-bg-line" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".42">
        <path d="M0 698h1440M158 698V409h1124v289M158 409l562-225 562 225M359 409v289M1081 409v289"/>
        <path d="M447 409v177M539 409v177M632 409v177M808 409v177M901 409v177M994 409v177"/>
        <path d="M340 586h760M720 184v-63M684 121h72"/>
      </g>
      <g class="scene-bg-line story-faint" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M84 649q78-77 156 0M1200 649q78-77 156 0"/></g>
    </svg>`;
  }

  if (scene === "proposal") {
    return `<svg ${common}>
      <g class="scene-bg-line" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".42">
        <path d="M0 702h1440M181 702V246h1078v456M181 246h1078M329 246v456M1114 246v456"/>
        <path d="M536 405q184-84 368 0M591 389v-75h258v75M720 314v-62"/>
        <path d="M225 306h58M225 358h58M1161 306h58M1161 358h58"/>
      </g>
      <g class="scene-candle" fill="none" stroke="currentColor" stroke-width="3"><path d="M716 490v102M702 594h28"/><path class="story-terracotta-stroke" d="M716 478q-16-19 1-35 17 17-1 35Z"/></g>
    </svg>`;
  }

  return `<svg ${common}>
    <g class="scene-bg-line" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".42">
      <path d="M0 705h1440M318 705V337q0-185 190-185h424q190 0 190 185v368"/>
      <path d="M403 705V355q0-118 119-118h396q119 0 119 118v350"/>
      <path d="M318 338q-67-70-139-34M1122 338q67-70 139-34"/>
    </g>
    <g class="scene-leaf story-sage-stroke" fill="none" stroke-width="5" stroke-linecap="round">
      <path d="M325 331q-52-26-81 15 45 28 81-15ZM343 285q-15-51 29-70 19 45-29 70ZM1115 331q52-26 81 15-45 28-81-15ZM1097 285q15-51-29-70-19 45 29 70Z"/>
    </g>
  </svg>`;
}

function heart() {
  return `<svg class="story-heart" viewBox="0 0 88 76" aria-hidden="true">
    <path d="M44 68C22 53 10 41 11 25 12 10 31 8 44 23 57 8 76 10 77 25 78 41 66 53 44 68Z" fill="currentColor" fill-opacity=".14"/>
    <path d="M44 66C23 52 12 40 13 25 14 12 31 10 44 25 57 10 74 12 75 25 76 40 65 52 44 66Z" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42.5 69C20 54 8.5 41 10 24" fill="none" stroke="currentColor" stroke-opacity=".32" stroke-width="1.35" stroke-linecap="round"/>
  </svg>`;
}

function sceneArtwork(id) {
  if (id === "library") {
    return `<div class="story-library-art">
      <img class="story-library-layer story-library-bg" src="${libraryBackgroundUrl}" alt="" decoding="async" draggable="false">
      <span class="story-library-lamp-glow" aria-hidden="true"></span>
      <div class="story-library-person story-library-woman story-library-woman--reading">
        <img src="${sabriyeReadingUrl}" alt="" decoding="async" draggable="false">
      </div>
      <img class="story-library-table" src="${libraryTableUrl}" alt="" decoding="async" draggable="false">
      <div class="story-library-person story-library-man story-library-man--walking">
        <img src="${ersanWalkingUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-library-person story-library-man story-library-man--paused">
        <img src="${ersanPausedUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-library-pair story-library-pair--woman">
        <img src="${libraryEyeContactUrl}" alt="" decoding="async" draggable="false">
      </div>
      ${heart()}
    </div>`;
  }

  if (id === "picnic") {
    return `<div class="story-picnic-art">
      <img class="story-picnic-layer story-picnic-bg" src="${picnicBackgroundUrl}" alt="" decoding="async" draggable="false">
      <img class="story-picnic-blanket" src="${picnicBlanketUrl}" alt="" decoding="async" draggable="false">
      <div class="story-picnic-person story-picnic-woman">
        <div class="story-picnic-motion"><img src="${picnicSabriyeUrl}" alt="" decoding="async" draggable="false"></div>
      </div>
      <div class="story-picnic-person story-picnic-man">
        <div class="story-picnic-motion"><img src="${picnicErsanUrl}" alt="" decoding="async" draggable="false"></div>
      </div>
      <img class="story-picnic-card-focus" src="${picnicCardFocusUrl}" alt="" decoding="async" draggable="false">
    </div>`;
  }

  if (id === "graduation") {
    return `<div class="story-graduation-art">
      <img class="story-graduation-layer story-graduation-bg" src="${graduationBackgroundUrl}" alt="" decoding="async" draggable="false">
      <div class="story-graduation-pose story-graduation-pose--toss">
        <img class="story-graduation-couple story-graduation-couple--toss" src="${graduationTossUrl}" alt="" decoding="async" draggable="false">
      </div>
      <img class="story-graduation-cap story-graduation-cap--woman" src="${graduationCapUrl}" alt="" decoding="async" draggable="false">
      <img class="story-graduation-cap story-graduation-cap--man" src="${graduationCapUrl}" alt="" decoding="async" draggable="false">
      <div class="story-graduation-pose story-graduation-pose--hug">
        <img class="story-graduation-couple story-graduation-couple--hug" src="${graduationHugUrl}" alt="" decoding="async" draggable="false">
      </div>
    </div>`;
  }

  if (id === "proposal") {
    return `<div class="story-proposal-art">
      <img class="story-proposal-layer story-proposal-bg" src="${proposalBackgroundUrl}" alt="" decoding="async" draggable="false">
      <div class="story-proposal-pose story-proposal-pose--dinner">
        <img src="${proposalDinnerUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-proposal-pose story-proposal-pose--kneel">
        <img src="${proposalKneelUrl}" alt="" decoding="async" draggable="false">
        <span class="story-proposal-ring-glow" aria-hidden="true"></span>
      </div>
      <div class="story-proposal-pose story-proposal-pose--ring">
        <img src="${proposalRingUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-proposal-pose story-proposal-pose--rise">
        <img src="${proposalRiseUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-proposal-pose story-proposal-pose--forehead">
        <img src="${proposalForeheadUrl}" alt="" decoding="async" draggable="false">
      </div>
    </div>`;
  }

  if (id === "wedding") {
    return `<div class="story-wedding-art">
      <img class="story-wedding-layer story-wedding-bg" src="${weddingBackgroundUrl}" alt="" decoding="async" draggable="false">
      <div class="story-wedding-person story-wedding-bride">
        <img src="${weddingBrideUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-wedding-person story-wedding-groom">
        <img src="${weddingGroomUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-wedding-pose story-wedding-pose--lift">
        <img src="${weddingLiftUrl}" alt="" decoding="async" draggable="false">
      </div>
      <div class="story-confetti" aria-hidden="true">${Array.from({ length: 14 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div>
    </div>`;
  }

  return backgroundSvg(id);
}

export function renderScene(scene) {
  const sceneText = scene.desktopLines
    ? scene.desktopLines.map((line) => `<span class="story-copy__desktop-line">${line}</span>`).join(" ")
    : scene.text;

  return `
    <section class="story-scene story-scene--${scene.id}" data-story-scene="${scene.id}" style="--scene-scroll-height:${scene.scrollHeight}" aria-labelledby="story-${scene.id}-title">
      <div class="story-stage">
        <a class="story-skip" href="#story-end"><span>Hikâyeyi geç</span><span aria-hidden="true">↓</span></a>
        <div class="story-visual" aria-hidden="true">${sceneArtwork(scene.id)}</div>
        <div class="story-copy">
          <p class="story-copy__meta">${scene.number} · ${scene.title}</p>
          <h3 id="story-${scene.id}-title">${sceneText}</h3>
        </div>
        <div class="story-progress" aria-hidden="true"><span></span></div>
      </div>
    </section>`;
}
