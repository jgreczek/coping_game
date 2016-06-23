var ros; //initiliaize ros
var topic; 
var choice; 
var items = [];
var answer = [];
var result = [];
var num = [1, 2, 3];
window.onload = prepare;
var w; 
var h;
var temp1;
var temp2; 
var alldone = 0;

function prepare(){
    document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }); //disable scroll
	w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    document.getElementById("goal").style.left = w - 900; 
    document.getElementById("goal").style.top = h - 650; 

    document.getElementById("finish").style.left = w - 300; 
    document.getElementById("finish").style.top = h - 150;

    h = h - 100; 

    document.getElementById("destination").style.left = w - 400; 
    document.getElementById("destination").style.top = h - 350;

    //document.getElementById("destination").addEventListener('touchenter', itemEnter, false);

    //w move right by decreasing number , move left by increasig number
    //h move up by increasing number, move down by decreasing number
	document.getElementById("pillow1").style.left = w - 1000; 
	document.getElementById("pillow1").style.top = h - 330;
    dragSetup("pillow1");
    //console.log(pillowX + " , " + pillowY);

    document.getElementById("pillow2").style.left = w - 800; 
    document.getElementById("pillow2").style.top = h - 330;
    dragSetup("pillow2");
    
    document.getElementById("pillow3").style.left = w - 600; 
    document.getElementById("pillow3").style.top = h - 330;
    dragSetup("pillow3");

    document.getElementById("finish").style.left = w - 250; 
    document.getElementById("finish").style.top = h - 20;
    
    document.getElementById("goal").style.left = w - 900; 
    document.getElementById("goal").style.top = h - 15;

    document.getElementById("goal1").style.left = w- 900; 
    document.getElementById("goal1").style.top = h + 25;

    document.getElementById("debug").style.left = w - 900; 
    document.getElementById("debug").style.top = h - 200;

   
    //connecting to ROS
    ros = new ROSLIB.Ros({
        //url : 'ws://ice_newt:9090'
        url : 'ws://192.168.7.70:9090'
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
    
}

// dragSetup(name) is for setting up the first location of the draggable items
function dragSetup(name){
    items.push(name);
    var dm = document.getElementById(name);
    dm.addEventListener('touchmove', touchmove, false);
}

function touchmove(event){
    var touch = event.targetTouches[0];
    var name = event.target.id;
    choice = name; //varaible to keep track of who is holding what 
   // document.getElementById("debug").innerHTML = choice + ": " + event.target.style.left + " , " + event.target.style.top;
   // document.getElementById("debug").innerHTML = event.target.style.left + ", " + event.target.style.top;

    var xmin = 782 + 'px'; 
    var xmax = 999 + 'px';
    var ymin = 140 + 'px';
    var ymax = 450 + 'px';	

    if (name == "pillow1"){
        event.target.style.left = (touch.pageX) + 'px';
        event.target.style.top = (touch.pageY) + 'px';
	//document.getElementById("debug").innerHTML = choice + ": " + event.target.style.left + " , " + event.target.style.top;
    }
    else if (name == "pillow2"){
        event.target.style.left = (touch.pageX) + 'px';
        event.target.style.top = (touch.pageY) + 'px';
	//document.getElementById("debug").innerHTML = choice + ": " + event.target.style.left + " , " + event.target.style.top;

    }
    else if (name == "pillow3"){
        event.target.style.left = (touch.pageX) + 'px';
        event.target.style.top = (touch.pageY) + 'px';
	//document.getElementById("debug").innerHTML = choice + ": " + event.target.style.left + " , " + event.target.style.top;
    }

    if (event.target.style.left >= xmin && event.target.style.left <= xmax ){ //check if x is in the box
       if (event.target.style.top >= ymin && event.target.style.top <= ymax ){ //check if y is in the box
           // document.getElementById("goal").innerHTML = choice + " in the box!";
	    document.getElementById(name).style.opacity = 0; 
	   
	    if (result.length == 1) {
		 document.getElementById("destinationImg").src = "image/robot1.png";
	    }
	    else if (result.length == 2) {
		 document.getElementById("destinationImg").src = "image/robot2.png";
	    }
      	    else if (result.length == 3) {
		 document.getElementById("destinationImg").src = "image/robot3.png";
		 document.getElementById("finish").style.display = "inline";
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
        }
    }
    else{
       // document.getElementById("goal").innerHTML = choice + " out of the box!";
        remove(choice);
        result.sort();
    }

   document.getElementById("debug1").innerHTML = result.length;
   event.preventDefault();
}

function checkAnswer(){
    if (compare()){
        /*
        var message = new ROSLIB.Message({
            data: "Moved correctly "
        });
        topic.publish(message);
        */
        alert("correct");
	document.getElementById("finish").style.display = block;

    }
    else{
        /*
        var message = new ROSLIB.Message({
            data: "Moved incorrectly "
        });
        topic.publish(message);
        */
        alert("incorrect");
    }
   
}

function compare(){
    console.log("result: " + result);
    console.log("answer: " + answer);
    if (result.length != answer.length){
        return false; 
    }
    else{
        for (i = 0; i < answer.length; i++){
            if (answer[i] != result[i]){
                return false; 
            }
        }
        return true; 
	
    }
}

function remove(name){
    for (i = 0; i < result.length; i++){
        if (result[i] == choice){
            result.splice(i, 1);
        }
    }
    if (result.length != 0){
        result.sort();
    }
}
