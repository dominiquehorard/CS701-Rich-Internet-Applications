/*
* initial list is loaded through AJAX from the partyList.xml file
*
* each senator is converted to a JSON object keeping track of the properties
* name, party, and voted (true or false).
*
* list of senators is then stored in local storage.
*
* whenever a senator is dragged and dropped into their respective area, the JSON object is
* updated as voted and the list of senators is updated in the local storage
*
* when the application is loaded, the local storage is first checked.
*
* if the data is there, the list of senators is loaded from the local storage,
* otherwise the AJAX call is made
*
* if the data is there, the list of senators is loaded from the local storage,
* otherwise the AJAX call is made
*
* The data should be stores in local storage using a single key,
* senators_yourLastName
*/

(function() {

    window.onload = init;

    var senators = [];

    function init() {

        //message changed in each of the called functions
        let msg = document.getElementById("msg");

        //if statement to check for any value assigned to the key in local storage
        //if the value is null, AJAX is called to create members list and
        if (localStorage.getItem('senators_horard') === null) {

            /*creating a request object*/
            let xhr = new XMLHttpRequest();

            //open the XML file to read the contents
            //get method to read file
            //specifying file path
            //true value for async
            xhr.open("GET","./partyList.xml",true)

            //defining function when the ready state of the request changes
            xhr.onreadystatechange = function () {
                //checking to see if the ready state has the same value as XMLHTTPRequest
                //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    //variable status for the request status
                    let status = xhr.status;
                    //if there is no issue with the response to the request
                    if (status === 0 || (status >= 200 && status < 400)) {

                        //creating variable to the hold the XML data of the response
                        //the response is the entirety of the senators document
                        //https://www.w3schools.com/xml/ajax_xmlfile.asp
                        let xmlFile = xhr.responseXML;

                        //creating a variable that is a collection of each senator in the senators node
                        let senXMLNode = xmlFile.getElementsByTagName("senator");

                        //for loop to go over each senator in the collection and push them as an object
                        //to the senators list
                        for (let i = 0; i < senXMLNode.length; i++) {
                            senators.push({
                                "name": senXMLNode[i].getElementsByTagName('name')[0].childNodes[0].nodeValue,
                                "party":senXMLNode[i].getElementsByTagName('party')[0].childNodes[0].nodeValue,
                                "voted": false
                            })
                        }

                        //getting the ul element for the members to append senators to
                        let members_ul = document.getElementById('members');

                        //creating the li elements in the ul for the senators from the JSON object
                        //also sending each senator to local storage
                        for (let i = 0; i < senators.length; i++) {
                            //https://stackoverflow.com/questions/47951287/dynamically-add-li-to-ul-javascript/47951374
                            //getting the name for the current iteration's senator
                            //creating an li element for each senator in the array
                            let member_li = document.createElement("li");

                            //appending the senator name as text inside of the li element
                            //have to remember that text in HTML is considered an element
                            member_li.appendChild(document.createTextNode(senators[i].name));

                            //ternary operator to set the dem/rep class for the li element
                            senators[i].party === 'Democrat'
                                ? member_li.classList.add('democrat')
                                : member_li.classList.add('republican');

                            //adding the draggable attribute to the li element
                            member_li.setAttribute("draggable", "true");

                            //appending that li element to the ul element
                            members_ul.appendChild(member_li);

                            //need to send the senator over as a stringified JSON object
                            //https://stackoverflow.com/questions/37052087/how-do-i-update-localstorage-items
                            localStorage.setItem('senators_horard',JSON.stringify(senators))

                        }
                    }
                    else {
                        console.log("F%*k")
                    }

                    msg.innerHTML = 'From AJAX loaded ' + senators.length + ' senators'
                }
            }
            //sending request to the server... most likely not needed... copied from 601 assignment
            xhr.send();

            //variable to hold the ul element and the element for the message
            let ul_src = document.getElementById("members");

            //getting the drop targets for the members
            let dem_target = document.getElementById("democrats");
            let rep_target = document.getElementById("republicans")

            //assigning the different dragging events to the ul element by it's id
            //this is the source
            ul_src.ondragstart = dragStartHandler;
            ul_src.ondrag =      dragHandler;
            ul_src.ondragend =   dragEndHandler;

            //adding even handlers for the dem & rep targets
            dem_target.ondragenter = dragEnterDemocratsHandler;
            dem_target.ondragover =  dragEnterDemocratsHandler;
            dem_target.ondrop =      dropDemocratsHandler;

            rep_target.ondragenter = dragEnterRepublicansHandler;
            rep_target.ondragover =  dragEnterRepublicansHandler;
            rep_target.ondrop =      dropRepublicansHandler;

        //else pull the data from local storage, create all the members etc...
        } else {

            let members_ul = document.getElementById('members');

            //setting the global senators JSON object to the one that was pulled from localStorage
            senators = JSON.parse(localStorage.senators_horard);

            msg.innerHTML = 'From LocalStorage loaded ' + senators.length + ' senators';

            for (let i = 0; i < senators.length; i++) {

                let member_li = document.createElement("li");

                //appending the senator name as text inside of the li element
                //have to remember that text in HTML is considered an element
                member_li.appendChild(document.createTextNode(senators[i].name));

                //ternary operator to set the dem/rep class for the li element
                senators[i].party === 'Democrat'
                    ? member_li.classList.add('democrat')
                    : member_li.classList.add('republican');

                //ternary operator to set draggable attribute to false if the parsed LS object's voted attribute is
                //true
                senators[i].voted === true
                    ? member_li.setAttribute("draggable", "false")
                    : member_li.setAttribute("draggable", "true");

                //appending that li element to the ul element
                members_ul.appendChild(member_li);

                //if statement to check if the voted is true
                //if it is true, check if the party is democrat
                //if party is democrat ... append child li to the dem target
                if (senators[i].voted === true && senators[i].party === 'Democrat') {
                    let dem_li = document.createElement("li");

                    //appending the senator name as text inside of the li element
                    dem_li.appendChild(document.createTextNode(senators[i].name));

                    //getting the ul element in the droplist
                    let dem_ul = document.getElementById('democrats');

                    //append the dropped li to the dems droplist
                    dem_ul.appendChild(dem_li);
                }

                if (senators[i].voted === true && senators[i].party === 'Republican') {
                    let rep_li = document.createElement("li");

                    //appending the senator name as text inside of the li element
                    rep_li.appendChild(document.createTextNode(senators[i].name));

                    //getting the ul element in the droplist
                    let rep_ul = document.getElementById('republicans');

                    //append the dropped li to the dems droplist
                    rep_ul.appendChild(rep_li);
                }

            }

            //variable to hold the ul element and the element for the message
            let ul_src = document.getElementById("members");

            //getting the drop targets for the members
            let dem_target = document.getElementById("democrats");
            let rep_target = document.getElementById("republicans")

            //assigning the different dragging events to the ul element by it's id
            //this is the source
            ul_src.ondragstart = dragStartHandler;
            ul_src.ondrag =      dragHandler;
            ul_src.ondragend =   dragEndHandler;

            //adding even handlers for the dem & rep targets
            dem_target.ondragenter = dragEnterDemocratsHandler;
            dem_target.ondragover =  dragEnterDemocratsHandler;
            dem_target.ondrop =      dropDemocratsHandler;

            rep_target.ondragenter = dragEnterRepublicansHandler;
            rep_target.ondragover =  dragEnterRepublicansHandler;
            rep_target.ondrop =      dropRepublicansHandler;

        }
    }

    //for this function we need to ensure that the specific li being dragged
    //has the appropriate affects added to it
    function dragStartHandler(e) {
        //storing the innerHTML of the element being dragged, this will be used in the other functions
        //The DataTransfer.setData() method sets the drag operation's drag data to the specified data and type.
        //The DataTransfer object is used to hold the data that is being dragged during a drag and drop operation
        // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
        e.dataTransfer.setData("Text", e.target.innerHTML);
        e.target.classList.add("dragged");
    }

    function dragEndHandler(e) {
        //change message and remove the dragged class
        msg.innerHTML = 'Done Dragging ' + e.target.innerHTML;
        e.target.classList.remove("dragged");
    }

    function dragHandler(e) {
        //changes the message when the senator is dragged
        msg.innerHTML = "Dragging " + e.target.innerHTML;
    }

    function dragEnterDemocratsHandler(e) {
        for (let i = 0; i < senators.length; i++) {
            if (e.dataTransfer.getData("Text") === senators[i].name
                && senators[i].party === 'Democrat') {
                msg.innerHTML = "Dragging into Democrats " + e.dataTransfer.getData("Text")
                e.preventDefault();
            }
        }
        console.log('in the dropzone')
    }

    function dropDemocratsHandler(e) {
        //getting the senators from local storage
        //parsing it back into a json object
        let senatorsLS = JSON.parse(localStorage.senators_horard)

        //create a for loop that goes through the senators list
        //check if the innerHTML name for the li element matches the name of the senator
        //if it does, change the voted property to true and create a new li to append
        //to the dem list and allow it to be dropped
        for (let i = 0; i < senators.length; i++) {
            if (e.dataTransfer.getData("Text") === senators[i].name
                && senators[i].party === 'Democrat') {

                //change the voted parameter to true
                senators[i].voted = true;
                senatorsLS[i].voted = true;

                let dem_li = document.createElement("li");

                //appending the senator name as text inside of the li element
                dem_li.appendChild(document.createTextNode(senators[i].name));

                //getting the ul element in the droplist
                let dem_ul = document.getElementById('democrats');

                //append the dropped li to the dems droplist
                dem_ul.appendChild(dem_li);

                //change the message
                msg.innerHTML = "Dropped into Democrats " + e.target.innerHTML;

                //allowing the senator to be dropped into the droplist
                e.preventDefault();

                //need to loop through the li elements in the members list and
                //set the draggable attribute for the matching element to false
                let member_list = document.getElementById('members');
                let senators_li = member_list.getElementsByTagName('li');

                //setting draggable true for the specific senator
                senators_li[i].setAttribute('draggable', 'false')

            }
        }

        //sending the updated object back to local storage
        localStorage.setItem('senators_horard', JSON.stringify(senatorsLS))
        
    }

    function dragEnterRepublicansHandler(e) {
        for (let i = 0; i < senators.length; i++) {
            if (e.dataTransfer.getData("Text") === senators[i].name
                && senators[i].party === 'Republican') {
                msg.innerHTML = "Dragging into Republicans " + e.dataTransfer.getData("Text")
                e.preventDefault();
            }
        }
    }

    function dropRepublicansHandler(e) {
        let senatorsLS = JSON.parse(localStorage.senators_horard)
        //create a for loop that goes through the senators list
        //check if the innerHTML name for the li element matches the name of the senator
        //if it does, change the voted property to true and create a new li to append
        //to the dem list and allow it to be dropped
        for (let i = 0; i < senators.length; i++) {
            if (e.dataTransfer.getData("Text") === senators[i].name
                && senators[i].party === 'Republican') {

                //change the voted parameter to true
                senators[i].voted = true;
                //change the voted parameter to true
                senatorsLS[i].voted = true;

                let rep_li = document.createElement("li");

                //appending the senator name as text inside of the li element
                rep_li.appendChild(document.createTextNode(senators[i].name));

                //getting the ul element in the droplist
                let rep_ul = document.getElementById('republicans');

                //append the dropped li to the dems droplist
                rep_ul.appendChild(rep_li);

                //change the message
                msg.innerHTML = "Dropped into Republicans " + e.target.innerHTML;

                //allowing the senator to be dropped into the droplist
                e.preventDefault();

                //need to loop through the li elements in the members list and
                //set the draggable attribute for the matching element to false
                let member_list = document.getElementById('members');
                let senators_li = member_list.getElementsByTagName('li');

                //setting draggable true for the specific senator
                senators_li[i].setAttribute('draggable', 'false')

            }
        }
        localStorage.setItem('senators_horard', JSON.stringify(senatorsLS))
    }
})();

   