var ros;
var main_topic;

//Connecting to ROS
window.onload = setup;

function setup(){

	//Make sure to change the IP
	var ros = new ROSLIB.Ros({
		//Use the localhost one if running in on the laptop only
		//Use the local IP if accessing it from tablet
		
		//url: 'ws://192.168.0.21:9090'
		//url: 'ws://192.168.5.159:9090'
		url: 'ws://192.168.8.217:9090'
		//url: 'ws://localhost:9090'
		//url: 'ws://10.120.114.241:9090'
		//url: 'ws://172.20.10.3:9090'
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

	start_fearRate();
}

function start_fearRate(){

	var message = new ROSLIB.Message({
		data: "Start fear rate 2"
	});

	main_topic.publish(message);
} 

var fearRate;
function fear_rate1() {
	
	fearRate = 1;
	console.log('fear rate: ' + fearRate);
	var modal = document.getElementById('myModal');
	//document.getElementById("next").style.display = "block";
	timer();

	var message = new ROSLIB.Message({
		data: "1-great2"
	});

	main_topic.publish(message);
	
}


function fear_rate2() {

	fearRate = 2;
	console.log('fear rate: ' + fearRate);
	var modal = document.getElementById('myModal');
	//modal.style.display = "none";
	//document.getElementById("next").style.display = "block";
	timer();

	var message = new ROSLIB.Message({
		data: "2-okay2"
	});

	main_topic.publish(message);
}


function fear_rate3() {

	fearRate = 3;
	console.log('fear rate: ' + fearRate);
	var modal = document.getElementById('myModal');
	//modal.style.display = "none";
	//document.getElementById("next").style.display = "block";
	timer();

	var message = new ROSLIB.Message({
		data: "3-average2"
	});

	main_topic.publish(message);
}


function fear_rate4() {

	fearRate = 4;
	console.log('fear rate: ' + fearRate);
	var modal = document.getElementById('myModal');
	//modal.style.display = "none";
	//document.getElementById("next").style.display = "block";
	timer();

	var message = new ROSLIB.Message({
		data: "4-little-anxious2"
	});

	main_topic.publish(message);
}


function fear_rate5() {

	fearRate = 5;
	console.log('fear rate: ' + fearRate);
	var modal = document.getElementById('myModal');
	//modal.style.display = "none";
	//document.getElementById("next").style.display = "block";	
	timer();

	var message = new ROSLIB.Message({
		data: "5-anxious2"
	});

	main_topic.publish(message);
}


function fear_rate6() {

	fearRate = 6;
	console.log('fear rate: ' + fearRate);
	var modal = document.getElementById('myModal');
	//modal.style.display = "none";
	//document.getElementById("next").style.display = "block";
	timer();

	var message = new ROSLIB.Message({
		data: "6-very-anxious2"
	});

	main_topic.publish(message);
}

function timer() {
	window.setTimeout(show_next, 5000);	
}

function show_next() {
	document.getElementById("next").style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/


