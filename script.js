// ✅ Customize these quickly
alert("JS is running 💘");

const CONFIG = {
  yourName: "Swastik",            // <- change
  girlfriendName: "Aastha",     // <- change (optional)
  badgeText: "💌 For you, my cutu",
};

const nameEl = document.getElementById("name");
const titleEl = document.getElementById("title");
const badgeEl = document.getElementById("badge");

nameEl.textContent = CONFIG.yourName;
badgeEl.textContent = CONFIG.badgeText;

// Optional: personalize title slightly
if (CONFIG.girlfriendName && CONFIG.girlfriendName !== "My Love") {
  titleEl.textContent = `${CONFIG.girlfriendName}… will you be my Valentine?`;
}

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");

let noMoves = 0;

// Make the "No" button run away playfully
function moveNoButton() {
  const pad = 18;
  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const minX = rect.left + pad;
  const maxX = rect.right - btnRect.width - pad;
  const minY = rect.top + pad;
  const maxY = rect.bottom - btnRect.height - pad;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noMoves += 1;

  // After a few tries, it becomes extra cute
  if (noMoves === 3) noBtn.textContent = "No 😳";
  if (noMoves === 5) noBtn.textContent = "No pls 🥺";
  if (noMoves === 7) noBtn.textContent = "Okay fine… No 😭";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  result.hidden = false;
  yesBtn.disabled = true;
  noBtn.disabled = true;

  // Put No button back nicely
  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";
  noBtn.textContent = "No 🙈";

  fireConfetti();
});

// --- Simple confetti (no libraries) ---
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let pieces = [];
let running = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function makePieces(count = 180) {
  const colors = ["#ff4d6d", "#ff758f", "#ffd6e0", "#ffffff", "#ffb3c1"];
  pieces = Array.from({ length: count }).map(() => ({
    x: rand(0, canvas.width),
    y: rand(-canvas.height, 0),
    w: rand(6, 12),
    h: rand(8, 16),
    vx: rand(-2.5, 2.5),
    vy: rand(2.5, 6.5),
    rot: rand(0, Math.PI),
    vr: rand(-0.15, 0.15),
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: rand(0.75, 1),
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of pieces) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();

    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.vy += 0.02; // gravity
    p.alpha -= 0.002;
  }

  pieces = pieces.filter(p => p.y < canvas.height + 40 && p.alpha > 0);

  if (pieces.length > 0) {
    requestAnimationFrame(draw);
  } else {
    running = false;
  }
}

function fireConfetti() {
  if (running) return;
  running = true;
  makePieces(220);
  draw();
}

