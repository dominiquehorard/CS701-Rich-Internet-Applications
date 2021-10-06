self.onmessage = messageHandler;

function messageHandler(e) {
    let data = e.data;
   
    console.log("Received", data);

    let result = 0;

    // Write the code to compute the desired result
    let resultsArr = []

    let start = data.start;
    let end = data.end;

    //for loop to add the squares from each of the worker's starts and ends to results
    for (let i = start; i <= end; i++) {
        result += i * i;
    }

    data.result = result;

    // Timeout delay 
    //this post message is posting from the worker to the mainJS file
    //then the worker is closed
    setTimeout(function () {
        self.postMessage(data);
        self.close();
    }, Math.floor(Math.random() * 10000));

    
}

