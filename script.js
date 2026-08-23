/* ======================================================
   CONFIG — davetiyenin tüm metinleri buradan yönetilir.
   Yer tutucuları ([Mekan Adı] gibi) kendi bilgilerinle değiştir.
   ====================================================== */
const CONFIG = {
  partner1: "AD SOYAD",
  partner2: "AD SOYAD",
  dateShort: "28 Haziran & 5 Temmuz 2026",
  countdownTarget: "2026-07-05T20:00:00", // ISO tarih — düğün saatine göre ayarla
  note: "Bugüne kadar bize eşlik ettiğiniz için teşekkür ederiz. En mutlu günümüzü sizlerle paylaşmak istiyoruz.",
  ceremony: {
    label: "Nikah Töreni",
    venue: "[Mekan Adı]",
    time: "14:00",
    address: "[Açık adres buraya]",
    mapUrl: "#"
  },
  wedding: {
    label: "Düğün Daveti",
    venue: "[Mekan Adı]",
    time: "20:00",
    address: "[Açık adres buraya]",
    mapUrl: "#"
  },
  timeline: [
    { day: "Nikah Günü", items: [
      { time:"13:00", title:"Gelin Alma", desc:"[Adres]" },
      { time:"14:00", title:"Nikah Töreni", desc:"[Mekan adı]" }
    ]},
    { day: "Düğün Günü", items: [
      { time:"19:30", title:"Gelin Alma", desc:"[Adres]" },
      { time:"20:00", title:"Düğün Daveti", desc:"[Mekan adı]" },
      { time:"22:00", title:"Parti", desc:"Dans pistine!" }
    ]}
  ]
};

/* ---- metinleri CONFIG'den doldur ---- */
function getPath(obj, path){ return path.split('.').reduce((o,k)=>o?.[k], obj); }
document.querySelectorAll('[data-cfg]').forEach(el=>{
  const val = getPath(CONFIG, el.getAttribute('data-cfg'));
  if(val !== undefined) el.textContent = val;
});
document.querySelectorAll('[data-cfg-href]').forEach(el=>{
  const val = getPath(CONFIG, el.getAttribute('data-cfg-href'));
  if(val) el.setAttribute('href', val);
});

/* ---- monogram baş harfleri ---- */
const initials = (CONFIG.partner1?.trim()[0]||'A') + '&' + (CONFIG.partner2?.trim()[0]||'B');
document.querySelectorAll('#introMonogram,#heroMonogram,#footMonogram').forEach(el=>{
  el.textContent = initials.toUpperCase();
});

/* ---- timeline oluştur ---- */
const timelineWrap = document.getElementById('timelineWrap');
CONFIG.timeline.forEach(day=>{
  const dayEl = document.createElement('div');
  dayEl.className = 'timeline__day';
  const h3 = document.createElement('h3');
  h3.textContent = day.day;
  dayEl.appendChild(h3);
  const list = document.createElement('div');
  list.className = 'timeline__list';
  day.items.forEach(item=>{
    const it = document.createElement('div');
    it.className = 'timeline__item';
    it.innerHTML = `<div class="timeline__time">${item.time}</div><h4>${item.title}</h4><p>${item.desc}</p>`;
    list.appendChild(it);
  });
  dayEl.appendChild(list);
  timelineWrap.appendChild(dayEl);
});

/* ---- geri sayım ---- */
const target = new Date(CONFIG.countdownTarget).getTime();
function tickCountdown(){
  const diff = target - Date.now();
  const d = Math.max(0, Math.floor(diff/86400000));
  const h = Math.max(0, Math.floor((diff/3600000)%24));
  const m = Math.max(0, Math.floor((diff/60000)%60));
  const s = Math.max(0, Math.floor((diff/1000)%60));
  document.getElementById('cd-d').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
}
tickCountdown();
setInterval(tickCountdown, 1000);

/* ---- scroll reveal ---- */
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold:.15 });
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));
}

/* ======================================================
   INTRO — video ana sayfanın kendisine "eriyerek" geçer:
   video biterken (son ~0.8sn) çapraz geçiş (crossfade)
   başlar, video görünmez olunca da doğrudan hero (ana
   sayfa) görünür durumda kalır. Ayrı bir sayfaya geçiş
   veya sert kesme yoktur.
   ====================================================== */
const root = document.documentElement;
const introEl = document.getElementById('intro');
const introVideo = document.getElementById('introVideo');
const introNames = document.getElementById('introNames');
const soundBtn = document.getElementById('soundBtn');
const skipBtn = document.getElementById('skipBtn');
const tapBtn = document.getElementById('tapBtn');

root.classList.add('lock');

let finished = false;
function finishIntro(){
  if(finished) return;
  finished = true;
  introEl.classList.add('is-fading');
  root.classList.remove('lock');
}

introVideo.addEventListener('timeupdate', ()=>{
  if(!introVideo.duration) return;
  if(introVideo.duration - introVideo.currentTime <= 3){
    introNames.classList.add('show');
  }
  if(introVideo.duration - introVideo.currentTime <= 0.8){
    finishIntro();
  }
});
introVideo.addEventListener('ended', finishIntro);
skipBtn.addEventListener('click', finishIntro);

soundBtn.addEventListener('click', ()=>{
  introVideo.muted = !introVideo.muted;
  soundBtn.setAttribute('aria-pressed', String(!introVideo.muted));
  soundBtn.textContent = introVideo.muted ? '🔇' : '🔊';
});

tapBtn.addEventListener('click', ()=>{
  introVideo.play();
  introEl.classList.remove('needs-tap');
});

const playPromise = introVideo.play();
if(playPromise !== undefined){
  playPromise.catch(()=>{ introEl.classList.add('needs-tap'); });
}

/* video hiç yüklenemezse akışı kilitlemesin */
introVideo.addEventListener('error', finishIntro);