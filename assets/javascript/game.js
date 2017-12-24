function createGame(){

	const Game = {

	questionPool:[],
	correctAnswers : 0,
	incorrectAnswers: 0,
	skippedAnswers: 0,
	currentAnswer: undefined,
	questionTextElement: $(".question-text"),
	answerContainerElement: $(".answer-button-container"),
	addQuestion : function(question){
		this.questionPool.push(question);
	},

	gameOver: function(){
		const game = this;

		if(game.correctAnswers > (game.incorrectAnswers + game.skippedAnswers)){
			console.log("You win!");
			//Need to update by creating a win screen
		}
		else{
			console.log("You LOSE");
			//Need to update by creating a win screen
		}

	},
	nextQuestion:function(){
		const game = this;

		game.clearQuestionAnswerElements()
		if(game.questionPool.length > 0){
			const randomQuestionIndex = Math.floor(Math.random() * game.questionPool.length);
			const question = game.questionPool[randomQuestionIndex];
			game.currentAnswer = question.answer;
			game.questionPool.splice(randomQuestionIndex, 1);

			game.updateQuestionElement(question);

		}
		else{

			game.gameOver();
		}
		
	},
	checkIsCorrect:function(selection,questionAnswer){
		const game = this;
		if(selection === questionAnswer){
			game.correctAnswers++;
		}
		else{
			game.incorrectAnswers++;
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






	const game = createGame();
	game.addQuestion(createQuestion("Question 1?","No1", ["Yes1","No1"]));
	game.addQuestion(createQuestion("Question 2?", "Yes2", ["Yes2","No2"]));
	game.addQuestion(createQuestion("Question 3?", "Yes3", ["Yes3","No3"]));

	game.nextQuestion();

	$( document ).ready(function(){
		 $(document).on("click",".btn-answer",function(){

		 	const selectedAnswer = $(this).attr("value");
		 	game.checkIsCorrect(selectedAnswer,game.currentAnswer);
		 	game.nextQuestion();
		 });



});