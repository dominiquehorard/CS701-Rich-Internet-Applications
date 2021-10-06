 (function() {

    window.onload = init;

    var startButton;

     //variable that hold the lat/long start position
    let latitude = null;
    let longitude = null;

    // register the event handlers

     //array to send markers to
     let markersArr = [];
     let coordsArr = [];

    function init() {
    	startButton = document.getElementById("startButton");
    	startButton.onclick = startTrackingLocation;
    }

    //function to get the starting location
    function getStartLocation() {
        //get the current position using the GeoLoc API

        //async call to get the starting position
        //it calls the displayStartLocation function when the function is gotten
        navigator.geolocation.getCurrentPosition(displayStartLocation);

    }

    //defining a function that takes the position as an argument
    function displayStartLocation(position) {

        //variable that hold the latitude position
        latitude = position.coords.latitude;

        //variable to hold the longitude
        longitude = position.coords.longitude;

        //gets the element by the id and adds the variable value to the HTML of that tag
        document.getElementById("latitude").innerHTML += " " + latitude;
        document.getElementById("longitude").innerHTML += " " + longitude;

        //gets the element by the id and adds the variable value to the HTML of that tag
        document.getElementById("currentLatitude").innerHTML += " " + latitude;
        document.getElementById("currentLongitude").innerHTML += " " + longitude;

        //render the map with the start coordinates
        showOnMap(position.coords);

    }

    //creates the map and shows the starting position
    function showOnMap(pos) {
       //variable to hold the lat/long found by the nav.geoLoc function
       //sending that to the google.maps lat/long method to create a map pinpoint object
       //this variable holds the object created from the LatLng method from google maps
       let googlePosition = new google.maps.LatLng(pos.latitude, pos.longitude);

       //defining options that specify how the designated map element will render the location
        let mapOptions = {
            zoom: 14,
            center: googlePosition,
            //setting the map type to be rendered. There are 4 types with the JS API
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        let mapEl = document.getElementById('map');
        map = new google.maps.Map(mapEl, mapOptions);

        //add a markers to the map
        addStartMarker(map, googlePosition)
        /*changeMarkerPosition(map, googlePosition);*/
        addLastMarker(map, googlePosition);

    }

    //function to add the marker to the map
     //need to specify the arguments for map object and position to load the marker
     function addStartMarker(map, latlongPosition) {
        //defining properties for the marker
         let markerOptions = {
             position: latlongPosition,
             map: map,
             clickable: false
         }

         //creating a marker object
         //uses the same mapOptions object as the map uses to place the marker
         let marker = new google.maps.Marker(markerOptions);

         markersArr.push(marker);
         coordsArr.push(marker.position);

     }

    function startTrackingLocation(location) {
        //variable to update the update counter
        let updateCount = 0;

        document.getElementById("counter").innerHTML += " " + updateCount;

        //disable the button
        document.getElementById("startButton").disabled = true;

        //getting the start location by calling the function
        getStartLocation();

        //use setInterval to invoke updateMyLocation every 5 seconds
        setInterval(function() {
            updateCount += 1;
            document.getElementById("counter").innerHTML = "Update#:" + " " + updateCount;
            /*updateMarkerLocation();*/

            //for loop to delete the markers in the array starting with the second one
            for (let i = 1; i < markersArr.length; i++) {
                markersArr[i].setMap(null);
            }

            //defining a line that will be drawn to each marker
            /*let line = new google.maps.Polyline({
                path: coordsArr,
                geodesic: true,
                strokeColor:'blue',
                strokeWeight: 2
            })*/

            //calling function to update the marker position
            updateMarkerLocation();

            //calling function to draw the line, calling it after the marker position has been updated
            drawMapLine();

            //drawing the line on the map following the coordinates in the array
            /*line.setMap(map);*/

        }, 5000)


        
    }

    //function simulates the changes to lat and long
    function updateMarkerLocation() {
        //generate 2 random numbers using Math.random() and divide those numbers by 100
        //these two numbers represent the changes in the latitude and longitude.
        let newLat = latitude += (Math.random() / 100);
        let newLong = longitude -= (Math.random() /100);

        //update the current location in the HTML
        document.getElementById("currentLatitude").innerHTML = "Current Latitude:" + " " + newLat;
        document.getElementById("currentLongitude").innerHTML = "Current Longitude:" + " " + newLong;

        let newMarker = new google.maps.Marker({
            position: {lat:newLat,lng:newLong},
            map:map
        })

        //pushing the marker and coordinates to arrays to draw line later
        markersArr.push(newMarker);
        coordsArr.push(newMarker.position);

        //using panTo method to update where the map is looking as a new marker is made
        map.panTo(newMarker.position);

    }

     /*function changeMarkerPosition(map, latlongPosition) {

         //defining properties for the marker
         //defining properties for the marker
         let newMarkerOptions = {
             position: latlongPosition,
             map: map,
             draggable:true,
             clickable: false
         }

         let updatedMarker = new google.maps.Marker(newMarkerOptions);

     }*/

     function drawMapLine() {
         //defining a line that will be drawn to each marker
         let line = new google.maps.Polyline({
             path: coordsArr,
             geodesic: true,
             strokeColor:'blue',
             strokeWeight: 2
         })

         //drawing the line on the map following the coordinates in the array
         line.setMap(map);
     }

 })();









