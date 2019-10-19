
    var words = [
      "awkward", 
      "bagpipes", 
      "chicago bulls",
      "buncler", 
      "san francisco",
      "croquet", 
      "crypt", 
      "dwarves", 
      "fervid", 
      "los angeles",
      "fishhook", 
      "fjord",
      "summer fun",
      "gazebo",
      "gypsy",
      "la clippers",
      "haphazard",
      "hyphen",
      "shopping mall",
      "ivory",
      "bunny girl",
      "jazzy",
      "new york",
      "jinx",
      "basketball game",
      "jukebox",
      "kayak",
      "memento",
      "oxygen",
      "rhythmic",
      "zombie",
      "wildebeest",
      "zoological gardens",
      "el dorado",
      "life is beautiful",
      "sacramento kings",
      "beverly hills",
      "hollywood",
    ];
    var randomWord = words[ Math.floor(Math.random() * words.length)];
    var ul = document.getElementById("list");
    var inputLetter = document.getElementById("gameInput");
    var abeceda = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','u','w','x','y','z'];
    var abecedaContainer = document.getElementById("abeceda-container");
    var abecedaLetters = document.getElementsByClassName("abeceda-letter");
    var liElements = document.getElementsByClassName('dash');
    var gameOverPopUp = document.getElementById("game-over-wraper");
    var gameOverScore = document.getElementById("game-over-score");
    var continueWraper = document.getElementById("continue-wraper");
    var continueGame = document.getElementById("continue-game");
    var spanScoreClass = document.getElementById("continue-score");
    var score = document.getElementById("score");
    var saved = document.getElementById("saved");
    var diamond = `<img src="img/diamond.png" alt=""/>`;
    var existingChar = [];
    var wrongChar = [];
    var concatArray = [];
    var counter = 5;
    var pointCounter = 0;
    var points = 0;
    var savedScore = 0;
    var resetGameTimeout = 0;

    createLi();
    createAbeceda();
  
    function createLi() {
      var list = '';

      for (var i = 0; i < randomWord.length; i++) {
        var li = `<li class="dash"></li>`;

        if (randomWord[i] === " ") {
        li = `<li class="dash no-border"></li>`;
        } 
        list += li;
      }
        ul.innerHTML = list;
    }
    

    function createAbeceda() {
      var letterContainer = '';
      
      for (var letter = 0; letter < abeceda.length; letter++) {
        var abecedaLetter = `<article class="abeceda-letter">${ abeceda[letter] }</article>`
        letterContainer += abecedaLetter;
      }
        abecedaContainer.innerHTML = letterContainer;
    }

    function gameOverFunc(counter) {
      gameOverPopUp.classList.add("popup");
      gameOverScore.innerHTML = `You lost ${ diamond } ${ counter }`;
    }

    function reload() {
      location.reload();
    }

    function resetGame(counter) {
      continueWraper.classList.add("popup");
      spanScoreClass.innerHTML = `You win ${ diamond } ${ counter + 5 }`;
      clearTimeout(resetGameTimeout);
    }

    function continueReset() {
      existingChar = [];
      wrongChar = [];
      concatArray = [];
      counter = 5 + counter; 
      pointCounter = 0;
      points = 0;
      randomWord = words[Math.floor(Math.random() * words.length)];
      ul.innerHTML = '';
      score.innerText = counter;

      for (var abc = 0; abc < abecedaLetters.length; abc++) {
          abecedaLetters[abc].classList.remove("exist");
      }
      
      createLi();
      continueWraper.classList.remove("popup");
    }

    function hangmanGame() {
      var existCount = 0;
      var wrongCharCounter = 0;
      var ifCharExist = false;

      if (inputLetter.value == inputLetter.value.toUpperCase()) {
        inputLetter.value = inputLetter.value.toLowerCase();
      }

      for (var c = 0; c < existingChar.length; c++) {
        if (inputLetter.value === existingChar[c]) {
          existCount++;
        }
      }

      for (var b = 0; b < wrongChar.length; b++) {
        if (inputLetter.value === wrongChar[b]) {
          wrongCharCounter++;
        }
      }

      for (var concats = 0; concats < concatArray.length; concats++) {
          
        if (inputLetter.value === concatArray[concats]) {

          for (var d = 0; d < abecedaLetters.length; d++) {
            abecedaLetters[d].classList.remove("scale-grow");

            if (inputLetter.value === abecedaLetters[d].innerHTML) {
              let letter = abecedaLetters[d];
              abecedaLetters[d].classList.add("scale-grow");
              var timeout = setTimeout(function(){
                  letter.classList.remove("scale-grow");
                }, 500);
            } 
          }
        }
      }
      
      if (randomWord.length === inputLetter.value.length && randomWord === inputLetter.value) {
        for (var x = 0; x < inputLetter.value.length; x++) {
          liElements[x].innerText = inputLetter.value[x];
        }
        pointCounter = randomWord.length;
        ifCharExist = true;

      } else if (inputLetter.value.length > 1 && !ifCharExist) {
        counter--;
        if (counter > 0) {
          score.innerText = counter;
        } else {
          score.innerText = counter;
          gameOverFunc(counter);
        }
      }
    
      for (var a = 0; a < randomWord.length; a++) { 
      
        if (randomWord[a] === inputLetter.value) {
          liElements[a].innerText = inputLetter.value;
          ifCharExist = true;

          if (existCount === 0) {
            pointCounter++;
          }
        } 
      }

      if (ifCharExist && existCount === 0 && inputLetter.value.length === 1) {
        existingChar.push(inputLetter.value);
      }

      if (!ifCharExist && inputLetter.value.length === 1 && wrongCharCounter === 0) { 
        wrongChar.push(inputLetter.value);
        counter--;
        if (counter > 0) {
            score.innerText = counter;
        } else {
            score.innerText = counter;
            gameOverFunc(counter);
        }
      }

      for (var abc = 0; abc < abecedaLetters.length; abc++) {
        if (inputLetter.value === abecedaLetters[abc].innerHTML) {
          abecedaLetters[abc].classList.add("exist");
        }
      }
      
      if (pointCounter === randomWord.replace(/ /g, '').length || randomWord.length === pointCounter) {
        points = 10;
        savedScore += points;
        saved.innerHTML = savedScore;
        resetGameTimeout = setTimeout(function() {
          resetGame(counter);
        },700);
      } 

      concatArray = existingChar.concat(wrongChar);

      inputLetter.value = "";
    };