document.addEventListener('DOMContentLoaded', bindButtons);

function addEntry(name, dates) {
    event.preventDefault();
    var req = new XMLHttpRequest();
    var payload = {
        name: null,
        dates: null
    };
    //assign user input to payload input
    payload.name = name.value;
    payload.dates = dates.value;

    //open new post request and set request header
    req.open('POST', 'http://flip3.engr.oregonstate.edu:6951/add-entry',true);
    req.setRequestHeader('Content-Type', 'application/json');
    //if post response received post to window, else log error
    req.addEventListener('load',function(){
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            document.getElementById("table").innerHTML = "";
            console.log(response);
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    //send request
    req.send(JSON.stringify(payload));
}

function removeCard() {
    document.getElementById("cardRemove").addEventListener("click", function () {
        event.preventDefault();
        document.getElementById("cardRemove").parentElement.remove();
    });
}

function bindButtons() {
    //add click listened to city submit buttons
    document.getElementById('inputSubmit').addEventListener('click', function (event) {
        //prevent default click behavior
        event.preventDefault();

        let container = document.getElementById('panel-group');
        var personName = document.getElementById('search-input').value

        newCard = document.createElement("div");
        newPerson = document.createElement("div");
        newDate = document.createElement("div");
        newRemove = document.createElement("button");
        newCard.className = 'panel panel-default card';
        newPerson.className = 'panel-heading';
        newDate.className = 'panel-body';
        newPerson.textContent = personName;

        //create to http request and grab city name and country code user inputs
        var reqPerson = new XMLHttpRequest();

        //start async request, if response received post to window, else post error to the console
        reqPerson.open("GET", 'http://flip3.engr.oregonstate.edu:17832/Person?name='+personName, true);
        reqPerson.addEventListener('load', function () {
            if (reqCity.status >= 200 && reqCity.status < 400) {
                var responsePerson = JSON.parse(reqPerson.responseText);
                console.log(responsePerson);
                newDate.textContent = responsePerson
            } else {
                console.log("Error in network request: " + reqPerson.statusText);
            }
        });
        //send request
        reqPerson.send(null);

        newRemove.type = 'button';
        newRemove.className = 'btn btn-default btn-sm';
        newRemove.textContent = 'Remove'
        newRemove.addEventListener("click", function () {
            event.preventDefault();
            this.parentElement.remove();
        });

        newCard.appendChild(newPerson);
        newCard.appendChild(newDate);
        newCard.appendChild(newRemove)

        container.appendChild(newCard);
    });

};


