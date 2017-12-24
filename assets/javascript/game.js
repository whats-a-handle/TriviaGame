function createGame(){

	const Game = {

	questionPool:[],
	timeoutPool:[],
	intervalPool:[],
	correctAnswers : 0,
	incorrectAnswers: 0,
	skippedAnswers: 0,
	previousSelection: "default",
	currentAnswer: undefined,
	questionTextElement: $(".question-text"),
	answerContainerElement: $(".answer-button-container"),
	alertContainer: $(".answer-container"),
	addQuestion : function(question){
		this.questionPool.push(question);
	},

	gameOver: function(){
		const game = this;
		clearInterval(game.intervalPool[game.intervalPool.length-1]);
		$(".countdown").empty();
		//game.alertContainer.empty();
		if(game.correctAnswers > (game.incorrectAnswers + game.skippedAnswers)){
			console.log("You win!");
			game.questionTextElement.html("<h1>You WIN!</div>");
		}
		else{
			console.log("You LOSE");
			game.questionTextElement.html("<h1>You LOSE!</div>");
			//Need to update by creating a win screen
		}

		game.answerContainerElement.html("<h2>Your Score</h2>");
		game.answerContainerElement.append("<h3>Correct: " + game.correctAnswers +"</h3>");
		game.answerContainerElement.append("<h3>Incorrect: " + game.incorrectAnswers +"</h3>");
		game.answerContainerElement.append("<h3>Skipped: " + game.skippedAnswers +"</h3>");
		game.answerContainerElement.append("<p><a class=\"btn btn-primary btn-lg btn-restart\" role=\"button\">RESTART</p>");

		console.log("Correct: " + game.correctAnswers + " Incorrect: " + game.incorrectAnswers + " Skipped: " + game.skippedAnswers);

	},
	nextQuestion:function(){
		const game = this;
		game.countdown();

		if(game.previousSelection === undefined){
				game.skippedAnswers++;
				game.alertContainer.append("<div class=\"alert alert-danger\">"+
  			"<strong>SLOWPOKE! The correct answer was " + game.currentAnswer + "</strong></div>");
				setTimeout(function(){game.alertContainer.empty()},3500);
			
			}

		game.clearQuestionAnswerElements();

		if(game.questionPool.length > 0){
			
			const randomQuestionIndex = Math.floor(Math.random() * game.questionPool.length);
			const question = game.questionPool[randomQuestionIndex];
			game.currentAnswer = question.answer;
			game.questionPool.splice(randomQuestionIndex, 1);

			game.updateQuestionElement(question);
			console.log("adding timeout...");
			game.timeoutPool.push(setTimeout(function(){
			game.previousSelection = undefined;
			game.nextQuestion();
		}, 10000));

		}
		else{

			game.gameOver();
		}
		
	},
	checkIsCorrect:function(selection,questionAnswer){
		const game = this;

		game.alertContainer.empty();
		if(selection === questionAnswer){
			game.correctAnswers++;
			game.alertContainer.append("<div class=\"alert alert-success\">"+
  			"<strong>Correct!</strong></div>");
		}
		else{
			game.incorrectAnswers++;
			game.alertContainer.append("<div class=\"alert alert-danger\">"+
  			"<strong>Incorrect! The correct answer was " + questionAnswer + "</strong></div>");
		}	
	},
		//currently only updates container with buttons for answers
		//next is updating the actual header text to be the question
	clearQuestionAnswerElements:function(){

		const game = this;

		game.questionTextElement.empty();
		game.answerContainerElement.empty();


	},
	//Using "this" in a map refers to the array i think and not the actual object
	updateQuestionElement:function(question){
		const game = this;

		game.questionTextElement.append("<h1>" + question.questionText + "</h1>");
		question.questionElements.map(function(questionElement){

			game.answerContainerElement.append(questionElement);

		});
				
	},

	restartGame: function(){
		const game = this;
		game.questionPool=[];
		game.timeoutPool=[];
		game.intervalPool = [];
		game.correctAnswers = 0;
		game.incorrectAnswers = 0;
		game.skippedAnswers = 0;
		game.previousSelection =  "default";
		game.currentAnswer = undefined;

		game.clearQuestionAnswerElements();
		game.alertContainer.empty();
		Game.addQuestion(createQuestion("Who Killed Roger Rabbit?","That creepy guy with the trenchcoat", 
												["Bob Marley","Jessica Rabbit", "Talking car","That creepy guy with the trenchcoat"]));
		Game.addQuestion(createQuestion("Your favorite colour is blue", "Yes", ["Yes","No"]));
		Game.addQuestion(createQuestion("What happened on December 23rd, 1979?", "Soviet tanks went into Afghanistan", 
												["Swedish troops occupy Norway","The Beatles released their first album",
												"Soviet tanks went into Afghanistan","The first computer was created"]));
	},
	countdown:function(){
		const game = this;
		let i = 10;
		clearInterval(game.intervalPool[game.intervalPool.length-1]);
		game.intervalPool.push(setInterval(function(){

			$(".countdown").html("<h1>" + --i + "</h1>");
		},1000));
	
}






}
	
	Game.restartGame();

	return Game;
}


//;

function createQuestion(questionText,answer,answerPool){

	const Question = {

		questionText:questionText,
		answer:answer,
		answerPool: answerPool,
		questionElements:undefined,
		generateQuestionElements: function(){
			const questionElements = [];

			answerPool.map(function(item){

				questionElements.push("<p><a class=\"btn btn-primary btn-lg btn-answer\" role=\"button\" value=\"" + item + "\">"+ item + "</p>");

			});
				
			return questionElements;
		},

				
	}
	//I really don't like this.
	//I was unable to invoke the function on object creation, so i will have to do it outside
	Question.questionElements = Question.generateQuestionElements();

	return Question;
}

	

	$( document ).ready(function(){

		const game = createGame();
		
		game.nextQuestion();
		game.previousSelection = undefined;

		 $(document).on("click",".btn-answer",function(){
		 	clearTimeout(game.timeoutPool[game.timeoutPool.length-1]);
		 	game.previousSelection = $(this).attr("value");
		 	game.checkIsCorrect(game.previousSelection,game.currentAnswer);
		 	setTimeout(function(){game.alertContainer.empty()},3500);
		 	game.nextQuestion();

		 });

		 $(document).on("click",".btn-restart",function(){

		 	game.restartGame();
		 	game.nextQuestion();
		 	game.previousSelection = undefined;




		 });



});