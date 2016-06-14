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

	start_breathing();
}

function start_breathing(){

	var message = new ROSLIB.Message({
		data: "START Coping Strategy 1: Breathing"
	});

	main_topic.publish(message);
} 


function show1() {
    document.getElementById('val1').style.opacity = (parseFloat(document.getElementById('val1').style.opacity) - 0.01);
    if (document.getElementById('val1').style.opacity > 0) {
        setTimeout(show1, 2);
    }
}

function fadeOut1() {
    document.getElementById('val1').style.opacity = 1;
    document.getElementById('val1').style.display = 'block';
    setTimeout(show1, 2);
}

function show2() {
    document.getElementById('val2').style.opacity = (parseFloat(document.getElementById('val2').style.opacity) - 0.01);
    if (document.getElementById('val2').style.opacity > 0) {
        setTimeout(show2, 2);
    }
}

function fadeOut2() {
    document.getElementById('val2').style.opacity = 1;
    document.getElementById('val2').style.display = 'block';
    setTimeout(show2, 2);
}

function show3() {
    document.getElementById('val3').style.opacity = (parseFloat(document.getElementById('val3').style.opacity) - 0.01);
    if (document.getElementById('val3').style.opacity > 0) {
        setTimeout(show3, 2);
    }
}

function fadeOut3() {
    document.getElementById('val3').style.opacity = 1;
    document.getElementById('val3').style.display = 'block';
    setTimeout(show3, 2);
}


function show4() {
    document.getElementById('val4').style.opacity = (parseFloat(document.getElementById('val4').style.opacity) - 0.01);
    if (document.getElementById('val4').style.opacity > 0) {
        setTimeout(show4, 2);
    }
}

function fadeOut4() {
    document.getElementById('val4').style.opacity = 1;
    document.getElementById('val4').style.display = 'block';
    setTimeout(show4, 2);
}


function show5() {
    document.getElementById('val5').style.opacity = (parseFloat(document.getElementById('val5').style.opacity) - 0.01);
    if (document.getElementById('val5').style.opacity > 0) {
        setTimeout(show5, 2);
    }
}

function fadeOut5() {
    document.getElementById('val5').style.opacity = 1;
    document.getElementById('val5').style.display = 'block';
    setTimeout(show5, 2);
}


var breath = 0;
var k1 = 0;
var k2 = 0;
var k3 = 0;
var k4 = 0;
var k5 = 0;


function count_breathing1() {

	if (k1 == 0) {
		breath = breath + 1;
		console.log(breath);
	
		var message = new ROSLIB.Message({
			data: "P1 taken"
		});
		k1 = 1;
		fadeOut1();
		main_topic.publish(message);
		
	}	

	if (breath >= 5) {
		document.getElementById("next").style.visibility = "visible";
	}
}

function count_breathing2() {
	if (k2 == 0) {
		breath = breath + 1;
		console.log(breath);
	
		var message = new ROSLIB.Message({
			data: "P2 taken"
		});
		k2 = 1;
		fadeOut2();
		main_topic.publish(message);
	}

	if (breath >= 5) {
		document.getElementById("next").style.visibility = "visible";
	}
}

function count_breathing3() {
	if (k3 == 0) {
		breath = breath + 1;
		console.log(breath);
	
		var message = new ROSLIB.Message({
			data: "P3 taken"
		});
		fadeOut3();
		k3 = 1;
		main_topic.publish(message);
	}

	if (breath >= 5) {
		document.getElementById("next").style.visibility = "visible";
	}
}

function count_breathing4() {
	if (k4 == 0) {
		breath = breath + 1;
		console.log(breath);
	
		var message = new ROSLIB.Message({
			data: "P4 taken"
		});
		k4 = 1;
		fadeOut4();
		main_topic.publish(message);
	}

	if (breath >= 5) {
		document.getElementById("next").style.visibility = "visible";
	}
}

function count_breathing5() {
	if (k5 == 0) {
		breath = breath + 1;
		console.log(breath);
	
		var message = new ROSLIB.Message({
			data: "P5 taken"
		});
		k5 = 1;
		fadeOut5();
		main_topic.publish(message);
	}

	if (breath >= 5) {
		document.getElementById("next").style.visibility = "visible";
	}
}
