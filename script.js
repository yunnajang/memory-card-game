const cards = document.querySelectorAll('.card');

let cardOne, cardTwo;

function flipCard(e) {
  let clickedCard = e.target;

  // Execute only if user selects a new card
  if (clickedCard !== cardOne) {
    clickedCard.classList.add('flip');

    // If the user hasn't selected the first card, assign the clicked card to cardOne
    if (!cardOne) {
      return (cardOne = clickedCard);
    }

    cardTwo = clickedCard;

    // Save both cards' image sources
    let cardOneImg = cardOne.querySelector('img').src;
    let cardTwoImg = cardTwo.querySelector('img').src;

    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    return console.log('Card matched');
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
  }, 1200);
}

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});
