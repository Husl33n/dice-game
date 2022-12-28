// Тоглогчийн ээлжийг хадгалах хувьсагч
// Нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогч 1 гэж тэмдэглэгдэнэ
var activePlayer = 0;


// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулсан оноог хадгалах хувьсагч
var roundScore = 0;

// Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэйь 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
var diceNumber = Math.floor(Math.random() * 6) + 1;

// Програм эхлэхэд бэлтгэе
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

var diceDom = document.querySelector('.dice');
diceDom.style.display = 'none';

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

      // Тоглогчийн ээлжийн оноог 0 болгох.
      roundScore = 0;
      document.getElementById('current-' + activePlayer).textContent = 0;

      // Тоглогчийн ээлжийг солих
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

      // Идэвхтэй тоглогчийн Улаан цэгийг нэмэх
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
      diceDom.style.display = 'none';

   }
});