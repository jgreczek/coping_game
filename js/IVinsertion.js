var ros;
var main_topic;
var allowClick;
var w;
var h;

//Connecting to ROS
window.onload = setup;

function setup(){
	

	//Make sure to change the IP
	var ros = new ROSLIB.Ros({
		//Use the localhost one if running in on the laptop only
		//Use the local IP if accessing it from tablet
		
		//url: 'ws://192.168.0.21:9090'
		url: 'ws://192.168.5.52:9090'
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

	addListeners();
	addListeners_touch();
	start_insertion();
}

// for mouse (PC)
function addListeners(){
    document.getElementById('needle').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
    allowClick = true;
}


function mouseUp(){
	if (allowClick == true) {
		window.removeEventListener('mousemove', divMove, true);
	}
}


function mouseDown(e){
	if (allowClick == true) {
		window.addEventListener('mousemove', divMove, true);
	}
}

function divMove(e){
    var div = document.getElementById('needle');
	div.style.position = 'absolute';
	var newX = e.clientX - 700;
	var newY = e.clientY - 400;
	div.style.top = newY + 'px';
	div.style.left = newX + 'px';
	
	if (e.clientX > 880 && e.clientX < 980 && e.clientY > 300 && e.clientY < 400) {
		display_next();
		window.removeEventListener('mousemove', divMove, true);
		allowClick = false;
	}
}

// for touch (tablet)
function addListeners_touch(){

	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }); //disable scroll
	w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var needle = document.getElementById('needle');
	needle.style.left 

	var touch_listener = document.getElementById('needle');
	touch_listener.addEventListener('touchmove', touchmove, false);
	allowClick = true;
}

function touchmove(e) {

	var touch = e.targetTouches[0];
	var name = e.target.id;
	
	var needle = document.getElementById('needle');
	needle.style.position = 'absolute'

	e.target.style.left = (touch.pageX) - 700 + 'px';
	e.target.style.top = (touch.pageY) - 400 + 'px';

	
	if (touch.pageX > 880 && touch.pageX < 980 && touch.pageY > 0 && touch.pageY < 400) {
		display_next();
		needle.removeEventListener('touchmove', touchmove, false);
		allowClick = false;
	}
}

function start_insertion(){

	var message = new ROSLIB.Message({
		data: "START Coping Strategy 2: Education Step 3: IV Insertion"
	});

	main_topic.publish(message);
} 

function display_next() {

	document.getElementById("next").style.visibility = "visible";

}
