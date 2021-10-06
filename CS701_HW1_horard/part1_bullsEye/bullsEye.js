var bullsEyeModule = (function() {

    window.onload = init;

    // canvas and context variables
    var canvas;
    var context;

    // center of the pattern
    var centerX, centerY;

    var delay = false;

    // Interval
    var timerId;

    function init() {
        
            canvas = document.getElementById("testCanvas");
            context = canvas.getContext("2d");

            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
            
            // draw the initial pattern
            drawPattern();
    }


    // called whenever the slider value changes or the delay checkbox is clicked
    function drawPattern() {
        if (timerId) {
            clearInterval(timerId);
            timerId = undefined;
        }
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        var bandWidth = document.getElementById("band").value;
        document.getElementById("widthDisplay").value = bandWidth;

        delay = document.getElementById("delay").checked;
       
        // Fill in the rest of the code
        //first checking if the delay checkbox is active
        if (delay) {
            //defining variable for radius value to be stored
            let radius = 200;
            //using setInterval function to loop through the radius and draw the bullseye
            //assigning it to a variable to do clearInterval in the setInterval if radius = 0
            let delay_render = setInterval(function () {
                //begins the path, or resets current path
                context.beginPath();
                //creates arc or circle horizontal,vert axis start
                //radius in units from variable
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
                //using ternary operator using the mod of radius / 2 to alternate circle colors
                context.fillStyle = radius % 2 === 0 ? 'red' : 'blue';
                context.fill()
                context.closePath();
                //subtract the value of the slider from the radius
                // initial bandwidth is 25
                radius -= bandWidth;
                if (radius <= 0) {
                    clearInterval(delay_render);
                }
            },1500)
        } else {
            //defining variable for radius value to be stored
            let radius = 200;
            //for loop to run as long as the radius is greater than 0
            for (let i = 0; radius > 0; i++){
                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
                //using ternary operator using the mod of i / 2 to alternate circle colors
                context.fillStyle = i % 2 === 0 ? 'red' : 'blue';
                context.fill();
                context.closePath();
                //subtract the value of the slider from the radius
                //initial bandwidth is 25
                radius -= bandWidth;
            }
        }
    }
    return {
        drawPattern: drawPattern
    };
})();






