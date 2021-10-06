var rotationsModule = (function() {


	function changeSpeed() {

		var duration = document.getElementById("duration").value;
	    document.getElementById("durationDisplay").value = duration + 's';

	    // Fill in the rest of the code to change the dur attributes of the four animations

		//getting the elements to be moved by document query of tag name
		let movers = document.getElementsByTagName('animateTransform');
		//this creates a list that can be iterated over
		for (let i = 0; i < movers.length; i++) {
			//setting the duration attribute for each one to the slider value
			movers[i].setAttribute('dur', duration);
		}
	}

	return {
        changeSpeed: changeSpeed
    };

})();