const svgOpen = (className, viewBox = "0 0 220 340") => `
  <svg class="story-character ${className}" viewBox="${viewBox}" aria-hidden="true" focusable="false">
    <g class="character-root" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">`;

const svgClose = `</g></svg>`;

function womanHead({ x = 110, y = 67 } = {}) {
  return `
    <g class="char-head" style="transform-origin:${x}px ${y}px">
      <ellipse class="story-paper" cx="${x}" cy="${y}" rx="38" ry="41"/>
      <g class="char-face">
        <path d="M${x - 14} ${y + 1}q4-5 8 0M${x + 7} ${y + 1}q4-5 8 0"/>
        <path d="M${x - 5} ${y + 20}q7 6 14 0"/>
        <circle class="story-ink" cx="${x - 10}" cy="${y + 2}" r="2" stroke="none"/>
        <circle class="story-ink" cx="${x + 12}" cy="${y + 2}" r="2" stroke="none"/>
      </g>
      <g class="char-hair">
        <path class="story-ink-fill" d="M74 65c-5-32 15-52 38-52 31 0 47 23 42 51-6-16-18-29-39-31-14 0-29 11-41 32Z"/>
        <path d="M78 48c-14 17-8 51-18 67 15-1 27-10 31-25M145 43c17 22 9 53 23 70-16 1-29-8-34-24"/>
        <path d="M82 44q18-27 50-17M68 112q18 17 27-14M163 111q-18 17-28-13"/>
      </g>
    </g>`;
}

function manHead({ x = 110, y = 68 } = {}) {
  return `
    <g class="char-head" style="transform-origin:${x}px ${y}px">
      <ellipse class="story-paper" cx="${x}" cy="${y}" rx="38" ry="41"/>
      <g class="char-face">
        <path d="M${x - 15} ${y}q4-5 8 0M${x + 7} ${y}q4-5 8 0"/>
        <circle class="story-ink" cx="${x - 11}" cy="${y + 2}" r="2" stroke="none"/>
        <circle class="story-ink" cx="${x + 11}" cy="${y + 2}" r="2" stroke="none"/>
        <path d="M${x - 12} ${y + 21}q12 10 24 0M${x - 23} ${y + 15}q4 25 23 27q20-2 24-27"/>
        <path d="M${x - 15} ${y + 26}q15 8 30 0"/>
      </g>
      <g class="char-hair">
        <path class="story-ink-fill" d="M73 60c-4-29 15-49 34-48 8-13 25-8 26 3 19-1 31 18 25 39-11-12-21-17-33-19-17-3-33 8-52 25Z"/>
        <path d="M76 38q17-25 41-17M95 27q16-24 38-5M127 25q19-10 29 11"/>
      </g>
    </g>`;
}

export function womanStanding(className = "") {
  return `${svgOpen(className)}
    ${womanHead()}
    <g class="char-body">
      <path class="story-terracotta" d="M83 113q27-15 54 0l7 70H76Z"/>
      <path class="story-sand-fill" d="M76 177h68l20 67H57Z"/>
      <path d="M82 117q-11 20-17 49M137 117q13 21 18 49"/>
    </g>
    <g class="char-arm char-arm--left" style="transform-origin:82px 121px"><path class="story-paper" d="M82 121q-21 20-27 52q-2 12 8 15q10 2 14-10l16-43"/><circle class="story-paper" cx="61" cy="185" r="8"/></g>
    <g class="char-arm char-arm--right" style="transform-origin:137px 121px"><path class="story-paper" d="M137 121q20 18 24 51q2 12-8 15q-10 2-13-10l-14-42"/><circle class="story-paper" cx="155" cy="184" r="8"/></g>
    <g class="char-leg char-leg--left" style="transform-origin:86px 238px"><path class="story-paper" d="M72 239l5 63h24l4-63"/><path class="story-shoe" d="M76 299q-8 8-4 18h31q4-10-4-18Z"/></g>
    <g class="char-leg char-leg--right" style="transform-origin:132px 238px"><path class="story-paper" d="M116 239l4 63h24l4-63"/><path class="story-shoe" d="M120 299q-7 9-3 18h32q3-11-7-18Z"/></g>
  ${svgClose}`;
}

export function manStanding(className = "", outfit = "shirt") {
  const formal = outfit === "formal";
  const graduation = outfit === "graduation";
  return `${svgOpen(className)}
    ${manHead()}
    <g class="char-body">
      <path class="${formal ? "story-navy" : graduation ? "story-ink-soft-fill" : "story-sage"}" d="M79 112q31-15 62 0l8 107H71Z"/>
      <path d="M110 109v108M101 126l9 10 10-10"/>
      ${formal ? '<path class="story-paper" d="M99 112l11 23 12-23M104 132l6 8 7-9"/>' : ''}
      ${graduation ? '<path class="story-paper" d="M79 112l31 24 31-24M88 115l-8 104M132 115l9 104"/>' : ''}
    </g>
    <g class="char-arm char-arm--left" style="transform-origin:80px 121px"><path class="${graduation ? "story-ink-soft-fill" : "story-paper"}" d="M80 121q-20 23-19 63q0 11 10 12 10 0 11-12l12-50"/><circle class="story-paper" cx="70" cy="193" r="8"/></g>
    <g class="char-arm char-arm--right" style="transform-origin:140px 121px"><path class="${graduation ? "story-ink-soft-fill" : "story-paper"}" d="M140 121q20 24 18 63q0 11-10 12-10 0-11-12l-10-50"/><circle class="story-paper" cx="149" cy="193" r="8"/></g>
    <g class="char-leg char-leg--left" style="transform-origin:91px 215px"><path class="story-trouser" d="M76 215l5 84h27l3-84"/><path class="story-shoe" d="M81 296q-10 10-5 20h35q4-12-7-20Z"/></g>
    <g class="char-leg char-leg--right" style="transform-origin:130px 215px"><path class="story-trouser" d="M111 215l3 84h27l4-84"/><path class="story-shoe" d="M114 296q-8 10-4 20h37q2-11-9-20Z"/></g>
    ${graduation ? '<g class="graduation-cap" style="transform-origin:110px 24px"><path class="story-ink-fill" d="M67 20l43-17 44 17-44 18Z"/><path d="M82 27v23q28 13 56 0V27M153 20v31"/></g>' : ''}
  ${svgClose}`;
}

export function womanSeated(className = "", graduation = false) {
  return `${svgOpen(className, "0 0 230 300")}
    ${womanHead({ x: 112, y: 65 })}
    <g class="char-body">
      <path class="${graduation ? "story-ink-soft-fill" : "story-terracotta"}" d="M82 108q30-15 60 0l11 75H72Z"/>
      <path class="story-sand-fill" d="M72 176h81l16 48H56Z"/>
    </g>
    <g class="char-arm char-arm--left" style="transform-origin:82px 118px"><path class="story-paper" d="M82 118q-22 20-31 48q-3 10 6 14 9 2 14-8l23-39"/><circle class="story-paper" cx="58" cy="177" r="8"/></g>
    <g class="char-arm char-arm--right" style="transform-origin:141px 118px"><path class="story-paper" d="M141 118q16 20 26 47q4 10-5 14-9 3-14-8l-20-38"/><circle class="story-paper" cx="162" cy="176" r="8"/></g>
    <g class="char-leg char-leg--left" style="transform-origin:85px 216px"><path class="story-paper" d="M74 216q1 27 30 30l23 1v19H96q-36-1-39-35"/><path class="story-shoe" d="M122 244h26q10 7 5 18h-31Z"/></g>
    <g class="char-leg char-leg--right" style="transform-origin:136px 217px"><path class="story-paper" d="M126 216q4 21 27 26l24 1v19h-31q-30-3-35-30"/><path class="story-shoe" d="M173 240h25q10 8 5 18h-30Z"/></g>
  ${svgClose}`;
}

export function manSeated(className = "") {
  return `${svgOpen(className, "0 0 230 300")}
    ${manHead({ x: 112, y: 66 })}
    <g class="char-body"><path class="story-sage" d="M80 109q32-15 64 0l10 84H71Z"/><path d="M112 108v82M103 126l9 10 10-10"/></g>
    <g class="char-arm char-arm--left" style="transform-origin:82px 120px"><path class="story-paper" d="M82 120q-22 18-31 48q-3 10 7 13 9 2 13-8l24-39"/><circle class="story-paper" cx="58" cy="178" r="8"/></g>
    <g class="char-arm char-arm--right" style="transform-origin:143px 120px"><path class="story-paper" d="M143 120q18 19 26 48q3 10-6 13-9 2-13-9l-20-39"/><circle class="story-paper" cx="164" cy="178" r="8"/></g>
    <g class="char-leg char-leg--left" style="transform-origin:89px 186px"><path class="story-trouser" d="M76 186q-3 31 28 47l28 5-5 20-34-5q-40-13-37-54"/><path class="story-shoe" d="M124 236l28 5q9 9 2 19l-34-6Z"/></g>
    <g class="char-leg char-leg--right" style="transform-origin:137px 186px"><path class="story-trouser" d="M126 186q2 28 31 39l28 2v21h-33q-39-8-44-46"/><path class="story-shoe" d="M180 224h27q10 8 5 19h-32Z"/></g>
  ${svgClose}`;
}

export function manKneeling(className = "") {
  return `${svgOpen(className, "0 0 260 270")}
    ${manHead({ x: 104, y: 62 })}
    <g class="char-body"><path class="story-navy" d="M72 105q31-14 62 1l16 83H62Z"/><path class="story-paper" d="M93 105l11 23 12-23M98 125l7 9 7-9"/></g>
    <g class="char-arm char-arm--left" style="transform-origin:75px 116px"><path class="story-navy" d="M75 116q-25 28-19 60q2 11 12 9 9-2 9-13l11-44"/><circle class="story-paper" cx="66" cy="180" r="8"/></g>
    <g class="char-arm char-arm--right" style="transform-origin:133px 116px"><path class="story-navy" d="M133 116q27 21 42 47q6 10-2 15-8 5-15-5l-32-34"/><circle class="story-paper" cx="173" cy="175" r="8"/></g>
    <g class="ring-box"><path class="story-terracotta" d="M173 158l24 4-2 19-24-4Z"/><path d="M174 158l14-10 10 14M183 160l5-6 5 8"/></g>
    <g class="char-leg char-leg--left"><path class="story-trouser" d="M72 185l18 24 58 2v25H79q-27-10-31-33Z"/><path class="story-shoe" d="M143 208h34q12 8 6 22h-40Z"/></g>
    <g class="char-leg char-leg--right"><path class="story-trouser" d="M118 183q17 13 31 34l-20 17-39-33Z"/><path class="story-shoe" d="M121 226l24 21q2 12-10 17l-30-27Z"/></g>
  ${svgClose}`;
}

export function coupleHug(className = "", wedding = false) {
  return `
  <svg class="story-character story-character--couple ${className}" viewBox="0 0 390 345" aria-hidden="true" focusable="false">
    <g class="character-root" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(47 0)">${womanHead({ x: 110, y: 68 })}</g>
      <g transform="translate(177 0)">${manHead({ x: 110, y: 68 })}</g>
      <g class="char-body"><path class="${wedding ? "story-paper" : "story-terracotta"}" d="M124 112q33-16 65 0l13 108H108Z"/>${wedding ? '<path class="story-paper" d="M109 207h93l32 102H78Z"/>' : '<path class="story-sand-fill" d="M108 208h94l24 82H84Z"/>'}<path class="${wedding ? "story-navy" : "story-sage"}" d="M253 112q31-15 62 0l12 108H241Z"/>${wedding ? '<path class="story-paper" d="M275 111l10 21 12-21M280 129l6 8 7-8"/>' : ''}</g>
      <path class="story-paper char-arm" d="M177 123q58 10 94 58q7 9-2 15-9 5-16-5l-53-43"/>
      <path class="story-paper char-arm" d="M255 124q-48 12-70 59q-5 11 5 15 9 3 14-8l34-42"/>
      <path class="story-paper char-arm" d="M121 126q-20 34-7 71q4 10 14 6 9-4 5-15l-2-39"/>
      <path class="story-paper char-arm" d="M314 126q23 30 17 67q-2 11-12 9-10-2-8-13l-7-42"/>
      <g class="char-leg"><path class="story-paper" d="M125 282l2 39h27l4-39M172 282l3 39h27l3-39"/><path class="story-trouser" d="M252 214l4 88h27l3-88M286 214l6 88h27l2-88"/></g>
      <g class="char-feet"><path class="story-shoe" d="M127 316q-8 10-3 19h34q3-11-7-19ZM175 316q-8 10-3 19h35q3-11-8-19ZM256 298q-8 10-3 19h35q3-11-8-19ZM292 298q-8 10-3 19h36q3-11-9-19Z"/></g>
    </g>
  </svg>`;
}

export function coupleLift(className = "") {
  return `
  <svg class="story-character story-character--couple story-character--lift ${className}" viewBox="0 0 430 350" aria-hidden="true" focusable="false">
    <g class="character-root" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(40 -36) rotate(-7 110 68)">${womanHead({ x: 110, y: 68 })}</g>
      <g transform="translate(206 3)">${manHead({ x: 110, y: 68 })}</g>
      <path class="story-paper" d="M117 78q33-15 64 2l38 93-91 24-34-78Z"/>
      <path class="story-paper" d="M126 179l94-26 40 72-144 38Z"/>
      <path class="story-navy" d="M284 113q31-15 63 0l8 111H276Z"/>
      <path class="story-paper" d="M306 111l10 22 12-22M311 130l6 8 7-8"/>
      <path class="story-paper" d="M286 127q-35 35-78 54q-11 5-6 15 5 9 16 4l78-38"/>
      <path class="story-paper" d="M346 128q5 42-23 73q-8 9 0 16 8 7 16-2 38-38 29-88"/>
      <path class="story-paper" d="M118 91q-28 5-50-9q-10-7-15 2-5 9 5 15 36 22 72 8"/>
      <path class="story-paper" d="M177 93q30 5 46 30q7 10 16 3 8-7 1-16-24-33-55-34"/>
      <path class="story-paper" d="M124 246q-28 4-54 17l10 20q32-10 55-11M220 212q19 19 37 42l-18 15q-25-22-42-40"/>
      <path class="story-shoe" d="M67 260l-24 15q-4 12 8 17l34-19ZM238 251l20 24q0 12-13 15l-27-31Z"/>
      <path class="story-trouser" d="M285 218l4 89h28l3-89M322 218l6 89h28l1-89"/>
      <path class="story-shoe" d="M289 303q-8 10-3 20h35q3-12-8-20ZM328 303q-8 10-3 20h36q3-12-9-20Z"/>
    </g>
  </svg>`;
}
