const cards = document.querySelectorAll('.card');

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
  let clickedCard = e.target;

  // Execute only when the user selects a new card and the current pair of flipped cards has been checked
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add('flip');

    // If the user hasn't selected the first card, assign the clicked card to cardOne
    if (!cardOne) {
      return (cardOne = clickedCard);
    }

    cardTwo = clickedCard;
    disableDeck = true;

    // Save both cards' image sources
    let cardOneImg = cardOne.querySelector('img').src;
    let cardTwoImg = cardTwo.querySelector('img').src;

    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;

    // When the user has mathced all the cards, shuffle them after 1 second
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }

    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    cardOne = cardTwo = '';

    // Enable card flipping
    return (disableDeck = false);
  }

  // When the cards don't match
  // Add the shake class to both cards after 400ms
  setTimeout(() => {
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
  }, 400);

  // Remove the shake and flip classes from both cards after 1.2 seconds
  setTimeout(() => {
    cardOne.classList.remove('shake', 'flip');
    cardTwo.classList.remove('shake', 'flip');
    cardOne = cardTwo = '';

    // Enable card flipping
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = '';

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  // Restore all cards to their initial state
  cards.forEach((card, index) => {
    // Turn the cards face down again
    card.classList.remove('flip');

    // Assign a random image to each card
    let imgTag = card.querySelector('img');
    imgTag.src = `img/img-${arr[index]}.png`;

    card.addEventListener('click', flipCard);
  });
}

shuffleCard();

// Add click event listener to all cards
cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});
