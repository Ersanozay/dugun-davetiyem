/* ======================================================
   CONFIG — davetiyenin tüm metinleri buradan yönetilir.
   Yer tutucuları ([Mekan Adı] gibi) kendi bilgilerinle değiştir.
   ====================================================== */
const CONFIG = {
  partner1: "Sabriye",
  partner2: "Ersan",
  dateShort: "2 Ekim - 10 Ekim 2026",
  heroLabel: "BU MUTLU GÜNÜMÜZDE SİZLERİ DE ARAMIZDA GÖRMEKTEN MUTLULUK DUYARIZ",
  countdownNote: "Bugünü en sevgili ailemiz ve arkadaşlarımızla paylaşmaktan dolayı son derece heyecanlıyız.",
  // Kayan fotoğraf şeridi için buraya dosya yollarını sırayla ekle,
  // örn: "assets/images/foto1.jpg". Boş bırakırsan yer tutucu kutular görünür.
  photos: [],
  countdownTarget: "2026-10-10T19:30:00+03:00", // Türkiye saati — geri sayım ve hero tarih bloğu
  note: "Bugüne kadar bize eşlik ettiğiniz için teşekkür ederiz. En mutlu günümüzü sizlerle paylaşmak istiyoruz.",
  ceremony: {
    label: "Kına Gecesi",
    venue: "Kına Salonu",
    time: "2 Ekim 2026 • 19:30",
    address: "Konumu haritada görüntüleyebilirsiniz.",
    mapUrl: "https://maps.app.goo.gl/uiNuarfZ31q84wLa8"
  },
  wedding: {
    label: "Düğün Daveti",
    venue: "Düğün Salonu",
    time: "10 Ekim 2026 • 19:30",
    address: "Konumu haritada görüntüleyebilirsiniz.",
    mapUrl: "https://maps.app.goo.gl/6FZuy3j3o39NYSi79"
  },
  timeline: [
    { day: "2 Ekim 2026", items: [
      { time:"19:30", title:"Kına Gecesi", desc:"Kına Salonu" }
    ]},
    { day: "10 Ekim 2026", items: [
      { time:"19:30", title:"Düğün Daveti", desc:"Düğün Salonu" }
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

/* ---- hero: isim satırı ---- */
document.getElementById('heroScript').textContent = `${CONFIG.partner1} & ${CONFIG.partner2}`;

/* ---- hero: büyük tarih bloğu (ay/gün/yıl/gün adı), countdownTarget'tan hesaplanır ---- */
(function fillHeroDate(){
  const d = new Date(CONFIG.countdownTarget);
  if(isNaN(d)) return;
  const dateOptions = { timeZone:'Europe/Istanbul' };
  const month = d.toLocaleDateString('tr-TR', { ...dateOptions, month:'long' }).toUpperCase();
  const weekday = d.toLocaleDateString('tr-TR', { ...dateOptions, weekday:'long' }).toUpperCase();
  document.getElementById('heroMonth').textContent = month;
  document.getElementById('heroDay').textContent = d.toLocaleDateString('tr-TR', { ...dateOptions, day:'numeric' });
  document.getElementById('heroYear').textContent = d.toLocaleDateString('tr-TR', { ...dateOptions, year:'numeric' });
  document.getElementById('heroWeekday').textContent = weekday;
})();

/* ---- kayan fotoğraf şeridi ---- */
(function buildMarquee(){
  const track = document.getElementById('marqueeTrack');
  const PLACEHOLDER_COUNT = 6;
  const list = CONFIG.photos.length ? CONFIG.photos : Array(PLACEHOLDER_COUNT).fill(null);

  const itemsHTML = list.map((src, i) => {
    if (src) return `<div class="marquee__item"><img src="${src}" alt="" loading="lazy"></div>`;
    return `<div class="marquee__item marquee__item--placeholder"><span>Fotoğraf ${i + 1}</span></div>`;
  }).join('');

  // Kesintisiz döngü için içerik iki kez tekrarlanır (%50 kayınca baştan başlar)
  track.innerHTML = itemsHTML + itemsHTML;
})();

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
   HERO — "Açmak için dokunun" kapısı:
   1) Sayfa açıldığında hiçbir video oynamaz, sadece kapak
      görseli (zarf karesi) ve dokunma isteği görünür.
   2) Dokununca introClip (0-6sn, zarf + geçiş) bir kez oynar
      ve şarkı (bgMusic) başlar. Videolar hep sessizdir,
      sitedeki tüm ses bu şarkıdan gelir.
   3) introClip bitince loopClip (yürüyüş sahnesi) devreye
      girer ve sonsuz döngüde kalır; tam bu anda hero
      metinleri de belirir.
   ====================================================== */
const gateBtn = document.getElementById('gateBtn');
const introClip = document.getElementById('introClip');
const loopClip = document.getElementById('loopClip');
const bgMusic = document.getElementById('bgMusic');
const soundBtn = document.getElementById('soundBtn');
const heroContent = document.getElementById('heroContent');

gateBtn.addEventListener('click', ()=>{
  gateBtn.classList.add('is-hidden');

  introClip.play(); // video her zaman sessiz, sadece görsel

  bgMusic.currentTime = 0;
  bgMusic.muted = false;
  const playPromise = bgMusic.play();
  if(playPromise !== undefined){
    playPromise.catch(()=>{}); // tarayıcı engellerse buton ile elle açılabilir
  }

  soundBtn.hidden = false;
  soundBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
  soundBtn.setAttribute('aria-pressed', String(!bgMusic.muted));
});

introClip.addEventListener('ended', ()=>{
  loopClip.currentTime = 0;
  loopClip.play();

  introClip.classList.add('is-hidden');
  loopClip.classList.add('is-visible');
  heroContent.classList.add('is-in'); // metinler yürüyüşle birlikte belirir
});

soundBtn.addEventListener('click', ()=>{
  bgMusic.muted = !bgMusic.muted;
  soundBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
  soundBtn.setAttribute('aria-pressed', String(!bgMusic.muted));
});
