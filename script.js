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

/* =====================================================
   UQZ – QUIZ SYSTEM (100% NO CONFLICT)
===================================================== */

// STATE
let uqzLevel = null;
let uqzIndex = 0;
let uqzScore = 0;
let uqzTime = 0;
let uqzTimerId = null;

// DOM
const uqzSection = document.querySelector(".uqz-wrapper");
const uqzQuizBox = document.getElementById("uqzQuizBox");
const uqzResultBox = document.getElementById("uqzResultBox");

const uqzQuestionText = document.getElementById("uqzQuestionText");
const uqzOptionsBox = document.getElementById("uqzOptionsBox");
const uqzNextBtn = document.getElementById("uqzNextBtn");

const uqzProgressFill = document.getElementById("uqzProgressFill");
const uqzTimerEl = document.getElementById("uqzTimer");

const uqzScoreText = document.getElementById("uqzScoreText");
const uqzScoreMessage = document.getElementById("uqzScoreMessage");


// =====================================================
// QUIZ BANK (5 Easy – 10 Medium – 20 Hard)
// =====================================================
const UQZ_BANK = {
    easy: {
        time: 30,
        questions: [
            { q: "Apa warna tempat sampah organik?", o: ["Hijau", "Merah", "Kuning"], a: 0 },
            { q: "Sampah daun termasuk kategori?", o: ["Anorganik", "Organik", "B3"], a: 1 },
            { q: "Apa bentuk bumi?", o: ["Kotak", "Bulat", "Segitiga"], a: 1 },
            { q: "Apa sumber energi terbesar?", o: ["Gas", "Matahari", "Api"], a: 1 },
            { q: "Botol plastik termasuk?", o: ["Organik", "Anorganik", "B3"], a: 1 }
        ]
    },

    medium: {
        time: 25,
        questions: Array.from({ length: 10 }).map((_, i) => ({
            q: `Soal tingkat sedang #${i + 1}`,
            o: ["Pilihan A", "Pilihan B", "Pilihan C"],
            a: Math.floor(Math.random() * 3)
        }))
    },

    hard: {
        time: 20,
        questions: Array.from({ length: 20 }).map((_, i) => ({
            q: `Soal tingkat sulit #${i + 1}`,
            o: ["Jawaban 1", "Jawaban 2", "Jawaban 3"],
            a: Math.floor(Math.random() * 3)
        }))
    }
};


// =====================================================
// SELECT LEVEL
// =====================================================
function uqzChooseLevel(lv) {
    uqzLevel = lv;

    document.querySelectorAll(".uqz-level-card").forEach(c => c.classList.remove("uqz-active"));
    document.querySelector(`.uqz-${lv}`).classList.add("uqz-active");
}



// =====================================================
// START QUIZ
// =====================================================
function uqzStartQuiz() {

    if (!uqzLevel) {
        alert("Pilih level dulu!");
        return;
    }

    uqzIndex = 0;
    uqzScore = 0;

    uqzSection.classList.add("uqz-hidden");
    uqzQuizBox.classList.remove("uqz-hidden");

    uqzTime = UQZ_BANK[uqzLevel].time;
    uqzStartTimer();

    uqzLoadQuestion();
}



// =====================================================
// TIMER
// =====================================================
function uqzStartTimer() {

    clearInterval(uqzTimerId);

    uqzTimerEl.textContent = uqzTime;

    uqzTimerId = setInterval(() => {

        uqzTimerEl.textContent = uqzTime;
        uqzTime--;

        if (uqzTime < 0) {
            clearInterval(uqzTimerId);
            uqzNextQuestion();
        }

    }, 1000);
}



// =====================================================
// LOAD QUESTION
// =====================================================
function uqzLoadQuestion() {
    const qData = UQZ_BANK[uqzLevel].questions[uqzIndex];

    uqzQuestionText.textContent = qData.q;

    uqzOptionsBox.innerHTML = "";
    uqzNextBtn.disabled = true;

    qData.o.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "uqz-opt-btn";
        btn.textContent = opt;

        btn.onclick = () => uqzSelectAnswer(i, btn);

        uqzOptionsBox.appendChild(btn);
    });

    // Progress
    const total = UQZ_BANK[uqzLevel].questions.length;
    uqzProgressFill.style.width = ((uqzIndex) / total) * 100 + "%";
}



// =====================================================
// SELECT ANSWER
// =====================================================
let uqzSelected = null;

function uqzSelectAnswer(choice, btn) {
    uqzSelected = choice;

    document.querySelectorAll(".uqz-opt-btn")
        .forEach(b => b.classList.remove("uqz-selected"));

    btn.classList.add("uqz-selected");

    uqzNextBtn.disabled = false;
}



// =====================================================
// NEXT QUESTION
// =====================================================
uqzNextBtn.addEventListener("click", uqzNextQuestion);

function uqzNextQuestion() {

    const correct = UQZ_BANK[uqzLevel].questions[uqzIndex].a;
    if (uqzSelected === correct) uqzScore++;

    uqzIndex++;

    if (uqzIndex >= UQZ_BANK[uqzLevel].questions.length) {
        uqzFinish();
        return;
    }

    uqzLoadQuestion();
}



// =====================================================
// FINISH QUIZ
// =====================================================
function uqzFinish() {

    clearInterval(uqzTimerId);

    uqzQuizBox.classList.add("uqz-hidden");
    uqzResultBox.classList.remove("uqz-hidden");

    const total = UQZ_BANK[uqzLevel].questions.length;

    uqzScoreText.textContent = `Skor Kamu: ${uqzScore} / ${total}`;

    uqzScoreMessage.textContent =
        uqzScore === total ? "Sempurna! Kamu jenius 🌟" :
        uqzScore > total / 2 ? "Keren! Kamu paham lingkungan 👍" :
        "Masih bisa lebih baik… coba lagi ya! 💪";
}



// =====================================================
// RESTART
// =====================================================
function uqzRestartQuiz() {

    uqzResultBox.classList.add("uqz-hidden");
    uqzSection.classList.remove("uqz-hidden");

    uqzLevel = null;
    uqzIndex = 0;
    uqzScore = 0;

    document.querySelectorAll(".uqz-level-card").forEach(c => c.classList.remove("uqz-active"));
}
