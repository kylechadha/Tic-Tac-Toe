
/*Questions:
1. What of the variables in the global section actually need to be global? Is it better to keep things global, even if there is only one function using them?
2. Do I need to pass "this" to 'Position' or will this just be available since the onload function calls it?
3. Should I name the onload function? What's best practice here
4. What's the best order for my functions. What's the reason for putting the onclick in onload again?
5. Can I refactor the xWins / oWins checks to be simpler? Seems like a lot of redundancy.
6. Differences or best practices for single quotes vs. double quotes?
*/

/*To Do List:
1. Add timing elements
2. Add Player 1 v Player 2 score keeper
*/

var elements = document.getElementsByClassName('cell');
var rows = document.getElementsByClassName('row');
var header = document.getElementsByTagName('h1');
var alternate = 0;
var counter = 0;
var board = [["","",""],["","",""],["","",""]];
var xWin = "XXX";
var oWin = "OOO";
var win = false;
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
          timerX = setTimeout(function() {disappear(paramPass);}, 10000)
        } else {
          this.className = "omove";
          alternate++;
          counter++;
          var paramPass = this;
          timerO = setTimeout(function() {disappear(paramPass);}, 10000)
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
  clearTimeout(timerX);
  clearTimeout(timerO);
  board = [["","",""],["","",""],["","",""]];
  counter = 0;
  alternate = 0;
  win = false;
}

window.onload = play;
