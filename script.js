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

// -----------------------------------------
// QUESTION BANK
// -----------------------------------------
const ecoQuizQuestions = {
    easy: [
        { q: "Apa warna tempat sampah untuk sampah organik?", o: ["Biru", "Hijau", "Kuning", "Merah"], a: 1 },
        { q: "Sampah dedaunan termasuk jenis apa?", o: ["Anorganik", "Organik", "B3", "Elektronik"], a: 1 },
        { q: "Plastik termasuk sampah…", o: ["Organik", "B3", "Anorganik", "Radioaktif"], a: 2 },
        { q: "Sampah yang bisa membusuk disebut…", o: ["Organik", "Anorganik", "E-waste", "B3"], a: 0 },
        { q: "Botol kaca termasuk sampah…", o: ["Organik", "Elektronik", "Anorganik", "B3"], a: 2 }
    ],

    medium: [
        { q: "Apa tujuan utama dari daur ulang?", o: ["Menambah sampah", "Mengurangi limbah", "Membakar sampah", "Menghasilkan polusi"], a: 1 },
        { q: "Apa yang dimaksud 3R?", o: ["Reduce, Reuse, Recycle", "Rework, Reload, Remove", "Rewash, Reverse, Rebuild", "Recycle, Remove, Run"], a: 0 },
        { q: "Kelompok sampah berikut yang bisa dikompos?", o: ["Plastik", "Kaca", "Sisa makanan", "Aluminium"], a: 2 },
        { q: "Baterai bekas termasuk kategori…", o: ["Organik", "Anorganik", "B3", "Kompos"], a: 2 },
        { q: "Pengolahan sampah terpadu disebut…", o: ["TPA", "TPS", "TPST", "Bank Sampah"], a: 2 },
        { q: "Apa fungsi bank sampah?", o: ["Untuk menyimpan uang", "Menimbun sampah", "Mengolah sampah bernilai", "Membuang limbah"], a: 2 },
        { q: "Sampah elektronik disebut…", o: ["E-waste", "Eco waste", "Bio waste", "Heat waste"], a: 0 },
        { q: "Kegiatan memilah sampah dinamakan…", o: ["Sorting", "Cleaning", "Reducing", "Melting"], a: 0 },
        { q: "Mengurangi penggunaan plastik adalah contoh…", o: ["Reuse", "Recycle", "Reduce", "Recreate"], a: 2 },
        { q: "Komposter digunakan untuk…", o: ["Mencuci sampah", "Membakar plastik", "Menguraikan sampah organik", "Menghancurkan kaca"], a: 2 }
    ],

    hard: [
        { q: "Gas rumah kaca yang paling berkontribusi pada pemanasan global adalah…", o: ["CO₂", "O₃", "N₂", "H₂"], a: 0 },
        { q: "Proses laut menyerap CO₂ dan membuat asam disebut…", o: ["Eutrofikasi", "Asidifikasi laut", "Denitrifikasi", "Sedimentasi"], a: 1 },
        { q: "Lapisan ozon berada di…", o: ["Troposfer", "Stratosfer", "Mesosfer", "Termosfer"], a: 1 },
        { q: "Hewan paling sensitif terhadap naiknya suhu laut adalah…", o: ["Paus", "Karang", "Hiu", "Penguin"], a: 1 },
        { q: "Gas yang termasuk B3 adalah…", o: ["CO₂", "N₂", "Mercury vapor", "Oksigen"], a: 2 },
        { q: "Pembakaran fosil melepaskan…", o: ["Nitrogen", "Oksigen", "Karbon dioksida", "Hidrogen"], a: 2 },
        { q: "Energi geothermal berasal dari…", o: ["Matahari", "Inti bumi", "Arus laut", "Reaksi kimia tanah"], a: 1 },
        { q: "Gas metana dari sampah terbentuk karena…", o: ["Fermentasi anaerob", "Oksidasi", "Aerasi", "Denaturasi"], a: 0 },
        { q: "Dampak terburuk deforestasi adalah…", o: ["Lahan bermain berkurang", "Oksigen berkurang", "Kehilangan hayati", "Kabut"], a: 2 },
        { q: "Panel surya mengubah energi…", o: ["Panas", "Cahaya", "Angin", "Gelombang"], a: 1 },
        { q: "PLTA itu…", o: ["Tanpa emisi karbon", "Limbah radioaktif", "Pakai minyak bumi", "Tidak butuh air"], a: 0 },
        { q: "Biofuel berasal dari…", o: ["Fosil", "Petroleum", "Biomassa", "Logam panas"], a: 2 },
        { q: "Carbon footprint adalah…", o: ["Jumlah pohon", "Jumlah karbon aktivitas manusia", "Oksigen atmosfer", "Logam berat"], a: 1 },
        { q: "Penghijauan kembali disebut…", o: ["Deforestasi", "Reforestasi", "Erosi", "Desalinasi"], a: 1 },
        { q: "Sampah medis termasuk…", o: ["Organik", "Anorganik", "B3", "Kompos"], a: 2 },
        { q: "Permukaan laut naik karena…", o: ["Hujan sedikit", "Tanah mengembang", "Es mencair", "Gunung meletus"], a: 2 },
        { q: "Biopori bermanfaat untuk…", o: ["Membakar sampah", "Mengurangi banjir", "Menghasilkan listrik", "Mengolah logam"], a: 1 },
        { q: "Penipisan ozon disebabkan oleh…", o: ["CO₂", "CFC", "O₂", "N₂"], a: 1 },
        { q: "Zero Waste fokus pada…", o: ["Menghilangkan limbah", "Mengumpulkan sampah", "Membakar plastik", "Menimbun B3"], a: 0 },
        { q: "Keanekaragaman hayati tertinggi ada di…", o: ["Gurun", "Hutan hujan tropis", "Tundra", "Gletser"], a: 1 }
    ]
};

// -----------------------------------------
// VARIABLES (RENAMED)
// -----------------------------------------
let ecoLevel = null;
let ecoList = [];
let ecoIndex = 0;
let ecoScore = 0;
let ecoTimer = 0;
let ecoTimerInterval = null;

// -----------------------------------------
// LEVEL SELECTION
// -----------------------------------------
function chooseLevel(lv) {
    ecoLevel = lv;
    document.getElementById("startBtn").style.display = "block";
}

// -----------------------------------------
// START QUIZ
// -----------------------------------------
function startQuiz() {
    if (!ecoLevel) return alert("Pilih level dulu!");

    ecoList = ecoQuizQuestions[ecoLevel];
    ecoIndex = 0;
    ecoScore = 0;

    ecoTimer = ecoLevel === "easy" ? 30 : ecoLevel === "medium" ? 25 : 20;

    document.querySelector(".quiz-wrapper").classList.add("hidden");
    document.getElementById("quizBox").classList.remove("hidden");

    loadEcoQuestion();
    startEcoTimer();
}

// -----------------------------------------
// TIMER
// -----------------------------------------
function startEcoTimer() {
    clearInterval(ecoTimerInterval);
    document.getElementById("timer").textContent = ecoTimer;

    ecoTimerInterval = setInterval(() => {
        ecoTimer--;
        document.getElementById("timer").textContent = ecoTimer;

        if (ecoTimer <= 0) {
            clearInterval(ecoTimerInterval);
            nextEcoQuestion();
        }
    }, 1000);
}

// -----------------------------------------
// LOAD QUESTION
// -----------------------------------------
function loadEcoQuestion() {
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = true;
    nextBtn.classList.remove("active");

    const q = ecoList[ecoIndex];
    document.getElementById("questionText").textContent = q.q;

    const box = document.getElementById("optionsBox");
    box.innerHTML = "";

    q.o.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectEco(btn, i);
        box.appendChild(btn);
    });

    document.getElementById("progress").style.width =
        ((ecoIndex + 1) / ecoList.length) * 100 + "%";
}

// -----------------------------------------
// SELECT OPTION
// -----------------------------------------
function selectEco(btn, choice) {
    const q = ecoList[ecoIndex];
    const allBtns = document.querySelectorAll("#optionsBox button");

    allBtns.forEach(b => b.disabled = true);

    if (choice === q.a) {
        btn.classList.add("correct");
        ecoScore += ecoLevel === "easy" ? 10 : ecoLevel === "medium" ? 15 : 20;
    } else {
        btn.classList.add("wrong");
        allBtns[q.a].classList.add("correct");
    }

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = false;
    nextBtn.classList.add("active");
}

// -----------------------------------------
// NEXT QUESTION
// -----------------------------------------
function nextEcoQuestion() {
    ecoIndex++;

    if (ecoIndex >= ecoList.length) return endEcoQuiz();

    ecoTimer = ecoLevel === "easy" ? 30 : ecoLevel === "medium" ? 25 : 20;
    startEcoTimer();
    loadEcoQuestion();
}

// -----------------------------------------
// END QUIZ
// -----------------------------------------
function endEcoQuiz() {
    clearInterval(ecoTimerInterval);

    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("quizResult").classList.remove("hidden");

    document.getElementById("scoreText").textContent = `Skor Kamu: ${ecoScore}`;

    document.getElementById("scoreMessage").textContent =
        ecoScore < ecoList.length * 10 * 0.5
            ? "Masih bisa lebih baik, semangat!"
            : ecoScore < ecoList.length * 10 * 0.8
            ? "Keren! Pengetahuanmu bagus!"
            : "Luar biasa! Kamu ahli lingkungan!";
}

// -----------------------------------------
// RESTART
// -----------------------------------------
function restartQuiz() {
    document.getElementById("quizResult").classList.add("hidden");
    document.querySelector(".quiz-wrapper").classList.remove("hidden");
}
