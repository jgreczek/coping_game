var ros;
var main_topic;

//Connecting to ROS
window.onload = setup;
//$('inflatebutton').bind('click', ClickFunction ).bind('tap', ClickFunction );

function setup(){
	

	//Make sure to change the IP
	var ros = new ROSLIB.Ros({
		//Use the localhost one if running in on the laptop only
		//Use the local IP if accessing it from tablet
		
		//url: 'ws://192.168.0.21:9090'
		url: 'ws://192.168.7.194:9090'
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

	start_breathing();
}

function start_breathing(){

	var message = new ROSLIB.Message({
		data: "Start CS1-Breathing"
	});

	main_topic.publish(message);
} 

var breath_in = 0;
function count_breathing() {

	breath_in = breath_in + 1;
	console.log(breath_in);
	
	var message = new ROSLIB.Message({
		data: "Breath in"
	});

	main_topic.publish(message);
}

var breath_out = 0;
function count_breathing2() {

	breath_out = breath_out + 1;
	console.log(breath_out);
	
	var message = new ROSLIB.Message({
		data: "Breath out"
	});

	main_topic.publish(message);

	if (breath_out >= 2) {
		jump_next();
	}
}

function jump_next() {
	document.getElementById("next").style.visibility = "visible";

	var message = new ROSLIB.Message({
		data: "Breath finished"
	});

	main_topic.publish(message);
}

