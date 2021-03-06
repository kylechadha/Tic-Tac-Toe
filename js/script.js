
var elements = document.getElementsByClassName('cell');
var rows = document.getElementsByClassName('row');
var header = document.getElementsByTagName('h1');
var alternate = 0;
var counter = 0;
var board = [["","",""],["","",""],["","",""]];
var xWin = "XXX";
var oWin = "OOO";
var win = false;
var pendingX = {};
var pendingO = {};
var timerX;
var timerO;

var play = function() {
  for (i = 0; i < elements.length; i++) {
    elements[i].onclick = function () {
      if (this.className[0] == "c" && win == false) {
        if (alternate % 2 == 0) {
          this.className = "xmove";
          alternate++;
          counter++;
          var paramPass = this;
          timerX = setTimeout(function() {delete pendingX[timerX]; disappear(paramPass);}, 10000);
          pendingX[timerX] = 1;
        } else {
          this.className = "omove";
          alternate++;
          counter++;
          var paramPass = this;
          timerO = setTimeout(function() {delete pendingO[timerO]; disappear(paramPass);}, 10000);
          pendingO[timerO] = 1;
        }
      }
      position(this);
      analysis();
    }
  }
}

var disappear = function(y) {
  if (win == false) {
    counter -= 1;
    var pos = y.id;
    var row = pos[1];
    var col = pos[3];
    board[row][col] = "";
    y.className = "cell animated bounceIn";    
  }
}

var position = function(x) {
  if (x.className == "xmove") {
    var pos = x.id;
    var row = pos[1];
    var col = pos[3];
    board[row][col] = "X";
  } else {
    var pos = x.id;
    var row = pos[1];
    var col = pos[3];
    board[row][col] = "O";
  }
};

var analysis = function() {
  var scanRow1 = board[0].join("");
  var scanRow2 = board[1].join("");
  var scanRow3 = board[2].join("");
  var scanCol1 = board[0][0] + board[1][0] + board[2][0];
  var scanCol2 = board[0][1] + board[1][1] + board[2][1];
  var scanCol3 = board[0][2] + board[1][2] + board[2][2];
  var scanDag1 = board[0][0] + board[1][1] + board[2][2];
  var scanDag2 = board[0][2] + board[1][1] + board[2][0];

  if (xWin == scanRow1 || xWin == scanRow2 || xWin == scanRow3 || xWin == scanCol1 || xWin == scanCol2 || xWin == scanCol3 || xWin == scanDag1 || xWin == scanDag2) {
    header[0].innerHTML = "Congrats, X Wins!";
    win = true;
  } else if (oWin == scanRow1 || oWin == scanRow2 || oWin == scanRow3 || oWin == scanCol1 || oWin == scanCol2 || oWin == scanCol3 || oWin == scanDag1 || oWin == scanDag2) {
    header[0].innerHTML = "Congrats, O Wins!";
    win = true;
  } else if (counter == 9) {
    header[0].innerHTML = "Draw x_x";
  };
}

var reset = function() {
  header[0].innerHTML = "Tic Tac Toe";
  for (i = 0; i < rows.length; i++) {
    for (j = 1; j < 6; j += 2) {
      rows[i].childNodes[j].className = "cell animated bounceIn";
    }
  }
  board = [["","",""],["","",""],["","",""]];
  counter = 0;
  alternate = 0;
  win = false;
  clearTimer();
}

var clearTimer = function() {
  for (var timerX in pendingX) if (pendingX.hasOwnProperty(timerX)) {
    clearTimeout(timerX);
    delete pendingX[timerX];
  }
  for (var timerO in pendingO) if (pendingO.hasOwnProperty(timerO)) {
    clearTimeout(timerO);
    delete pendingO[timerO];
  }
}

window.onload = play;
