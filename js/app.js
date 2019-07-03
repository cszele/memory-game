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

var modal = document.getElementById("myModal");
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

// Stars
function showStars(moveCounter) {
    let stars = document.querySelector('.stars');
    if (moveCounter == 4) {
      stars.removeChild(stars.lastElementChild);
    } else if (moveCounter == 8) {
      stars.removeChild(stars.lastElementChild);
    }
  };

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
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

// timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
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
  let matchedCards = 0;
  let moves = document.querySelector('.moves');
  let moveCounter = 0;
  let cardsMatched = false;

  moves.innerHTML = moveCounter;
  let timer = setInterval(setTime, 1000);

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
                  matchedCards ++;
                  if (matchedCards == 8) {
                    cardsMatched = true;
                    clearInterval(timer);
                    allCardsMatch();
                  }
                }
                else  {
                //if cards don't match Hide
                    setTimeout(function() {
                      openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                      });
                openCards = [];

              }, 1000);
            }
            // if all cards are not matched yet
            if (cardsMatched == false) {
              moveCounter++;
              moves.innerHTML = moveCounter;
              showStars(moveCounter);
            }
          }
        }
    });
  });
};

  //modal
  function allCardsMatch () {
    gameOver();
    modal.style.display = "block";
  }

 function gameOver() {
   let time_results = document.querySelector('.time_results');
   let move_results = document.querySelector('.moves_results');
   let stars_results = document.querySelector('.stars_results');

   time_results.innerHTML = totalSeconds;
   move_results.innerHTML = document.querySelector('.moves').innerHTML;
   stars_results.innerHTML = document.querySelector('.stars').innerHTML;
 }

//replay
  let replay = document.querySelector('.fa-repeat');
  replay.addEventListener('click', function(e) {
    gameOn();
    checkingCards();
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
