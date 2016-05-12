var ros_topic;
var ros;
var i = 0;
var j = 0;
var k = 0;
window.onload = setup();

//setup() is for connecting js to ROS

function setup(){
	//connecting to ROS

	ros = new ROSLIB.Ros({
		url: 'ws://localhost:9090'
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


	ros_topic = new ROSLIB.Topic({
		ros: ros,
		name: '/Game_MAKI',
		messageType: 'std_msgs/String'

	});
}


//the following is the main()

(function ($) {
    	$.fn.lookingGlass = function (options) {

        var settings = $.extend({
            topImage: "lg-top-image",
            bottomImage: "lg-bottom-image",
            viewportShape: "square",
            viewportSize: "MEDIUM",
            viewportOrientation: "X", //default
            topImage: "lg-top-image",
            bottomImage: "lg-bottom-image",
	    border: "border"
        }, options);

        var x = this.offset().left;
        var y = this.offset().top;
        //  cursorOffset is used to set the position of the looking glass
        //  viewport, relative to the mouse cursor. default is center

        var centeringValue = getDeterminateLength(this);
	


        var shapeModifiers = getShapeMods(settings.viewportShape);

        //viewportsize
        var viewportMods = getViewportModifier(settings.viewportSize);

        //viewport orientation

        var orientationValues = getOrientationValues(settings.viewportOrientation);

        var modY = orientationValues[0] * viewportMods.offset;
        var modX = orientationValues[1] * viewportMods.offset;

        var cursorOffset = getCursorOffset(centeringValue, shapeModifiers.X, shapeModifiers.Y, modX, modY);


        buildTopImage($("#" + settings.topImage));

        var bottomImage = $("#" + settings.bottomImage);
        buildBottomImage(viewportMods.size, shapeModifiers, bottomImage);

	// this needs to be edited to tablet touch instead of mouse
        this.mousemove(function (e) {
            trackMouse(x, y, cursorOffset.X, cursorOffset.Y, e, bottomImage);
        });

        // ######################### needs testing on touch device. ###############################
	// the bind doesn't work as it suppose to
        this.bind('touchmove', function (e) {
            e.preventDefault();
            trackMouse(x, y, cursorOffsetX, cursorOffsetY, e, bottomImage);

        }, false);
	// #######################################################################################

	

	//the following are the methods called in main()


        //getCursorOffset method is to determinethe cursor distance from the border of the xRay glass
        function getCursorOffset(centeringValue, shapeModifiersX, shapeModifiersY, modX, modY) {

		X = (centeringValue / shapeModifiersY ) / modX;
		Y = (centeringValue / shapeModifiersX ) / modY;
	
            return {
                X , Y
            }
        };


        //getOrientationValues method is to determine the location of the cursor (North, East, South, West) corresponding
        //to the xRay glass
        function getOrientationValues(str) {

            var mod = []; // [0] == x , [1] == y

            // 2 : top , 100 : bottom , 4 : center(default)
            // 2 : left , 100 : right , 4 : center(default)
            switch (str.toUpperCase()) {

                case 'N':
                    mod[0] = 2;
                    mod[1] = 4;
                    break;

                case 'S':
                    mod[0] = 100;
                    mod[1] = 4;
                    break;

                case 'W':
                    mod[0] = 4;
                    mod[1] = 2;
                    break;

                case 'E':
                    mod[0] = 4;
                    mod[1] = 100;
                    break;

                default:
                    mod[0] = 4;
                    mod[1] = 4;

            }

            return mod;
        };

        /*trackMouse method is to trace the mouse coordinate and publish ROS messages 
        when and where the child hover to certain position.

        NOTE: 
        (This is temporary location for testing purposes)
        ROS publishes messages whenever:
        1. Hover to the eye part of the human's eye 
        2. Hover to the eye part of the human's node 
        3. Hover to the eye part of the human's ear 
        */
        function trackMouse(curX, curY, offX, offY, motionEvent, ele) {
            ele.css({
                left: motionEvent.pageX - curX - offX,
                top: motionEvent.pageY - curY - offY,
                'background-position': (-motionEvent.pageX + curX + offX) + 'px ' + (-motionEvent.pageY + curY + offY) + 'px'
            });

		var ros_message;

		var left = motionEvent.pageX - curX - offX;
		var top = motionEvent.pageY - curY - offY;

		var xray_location;

		if(left >= 157 && left <=200 && top >= 224 && top <= 290){
			
			xray_location = "MAKI's eye";
			i++;
			
			if(i <= 5){
				console.log("pointing to: " + xray_location);
				ros_message = new ROSLIB.Message({
				//Add by Xuan, 11 Feb
				data :  "xray"+ ',' + xray_location
				// origin code
				/*data : "The child is performing x-ray on " + xray_location + "\n"*/
				});
			
			ros_topic.publish(ros_message);

			}
			
		}
		else if(left >= 403 && left <= 453 && top >= 265 && top <= 300){

			xray_location = "MAKI's ear";
			j++;
			if(j <= 5){
				console.log("pointing to: " + xray_location);
				ros_message = new ROSLIB.Message({
				//Add by Xuan, 11 Feb
				data :  "xray"+ ',' + xray_location
				//origin code
				/*data : "The child is performing x-ray on " + xray_location + "\n"*/
				});

			ros_topic.publish(ros_message);

			}
		}
		else if(left >= 81 && left <= 130 && top >= 335 && top <= 388){

			xray_location = "MAKI's nose";
			k++;
			if(k <= 5){
				console.log("pointing to: " + xray_location);
				ros_message = new ROSLIB.Message({
				//Add by Xuan, 11 Feb
				data :  "xray"+ ',' + xray_location
				//origin code
				/*data : "The child is performing x-ray on " + xray_location + "\n"*/
			});

			ros_topic.publish(ros_message);

			}
		}

        }


        //getViewportModifier method is to determine the length of the xRay glass square
        function getViewportModifier(optionStr) {

            var mods = [];
            switch (optionStr.toUpperCase()) {

                case 'SMALL':
                    mods = [2, 2];
                    break;

                case 'MEDIUM':
                    mods = [1.3, 1.3];
                    break;

                case 'LARGE':
                    mods = [.5, .5];
                    break;

                default:
                    mods = [4, 4];
            }

            return {
                offset: mods[0],
                size: mods[1]
            };
        }

        //getShapeMods method is to determine what kind type of xRay glass shape we would like to have
        function getShapeMods(shapeMod) {

            var modX, modY, modRadius;

            switch (shapeMod.toUpperCase()) {

                case "SQUARE":
                    modX = 1;
                    modY = 1;
                    modRadius = 0;
		    $(this).css({
			"border-weight": "50px",
			"border-color": "FFFF",
			"border-style" : "solid"});
                    break;

                case "VERTICAL-RECTANGLE":
                    modX = 1;
                    modY = 2;
                    modRadius = 0;
                    break;

                case "HORIZONTAL-RECTANGLE":
                    modX = 2;
                    modY = 1;
                    modRadius = 0;
                    break;

                case "CIRCLE":

                default:
                    modX = 1;
                    modY = 1;
                    modRadius = 100;

            }

            return {
                X: modX,
                Y: modY,
                radius: modRadius
            };
        }

        //buildBottomImage method is to set up the bottom image (which will be Maki's inner parts)
        function buildBottomImage(sizeMod, shapeMods, ele) {


            var img = ele.data('src');

            setImgStyles(ele, img, false, sizeMod, shapeMods);

        }

        //buildTopImage method is to set up the top image (which will be Maki's outer parts)
        function buildTopImage(ele) {

            var img = ele.data('src');
            setImgStyles(ele, img, true);
        }

        //setImgStyles method is to set up the size, alignment of the xRay game
        function setImgStyles(container, image, isTop, sizeMod, shapeMods) {

            if (isTop) {

                container.css({

                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': 100 + '%',
                    'height': 100 + '%',
                    'background': "url('" + image + "')",
                    'background-repeat': 'no-repeat',
                    'background-size': 100 + '% auto'

                });

            }
            else {

                var divisor = 2;

                if (sizeMod != null) {
                    divisor = divisor * sizeMod;
                }

                var imgDimensionVal = getDeterminateLength(container.parent()) / divisor;
                container.css({

                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'width': imgDimensionVal / shapeMods.Y,
                    'height': imgDimensionVal / shapeMods.X,
                    'background': "url('" + image + "')",
                    'border-radius': shapeMods.radius + '%',
                    'background-repeat': 'no-repeat',
                    'background-size': $("#lg-top-image").width() + 'px auto',
                    'overflow': 'hidden'

                });

            }

        }

        //getDeterminateLength method is used to get cursor offset
        function getDeterminateLength(container) {


            var boxWidth = container.width();
            var boxHeight = container.height();

            var determinateLength;

            if (boxWidth != boxHeight) 
	    {

                if (boxWidth < boxHeight) {

                    determinateLength = boxWidth;

                } 
		else { 

		    determinateLength = boxHeight;
		}

            } 
	    else {

                determinateLength = boxWidth;
            }

            return determinateLength;
        }

        return this;
    }

}(jQuery));

