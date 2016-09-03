//$(document).ready(function() {

var workArray = [];
var currLen;
var longId = "";
var qId = "";
var dontClick;
var correctAnswers;
var wrongAnswers;
var currQuestion = {};
var answerToGreen = "";
var startTime;
var counter;
var timesUp;
var questionNumber;
var doCount = true;

$("#gameSpace").show();
$("#startGame").show();
$("#questionPart").hide();
$("#optionPart").hide();
$("#timerSpace").hide();

function newGame() {
workArray = questions;
currLen = workArray.length;
dontClick = 1;
correctAnswers = 0;
wrongAnswers = 0;
startTime = 15;
questionNumber = 1;
nextQuestion();

getQuestion();

}

$("#startGame").click(newGame);

function nextQuestion() {
clearInterval(counter);
clearInterval(fifteenSec);
clearTimeout(timesUp);

	$("#questionPart").show();
	$("#optionPart").show();
	$("#timerSpace").show();
	$("#answerSpace").hide();
	$("#startGame").hide();
	$("#imgSpace").hide();
	startTime = 15;
	timesUp = setTimeout(outtaTime, 1000 * 16);
	counter = setInterval(fifteenSec,1000);
	doCount = true;

	dontClick = 1;
currIndex = Math.floor(Math.random()*currLen);
currQuestion = workArray[currIndex];
$("button").removeClass("btn-success btn-danger");
$("button").addClass("btn-primary");
$("#questionPart").html("<h3>Question " + questionNumber + ": " + currQuestion.question + "</h3>");
$("#optionA").html(currQuestion.a[0]);
$("#optionB").html(currQuestion.b[0]);
$("#optionC").html(currQuestion.c[0]);
$("#optionD").html(currQuestion.d[0]);

}

function fifteenSec() {
	$("#timerSecs").text(startTime);
	startTime--;
}

function outtaTime() {
	clearInterval(counter);
	dontClick = 0;
	wrongAnswers++;
	$("#answerSpace").show();
	$("#answerSpace").html("Sorry, time's up!");
		if (questionNumber < 20) {
			clearInterval(counter);
			clearInterval(fifteenSec);
			clearTimeout(timesUp);
			setTimeout(nextQuestion,3000);
			questionNumber++;
		} else {
			clearInterval(counter);
			clearInterval(fifteenSec);
			clearTimeout(timesUp);
			$("#startGame").show();
			var closingString = "You got " + wrongAnswers + " questions wrong and scored " + correctAnswers + " questions correctly!<br>Thanks for playing!<br>";
			$("#startGame").html(closingString);
		}

		function correctKey(qObject) {
		var result = {};
		    for (var key in qObject) {
		        if (qObject[key][1] == true) {
		            result[key] = qObject[key];
		            answerToGreen = result[key][0];
					return answerToGreen;
		        }
			}
	    }
		correctKey(currQuestion);
		$("button:contains('" + answerToGreen + "')").removeClass("btn-primary").addClass("btn-success");
		$("#imgSpace").show();
		$("#imgSpace").html("<img src=\"assets/images/" + currQuestion.image + "\" class=\"img-responsive w3-animate-opacity\"/>");
		workArray.splice(currIndex,1);
		currLen = workArray.length;
}

function getQuestion() {

$(".optionButton").on("click", function() {

if (dontClick === 1) {
	longId = this.id;
	qId = longId.charAt(6);
	qId = qId.toLowerCase(qId);
	dontClick = 0;
	clearInterval(counter);
	clearTimeout(timesUp);
	clearInterval(fifteenSec);

		$("#answerSpace").show();
		$("#imgSpace").show();
		$("#imgSpace").html("<img src=\"assets/images/" + currQuestion.image + "\" class=\"img-responsive w3-animate-opacity\"/>");
	//migrated to nesting within dontClick conditional
	if (currQuestion[qId][1] === true) {
		correctAnswers = correctAnswers + 1;
		$(this).removeClass("btn-primary").addClass("btn-success");
		$("#answerSpace").html("Correct!");
	} else {
		
		function correctKey(qObject) {
		var result = {};
		    for (var key in qObject) {
		        if (qObject[key][1] == true) {
		            result[key] = qObject[key];
		            answerToGreen = result[key][0];
					return answerToGreen;
		        }
			}
	    }
		correctKey(currQuestion);
		wrongAnswers++;
		$("button:contains('" + answerToGreen + "')").removeClass("btn-primary").addClass("btn-success");
		$(this).removeClass("btn-primary").addClass("btn-danger");
		$("#answerSpace").html("Sorry, wrong answer!");

	}

workArray.splice(currIndex,1);
currLen = workArray.length;
questionNumber++;

	if (currLen === 0) {
		$("#startGame").show();
		var closingString = "You got " + wrongAnswers + " questions wrong and scored " + correctAnswers + " questions correctly!<br>Thanks for playing!<br>";
		$("#startGame").html(closingString);
	}

}

	if (currLen > 0) {
	clearInterval(counter);
	clearTimeout(timesUp);
	clearInterval(fifteenSec);

	setTimeout(nextQuestion,3000);
	console.log(counter);
	}

});

}

//});