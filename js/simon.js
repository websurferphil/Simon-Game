/////////////////////////
// Variable and Clears //
/////////////////////////

var computerList = []; // Holds the list of plays the computer generated
var turn = 0;
var score = 1;
var gameStart = false;
var strictMode = false;
var soundOne = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var soundTwo = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var soundThree = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3" );
var soundFour = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var alertBox = $(".alert"); // Quick alert section grab
var alertSpan = $("#alert"); // Quick alert section grab
var playInterval; // so we can stop the interval

///////////////
// Functions //
///////////////

// Generates the next button in the sequence once
// the player gets everything correct

var computerTurn = function() {
  computerList.push( Math.floor( Math.random() * 4 ) );
};

// The next two allow the button to flash and play a sound.
// num is for which button to press and which sound to play

var flashButton = function(num) {
  switch (num) {
    case 0:
      $("#up-left-button").animate({
        backgroundColor: "rgba(53, 19, 48, 0.5)"
      }, 250).animate({
        backgroundColor: "rgba(53, 19, 48, 1)"
      }, 250);
      break;
    case 1:
      $("#up-right-button").animate({
        backgroundColor: "rgba(100, 144, 138, 0.5)"
      }, 250).animate({
        backgroundColor: "rgba(100, 144, 138, 1)"
      }, 250);
      break;
    case 2:
      $("#low-left-button").animate({
        backgroundColor: "rgba(232, 202, 164, 0.25)"
      }, 250).animate({
        backgroundColor: "rgba(232, 202, 164, 1)"
      }, 250);
      break;
    case 3:
      $("#low-right-button").animate({
        backgroundColor: "rgba(204, 42, 65, 0.5)"
      }, 250).animate({
        backgroundColor: "rgba(204, 42, 65, 1)"
      }, 250);
      break;
    default:
      break;
  }
};

var playSound = function(num) {
  switch (num) {
    case 0:
      soundOne.play();
      break;
    case 1:
      soundTwo.play();
      break;
    case 2:
      soundThree.play();
      break;
    case 3:
      soundFour.play();
      break;
    default:
      break;
  }

};


// Plays the button and makes a noise. Timeout is offset so
// the sounds do not all play at once.
// num is for the place within the array - arr is for the array itself

var playButton = function(num, arr) {
  setTimeout( function() {
    playSound(arr[num]);
    flashButton(arr[num]);
  }, num *  850 );
};

// This allows the computer to play the whole sequence.
// arr is for the array that is being used.

var computerPlay = function(arr) {

  for (var i = 0; i < arr.length; i++) {
    playButton(i, arr);
  }

};

// This will check if the player is correct in their input.
// number is for what the player pressed.
// arrayNum is for the number in the computer's sequence.

var playerCheck = function(number, arrayNum) {
  if ( computerList[arrayNum] === number) {
    return true;
  } else {
    return false;
  }
};


// Restarts the whole game.

var restart = function() {
  computerList = [];
  turn = 0;
  score = 0;
  $("#level").html("0");
  $("#myonoffswitch").removeAttr("disabled");
  gameStart = false;
  clearInterval(playInterval);
};

// Starts the game.

var startGame = function() {
  if ($("#myonoffswitch").is(":checked")) {
    strictMode = true;
  } else {
    strictMode = false;
  }

  gameStart = true;
  computerTurn();
  playButton(0,computerList);
  $("#myonoffswitch").attr("disabled", true);
};

// Defines the errors based off if the game is in strictMode or not.

var error = function () {
  if (strictMode) {
    alertBox.show();
    alertSpan.html("You clicked the wrong one - time to start over. Press OK then start to try again.");
    restart();
  } else {
    alertBox.show();
    alertSpan.html("You clicked the wrong one - press OK and then try again.");
  }
};

// Checks to see if the player is at the end of sequence.

var checkIfEnd = function() {
  if (turn === computerList.length - 1) {
    return true;
  }
  return false;
};

// If the above function returns true, check to see if the game is over
// or if it is just at the end of the sequence.

var ifEndIsTrue = function() {
  if (score < 21) {
    score++;
    $("#level").html(score);
    turn = 0;
    computerTurn();
    setTimeout(function() {
      computerPlay(computerList);
    }, 1500);
  } else {
    setTimeout( function() {
      alertBox.show();
      alertSpan.html("You won! Press OK and then try again.");
      restart();
    }, 1000);
  }
};

//////////////////
// Click events //
//////////////////

$("#ok").click(function() {
  alertBox.hide();

  // If not in strict mode, this will just return the turn counter to zero
  // for the player to start over.

  if (!(strictMode) && gameStart) {
    computerPlay(computerList);
    turn = 0;
  }
});


$(".start").click(function() {
  // If gameStart is false, start the game. Basically disables the button if the
  // game is running.
  if (!gameStart) {
    startGame();
  }
});

$(".restart").click(function() {
  restart();
});

$("#up-left-button").click(function() {
  if (gameStart) {

    playButton(0,[0]);
    if (playerCheck(0, turn)) {
      if (checkIfEnd()) {
        ifEndIsTrue();
      } else {
        turn++;
      }
    } else {
      error();
    }
  }
});

$("#up-right-button").click(function() {
  if (gameStart) {

    playButton(0,[1]);
    if (playerCheck(1, turn)) {
      if (checkIfEnd()) {
        ifEndIsTrue();
      } else {
        turn++;
      }
    } else {
      error();
    }
  }
});

$("#low-left-button").click(function() {
  if (gameStart) {

    playButton(0,[2]);
    if (playerCheck(2, turn)) {
      if (checkIfEnd()) {
        ifEndIsTrue();
      } else {
        turn++;
      }
    } else {
      error();
    }
  }
});

$("#low-right-button").click(function() {
  if (gameStart) {

    playButton(0,[3]);
    if (playerCheck(3, turn)) {
      if (checkIfEnd()) {
        ifEndIsTrue();
      } else {
        turn++;
      }
    } else {
      error();
    }
  }
});
