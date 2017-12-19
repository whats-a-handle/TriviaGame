function createGame(){

	const Game = {

	questionPool:[],
	correctAnswers : 0,
	incorrectAnswers: 0,
	nextQuestion:function(){
		//do stuff after our timer is up
	},
	checkSelectedAnswer:function(selection,question){
		//check if the selected answer is the correct answer
	},
		//currently only updates container with buttons for answers
		//next is updating the actual header text to be the question
	updateQuestionElement:function(question){

		let questionElements = question.generateQuestionElements();

		for(let i = 0; i < questionElements.length; i++){

			$(".answer-button-container").append(questionElements[i]);
		}
		

	}


}

	return Game;
}




function createQuestion(question,answer,answerPool){

	const Question = {

		question:question,
		answer:answer,
		answerPool: answerPool,
		questionElements:this.generateQuestionElements,

		generateQuestionElements: function(){
			const question = this;
			const questionElements = [];
			for(let i = 0; i < this.answerPool.length; i++){
				const questionElement = "<p><a class=\"btn btn-primary btn-lg\" role=\"button\">"+ question.answerPool[i] +"</a></p>";

				questionElements.push(questionElement);
			}
			
			return questionElements;
		}
		
		
	}

	return Question;
}




$( document ).ready(function(){
	
	let question_one = createQuestion("Who Killed Roger Rabbit?","Global Warming", ["global warming","babe ruth","charlie chaplin"]);
	//testing the ambiguous object
	console.log(question_one);
	
	var game = createGame();
	//create buttons based off of the answer list in our question object
	game.updateQuestionElement(question_one);


});