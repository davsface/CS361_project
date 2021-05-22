document.addEventListener('DOMContentLoaded', resetTable);

function resetTable(event) {
    idCounter = 0
    event.preventDefault();
    var req = new XMLHttpRequest();
    req.open('GET', 'http://flip3.engr.oregonstate.edu:6950/reset-table', true);
    req.setRequestHeader('Content-Type', 'application/json');
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
    req.send(null);
}

function removeItem() {
    document.getElementById("cardRemove").addEventListener("click", function () {
        event.preventDefault();
        document.getElementById("cardRemove").parentElement.remove();
    });
}

function addCard() {
    var cardList = document.getElementById("card-container");

    let container = document.getElementById("panel-group");

    newCard = document.createElement("div");
    newPerson = document.createElement("div");
    newDate = document.createElement("div");
    newRemove = document.createElement("button");
    newCard.className = 'panel panel-default card';

    newPerson.className = 'panel-heading';
    newPerson.textContent = 'Dave';
    newDate.className = 'panel-body';

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


/*
    for(var i = 0; i < cardList.length; i++)
    {
        if (newCard.textContent === cardList.getElementsByClassName("person-name").textContent) {
            return
        }
    };
*/
    container.appendChild(newCard);

}

/*
function bindButtons() {
    //add click listened to city submit buttons
    document.getElementById('searchSubmit').addEventListener('click', function (event) {
        //prevent default click behavior
        event.preventDefault();
        //create to http request and grab city name and country code user inputs
        var reqCity = new XMLHttpRequest();
        var cityName = document.getElementById('cityName').value
        var countryCode = document.getElementById('countryCode1').value
        //start async request, if response received post to window, else post error to the console
        reqCity.open("GET", 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "," + countryCode + '&appid=' + apiKey, true);
        reqCity.addEventListener('load', function () {
            if (reqCity.status >= 200 && reqCity.status < 400) {
                var responseCity = JSON.parse(reqCity.responseText);
                console.log(responseCity);
                document.getElementById('cityTemp').textContent = "It is " + toF(responseCity.main.temp) + " degrees F ";
                document.getElementById('cityWeather').textContent = "and " + responseCity.weather[0].description;
            } else {
                console.log("Error in network request: " + reqCity.statusText);
            }
        });
        //send request
        reqCity.send(null);
    });
}
*/
