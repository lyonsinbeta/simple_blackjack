function Card(suit, rank) {
  var suit = suit;
  var rank = rank;
  this.getSuit = function() {
    return suit;
  };
  this.getNumber = function() {
    return rank;
  };
  this.getValue = function() {
    if (rank === 11 || rank === 12 || rank === 13) {
      return 10;
    }
    if (rank === 1) {
      return 11;
    }
    else {
      return rank;
    }
  };
}

function deal() {
  var suit = Math.floor(Math.random() * 4 + 1);
  var rank = Math.floor(Math.random() * 13 + 1);
  return new Card(suit, rank);
}

function Hand() {
  var cards = [];
  cards.push(deal());
  cards.push(deal());
  this.getHand = function() {
    return cards;
  };
  this.score = function() {
    var c = cards.length;
    var sum = 0;
    var aces = 0;
    for (i = 0; i < c; i++) {
      sum += cards[i].getValue();
      if (cards[i].getValue() === 11) {
        aces++;
      }
      if (sum > 21 && aces > 0) {
        while (sum > 21 && aces > 0) {
          sum -= 10;
          aces--;
        }
      }
    }
    return sum;
  };
  this.printHand = function() {
    var c = cards.length;
    var showHand = "";
    for (var i = 0; i < c; i++) {
      showHand += cards[i].getNumber()+" of "+cards[i].getSuit();
    }
    return showHand;
  };
  this.displayHand = function() {
    var c = cards.length;
    var listHand = "";
    for (var i = 0; i < c; i++) {
      listHand += "<li>"+cards[i].getNumber()+" of "+cards[i].getSuit()+"</li>";
    }
    return listHand;
  };
  this.hitMe = function() {
    cards.push(deal());
  };
}

function playAsDealer() {
  var dealerHand = new Hand();
  while (dealerHand.score() < 17) {
    dealerHand.hitMe();
  }
  return dealerHand;
}

function playAsUser() {
  var playerHand = new Hand();
  document.getElementById('player').innerHTML = (playerHand.displayHand());
  var hit = confirm("Hit?");
  while(hit) {
    playerHand.hitMe();
    document.getElementById('player').innerHTML = (playerHand.displayHand());
    hit = confirm("Hit?");
  }
  return playerHand;
}

function declareWinner(playerHand, dealerHand) {
  var ps = playerHand.score();
  var ds = dealerHand.score();
  if (ps > 21) {
    if (ds > 21) {
      return "You tied!";
    }
    else { return "You lose!"; }
  }
  else if (ds > 21) {
    return "You win!";
  }
  else if (ps > ds) {
      return "You win!";
  }
  else if (ps === ds) {
    return "You tied!";
  }
  else { return "You lose!"; }
}

function playGame() {
  document.getElementById('player').innerHTML = "";
  document.getElementById('dealer').innerHTML = "";
  var player = playAsUser();
  var dealer = playAsDealer();
  document.getElementById('player').innerHTML = (player.displayHand());
  document.getElementById('dealer').innerHTML = (dealer.displayHand());
  document.getElementById('result').innerHTML = (declareWinner(player, dealer));
 }

