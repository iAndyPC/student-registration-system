'use strict';

function gamePairs () {
   const BUTTON_RELOAD = document.querySelector('button');
   BUTTON_RELOAD.addEventListener('click',function () {
      window.location.reload();
   })

   const ARR_PAIRS_OF_NUMBERS = [
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
   ];
   function shuffle(arr){
      let j, temp;
      for(let i = arr.length - 1; i > 0; i--){
         j = Math.floor(Math.random()*(i + 1));
         temp = arr[j];
         arr[j] = arr[i];
         arr[i] = temp;
      }
      return arr;
   }
   const arrShuffled = shuffle(ARR_PAIRS_OF_NUMBERS);

   // Assigning a number to a card
   for (let card of document.querySelectorAll('li')) {
      card.innerText = arrShuffled.pop();
   }
   // Opening cards
   let cardOne;
   let cardTwo;
   let openCardCounter = 0;
   const gameContainer = document.querySelector('ul');

   function flipCard (card) {
      if (card.classList.contains('locked')) {
         return;
      }
      card.classList.toggle('game-container__card_closed');
      card.classList.toggle('game-container__card_open');
   }
   gameContainer.addEventListener('click', function (event) {
      let target = event.target.closest('li')
      if (!target) return;
      flipCard(target);
      // Opening the first card
      if (cardOne === undefined) {
         cardOne = target;
         return;
      }
      // Opening the second card
      if (cardTwo === undefined) {
         cardTwo = target;
         // If cards 1 and 2 are not the same, leave them open
         if (cardOne.innerText !== cardTwo.innerText) {
            return;
         }
      }
      // If cards 1 and 2 are the same, leave them open and block
      if (cardOne.innerText === cardTwo.innerText) {
         cardOne.classList.add('locked');
         cardTwo.classList.add('locked');
         cardOne = undefined;
         cardTwo = undefined;
         openCardCounter = openCardCounter + 2
         if (openCardCounter === 16) {
            BUTTON_RELOAD.style.display = 'block';
         }
         return;
      }

      // If cards 1 and 2 are not the same, the face up card becomes the first
      if (cardOne.innerText !== cardTwo.innerText) {
         flipCard(cardOne);
         flipCard(cardTwo);
         cardOne = target;
         cardTwo = undefined;
      }
   })

} gamePairs()
