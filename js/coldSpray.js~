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
		url: 'ws://192.168.5.159:9090'
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

	start_coldSpray();
}

function start_coldSpray(){

	var message = new ROSLIB.Message({
		data: "Start CS2-ES2-Spray"
	});

	main_topic.publish(message);
} 

function setupCanvas() {
	c.height = 800;
	c.width = 1300;
	cx.drawImage(background,0,-120);
	//cx.lineWidth = 20;
	
	/*cx.lineCap = 'round';
	cx.strokeStyle = 'rgb(0, 0, 50)';
	cx.font = 'bold 300px helvetica';
	cx.fillStyle = 'rgb(255, 0, 0)';*/
	drawShape();
	pixels = cx.getImageData(0,0, c.width, c.height);
	shapepixels = getpixelamount(255,0,0);
}
function drawShape() {
	  var centerX = 1000;
	  var centerY = 300;
	  var radius = 200;
	  cx.beginPath();
	  cx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	  cx.fillStyle = 'rgba(0,0,150,0.2)';
	  cx.fill();
	  cx.lineWidth = 5;
	  cx.strokeStyle = 'rgb(0, 0, 0)';
	  cx.stroke();
 
	//cx.fillRect(25,25,270,270);
	//cx.clearRect(30,30,260,260);
	//cx.strokeRect(25,25,260,260);
	/*var centerx = (c.width - cx.measureText(letter).width) / 2;
	var centery = c.height / 2;
	cx.fillText(letter, centerx, centery);*/
};
function showerror(){
	mousedown = false;
	alert ('you are outside');
};
function paint(x, y) {
	var colour = getpixelcolour(x,y);
	// Change the type of line drawn to create the cold spray
	cx.lineWidth = 50;
	cx.strokeStyle = 'rgb(102, 255, 255)';
	
	if (colour.a === 0) { // If opacity detected is 0
	   // showerror();
	}
	else {
	   cx.beginPath();
	   if (oldx > 0 && oldy > 0) {
		   cx.moveTo(oldx, oldy);
	   }
	   cx.lineTo(x, y);
	   cx.stroke();
	   cx.closePath();
	   oldx = x;
	   oldy = y;
	}
}
function getpixelcolour(x,y) {
	
	var index = ((y * (pixels.width * 4)) + (x * 4));
	return {
		r: pixels.data[index],
		g: pixels.data[index+1],
		b: pixels.data[index+2],
		a: pixels.data[index+3]
	};
}
function getpixelamount(r,g,b) {
	var pixels = cx.getImageData(0,0,c.width,c.height);
	var all = pixels.data.length;
	var amount = 0;
	for(i=0; i<all; i+=4) {
		if (pixels.data[i] === r &&
			pixels.data[i+1] === g &&
			pixels.data[i+2] === b) {
			amount++;
		}
	}
	return amount;
};
function pixelthreshold() {
	console.log(getpixelamount(102, 255, 255));
	console.log(shapepixels);
	if ( getpixelamount(102, 255, 255) > 78000) {
		 //alert ('you got it');
		 //document.getElementById("next").style.visibility = "visible";
		 display_next();
	}
};
// Touch event listener for laptop
function onmousedown(ev) {
  mousedown = true;
  ev.preventDefault();
}
function onmouseup(ev) {
  mousedown = false;
  pixelthreshold();
  ev.preventDefault();
}
function onmousemove(ev) {
  var x = ev.clientX;
  var y = ev.clientY;
  if (mousedown) {
	paint(x, y);
  }
}
// Touch event listeners for tablet
  function ontouchstart(ev) {
	touched = true;
  }
  function ontouchend(ev) {
	touched = false;
	oldx = 0;
	oldy = 0;
	pixelthreshold();
  }
  function ontouchmove(ev) {
	if (touched) {
	  paint(
		ev.changedTouches[0].pageX,
		ev.changedTouches[0].pageY
	  );
	  ev.preventDefault();
	}
  }

function display_next() {

	document.getElementById("next_spray").style.visibility = "visible";
	var message = new ROSLIB.Message({
		data: "spray finished"
	});

	main_topic.publish(message);
}


