// /Betting System: Add a feature for players to place bets.
// Balance Tracking: Keep track of the player's balance and adjust it based on wins and losses.
// Multiple Rounds: Allow multiple rounds without refreshing the page.
// Statistics: Track and display game statistics like total games played, wins, and losses.
let dealerSum = 0;
let yourSum = 0;
let balance = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
//since Ace can be considered as 1 or 11

var hidden;
var deck;

var canHit = true; //allows the player to draw if(yourSum<=21)

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};
function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}
function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  //after we have the hidden card
  dealerAceCount += checkAce(hidden);
  // console.log(hidden);
  // console.log(dealerSum);
  while (dealerSum < 17) {
    //if sum is less than 17
    //we will be giving cards to the dealer
    let cardImg = document.createElement("img"); //create a img tag

    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
    //getting a random card from deck
    //so what we did right here
    //we create a <img src="./cards/4-C.png">
    //we appending the card until the sum is gr8er than 17
  }
  console.log(dealerSum);
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }
}
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stay").addEventListener("click", stay);
document.getElementById("input").disabled = false;
function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }
}

function getValue(card) {
  let data = card.split("-"); //"4-C"//by calling split -> [4,C]
  let value = data[0];

  if (isNaN(value)) {
    //checking if contains digits, return  true if not a number
    //so its either A,J,Q,K , if its an A then we return 11 else we return 10;
    if (value == "A") return 11;
    return 10;
  }
  return parseInt(value); //converts string to a int and return its
}

function checkAce(card) {
  if (card[0] == "A") return 1;
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;

  document.getElementById("hidden").src = "./cards/" + hidden + ".png";
  let message = "";

  if (yourSum > 21) {
    message = "You Lose!!";
    let inputValue = document.getElementById("input").value;
    document.getElementById("amount").innerText = 0;
    
  } else if (dealerSum > 21) {
    message = "You Win!!";
    let inputValue = document.getElementById("input").value;
    document.getElementById("amount").innerText = inputValue*2;
    inputValue = inputValue * 2;
  } else if (yourSum == dealerSum) {
    message = "Tie!!..Bet again";
  } else if (yourSum > dealerSum) {
    message = "You Win!!";
    let inputValue = document.getElementById("input").value;
    document.getElementById("amount").innerText = inputValue*2;
    balance = parseInt(inputValue);
  } else if (yourSum < dealerSum) {
    message = "You Lose!!";
    let inputValue = document.getElementById("input").value;
    document.getElementById("amount").innerText = 0;
  }
  document.getElementById("result").innerText = message;
  document.getElementById("dealer-sum").innerText += dealerSum;
  document.getElementById("your-sum").innerText += yourSum;
}
function reloadPage() {
  location.reload();
}
document.getElementById("refresh").addEventListener("click", reloadPage);

document.getElementById("set").addEventListener("click", function () {
  let inputValue = document.getElementById("input").value;
  document.getElementById("amount").innerText = inputValue;
  balance = parseInt(inputValue);
  document.getElementById("input").disabled = true;
});
