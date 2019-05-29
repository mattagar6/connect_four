var player1 = prompt('Player One: Enter your name, you will be blue.');
var player1Color = 'rgb(66, 134, 244)';

if (player1 === null || player1 === '') {
  player1 = 'Player 1';
}

var player2 = prompt('Player Two: Enter your name, you will be red.');
var player2Color = 'rgb(244, 65, 65)';

if (player2 === null || player2 === '') {
  player2 = 'Player 2';
}

var gameOn = true;
var table = $('table tr');

function changeColor(row,col,color) {
  // function that changes the color of a button at a particular board index

  // .find() method returns all descendent elements of the selected elements
  // ex. find all table cells in a given row of the table
  return table.eq(row).find('td').eq(col).find('button').css('background-color', color);
}

function returnColor(row, col) {
  // function that returns the color of a button at a particular board index
  // rtype: string

  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function checkBottom(col) {
  // function that returns the row index of the bottom most empty space on the board for a given col
  // rtype: int

  var colorReport = returnColor(5,col);

  // start at the bottom row, work your way up the table
  for (row = 5; row > -1; row--) {
    colorReport = returnColor(row,col);
    // if the color of the current tile is gray
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

// Check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('hor');
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vert');
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {

  // check for diagonal wins with a positive slope
  for (var row = 5; row > 2; row--) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diagUp');
        return true;
      }
    }
  }
  // check for diagonal wins with a negative slope
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 4; col++) {

      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diagDown');
        return true;
      }
    }
  }

  // for (var col = 0; col < 7; col++) {
  //   for (var row = 0; row < 6; row++) {
  //     if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
  //       console.log('diagUp');
  //       return true;
  //     }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
  //       console.log('diagDown');
  //       return true;
  //     }else {
  //       continue;
  //     }
  //   }
  // }
}

// Game End
function gameEnd(winningPlayer) {
    $('h1').text(winningPlayer+" has won! Refresh your browser to play again!");
    $('h5').text('');
    $('.board button').attr('disabled', true);
}

function tieGame() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (returnColor(row, col) === 'rgb(128, 128, 128)') {
        return false;
      }
    }
  }

  return true;
}

// start the game with player1's turn
var blueTurn = true;
var currentName = player1;
var currentColor = player1Color;

$('#whosTurn').text(currentName + ' it is your turn, pick a column to drop in.');

$('.board button').on('click', function(){

  // get the column index in the table
  var col = $(this).closest('td').index();

  var bottomRow = checkBottom(col);

  //place the chip, connect four style
  changeColor(bottomRow, col, currentColor);

  // check if the current player has won the game
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
  } else if(tieGame()){
    $('h1').text("Tie game! Refresh your browser to play again!");
    $('h5').text('');
    $('.board button').attr('disabled', true);
  } else {
    blueTurn = !blueTurn;

    if (blueTurn) {
      currentName = player1;
      currentColor = player1Color;
      $('#whosTurn').text(currentName + ' it is your turn, pick a column to drop in.');
    } else {
      currentName = player2;
      currentColor = player2Color;
      $('#whosTurn').text(currentName + ' it is your turn, pick a column to drop in.');
    }
  }
});
