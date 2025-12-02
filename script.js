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

/* =========================================
   ECOLEARN - QUIZ JAVASCRIPT (FULL)
   ========================================= */

let uqzLevel = null;
let uqzQuestions = [];
let uqzIndex = 0;
let uqzScore = 0;
let uqzTimerValue = 20;
let uqzTimerInterval = null;

/* ==============================
   1. PILIH LEVEL
============================== */
function uqzChooseLevel(level) {
    uqzLevel = level;

    const startBtn = document.getElementById("uqzStartBtn");
    startBtn.style.display = "block";
    startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Mulai Level: ${level.toUpperCase()}`;
}

/* ==============================
   2. DATA SOAL
============================== */
const uqzBank = {
    easy: [
        { q: "Apa warna tempat sampah organik?", o: ["Merah", "Hijau", "Biru"], a: 1 },
        { q: "Sampah plastik termasuk kategori?", o: ["Organik", "Anorganik", "B3"], a: 1 },
        { q: "3R adalah singkatan dari Reduce, Reuse, dan…", o: ["Recycle", "Replace", "Restore"], a: 0 },
        { q: "Kulit buah termasuk sampah…", o: ["Organik", "Anorganik", "B3"], a: 0 },
        { q: "Botol kaca termasuk sampah…", o: ["Organik", "Kaca", "Anorganik"], a: 2 }
    ],

    medium: [
        { q: "Apa yang dimaksud dengan kompos?", o: ["Pupuk organik", "Sampah plastik", "Gas metana"], a: 0 },
        { q: "Manakah contoh Reduce?", o: ["Memakai ulang tas", "Mengurangi plastik", "Mendaur ulang kertas"], a: 1 },
        { q: "Sampah B3 termasuk…", o: ["Berbahaya", "Biasa", "Organik"], a: 0 },
        { q: "Daun kering dapat dijadikan…", o: ["Kompos", "Plastik", "Logam"], a: 0 },
        { q: "Pembakaran sampah plastik menghasilkan…", o: ["Oksigen", "Dioxin", "Nitrogen"], a: 1 },
        { q: "Bank sampah bertujuan…", o: ["Mengumpulkan sampah", "Mengolah limbah B3", "Membersihkan air"], a: 0 },
        { q: "Sampah elektronik disebut…", o: ["E-waste", "Digiplastik", "Tech-trash"], a: 0 },
        { q: "Pemilahan sampah dilakukan untuk…", o: ["Menghemat listrik", "Memudahkan daur ulang", "Membuat sampah lebih banyak"], a: 1 },
        { q: "Plastik sekali pakai contohnya…", o: ["Botol minum ulang", "Sedotan plastik", "Tas kain"], a: 1 },
        { q: "Penyebab utama sampah laut?", o: ["Gempa", "Aktivitas manusia", "Ikan"], a: 1 }
    ],

    hard: [
        { q: "Pemanasan global dipicu oleh gas rumah kaca, terutama…", o: ["CO₂", "H₂O", "O₂"], a: 0 },
        { q: "Metode daur ulang plastik PET adalah…", o: ["Extrusion", "Pyrolysis", "Hydrolysis"], a: 1 },
        { q: "Limbah B3 harus diolah menggunakan metode…", o: ["Landfill biasa", "Pengolahan khusus", "Dibuang ke sungai"], a: 1 },
        { q: "Biodegradable berarti…", o: ["Mudak terurai alami", "Tidak bisa terurai", "Berbahan logam"], a: 0 },
        { q: "Zero Waste adalah…", o: ["Tidak menghasilkan sampah", "Membakar semua sampah", "Menyimpan sampah"], a: 0 },
        { q: "Microplastic memiliki ukuran…", o: ["<5mm", ">5cm", ">10cm"], a: 0 },
        { q: "Sampah residu adalah…", o: ["Sampah organik", "Sisa akhir yang tidak bisa didaur ulang", "Plastik bersih"], a: 1 },
        { q: "Komposter anaerobik menghasilkan…", o: ["Oksigen", "Metana", "Hidrogen"], a: 1 },
        { q: "Glass recycling menghemat energi hingga…", o: ["15%", "60%", "5%"], a: 1 },
        { q: "Teknik incinerator modern dilengkapi dengan…", o: ["Scrubber gas", "Air laut", "Solar panel"], a: 0 },
        // total 20 soal (duplikat jika mau)
        { q: "Sumber emisi karbon terbesar?", o: ["Transportasi", "Ternak", "Industri"], a: 2 },
        { q: "Limbah medis termasuk kategori…", o: ["Organik", "B3", "Anorganik biasa"], a: 1 },
        { q: "Teknik pengolahan kompos cepat disebut…", o: ["Takakura", "Incinerator", "Reverse"], a: 0 },
        { q: "Bioetanol berasal dari…", o: ["Plastik", "Fermentasi biomassa", "Logam"], a: 1 },
        { q: "Daur ulang aluminium menghemat energi…", o: ["95%", "40%", "20%"], a: 0 },
        { q: "IPAL berguna untuk…", o: ["Mengolah air limbah", "Menyaring udara", "Membuat listrik"], a: 0 },
        { q: "Go Green berarti…", o: ["Gaya hidup ramah lingkungan", "Belanja sayur", "Tanpa internet"], a: 0 },
        { q: "Bakteri pengurai disebut…", o: ["Decomposer", "Producer", "Consumer"], a: 0 },
        { q: "Sampah rumah tangga paling banyak adalah…", o: ["Plastik", "Organik", "Kaca"], a: 1 },
        { q: "Sumber microplastic terbesar di laut?", o: ["Ban mobil", "Bekas jala", "Serat pakaian"], a: 2 }
    ]
};

/* ==============================
   3. MULAI QUIZ
============================== */
function uqzStartQuiz() {
    if (!uqzLevel) return alert("Pilih level dulu!");

    document.querySelector(".uqz-wrapper").classList.add("uqz-hidden");
    document.getElementById("uqzQuizBox").classList.remove("uqz-hidden");

    uqzQuestions = uqzBank[uqzLevel];
    uqzIndex = 0;
    uqzScore = 0;

    uqzSetTimer();
    uqzLoadQuestion();
}

/* ==============================
   4. LOAD SOAL
============================== */
function uqzLoadQuestion() {
    const qData = uqzQuestions[uqzIndex];

    document.getElementById("uqzQuestionText").innerText = qData.q;

    const box = document.getElementById("uqzOptionsBox");
    box.innerHTML = "";

    qData.o.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.className = "uqz-option";
        btn.innerText = opt;
        btn.onclick = () => uqzSelect(i);
        box.appendChild(btn);
    });

    document.getElementById("uqzNextBtn").disabled = true;

    uqzUpdateProgress();
}

/* ==============================
   5. PILIH JAWABAN
============================== */
function uqzSelect(i) {
    let correct = uqzQuestions[uqzIndex].a;

    const options = document.querySelectorAll(".uqz-option");

    options.forEach(o => o.disabled = true);

    if (i === correct) {
        options[i].classList.add("uqz-correct");

        if (uqzLevel === "easy") uqzScore += 2;
        if (uqzLevel === "medium") uqzScore += 3;
        if (uqzLevel === "hard") uqzScore += 5;
    } else {
        options[i].classList.add("uqz-wrong");
        options[correct].classList.add("uqz-correct");
    }

    document.getElementById("uqzNextBtn").disabled = false;

    document.getElementById("uqzNextBtn").onclick = uqzNext;
}

/* ==============================
   6. NEXT SOAL
============================== */
function uqzNext() {
    uqzIndex++;

    if (uqzIndex >= uqzQuestions.length) {
        uqzFinish();
    } else {
        uqzLoadQuestion();
    }
}

/* ==============================
   7. TIMER
============================== */
function uqzSetTimer() {
    clearInterval(uqzTimerInterval);

    uqzTimerValue = (uqzLevel === "easy" ? 30 :
                     uqzLevel === "medium" ? 25 : 20);

    document.getElementById("uqzTimer").innerText = uqzTimerValue;

    uqzTimerInterval = setInterval(() => {
        uqzTimerValue--;
        document.getElementById("uqzTimer").innerText = uqzTimerValue;

        if (uqzTimerValue <= 0) {
            clearInterval(uqzTimerInterval);
            uqzFinish();
        }
    }, 1000);
}

/* ==============================
   8. PROGRESS BAR
============================== */
function uqzUpdateProgress() {
    let fill = document.getElementById("uqzProgressFill");
    let progress = ((uqzIndex) / uqzQuestions.length) * 100;

    fill.style.width = progress + "%";
}

/* ==============================
   9. SELESAI
============================== */
function uqzFinish() {
    clearInterval(uqzTimerInterval);

    document.getElementById("uqzQuizBox").classList.add("uqz-hidden");
    document.getElementById("uqzResultBox").classList.remove("uqz-hidden");

    document.getElementById("uqzScoreText").innerText =
        "Skor Kamu: " + uqzScore;

    let msg = "";

    if (uqzScore < 20) msg = "Jangan menyerah! Coba lagi ya 😄";
    else if (uqzScore < 40) msg = "Mantap! Kamu mulai menguasai 🎉";
    else msg = "Luar biasa! Kamu master lingkungan! 🌱🔥";

    document.getElementById("uqzScoreMessage").innerText = msg;
}

/* ==============================
   10. ULANG QUIZ
============================== */
function uqzRestartQuiz() {
    document.getElementById("uqzResultBox").classList.add("uqz-hidden");
    document.querySelector(".uqz-wrapper").classList.remove("uqz-hidden");

    uqzLevel = null;
}
