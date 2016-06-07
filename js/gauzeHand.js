var ros;
var main_topic;
var choice; 
var result = [];
var w; 
var h;

// connexting to ROS
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

	ros.on('connection', function(){
		console.log('Connected to websocket server.');
	});

	ros.on('error', function(error){
		console.log('Error connecting to websocket server: ', error);
	});

	ros.on('close', function() {
		console.log('Connection to websocket server closed.');
	});

	addListeners_touch("gauze1");
	addListeners_touch("gauze2");
	addListeners_touch("gauze3");

    	start_gauzeWrap();
}

function start_gauzeWrap(){

	var message = new ROSLIB.Message({
		data: "START Coping Strategy 4: Education Step 4: Wrap Gauze"
	});

	//main_topic.publish(message);
} 

// for setting up the first location of the draggable gauzes
function addListeners_touch(name){
	
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }); //disable scroll
	w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var gauzes_id = document.getElementById(name);
	gauzes_id.addEventListener('touchmove', touchmove, false);
}

function touchmove(event) {
	var touch = event.targetTouches[0];
	var name = event.target.id;
	choice = name; //varaible to keep track of the object id that is held

	var xmin = 782 + 'px'; 
	var xmax = 999 + 'px';
	var ymin = 140 + 'px';
	var ymax = 450 + 'px';	

	if (name == "gauze1") {
		event.target.style.left = (touch.pageX) + 'px';
		event.target.style.top = (touch.pageY) + 'px';
	}
	else if (name == "gauze2") {
		event.target.style.left = (touch.pageX) - 280 + 'px';
		event.target.style.top = (touch.pageY) + 'px';
	}
	else if (name == "gauze3") {
		event.target.style.left = (touch.pageX) - 480 + 'px';
		event.target.style.top = (touch.pageY) + 'px';
	}
	
	
	if (event.target.style.left >= xmin && event.target.style.left <= xmax ) { //check if x is in the box
       		if (event.target.style.top >= ymin && event.target.style.top <= ymax ) { //check if y is in the box
			document.getElementById(name).style.opacity = 0;  // make the gauze invisible if it's placed in the correct area
		
			if (result.length == 1) {
				 document.getElementById("armImg").src = "image/arm-gauze-1.png";
			}
			else if (result.length == 2) {
				 document.getElementById("armImg").src = "image/arm-gauze-2.png";
			}
			else if (result.length == 3) {
				 document.getElementById("armImg").src = "image/arm-gauze-3.png";
				 display_next();
			}
		
			var check = false; 
			for (i = 0; i < result.length; i ++){
				if (result[i] == choice){
				    check = true;
				}
			}
			if (check == false){
				result.push(choice);
			}
			result.sort();
		} // end check if y is in the box
	} // end check if x is in the box
}


function display_next() {

	document.getElementById("next").style.visibility = "visible";

}
