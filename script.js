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

// ==========================
// EcoLearn Quiz JS
// ==========================

// Namespace object untuk menghindari bentrok
const uqz = {
    currentLevel: null,
    currentQuestionIndex: 0,
    score: 0,
    timer: null,
    timeLeft: 0,
    questions: {
        easy: [
            { question: "Apa yang dimaksud dengan 3R?", options: ["Reduce, Reuse, Recycle", "Run, Rest, Read", "Read, Reduce, Repeat"], answer: 0 },
            { question: "Sampah organik contohnya?", options: ["Sayur, Buah", "Plastik, Botol", "Kertas, Karton"], answer: 0 },
            { question: "Mengurangi sampah plastik dilakukan dengan?", options: ["Bawa tas sendiri", "Membeli plastik", "Membuang di sungai"], answer: 0 },
            { question: "Tempat sampah organik berwarna?", options: ["Hijau", "Merah", "Biru"], answer: 0 },
            { question: "Mengompos sampah artinya?", options: ["Mengubah sampah organik jadi pupuk", "Membuang sampah sembarangan", "Menyimpan plastik"], answer: 0 }
        ],
        medium: [
            { question: "Apa keuntungan mendaur ulang kertas?", options: ["Mengurangi penebangan pohon", "Membuat polusi", "Meningkatkan sampah"], answer: 0 },
            { question: "Sampah B3 adalah?", options: ["Bahan berbahaya & beracun", "Sampah rumah tangga", "Sampah organik"], answer: 0 },
            { question: "Konsep Zero Waste artinya?", options: ["Tidak ada sampah", "Semua dibakar", "Semua dibuang ke laut"], answer: 0 },
            { question: "Apa yang dimaksud pengomposan?", options: ["Menguraikan sampah organik menjadi pupuk", "Membuang sampah plastik ke sungai", "Mencuci sampah"], answer: 0 },
            { question: "Contoh tindakan ramah lingkungan di sekolah?", options: ["Menanam pohon", "Membuang sampah sembarangan", "Membakar sampah"], answer: 0 },
            { question: "Salah satu cara mengurangi sampah elektronik?", options: ["Mendaur ulang", "Membuang ke sungai", "Membakar"], answer: 0 },
            { question: "Bank sampah berguna untuk?", options: ["Mengelola & menabung sampah", "Membuang sampah ke laut", "Membakar sampah"], answer: 0 },
            { question: "Jenis sampah yang bisa didaur ulang?", options: ["Plastik, Kertas, Logam", "Sisa makanan", "Sampah B3"], answer: 0 },
            { question: "Mengurangi penggunaan air dengan?", options: ["Matikan keran saat tidak dipakai", "Biarkan terus mengalir", "Gunakan air sembarangan"], answer: 0 },
            { question: "Apa arti reduce pada 3R?", options: ["Mengurangi penggunaan barang", "Membakar sampah", "Membuang sampah ke sungai"], answer: 0 }
        ],
        hard: [
            { question: "Metode composting paling cepat?", options: ["Vermicomposting", "Bokashi", "Manual"], answer: 1 },
            { question: "Limbah plastik paling sulit terurai dalam?", options: ["500–1000 tahun", "1 tahun", "10 tahun"], answer: 0 },
            { question: "Emisi gas rumah kaca terbesar dari?", options: ["Transportasi & energi", "Daur ulang", "Menanam pohon"], answer: 0 },
            { question: "Manfaat E-waste management?", options: ["Mengurangi toksin & limbah elektronik", "Meningkatkan limbah elektronik", "Tidak ada manfaat"], answer: 0 },
            { question: "Contoh prinsip circular economy?", options: ["Menggunakan kembali bahan untuk produk baru", "Membuang semua sampah", "Membakar limbah"], answer: 0 },
            { question: "Jenis sampah yang perlu dipisahkan sebelum diolah?", options: ["Organik, Anorganik, B3", "Semuanya dicampur", "Hanya plastik"], answer: 0 },
            { question: "Teknologi untuk mengubah sampah jadi energi?", options: ["Waste to Energy", "Composting", "Landfill"], answer: 0 },
            { question: "Apa yang dimaksud biodegradable?", options: ["Bisa terurai secara alami", "Tidak bisa diolah", "Membuat polusi"], answer: 0 },
            { question: "Salah satu indikator lingkungan sehat?", options: ["Udara bersih", "Bau sampah", "Air kotor"], answer: 0 },
            { question: "Apa tujuan dari pengolahan limbah terpadu?", options: ["Mengurangi dampak negatif terhadap lingkungan", "Menimbulkan polusi", "Membuang sembarangan"], answer: 0 },
            { question: "Konsep extended producer responsibility berarti?", options: ["Produsen bertanggung jawab terhadap limbah produknya", "Masyarakat bertanggung jawab sendiri", "Pemerintah tidak ikut campur"], answer: 0 },
            { question: "Teknik reduce di sekolah?", options: ["Mengurangi penggunaan kertas", "Membakar kertas", "Membuang kertas ke sungai"], answer: 0 },
            { question: "Apa itu landfill?", options: ["Tempat pembuangan akhir sampah", "Daur ulang sampah plastik", "Pengomposan"], answer: 0 },
            { question: "Jenis pupuk dari sampah organik?", options: ["Kompos", "Plastik", "Semen"], answer: 0 },
            { question: "Fungsi incinerator?", options: ["Membakar sampah menjadi energi", "Membuat kompos", "Menimbun sampah"], answer: 0 },
            { question: "Contoh inovasi pengurangan sampah?", options: ["Botol refill", "Botol sekali pakai", "Makanan cepat saji"], answer: 0 },
            { question: "Daur ulang kaca menghasilkan?", options: ["Botol baru", "Plastik baru", "Kertas baru"], answer: 0 },
            { question: "Apa manfaat green building?", options: ["Menghemat energi & ramah lingkungan", "Meningkatkan polusi", "Tidak ada manfaat"], answer: 0 },
            { question: "Jenis energi terbarukan dari limbah?", options: ["Biogas", "Batu bara", "Minyak bumi"], answer: 0 },
            { question: "Prinsip reduce dalam kehidupan sehari-hari?", options: ["Kurangi penggunaan plastik sekali pakai", "Gunakan plastik sebanyak-banyaknya", "Bakar sampah"], answer: 0 }
        ]
    }
};

// ==========================
// Pilih Level
// ==========================
function uqzChooseLevel(level) {
    uqz.currentLevel = level;

    // Highlight level yang dipilih
    document.querySelectorAll(".uqz-level-card").forEach(card => {
        card.classList.remove("selected");
    });
    document.querySelector(`.uqz-${level}`).classList.add("selected");

    // Aktifkan tombol start
    document.getElementById("uqzStartBtn").disabled = false;
}

// ==========================
// Start Quiz
// ==========================
function uqzStartQuiz() {
    if (!uqz.currentLevel) {
        alert("Pilih tingkat kesulitan terlebih dahulu!");
        return;
    }

    // Reset state
    uqz.currentQuestionIndex = 0;
    uqz.score = 0;

    // Hide section utama, show quiz box
    document.getElementById("uqz-section").classList.add("uqz-hidden");
    document.getElementById("uqzQuizBox").classList.remove("uqz-hidden");

    // Load first question
    uqzLoadQuestion();
}

// ==========================
// Load Question
// ==========================
function uqzLoadQuestion() {
    const q = uqz.questions[uqz.currentLevel][uqz.currentQuestionIndex];
    document.getElementById("uqzQuestionText").innerText = q.question;

    const optionsBox = document.getElementById("uqzOptionsBox");
    optionsBox.innerHTML = "";

    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "uqz-option-btn";
        btn.innerText = opt;
        btn.onclick = () => uqzSelectOption(idx);
        optionsBox.appendChild(btn);
    });

    // Reset next button
    const nextBtn = document.getElementById("uqzNextBtn");
    nextBtn.disabled = true;

    // Set timer
    uqzStartTimer();
}

// ==========================
// Select Option
// ==========================
function uqzSelectOption(selectedIndex) {
    const q = uqz.questions[uqz.currentLevel][uqz.currentQuestionIndex];
    const optionsBtns = document.querySelectorAll(".uqz-option-btn");

    // Disable semua button
    optionsBtns.forEach(btn => btn.disabled = true);

    // Cek jawaban
    if (selectedIndex === q.answer) {
        optionsBtns[selectedIndex].classList.add("correct");
        uqz.score += (uqz.currentLevel === "easy" ? 10 : uqz.currentLevel === "medium" ? 15 : 20);
    } else {
        optionsBtns[selectedIndex].classList.add("wrong");
        optionsBtns[q.answer].classList.add("correct");
    }

    // Aktifkan next button
    document.getElementById("uqzNextBtn").disabled = false;

    // Stop timer
    clearInterval(uqz.timer);
}

// ==========================
// Next Question
// ==========================
document.getElementById("uqzNextBtn").addEventListener("click", () => {
    uqz.currentQuestionIndex++;
    if (uqz.currentQuestionIndex < uqz.questions[uqz.currentLevel].length) {
        uqzLoadQuestion();
    } else {
        uqzShowResult();
    }
});

// ==========================
// Timer
// ==========================
function uqzStartTimer() {
    clearInterval(uqz.timer);
    uqz.timeLeft = uqz.currentLevel === "easy" ? 30 : uqz.currentLevel === "medium" ? 25 : 20;
    document.getElementById("uqzTimer").innerText = uqz.timeLeft;

    uqz.timer = setInterval(() => {
        uqz.timeLeft--;
        document.getElementById("uqzTimer").innerText = uqz.timeLeft;
        if (uqz.timeLeft <= 0) {
            clearInterval(uqz.timer);
            uqzSelectOption(-1); // otomatis salah jika habis waktu
        }
    }, 1000);
}

// ==========================
// Show Result
// ==========================
function uqzShowResult() {
    document.getElementById("uqzQuizBox").classList.add("uqz-hidden");
    document.getElementById("uqzResultBox").classList.remove("uqz-hidden");

    const totalQuestions = uqz.questions[uqz.currentLevel].length;
    const scoreText = `Skor Kamu: ${uqz.score} / ${totalQuestions * (uqz.currentLevel === "easy" ? 10 : uqz.currentLevel === "medium" ? 15 : 20)}`;
    document.getElementById("uqzScoreText").innerText = scoreText;

    const message = uqz.score >= totalQuestions * (uqz.currentLevel === "easy" ? 10 : uqz.currentLevel === "medium" ? 15 : 20) * 0.8 ? "Mantap! Kamu hebat!" : "Tetap semangat, coba lagi!";
    document.getElementById("uqzScoreMessage").innerText = message;
}

// ==========================
// Restart Quiz
// ==========================
function uqzRestartQuiz() {
    document.getElementById("uqzResultBox").classList.add("uqz-hidden");
    document.getElementById("uqz-section").classList.remove("uqz-hidden");

    // Reset highlight level
    document.querySelectorAll(".uqz-level-card").forEach(card => card.classList.remove("selected"));
    document.getElementById("uqzStartBtn").disabled = true;
}     


    
