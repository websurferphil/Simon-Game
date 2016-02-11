/////////////////////////
// Variable and Clears //
/////////////////////////

var computerList = []; // Holds the list of plays the computer generated
var turn = 0;
var score = 0;
var gameStart = false;
var strictMode = false;
var soundOne = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var soundTwo = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var soundThree = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3" );
var soundFour = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var alertBox = $(".alert"); // Quick alert section grab
var alertSpan = $("#alert"); // Quick alert section grab

///////////////
// Functions //
///////////////

var computerTurn = function() {
  computerList.push( Math.floor( Math.random() * 4 ) );
};

var playButton = function(num, arr) {
  setTimeout( function() {
    playSound(arr[num]);
    flashButton(arr[num]);
  }, num *  850 );
};

var computerPlay = function(arr) {

  for (var i = 0; i < arr.length; i++) {
    playButton(i, arr);

  }

};

var playerCheck = function(number, arrayNum) {
  if ( computerList[arrayNum] === number) {
    return true;
  } else {
    return false;
  }
};

var playerFail = function() {
  gameStart = false;
  computerList = [];
};

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

var restart = function() {
  computerList = [];
  turn = 0;
  score = 0;
  $("#level").html("0");
  $("#myonoffswitch").removeAttr("disabled");
  gameStart = false;
};

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

var error = function () {
  if (strictMode) {
    console.log("strict");
    alertBox.show();
    alertSpan.html("You clicked the wrong one - time to start over. Press okay then start to try again.");
    restart();
  } else {
    alertBox.show();
    alertSpan.html("You clicked the wrong one - try again.");
    setTimeout(function() {
      alertBox.hide();
    }, 2500);
    computerPlay();
  }
};

var checkIfEnd = function() {
  if (turn === computerList.length - 1) {
    return true;
  }
  return false;
};

var ifEndIsTrue = function() {
  score++;
  $("#level").html(score);
  turn = 0;
  computerTurn();
  setTimeout(function() {
    computerPlay(computerList);
  }, 1500);
};

//////////////////
// Click events //
//////////////////

$("#ok").click(function() {
  alertBox.hide();
});

$(".start").click(function() {
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
