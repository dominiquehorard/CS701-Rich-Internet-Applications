/*
* your web application starts 5 web workers (computeWorker.js) and sends the messages
* to them to compute the sum of the squares of all the integers from the specified start
* value to the specified end value.
*
* The two values are sent as a JSON object having start and end properties.
*
* web worker computes the sum of the squares of all the integers
* from the specified start value to the specified end value using a for loop and sends back
* the result after a random delay
*
* The result is sent as a JSON object having start, end, and result properties
*
* The main web application stores all the results it receives in local storage
*/

(function() {

    window.onload = init;

    var startButton;

    //array to hold the number splits
    let rangeArr = []

    function init() {
    	startButton = document.getElementById("startButton");
    	startButton.onclick = sendDataToWorkers;
    }

    // Complete the following code
    //defining worker variable
    let worker;

    //empty array to push the web worker data to
    let dataArr = [];

    //creating variable for the localStorage return
    let localStorageArr = [];

    //variable to update the accumulated results to
    let accResult = 0;

    // Handle messages received from the Web Worker
    function handleReceipt(event) {
        //sending the results of the web workers to an empty array
        dataArr.push(event.data);

        //adding the event data result to the result variable
        accResult += event.data.result;

        //updating the innerHTML for the sum
        document.getElementById('sum').innerHTML = accResult;

        //use a single key for localStorage
        //sending the result to local storage
        localStorage.setItem('results_horard', JSON.stringify(dataArr))

        //need to create li items for the event.data web workers
        let webWorkerReturnUL = document.getElementById('items');

        //create an li element to append later
        let webWorker_li = document.createElement('li');

        //appending the text node for the returned data to the li
        webWorker_li.appendChild(document.createTextNode(JSON.stringify(event.data)));

        //appending the li to the ul for the web worker list
        webWorkerReturnUL.appendChild(webWorker_li);

        //need to create li elements for the local storage data
        let localStorageUL = document.getElementById('storageItems');

        //create an li element to append later
        let localStorage_li = document.createElement('li');

        //retrieving the array of returned web worker messages
        localStorageArr.push(JSON.parse(localStorage.results_horard));

        for (let i = 0; i < localStorageArr.length; i++) {

            //
            let resultObjInLS = JSON.stringify(localStorageArr[i][i]);

            //creating a text node for the local storage array as it's updated with each return
            localStorage_li.appendChild(document.createTextNode(resultObjInLS) );

            //appending the li to the ul for local storage
            localStorageUL.appendChild(localStorage_li);
        }

    }


    // Complete the following code

    // send messages to the Web Workers
    function sendDataToWorkers(e) {
        startButton.disabled = true;

        //getting the value input for the workers to run against a for loop
        let workersNum = document.getElementById("numWorkers").value;
        let end = document.getElementById("range").value;

        //call the function with the necessary parameters
        splitNum(1, end,workersNum)

        //create a new web worker as specified by the value submitted
        for (let i = 0; i < workersNum; i++) {
            worker = new Worker('computeWorker.js');
            //adding eventhandler to the webworker which responds to the messages
            //from the worker
            worker.addEventListener('message',handleReceipt,false)

            //sending the current index's range object from the range array to the
            //current web worker for the iteration
            worker.postMessage({
                index: i,
                start: rangeArr[i].start,
                end: rangeArr[i].end
            })
        }
    }

    // Feel free to add any helper methods

    //function handles the splitting of max range from the start into objects for the
    //web workers to make computations on
    //https://stackoverflow.com/questions/51250608/split-a-dynamic-range-into-equal-parts-using-js
    function splitNum(start, end, workers) {
        //rounding down the interval to split the numbers down using Math.floor
        //want to round down to get the appropriate splits
        let rangeSplit = Math.floor((end - start) / workers);
        /*console.log(rangeSplit)*/
        //for loop to push the objects to the array for use by the workers
        for (let i = 0; start < end; i++) {
            //so long as the start is less than the end
            //push to the array an object
            rangeArr.push({start: start,end: start += rangeSplit})
            //add 1 to then have the start for the next JSON object pick up where the last
            //iteration left off
            start += 1
        }
    }
})();









var trash = undefined;
















