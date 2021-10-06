var animModule = (function() {

    window.onload = init;

    var canvas;
    var context;
    var width, height;

    //ball parameters
    var ballRadius = 10; 
    var ballColor = "blue";
    var ballPosition;
    var startBallPosition;
    var angle = 0;
    
    // displacement of ball for each step x an y
    var dx = 5;
    var dy = ballRadius * 3;
        
    function init() {
        
        canvas = document.getElementById('testCanvas');
        context = canvas.getContext('2d');
        
        width = canvas.width;
        height = canvas.height;

        // start ball position
        startBallPosition = {x : ballRadius, y : ballRadius + 5};
        
        // current ball position
        ballPosition = {x : ballRadius, y : ballRadius + 5};
    }
      
    function setSpeed(speed) {
        //this is what moves the ball across the x axis
        let newSpeed = +speed;
        if (dx > 0) {
            dx = newSpeed
        }
        //This else is causing the issue. Why is dx being set to a negative number at all times?
        else {
            dx =  -newSpeed;
        }
        //variable to control the forward displacement of the ball
        let speedChanged = true
        console.log(dx)
        console.log(ballPosition.x)
    }
    
        
    // draw current position on the canvas
    function drawBallOnCanvas() {

        // Clear the canvas
        //initializing the canvas area
        context.fillStyle = '#D3C0C0';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Fill in the rest of the code
        //ball needs to be drawn at the top right of the canvas
        //the canvas's x and y axis starts are at the top left, not bottom left


        /*15 is the starting position of the ball*/
        /*using that to be where each subsequent line is placed*/

        //creating the lines that will be the tracks
        //LEFT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height - ballRadius * 3, 15 + ballRadius);
        //lineTo is where the line is going to be drawn to
        context.lineTo(0, 15 + ballRadius);
        context.stroke();
        context.closePath()

        //RIGHT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height + ballRadius * 3, 15 + ballRadius * 4);
        //lineTo is where the line is going to be drawn to
        context.lineTo(ballRadius * 3, 15 + ballRadius * 4);
        context.stroke();
        context.closePath()

        //LEFT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height - ballRadius * 3, 15 + ballRadius * 7);
        //lineTo is where the line is going to be drawn to
        context.lineTo(0, 15 + ballRadius * 7);
        context.stroke();
        context.closePath()

        //RIGHT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height + ballRadius * 3, 15 + ballRadius * 10);
        //lineTo is where the line is going to be drawn to
        context.lineTo(ballRadius * 3, 15 + ballRadius * 10);
        context.stroke();
        context.closePath()

        //LEFT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height - ballRadius * 3, 15 + ballRadius * 13);
        //lineTo is where the line is going to be drawn to
        context.lineTo(0, 15 + ballRadius * 13);
        context.stroke();
        context.closePath()

        //RIGHT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height + ballRadius * 3, 15 + ballRadius * 16);
        //lineTo is where the line is going to be drawn to
        context.lineTo(ballRadius * 3, 15 + ballRadius * 16);
        context.stroke();
        context.closePath()

        //LEFT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height - ballRadius * 3, 15 + ballRadius * 19);
        //lineTo is where the line is going to be drawn to
        context.lineTo(0, 15 + ballRadius * 19);
        context.stroke();
        context.closePath()

        //RIGHT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height + ballRadius * 3, 15 + ballRadius * 22);
        //lineTo is where the line is going to be drawn to
        context.lineTo(ballRadius * 3, 15 + ballRadius * 22);
        context.stroke();
        context.closePath()

        //LEFT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height - ballRadius * 3, 15 + ballRadius * 25);
        //lineTo is where the line is going to be drawn to
        context.lineTo(0, 15 + ballRadius * 25);
        context.stroke();
        context.closePath()

        //RIGHT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height + ballRadius * 3, 15 + ballRadius * 28);
        //lineTo is where the line is going to be drawn to
        context.lineTo(ballRadius * 3, 15 + ballRadius * 28);
        context.stroke();
        context.closePath()

        //LEFT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height - ballRadius * 3, 15 + ballRadius * 31);
        //lineTo is where the line is going to be drawn to
        context.lineTo(0, 15 + ballRadius * 31);
        context.stroke();
        context.closePath()

        //RIGHT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height + ballRadius * 3, 15 + ballRadius * 34);
        //lineTo is where the line is going to be drawn to
        context.lineTo(ballRadius * 3, 15 + ballRadius * 34);
        context.stroke();
        context.closePath()

        //LEFT SIDE START
        context.beginPath();
        context.lineWidth = 2;
        //moveTo is the point at which the line will be drawn STARTS FROM THE RIGHT
        context.moveTo(canvas.height - ballRadius * 3, 15 + ballRadius * 37);
        //lineTo is where the line is going to be drawn to
        context.lineTo(0, 15 + ballRadius * 37);
        context.stroke();
        context.closePath()


        //moving the ball across the line x-axis
        function updatePosition() {
            //once the ball moves the length of the track canvas.height - ballRadius * 3
            //drop the ball to the height of the gap which is 15

            //breaking the slider by coding dx to -5 need to get the value of the speed slider
            //look at the bullseye slider for reference

            //ball needs to be drawn at the top right of the canvas
            context.beginPath();
            //setting fill color for the ball
            context.fillStyle = ballColor;
            //using the property values for the ballPosition object to draw where the
            context.arc(ballPosition.x,ballPosition.y, ballRadius, angle, 2 * Math.PI, true);
            context.fill();
            context.closePath();

            //what moves the ball from the start
            ballPosition.x += dx;

            //redrawing the ball in each if statement
            //if statements that check if the ball is going over the edge of the left line
            if (ballPosition.x > 390) {
                //go up the y axis by the displacement variable for y
                ballPosition.y += dy;
                //reverse the displacement to go the other way
                dx = -dx;
                //go across the x axis for the displacement of x variable
                ballPosition.x += dx;
                //change color
                ballColor = 'red';
                //can't just do ballPosition.x += -5 because that halts the ball and makes it fall forever
                console.log(dx)
            }
            //check to see if the ball is going over the edge of the right lines and the position isn't the start
            //needed to check that the position of the ball isn't in the negatives
            if (ballPosition.x <= 0 && ballPosition.y !== startBallPosition.y) {
                //move the ball up the y axis
                ballPosition.y += dy;
                dx = -dx;
                ballPosition.x += dx;
                ballColor = 'blue';
            }

            //if the value of y is greater than the last line's placement
            if (ballPosition.y >= 400) {
                //reset the direction of displacement
                dx = -dx;
                ballPosition.x += dx;
                //set the ball's position to the start of the canvas
                ballPosition.x = startBallPosition.x;
                ballPosition.y = startBallPosition.y;
                //reset the color
                ballColor = 'blue';
            }
        }
        updatePosition();

        //at the end of the x axis the ball needs to change color and move down
        //the y axis

        //once ball reaches 0 on the y axis reset the animation
    }
        

    // browser specific animation request
     window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  // fall back to JavaScript setTimeout
                  function(callback, element){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();
            
        // Define the Animation
        function doAnimation() {
            // Draw a single frame of animation on our canvas
            drawBallOnCanvas();

            // After this frame is drawn, let the browser schedule the next one
            window.requestAnimFrame(doAnimation);
        }

        // Start the Animation
            
         window.requestAnimFrame(doAnimation);

         return {
            setSpeed: setSpeed
         }
})();