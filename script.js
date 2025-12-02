document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Fungsi toggle menu
    function toggleMenu() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    // Klik hamburger
    hamburger.addEventListener('click', toggleMenu);

    // Tutup menu saat klik link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
        if(!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// =========================================================
// SCROLL EFFECT (opsional)
// =========================================================
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if(window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =======================
   QUIZ DATA
========================= */
const quizData = [
  { question: "Apa tujuan utama dari EcoLearn?", options: ["Mengajarkan coding", "Mengajarkan lingkungan", "Mengajarkan matematika", "Mengajarkan kesehatan"], answer: 1 },
  { question: "Apa warna utama EcoLearn?", options: ["#ff0000", "#2ecc71", "#0000ff", "#f1c40f"], answer: 1 },
  { question: "Apa manfaat mendaur ulang?", options: ["Membuat sampah lebih bau", "Mengurangi sampah", "Membuat bumi panas", "Tidak ada manfaat"], answer: 1 },
  { question: "Energi apa yang ramah lingkungan?", options: ["Energi surya", "Bensin", "Batubara", "Plastik"], answer: 0 },
  { question: "Apa nama gas yang menyebabkan pemanasan global?", options: ["Oksigen", "CO2", "Nitrogen", "Helium"], answer: 1 },
  { question: "Apa langkah kecil menjaga bumi?", options: ["Buang sampah sembarangan", "Hemat listrik", "Bakar sampah plastik", "Boros air"], answer: 1 },
  { question: "Tanaman menghasilkan apa?", options: ["Api", "Karbon", "Oksigen", "Minyak"], answer: 2 },
  { question: "Limbah plastik butuh berapa lama terurai?", options: ["1 hari", "1 bulan", "5 tahun", "100-500 tahun"], answer: 3 },
  { question: "Apa contoh energi terbarukan?", options: ["Angin", "Bensin", "Asap pabrik", "Gas LPG"], answer: 0 },
  { question: "Siapa yang bertanggung jawab menjaga bumi?", options: ["Pemerintah saja", "Orang kaya", "Semua orang", "Tidak ada yang perlu"], answer: 2 }
];

/* =======================
   ELEMENTS
========================= */
const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const nextBtn = document.getElementById("next-btn");

const quizCard = document.getElementById("quiz-card");
const quizResult = document.getElementById("quiz-result");
const leaderboardBox = document.getElementById("leaderboard-box");

const finalScoreEl = document.getElementById("final-score");
const playerRankEl = document.getElementById("player-rank");
const leaderboardList = document.getElementById("leaderboard-list");

const progressNumber = document.getElementById("quiz-progress-number");
const progressFill = document.getElementById("progress-fill");
const restartBtn = document.getElementById("restart-btn");

/* =======================
   VARIABLES
========================= */
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;

/* =======================
   LOAD QUESTION
========================= */
function loadQuestion() {
  const q = quizData[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  selectedAnswer = null;
  nextBtn.disabled = true;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(idx, btn);
    optionsEl.appendChild(btn);
  });

  updateProgress();
}

/* =======================
   SELECT ANSWER
========================= */
function selectAnswer(choice, btn) {
  selectedAnswer = choice;
  nextBtn.disabled = false;

  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

/* =======================
   NEXT QUESTION
========================= */
nextBtn.addEventListener("click", () => {
  if (selectedAnswer === quizData[currentIndex].answer) score += 10;

  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
});

/* =======================
   UPDATE PROGRESS
========================= */
function updateProgress() {
  const num = `${currentIndex + 1}/${quizData.length}`;
  progressNumber.textContent = num;
  const percent = ((currentIndex) / quizData.length) * 100;
  progressFill.style.width = percent + "%";
}

/* =======================
   FINISH QUIZ
========================= */
function finishQuiz() {
  quizCard.style.display = "none";
  quizResult.style.display = "block";
  leaderboardBox.style.display = "block";
  finalScoreEl.textContent = score;
  saveLeaderboard(score);
  loadLeaderboard();
}

/* =======================
   LEADERBOARD
========================= */
function saveLeaderboard(score) {
  let data = JSON.parse(localStorage.getItem("ecolearnLeaderboard")) || [];
  data.push(score);
  data.sort((a, b) => b - a);
  localStorage.setItem("ecolearnLeaderboard", JSON.stringify(data));
}

function loadLeaderboard() {
  const data = JSON.parse(localStorage.getItem("ecolearnLeaderboard")) || [];
  leaderboardList.innerHTML = "";

  data.slice(0, 10).forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `#${i + 1} — ${s} poin`;
    leaderboardList.appendChild(li);
  });

  const rank = data.indexOf(score) + 1;
  playerRankEl.textContent = `#${rank}`;
}

/* =======================
   RESTART QUIZ
========================= */
restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  quizResult.style.display = "none";
  leaderboardBox.style.display = "none";
  quizCard.style.display = "block";
  progressFill.style.width = "0%";
  loadQuestion();
});

/* =======================
   INITIAL LOAD
========================= */
loadQuestion();



// ========== ECOINTRO ANIMATIONS JS ==========

// Fade-in intro saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.querySelector(".ecointro-content");
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.transition = "1.2s ease";
        intro.style.opacity = "1";
    }, 200);
});

// Parallax halus untuk background
window.addEventListener("scroll", () => {
    const bg = document.querySelector(".ecointro-bg");
    let offset = window.pageYOffset * 0.2; 
    bg.style.transform = `translateY(${offset}px)`;
});

// Ripple effect untuk button
const introBtn = document.querySelector(".ecointro-btn");

introBtn.addEventListener("click", function (e) {
    let ripple = document.createElement("span");
    ripple.classList.add("eco-ripple");

    let x = e.clientX - this.offsetLeft;
    let y = e.clientY - this.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});


document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("learnload-screen");

    // biar benar-benar hilang dari layar (bukan cuma opacity 0)
    setTimeout(() => {
        loader.style.display = "none";
    }, 2600); // waktu harus sedikit lebih besar dari animation-delay + fadeout
});



const faqItems = document.querySelectorAll(".ultrafaq-item");

faqItems.forEach(item => {
  const btn = item.querySelector(".ultrafaq-question");
  const answer = item.querySelector(".ultrafaq-answer");

  btn.addEventListener("click", () => {

    // Tutup item lain (opsional)
    faqItems.forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".ultrafaq-answer").style.maxHeight = null;
      }
    });

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

/* ===================================================
   ECOLEARN QUIZ FINAL – ULTRA HIGH END VERSION
   (Guaranteed Working)
=================================================== */

let uqzLevel = null;
let uqzQuestions = [];
let uqzIndex = 0;
let uqzScore = 0;
let uqzTimer = 0;
let uqzTimerInterval = null;

/* ===================================================
   SELECT LEVEL
=================================================== */
function uqzChooseLevel(level) {
    uqzLevel = level;

    const btn = document.getElementById("uqzStartBtn");
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
    btn.innerHTML = `<i class="fa-solid fa-play"></i> Mulai Level: ${level.toUpperCase()}`;
}

/* ===================================================
   QUESTIONS BANK
=================================================== */
const uqzBank = {
    easy: [
        { q: "Apa warna tempat sampah organik?", o: ["Merah", "Hijau", "Biru"], a: 1 },
        { q: "Sampah plastik termasuk kategori?", o: ["Organik", "Anorganik", "B3"], a: 1 },
        { q: "3R singkatan dari?", o: ["Recycle", "Replace", "Repair"], a: 0 },
        { q: "Kulit pisang termasuk sampah…", o: ["Organik", "Anorganik", "Residu"], a: 0 },
        { q: "Botol kaca termasuk…", o: ["Organik", "Kaca", "Limbah B3"], a: 1 }
    ],
    medium: [
        { q: "Kompos adalah…", o: ["Pupuk organik", "Pestisida", "Gas metana"], a: 0 },
        { q: "Reduce artinya…", o: ["Mengurangi", "Memperbanyak", "Membakar"], a: 0 },
        { q: "Sampah B3 adalah…", o: ["Berbahaya", "Organik", "Kertas"], a: 0 },
        { q: "Daun kering bisa jadi…", o: ["Kompos", "Plastik", "Kaca"], a: 0 },
        { q: "Pembakaran plastik menghasilkan…", o: ["Dioxin", "Oksigen", "Cairan"], a: 0 }
    ],
    hard: [
        { q: "Gas rumah kaca paling besar?", o: ["CO₂", "O₂", "N₂"], a: 0 },
        { q: "Microplastic berukuran…", o: ["<5mm", ">5cm", ">10cm"], a: 0 },
        { q: "Limbah medis termasuk…", o: ["B3", "Organik", "Kaca"], a: 0 },
        { q: "Zero Waste artinya…", o: ["Tanpa sampah", "Tanpa listrik", "Tanpa makanan"], a: 0 },
        { q: "IPAL digunakan untuk…", o: ["Air limbah", "Udara", "Listrik"], a: 0 }
    ]
};

/* ===================================================
   START QUIZ
=================================================== */
function uqzStartQuiz() {
    if (!uqzLevel) {
        alert("Pilih level dulu!");
        return;
    }

    uqzQuestions = uqzBank[uqzLevel];
    uqzIndex = 0;
    uqzScore = 0;

    document.querySelector(".uqz-wrapper").classList.add("uqz-hidden");
    document.getElementById("uqzQuizBox").classList.remove("uqz-hidden");

    uqzStartTimer();
    uqzLoadQuestion();
}

/* ===================================================
   TIMER
=================================================== */
function uqzStartTimer() {
    clearInterval(uqzTimerInterval);

    uqzTimer =
        uqzLevel === "easy"
            ? 30
            : uqzLevel === "medium"
            ? 25
            : 20;

    document.getElementById("uqzTimer").innerText = uqzTimer;

    uqzTimerInterval = setInterval(() => {
        uqzTimer--;
        document.getElementById("uqzTimer").innerText = uqzTimer;

        if (uqzTimer <= 0) {
            clearInterval(uqzTimerInterval);
            uqzFinish();
        }
    }, 1000);
}

/* ===================================================
   LOAD QUESTION
=================================================== */
function uqzLoadQuestion() {
    let q = uqzQuestions[uqzIndex];
    document.getElementById("uqzQuestionText").innerText = q.q;

    const box = document.getElementById("uqzOptionsBox");
    box.innerHTML = "";

    q.o.forEach((txt, idx) => {
        let btn = document.createElement("button");
        btn.className = "uqz-option";
        btn.innerText = txt;

        btn.onclick = () => uqzSelect(idx);

        box.appendChild(btn);
    });

    document.getElementById("uqzNextBtn").disabled = true;

    uqzSetProgress();
}

/* ===================================================
   SELECT ANSWER
=================================================== */
function uqzSelect(choice) {
    let correct = uqzQuestions[uqzIndex].a;
    let opts = document.querySelectorAll(".uqz-option");

    opts.forEach(o => (o.disabled = true));

    if (choice === correct) {
        opts[choice].classList.add("uqz-correct");
        uqzScore += uqzLevel === "easy" ? 2 : uqzLevel === "medium" ? 3 : 5;
    } else {
        opts[choice].classList.add("uqz-wrong");
        opts[correct].classList.add("uqz-correct");
    }

    document.getElementById("uqzNextBtn").disabled = false;
    document.getElementById("uqzNextBtn").onclick = uqzNext;
}

/* ===================================================
   NEXT
=================================================== */
function uqzNext() {
    uqzIndex++;
    if (uqzIndex >= uqzQuestions.length) {
        uqzFinish();
    } else {
        uqzLoadQuestion();
    }
}

/* ===================================================
   PROGRESS BAR
=================================================== */
function uqzSetProgress() {
    let fill = document.getElementById("uqzProgressFill");
    let percentage = (uqzIndex / uqzQuestions.length) * 100;

    fill.style.width = percentage + "%";
}

/* ===================================================
   FINISH
=================================================== */
function uqzFinish() {
    clearInterval(uqzTimerInterval);

    document.getElementById("uqzQuizBox").classList.add("uqz-hidden");
    document.getElementById("uqzResultBox").classList.remove("uqz-hidden");

    document.getElementById("uqzScoreText").innerText = `Skor Kamu: ${uqzScore}`;

    let msg =
        uqzScore < 10
            ? "Jangan menyerah! Kamu pasti bisa 😄"
            : uqzScore < 20
            ? "Luar biasa! Kamu mulai jago 🌿"
            : "MASTER LINGKUNGAN! 🔥🌱";

    document.getElementById("uqzScoreMessage").innerText = msg;
}

/* ===================================================
   RESTART
=================================================== */
function uqzRestartQuiz() {
    document.getElementById("uqzResultBox").classList.add("uqz-hidden");
    document.querySelector(".uqz-wrapper").classList.remove("uqz-hidden");

    uqzLevel = null;
}
