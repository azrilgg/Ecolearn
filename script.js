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

// =========================================================
// ECOLEARN — QUIZ LEVEL SYSTEM (NAMESPACED, NO CONFLICT)
// =========================================================

/* =========================================================
   ECOLEARN – QUIZ ENGINE (100% STANDALONE, NO CONFLICT)
========================================================= */

/* -------------------------
   QUIZ DATABASE (3 LEVEL)
-------------------------- */

const ecoQuiz = {
    easy: {
        time: 30,
        questions: [
            { q: "Apa itu sampah organik?", o: ["Sampah plastik", "Sampah yang bisa membusuk", "Sampah logam"], a: 1 },
            { q: "Contoh sampah anorganik?", o: ["Daun", "Botol plastik", "Sisa makanan"], a: 1 },
            { q: "Warna tempat sampah organik?", o: ["Hijau", "Merah", "Hitam"], a: 0 },
            { q: "Apa manfaat daur ulang?", o: ["Merusak alam", "Mengurangi sampah", "Menambah polusi"], a: 1 },
            { q: "Apa energi ramah lingkungan?", o: ["Solar panel", "Batubara", "Bensin"], a: 0 }
        ]
    },

    medium: {
        time: 25,
        questions: [
            { q: "Gas rumah kaca terbesar?", o: ["CO₂", "O₂", "N₂"], a: 0 },
            { q: "Plastik terurai dalam…", o: ["1 tahun", "50–500 tahun", "1 minggu"], a: 1 },
            { q: "Apa itu kompos?", o: ["Pupuk alami", "Pupuk kimia", "Bahan plastik"], a: 0 },
            { q: "Manfaat menanam pohon?", o: ["Menghasilkan oksigen", "Menghilangkan air", "Menyerap polusi"], a: 0 },
            { q: "Apa itu recycle?", o: ["Membuang", "Mengolah kembali", "Membakar"], a: 1 },
            { q: "Energi terbarukan adalah…", o: ["Tidak habis", "Cepat habis", "Berbahaya"], a: 0 },
            { q: "Apa itu emisi?", o: ["Gas yang dilepas", "Air sungai", "Tanah subur"], a: 0 },
            { q: "Apa itu biodegradable?", o: ["Sulit terurai", "Mudah terurai", "Tidak bisa terurai"], a: 1 },
            { q: "Pohon menyerap…", o: ["CO₂", "O₂", "H₂"], a: 0 },
            { q: "Reuse artinya…", o: ["Dipakai sekali", "Dipakai ulang", "Dibuang"], a: 1 }
        ]
    },

    hard: {
    time: 20,
    questions: [
        {
            q: "Apa penyebab terbesar hilangnya keanekaragaman hayati secara global?",
            o: ["Perubahan iklim", "Kerusakan habitat", "Aktivitas vulkanik"],
            a: 1
        },
        {
            q: "Gas rumah kaca mana yang memiliki potensi pemanasan global (GWP) tertinggi?",
            o: ["Metana (CH₄)", "Dinitrogen oksida (N₂O)", "Sulfur heksafluorida (SF₆)"],
            a: 2
        },
        {
            q: "Apa dampak utama pengasaman laut pada organisme bercangkang?",
            o: ["Memperkuat cangkang", "Menghambat pembentukan kalsium", "Meningkatkan reproduksi"],
            a: 1
        },
        {
            q: "Sebagian besar pemutihan karang terjadi karena…",
            o: ["Suhu laut meningkat", "Salinitas berubah", "Kadar oksigen naik"],
            a: 0
        },
        {
            q: "Sumber emisi CH₄ terbesar berasal dari…",
            o: ["Pabrik industri", "Limbah dan peternakan", "Transportasi darat"],
            a: 1
        },
        {
            q: "Lapisan ozon melindungi bumi dari…",
            o: ["Sinar UV-B berbahaya", "Sinar inframerah", "Radiasi mikro"],
            a: 0
        },
        {
            q: "Apa penyebab utama eutrofikasi pada danau?",
            o: ["Kekurangan cahaya", "Kelebihan nutrisi nitrogen & fosfor", "Arus air terlalu kuat"],
            a: 1
        },
        {
            q: "Mikroplastik paling banyak ditemukan pada…",
            o: ["Air hujan", "Laut dalam", "Tanah gurun"],
            a: 1
        },
        {
            q: "Apa yang disebut 'tipping point' dalam perubahan iklim?",
            o: ["Batas saat suhu turun drastis", "Batas perubahan tidak bisa dipulihkan", "Puncak musim panas"],
            a: 1
        },
        {
            q: "Gas CO₂ paling banyak dihasilkan dari…",
            o: ["Kendaraan transportasi", "Industri energi & listrik", "Pertanian"],
            a: 1
        },
        {
            q: "Apa istilah untuk spesies yang tidak berasal dari ekosistem setempat dan dapat merusak ekosistem?",
            o: ["Endemik", "Invasif", "Ekoton"],
            a: 1
        },
        {
            q: "Ekosistem penyerap karbon terbesar di bumi adalah…",
            o: ["Padang rumput", "Lautan", "Hutan pinus"],
            a: 1
        },
        {
            q: "Apa efek utama deforestasi terhadap siklus air?",
            o: ["Curah hujan meningkat", "Cycle air melemah dan tanah mengering", "Awan lebih cepat terbentuk"],
            a: 1
        },
        {
            q: "Hewan yang paling terdampak oleh pencairan es Arktik adalah…",
            o: ["Pinguin", "Beruang kutub", "Serigala kutub"],
            a: 1
        },
        {
            q: "Apa dampak utama urban heat island?",
            o: ["Suhu kota lebih panas daripada desa", "Kota menjadi lebih gelap", "Awan sulit terbentuk"],
            a: 0
        },
        {
            q: "Apa tujuan utama teknologi carbon capture?",
            o: ["Menyimpan CO₂ di atmosfer", "Mengurangi emisi CO₂", "Mengubah CO₂ menjadi ozon"],
            a: 1
        },
        {
            q: "Apa indikator kualitas udara yang paling umum dipakai?",
            o: ["API", "AQI", "AQM"],
            a: 1
        },
        {
            q: "Sumber energi dengan emisi karbon paling rendah adalah…",
            o: ["PLTU batubara", "Geothermal", "Diesel"],
            a: 1
        },
        {
            q: "Apa dampak utama hilangnya hutan mangrove?",
            o: ["Laut menjadi lebih jernih", "Pesisir lebih rentan abrasi", "Populasi ikan meningkat"],
            a: 1
        },
        {
            q: "Greenwashing berarti…",
            o: ["Produk benar-benar ramah lingkungan", "Klaim palsu seolah ramah lingkungan", "Teknik mencuci limbah"],
            a: 1
        }
    ]
                }

/* -------------------------
   ELEMENT SELECTOR
-------------------------- */

const ecoBox = document.getElementById("quizBox");
const ecoResult = document.getElementById("quizResult");

const ecoQuestion = document.getElementById("questionText");
const ecoOptions = document.getElementById("optionsBox");
const ecoNext = document.getElementById("nextBtn");

const ecoTimer = document.getElementById("timer");
const ecoProgress = document.getElementById("progress");

let ecoLevel = null;
let ecoData = null;
let ecoIndex = 0;
let ecoScore = 0;
let ecoCountdown = null;

/* -------------------------
   LEVEL PICKER
-------------------------- */

function chooseLevel(level) {
    ecoLevel = level;
    ecoData = ecoQuiz[level];
    document.getElementById("startBtn").disabled = false;
}

/* -------------------------
   START QUIZ
-------------------------- */
function startQuiz() {
    document.querySelector(".quiz-wrapper").style.display = "none";
    ecoBox.classList.remove("hidden");

    ecoIndex = 0;
    ecoScore = 0;

    runTimer();
    loadEcoQuestion();
}

/* -------------------------
   LOAD QUESTION
-------------------------- */
function loadEcoQuestion() {
    const q = ecoData.questions[ecoIndex];

    ecoQuestion.textContent = q.q;
    ecoOptions.innerHTML = "";
    ecoNext.disabled = true;

    q.o.forEach((text, i) => {
        const opt = document.createElement("div");
        opt.className = "eco-option";
        opt.textContent = text;
        opt.onclick = () => ecoSelect(i, opt);
        ecoOptions.appendChild(opt);
    });

    ecoProgress.style.width = (ecoIndex / ecoData.questions.length) * 100 + "%";
}

/* -------------------------
   SELECT OPTION
-------------------------- */
let ecoSelected = -1;

function ecoSelect(i, element) {
    ecoSelected = i;
    ecoNext.disabled = false;

    document.querySelectorAll(".eco-option").forEach(o => o.classList.remove("active"));
    element.classList.add("active");
}

/* -------------------------
   NEXT QUESTION
-------------------------- */
function nextQuestion() {
    if (ecoSelected === ecoData.questions[ecoIndex].a) {
        ecoScore += 10;
    }

    ecoIndex++;

    if (ecoIndex < ecoData.questions.length) {
        ecoSelected = -1;
        loadEcoQuestion();
    } else {
        finishEcoQuiz();
    }
}

/* -------------------------
   TIMER SYSTEM
-------------------------- */
function runTimer() {
    let timeLeft = ecoData.time;
    ecoTimer.textContent = timeLeft;

    ecoCountdown = setInterval(() => {
        timeLeft--;
        ecoTimer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(ecoCountdown);
            nextQuestion();
        }
    }, 1000);
}

/* -------------------------
   FINISH QUIZ
-------------------------- */
function finishEcoQuiz() {
    clearInterval(ecoCountdown);

    ecoBox.classList.add("hidden");
    ecoResult.classList.remove("hidden");

    document.getElementById("scoreText").textContent = `Skor Kamu: ${ecoScore}`;
    document.getElementById("scoreMessage").textContent =
        ecoScore >= ecoData.questions.length * 7
            ? "Luar biasa! Kamu pahlawan lingkungan!"
            : "Tetap semangat! Masih bisa lebih baik!";
}

/* -------------------------
   RESTART QUIZ
-------------------------- */
function restartQuiz() {
    ecoResult.classList.add("hidden");
    document.querySelector(".quiz-wrapper").style.display = "block";

    ecoProgress.style.width = "0%";
    ecoTimer.textContent = "-";
}
