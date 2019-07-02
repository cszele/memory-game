/*
 * Create a list that holds all of your cards
 */
 // array of cards
 let cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
                'fa-bomb', 'fa-bomb',
               'fa-leaf', 'fa-leaf',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-bicycle', 'fa-bicycle'];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//generates the cards to the game
function gameOn() {
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
//place the cards to the html
  deck.innerHTML = cardHTML.join('');
}
// Play the game
gameOn();
// Checking if the flipped cards match
checkingCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function checkingCards() {
  let allCards = document.querySelectorAll('.card');
  let openCards = [];
  let moves = document.querySelector('.moves');
  let moveCounter = 0;
  moves.innerHTML = moveCounter;
  let timer = setInterval(setTime, 1000);

  // Stars
function showStars() {
    //let starOne = document.querySelector('.fa-star');
    //let starTwo = document.querySelector('.fa-star');
    //let starThree = document.querySelector('.fa-star');
    let stars = document.querySelector('.stars');
    if (moveCounter == 4) {
      stars.removeChild(stars.lastElementChild);
    } else if (moveCounter == 8) {
      stars.removeChild(stars.lastElementChild);
    }
      //let starsArray = [starOne, starTwo, starThree];
    //console.log(starsArray);
      //if (moveCounter === 2) {
        //  return stars.innerHTML = starsArray;
          //   }
         };
    
    
    allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
     if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
       openCards.push(card);
       card.classList.add('open', 'show');
      // if cards match leave them open
           if (openCards.length == 2) {
               if (openCards[0].dataset.card == openCards[1].dataset.card) {
                  openCards[0].classList.add('match');
                  openCards[0].classList.add('open');
                  openCards[0].classList.add('show');

                  openCards[1].classList.add('match');
                  openCards[1].classList.add('open');
                  openCards[1].classList.add('show');
                   
                       openCards = [];

                }
                else if (openCards[16]) {
                    console.log("hello");
                    clearInterval(timer);
                    allCardsMatch();
                  } else  {
                //if cards don't match Hide
                    setTimeout(function() {
                      openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                      });
                openCards = [];

              }, 1000);
            }
            moveCounter++;
            moves.innerHTML = moveCounter;
            showStars(moveCounter);
          }

        }

  });


});

//timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

        function setTime() {
          ++totalSeconds;
          secondsLabel.innerHTML = pad(totalSeconds % 60);
          minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
            function timer(){
	time++;
	console.log(time);
 }

 function clearTimer(){
 	clearInterval(time);
 }
        }

        function pad(val) {
          var valString = val + "";
          if (valString.length < 2) {
            return "0" + valString;
          } else {
            return valString;
          }
        }


      //});

};


//modal
function allCardsMatch () {
      modal.style.display = "block";
      gameOver();
     }
   
  //calculate the timer

var running = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

function startTimer() {
       if(running == 0) {
        running = 1;
        console.log('Timer is on.');
        increment();
    } else {
        running = 0;
    }
}

function increment() {
    if(running == 1) {
        setTimeout(function() {
           seconds++;
           if (seconds === 60) {
           	seconds = 0;
           	minutes++;
           	if (minutes === 60) {
           		minutes = 0;
           		hours++;
           	}
           }

            timer.innerHTML = hours + ":" + minutes + ":" + seconds;
            // timerCounter.innerText = timer;
            increment();
        }, 1000);
    }
}

startTimer()

//stop timer
function stopTimer() {
	clearTimeout(timer);
	hours = 0;
	minutes = 0;
	seconds = 0;
}

//Print results on the popUp screen
function results() {

	let moves_results = document.querySelector('.movesResults');
        moves_results.innerHTML = 'Moves: ' + moves;

        // let time_results = document.querySelector('timeResults');
  //       time_results.innerText = 'Time: ' + timer;
			   
}

//pop Up screen appears at the end of the game
function gameOver() {
     document.querySelector('.popUpBack').style.display = 'flex';   
     
     results();
	document.querySelector('.newGame').addEventListener('click', function() {
    document.querySelector('.popUpBack').style.display = 'none';
    newGame();
	});
		document.querySelector('.noThanks').addEventListener('click', function() {
   document.querySelector('.popUpBack').style.display = 'none';
    });

   }  
 

 //restarting the game
function restartTheGame() {
restart.addEventListener('click', function() {
	moves = 0;
	stopTimer();
	// if (starIcon[0].remove()) {
	// 	starList.appendChild(starIcon);
	// };
	cardList.forEach(function (card) {
	if(card.classList.contains('open') && card.classList.contains('show') && card.classList.contains('match')) {
		card.classList.remove('open', 'show', 'match');
	}
	});
	createDeck();
	activateCards();
	
    console.log('Restarting the game!')
});
}
restartTheGame()

//to start the new Game
function newGame() {
	stopTimer();
	moves = 0;
	cardList.forEach(function (card) {
	if(card.classList.contains('open') && card.classList.contains('show') && card.classList.contains('match')) {
		card.classList.remove('open', 'show', 'match');
	}
});

	createDeck();
	activateCards();
		
	console.log('New game!');

}

//replay
let replay = document.querySelector('.fa-repeat');
replay.addEventListener('click', function(e) {
gameOn();
checkingCards();
});

// When the user clicks anywhere outside of the modal, close it

