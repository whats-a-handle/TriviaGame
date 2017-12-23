function createGame(){

	const Game = {

	questionPool:[],
	correctAnswers : 0,
	incorrectAnswers: 0,
	questionTextElement: $(".question-text"),
	answerContainerElement: $(".answer-button-container"),
	addQuestion : function(question){
		this.questionPool.push(question);
	},
	nextQuestion:function(){
		
		const randomQuestionIndex = Math.floor(Math.random() * this.questionPool.length);
		const question = this.questionPool[randomQuestionIndex];

		this.questionPool.splice(randomQuestionIndex, 1);

		return question;
	},
	checkSelectedAnswer:function(selection,question){
		//check if the selected answer is the correct answer
	},
		//currently only updates container with buttons for answers
		//next is updating the actual header text to be the question
	emptyQuestionElement:function(){



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

				questionElements.push("<p><a class=\"btn btn-primary btn-lg\" role=\"button\">"+ item + "</p>");

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
	//create buttons based off of the answer list in our question object
	game.addQuestion(createQuestion("Question 1?","No1", ["Yes1","No1"]));
	game.addQuestion(createQuestion("Question 2?", "Yes2", ["Yes2","No2"]));
	game.addQuestion(createQuestion("Question 3?", "Yes3", ["Yes3","No3"]));
	game.updateQuestionElement(game.nextQuestion());



});