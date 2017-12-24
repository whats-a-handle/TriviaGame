function createGame(){

	const Game = {

	questionPool:[],
	timeoutPool:[],
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
		game.alertContainer.empty();
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

		console.log("Correct: " + game.correctAnswers + " Incorrect: " + game.incorrectAnswers + " Skipped: " + game.skippedAnswers);

	},
	nextQuestion:function(){
		const game = this;

		if(game.previousSelection === undefined){
				game.skippedAnswers++;
				game.alertContainer.append("<div class=\"alert alert-danger\">"+
  			"<strong>SLOWPOKE! The correct answer was " + game.currentAnswer + "</strong></div>");
				setTimeout(function(){game.alertContainer.empty()},3000);
			
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
				
	}


}


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
		game.addQuestion(createQuestion("Question 1?","No1", ["Yes1","No1"]));
		game.addQuestion(createQuestion("Question 2?", "Yes2", ["Yes2","No2"]));
		game.addQuestion(createQuestion("Question 3?", "Yes3", ["Yes3","No3"]));

		game.nextQuestion();
		game.previousSelection = undefined;

		 $(document).on("click",".btn-answer",function(){
		 	clearTimeout(game.timeoutPool[game.timeoutPool.length-1]);
		 	game.previousSelection = $(this).attr("value");
		 	game.checkIsCorrect(game.previousSelection,game.currentAnswer);
		 	setTimeout(function(){game.alertContainer.empty()},3000);
		 	game.nextQuestion();

		 });



});