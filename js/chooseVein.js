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

	start_chooseVein();
}

function start_chooseVein(){

	var message = new ROSLIB.Message({
		data: "Start CS2-ES1-Vein"
	});

	main_topic.publish(message);
} 

function display_next() {

	document.getElementById("next").style.visibility = "visible";
	document.getElementById("chosenCorrectVein").style.visibility = "visible";
	var message = new ROSLIB.Message({
		data: "vein chosen"
	});

	main_topic.publish(message);

}
