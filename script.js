var arrOfWords = ["sverige","utbredning", "rike", "latin","anhängare","dag","januari","kraft","grå","flygplan","saker","dollar",
"ton","utrustning","stopp","japan","gud","självmord","kontor","värde","objekt","gud","pengar","konstant","värde","tal","brand",
"japanska","inslag","serie","lugn","arkiv","regissör","fängelse","besökare","flygplan","geografi","identitet","media","december",
"sammanhang","inriktning","drottning","dator","medlem","fängelse","lager","flygbolag","beslut","natt","hälsa","km","roman","trä",
"sol","artist", "internet","facebook","youtube", "komiker","skrivbord","boll"];

function getRandomWord() {
  return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
}
var gameScreen = document.body.cloneNode(true);

function newGame() {
  var word = getRandomWord();
  word = word.split('');
  var hiddenWord = word.map(function() {
    return '_';
  });

  var letter, life = 10, game = true, guessesMade = [], didWin = false;
  var alphabet = document.querySelector('.alphabet');
  alphabet.addEventListener('click', play, false);

  function ending() {
    //game = false;
    var extra = didWin ? 'vunnit spelet!' : 'förlorat spelet. Ordet var ' + word.join('') + '. Försök igen.';
    document.body.innerHTML = "<h1 id='life'>Du har " + extra + '</h1>';
    document.body.innerHTML += "<button type='button' name='button' id ='replay'>Spela om</button>";
    document.getElementById('replay').addEventListener('click', function() {
      console.log('new game starting...');
      document.body = gameScreen.cloneNode(true);
      newGame();
    });
  }
  function uppdate(lifeLeft) {
    console.log(hiddenWord);
    document.getElementById('hangMan').src = 10 - lifeLeft + '.png';
    document.getElementById('theWord').innerHTML = hiddenWord.join(' ');
    document.getElementById('lifePoints').innerHTML = life;
    guessesMade.push(letter);
  }
  uppdate(life);

  function play(e) {
    if (e.target !== e.currentTarget && game) {
      letter = e.target.id;
      if (guessesMade.includes(letter)) {
        console.log('You have already guessed that');
        alert('Du har redan försökt med ' + letter);
      } else if (word.includes(letter)) {
        for (var i = 0; i < word.length; i++) {
          if (word[i] === letter) {
            hiddenWord[i] = word[i];
          }
        }
      } else {
        life--;
        if (life <= 0) {
          console.log('You have lost');
          game = false;
          //ending();
        }
      }
      uppdate(life);
      if (hiddenWord.join('') === word.join('')) {
        console.log('You have won');
        didWin = true;
        game = false;
        //ending();
      }
    }
    e.stopPropagation();
    if (game === false) {
      ending();
    }
  }
}

newGame();
