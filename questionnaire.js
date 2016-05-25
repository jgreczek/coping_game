var questions = [{
    question: "What is 2*5?",
    choices: ["kkk", 5, 10, 15, 20],
    correctAnswer: 2
  }, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
  }, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

 var ros;
 var main_topic;
 window.onload = setup;

  function setup() {

//Make sure to change the IP
	var ros = new ROSLIB.Ros({
	//Use the localhost one if running in on the laptop only
	//Use the local IP if accessing it from tablet
	url : 'ws://192.168.7.244:9090'
	});

	ros.on('connection',function(){
	console.log('Connecting to websocket server.');
	});

	ros.on('error',function(error){
	console.log('Error connecting to websocket server: ', error);
	});

	ros.on('close',function(){
	console.log('Connection to websocket closed.');
	});

	main_topic = new ROSLIB.Topic({
	ros: ros,
	name: '/Game_MAKI',
	messageType: 'std_msgs/String'

	});

 	start_questionnaire();

  }


  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'finish' button
  $('#finish').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    //func();
    
    document.location.href = 'painRate.html';
    //questionCounter = 0;
    //selections = [];
    //displayNext();
    //$('#finish').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });


 
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
	var nextQuestion = createQuestionElement(questionCounter);
	quiz.append(nextQuestion).fadeIn();
	if (!(isNaN(selections[questionCounter]))) {
	  $('input[value='+selections[questionCounter]+']').prop('checked', true);
	}
	
	// Controls display of 'prev' button
	if(questionCounter === 1){
	  $('#prev').show();
	} else if(questionCounter === 0){
	  
	  $('#prev').hide();
	  $('#next').show();
	}
	$('#finish').hide();
      }else {
	var scoreElem = displayScore();
	//submit();
	quiz.append(scoreElem).fadeIn();
	$('#next').hide();
	$('#prev').hide();
	$('#finish').show();
	
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    
    var message = new ROSLIB.Message({
	  //data: selections[0] + ',' + selections[1] + ',' + selections[2] + ',' + selections[3] + ',' + selections[4]
	  data: 'end'
	});

    main_topic.publish(message);
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
	numCorrect++;
      }
    }
    //score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!');
    score.append('Thank you,' + selections[0] + ',' + selections[1] + ',' + selections[2] + ',' + selections[3] + ',' + selections[4]);
    return score;
  }	

  function submit() {
    var message = new ROSLIB.Message({
	  //data: selections[0] + ',' + selections[1] + ',' + selections[2] + ',' + selections[3] + ',' + selections[4]
	  data: 'end'
	});

    main_topic.publish(message);
  }

  function start_questionnaire() {
  	var message = new ROSLIB.Message({
		data: "Starting CPASS survey"
	});

	main_topic.publish(message);
  }
