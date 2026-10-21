const HIS_EMAIL = "d.wieser1991@gmail.com";
const MAX = 3;
const PRIZES = [
  ["💆", "A 20-minute massage with warm oil"], ["🥞", "Breakfast in bed"], ["🛋️", "A night where you do absolutely nothing – I cook, clean & serve"], ["🛁", "Spa night: face masks, bubble bath & candles"],
  ["🧺", "Picnic in the living room or the park"], ["👩‍🍳", "Cooking together: you pick the recipe, I’m your kitchen helper"], ["🍹", "Cocktail night with homemade drinks"], ["🍰", "Dessert date: three desserts, you give the points"], ["🍦", "Ice cream date – even if it’s freezing"],
  ["🎬", "You pick the movie, and I won’t complain"], ["📍", "You choose the place of our next date"], ["🧞", "One wish, granted within 24 hours (non-negotiable)"], ["🎵", "You’re the DJ for the whole evening"],
  ["💌", "A handwritten love letter"], ["🌅", "Sunset walk, hand-holding mandatory"], ["📸", "Couple photoshoot, with a little album"], ["💃", "Dancing in the living room to our song"], ["⭐", "Stargazing with a blanket & hot tea"],
  ["🃏", "Joker card: use it once, anytime you like"], ["🎮", "Challenge night: the winner makes a wish"], ["🎭", "Truth or dare – date edition"],
  ["🔥", "A cozy night just for the two of us: candles, music & no plans for the rest of the evening 😉"], ["😏", "Netflix & chill… with emphasis on the second word"]
];
const KISS = ["💋", "A kiss, redeemable anytime (the sweetest consolation prize!)"];
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a }
const deck = shuffle([...shuffle(PRIZES.slice()).slice(0, 5), KISS]);
const started = new Set(), won = [];
const board = document.getElementById("board");

deck.forEach((p, i) => {
  const d = document.createElement("div"); d.className = "sc";
  d.innerHTML = `<div class="prize"><b>${p[0]}</b>${p[1]}</div><canvas></canvas>`;
  board.appendChild(d);
  const c = d.querySelector("canvas"), w = d.clientWidth, h = d.clientHeight;
  c.width = w; c.height = h;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, "#bfbfca"); g.addColorStop(.5, "#f4f4fa"); g.addColorStop(1, "#a9a9b6");
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.font = "bold 15px Georgia"; x.fillStyle = "#8a8a99"; x.textAlign = "center"; x.fillText("scratch me 💕", w / 2, h / 2 + 5);
  let down = false, last = null, done = false;
  const pos = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * w / r.width, (e.clientY - r.top) * h / r.height] };
  c.onpointerdown = e => {
    if (done) return;
    if (!started.has(i)) { if (started.size >= MAX) return; started.add(i); update() }
    down = true; last = pos(e); c.setPointerCapture(e.pointerId); dot(last)
  };
  const dot = p => { x.globalCompositeOperation = "destination-out"; x.lineWidth = 36; x.lineCap = "round"; x.beginPath(); x.moveTo(last[0], last[1]); x.lineTo(p[0], p[1]); x.stroke(); last = p };
  c.onpointermove = e => { if (down && !done) dot(pos(e)) };
  const end = () => { if (!down) return; down = false; check() };
  c.onpointerup = end; c.onpointercancel = end;
  function check() {
    const dta = x.getImageData(0, 0, w, h).data; let n = 0, t = 0;
    for (let k = 3; k < dta.length; k += 64) { t++; if (dta[k] === 0) n++ }
    if (n / t > .45 && !done) { done = true; c.classList.add("gone"); d.classList.add("won"); won.push(p); burst(d); finish() }
  }
});

function update() {
  const l = MAX - started.size;
  document.getElementById("left").textContent = l > 0 ? `${l} scratch${l > 1 ? "es" : ""} left` : "All scratches used – finish your cards 💕";
  if (l === 0) document.querySelectorAll(".sc").forEach((el, i) => { if (!started.has(i)) el.classList.add("locked") });
}
function finish() {
  if (won.length < MAX) return;
  const text = "Love Scratch Cards 💕\n\nI won:\n" + won.map((p, i) => `${i + 1}. ${p[0]} ${p[1]}`).join("\n") + "\n\nI can’t wait to cash them in! ❤️";
  document.getElementById("sum").innerHTML = won.map(p => `${p[0]} ${p[1]}`).join("<br>");
  const su = encodeURIComponent("💕 My scratch card prizes!"), b = encodeURIComponent(text);
  document.getElementById("links").innerHTML =
    `<a class="btn" target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&to=${HIS_EMAIL}&su=${su}&body=${b}">📧 Gmail</a>` +
    `<a class="btn" target="_blank" rel="noopener" href="https://wa.me/?text=${b}">💬 WhatsApp</a>`;
  document.getElementById("cp").onclick = async () => { try { await navigator.clipboard.writeText(text); document.getElementById("cp").textContent = "✅ Copied!" } catch (e) { prompt("Copy this:", text) } };
  const r = document.getElementById("res"); r.style.display = "block";
  setTimeout(() => r.scrollIntoView({ behavior: "smooth", block: "center" }), 500);
}
function burst(el) {
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span"); s.textContent = ["💖", "💕", "✨", "💘"][i % 4];
    Object.assign(s.style, { position: "fixed", left: (r.left + r.width / 2) + "px", top: (r.top + r.height / 2) + "px", fontSize: (14 + Math.random() * 18) + "px", pointerEvents: "none", zIndex: 5, transition: "all 1.2s cubic-bezier(.2,.8,.3,1)", opacity: 1 });
    document.body.appendChild(s);
    requestAnimationFrame(() => { s.style.transform = `translate(${(Math.random() - .5) * 300}px,${-Math.random() * 260}px) rotate(${Math.random() * 360}deg)`; s.style.opacity = 0 });
    setTimeout(() => s.remove(), 1300)
  }
}
const hs = document.getElementById("hearts");
for (let i = 0; i < 16; i++) {
  const s = document.createElement("span"); s.textContent = ["💖", "💕", "💗", "🌸", "💘"][i % 5];
  s.style.left = Math.random() * 100 + "%"; s.style.fontSize = (14 + Math.random() * 26) + "px";
  s.style.animationDuration = (9 + Math.random() * 10) + "s"; s.style.animationDelay = (-Math.random() * 15) + "s"; hs.appendChild(s)
}
