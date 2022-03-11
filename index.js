var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound("sounds/" + userChosenColour + ".mp3");
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var sound = "sounds/" + randomChosenColour + ".mp3";
  playSound(sound);

}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
    console.log("wrong");
  }
}
function startOver(){

  gamePattern=[];
  started=false;
  level=0;
}
