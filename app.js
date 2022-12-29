// Глобал хувьсагчид
var activePlayer;
var scores;
var roundScore;

// Шооны зургийг үзүүлэх элементийг DOM-д хадгалах
var diceDom = document.querySelector('.dice');

initGame();

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ
function initGame() {
   // Тоглогчийн ээлжийг хадгалах хувьсагч
   // Нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогч 1 гэж тэмдэглэгдэнэ
   activePlayer = 0;

   // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
   scores = [0, 0];

   // Тоглогчийн ээлжиндээ цуглуулсан оноог хадгалах хувьсагч
   roundScore = 0;

   // Програм эхлэхэд бэлтгэе
   document.getElementById('score-0').textContent = 0;
   document.getElementById('score-1').textContent = 0;
   document.getElementById('current-0').textContent = 0;
   document.getElementById('current-1').textContent = 0;

   // Тоглогчдын нэрийг буцааж хэвийн болгох
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');

   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');

   document.querySelector('.player-0-panel').classList.add('active');
   diceDom.style.display = 'none';
}

// Шоог шидэх эвент листенер
document.querySelector('.btn-roll').addEventListener('click', function () {
   // 1-6 санамсаргүй нэг тоо гаргаж авна
   var diceNumber = Math.floor(Math.random() * 6) + 1;

   // Шооны зургийг харагдуулдаг болгон шооны зургийг өөрчлөх
   diceDom.style.display = 'block';
   diceDom.src = 'dice-' + diceNumber + '.png';

   // Шоо 1 с бусад тохиолдолд Тоглогчийн ээлжийн тоог Нэмэгдүүлэх. 
   if (diceNumber !== 1) {
      // 1-с ялгаатай тоо буулаа. Оноог нэмэгдүүэлэх.
      roundScore = roundScore + diceNumber;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
   } else {
      // 1 буусан тул тоглогчийн оноог устгах.
      // Хэрэв идэвхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийн 1 болгох.
      // Үгүй бол идэвхтэй тоглогчийг 0 болгох.
      switchToNextPlayer();
   }
});

// Hold товчлуурын эвент листенер 
document.querySelector('.btn-hold').addEventListener('click', function () {
   // Уг тоглогчийн цуглуулсан ээлжийн оноог глобаль оноо дээр нэмэж өгөх.
   scores[activePlayer] = scores[activePlayer] + roundScore;

   // Дэлгэц дээрх оноог нь өөрчилнө.
   document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

   // Уг тоглогчийг хожсон эсэхийг шалгах (оноо 100)
   if (scores[activePlayer] >= 20) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
   } else {
      switchToNextPlayer();
   }
});

// Дараагийн тоглогчруу шилжүүлэх
function switchToNextPlayer() {
   // Ээлжийн оноог 0 болгох.
   roundScore = 0;
   document.getElementById('current-' + activePlayer).textContent = 0;

   // Тоглогчийн ээлжийг солих.
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

   // Идэвхтэй тоглогчийн Улаан цэгийг нэмэх
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   diceDom.style.display = 'none';
}

// New Game товч Шинэ тоглолт эхлүүлэх товчний эвент листенер
document.querySelector('.btn-new').addEventListener('click', initGame);

