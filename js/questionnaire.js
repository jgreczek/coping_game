// Each item is given a score of one for a “yes” response, yielding a Total Anxiety score (Ag).
// We want to send and record:
// 1) All the answers for every question (Question #, Answer)
// 2) the number of "yes" responses for each participant.

var questions = [{
    question: "I have trouble making up my mind.", //1
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I get nervous when things do not go the right way for me.", //2
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "Others seem to do things easier than I can.", //3
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I like everyone I know.", //4
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
  question: "Often I have trouble getting my breath.", //5 
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I worry a lot of the time.", //6
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I am afraid of a lot of things.", //7
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
	question: "I am always kind.", //8
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I get mad easily.", //9
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I worry about what my parents will say to me.", //10
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I feel that others do not like the way I do things.", //11
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I always have good manners.", //12
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "It is hard for me to get to sleep at night.", //13
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
	question: "I worry about what other people think about me.", //14
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I feel alone even when there are people with me.", //15
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I am always good.", //16
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "Often I feel sick in the stomach.", //17
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "My feelings get hurt easily.", //18
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "My hands feel sweaty.", //19
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
	question: "I am always nice to everyone.", //20
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I am tired a lot.", //21
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I worry about what is going to happen.", //22
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "Other children are happier than I am.", //23
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I tell the truth every single time.", //24
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I have bad dreams.", //25
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
	question: "My feelings get hurt easily when I am fussed at.", //26
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I feel someone will tell me I do things the wrong way.", //27
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I never get angry.", //28
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I wake up scared some of the time.", //29
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I worry when I go to bed at night.", //30
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "It is hard for me to keep my mind on my schoolwork.", //31
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
	question: "I never say things that I shouldn’t.", //32
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I wriggle in my seat a lot.", //33
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I am nervous.", //34
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "A lot of people are against me.", //35
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I never lie.", //36
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
  }, {
    question: "I often worry about something bad happening to me.", //37
    choices: ["Yes", "No"],
    correctAnswer: "Yes"
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
	url : 'ws://192.168.7.194:9090'
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
    
    document.location.href = 'FACES.html';
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
      input = '<input type="radio" class="big" name="answer" value=' + i + ' />';
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
	//$('#finish').show();
	document.getElementById("finish").style.display = "block";
	document.getElementById("instruction").style.display = "none";
	
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    
    var m  = 'Questionnaire answers,' + selections[0]
    for (var i = 1; i < selections.length; i++) {
    	m = m + ',' + selections[i]
    }
    var message = new ROSLIB.Message({
	  //data: selections[0] + ',' + selections[1] + ',' + selections[2] + ',' + selections[3] + ',' + selections[4]
	  //data: 'end'
	  data: m
	});

    main_topic.publish(message);
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
	numCorrect++;
      }
    }
    //score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!');
    score.append('Thank you!');
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
		data: "Start questionnaire"
	});

	main_topic.publish(message);
  }
