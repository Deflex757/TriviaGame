var triviaQuestions = [{
	question: "Which is not a starter pokemon??",
	answerList: ["Charmander", "Pigey", "Torchick", "Bulbasaur"],
	answer: 1
}, {
	question: "What type is Parasect??",
	answerList: ["Bug and Grass", "Electric", "Ice", "Fire and Ground"],
	answer: 0
}, {
	question: "What type is super effective against fire?",
	answerList: ["ground", "fire", "fairy", "rock"],
	answer: 0
}, {
	question: "What type is super effective against ghost?",
	answerList: ["normal", "bug", "dark", "fire"],
	answer: 2
}, {
	question: "What Pokemon is a water type?",
	answerList: ["Mew", "Mewtwo", "Pikachu", "Pyukumuku"],
	answer: 3
}, {
	question: "What does cheri berry do? (in the main games)",
	answerList: ["It cures paralysis", "+1 to current level", "Boosts Attack", "Nothing at all"],
	answer: 0
}, {
	question: "How many shapes/forms can Unown be?",
	answerList: ["3", "28", "17", "99"],
	answer: 1
}, {
	question: "What Pokemon is correctly spelled?",
	answerList: ["Meow", "Meowtwo", "Ninetales", "Pipichu"],
	answer: 2
}, {
	question: "Which is not a flavor in the Pokemon world?",
	answerList: ["bitter", "salty", "dry", "spicy"],
	answer: 1
}, {
	question: "Pick the gen 3 Pokemon.",
	answerList: ["Ratata", "Dragonite", "Charizard", "Nuzleaf"],
	answer: 3
}, {
	question: "What is the name of Ash's first pokemon?",
	answerList: ["Pikachu", "Charmander", "Charizard", "Mew"],
	answer: 0
}, {
	question: "How many badges does a trainer need to collect??",
	answerList: ["9", "8", "4", "5"],
	answer: 1
}, {
	question: "What happens after all 8 badges have been collected?",
	answerList: ["Get married", "Sleep", "Watch TV", "Elite Four"],
	answer: 3
}, {
	question: "How many members are in the Elite Four? ^_^",
	answerList: ["4", "5", "6", "7"],
	answer: 0
}, {
	question: "Which move does the most damage?",
	answerList: ["Rest", "Flamethrower", "Explosion", "Watergun"],
	answer: 2
}];

var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
	correct: "Yep, you got it",
	incorrect: "Nope, not it.",
	endTime: "Time is up!",
	finished: "Time to see your result!"
}

$('#startBtn').on('click', function () {
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function () {
	$(this).hide();
	newGame();
});

function newGame() {
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	next();
}

function next() {
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;

	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//checks to see correct, incorrect, or unanswered
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The answer was: ' + rightAnswerText);
		answered = true;
	}

	if (currentQuestion == (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 2000)
	} else {
		currentQuestion++;
		setTimeout(next, 2000);
	}
}

function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}