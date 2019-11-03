function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("Benutzer lehnte Standortabfrage ab.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Standortdaten sind nicht verfügbar.");
            break;
        case error.TIMEOUT:
            console.log("Die Standortabfrage dauerte zu lange (Time-out).");
            break;
        case error.UNKNOWN_ERROR:
            console.log("unbekannter Fehler.");
            break;
    }
}

function start() {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(evCoords, showError, {
            enableHighAccuracy: true, 
            timeout: 5000, 
            maximumAge: 5000
         });
    } else { 
        alert('Ihr Browser unterstützt keine Geolocation.');
    }
}

function evCoords(position) {
    if (fetched == false) {
        fetched = true;
        fetchObjects(position);
        oldpos.latitude = position.coords.latitude;
        oldpos.longitude = position.coords.longitude;
    } else if (calcDistance(oldpos, position) > 500) {
        fetched = false;
    }

    if (typeof objects !== "undefined") {
        while (listDiv.firstChild) {
            listDiv.removeChild(listDiv.firstChild);
        }
        objects.forEach(obj => {
            obj.distance = calcDistance(obj, position);
        });
        objects.sort(sortByDistance);
        objects.forEach(obj => {
            listDiv.appendChild(createCard(obj));
        });
    }

    if (debug) {

        a1 = new Date(position.timestamp);
        b1 = a1.getHours();
        c1 = a1.getMinutes();
        d1 = a1.getSeconds();
        zeit1 = b1+':'+c1+':'+d1;
        output.innerHTML = "Test Erfolgreich:<br>"
            + "<br>Zeitpunkt: " + zeit1
            + "<br>Breite: " + position.coords.latitude 
            + "<br>Länge: " + position.coords.longitude
            + "<br>Genauigkeit: " + position.coords.accuracy
            + "<br>Höhe: " + position.coords.altitude
            + "<br>Höhengenauigkeit: " + position.coords.altitudeAccuracy
            + "<br>Richtung: " + position.coords.heading
            + "<br>Geschwindigkeit: " + position.coords.speed;
        
    }
        
}

function stop() {
    navigator.geolocation.clearWatch();
}

function fetchObjects(position) {

    const data = {
        user_lat: position.coords.latitude,
        user_long: position.coords.longitude
    };
      
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // data can be `string` or {object}
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response =>  {
        objects = response.objects;
        console.log('Success:', JSON.stringify(response));
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function createCard(obj) {
    var tempCard = document.createElement('div');
    var tempImg = document.createElement('img');
    var tempText = document.createElement('div');
    var tempHead = document.createElement('p');
    var tempSub = document.createElement('p');
    var tempSubRight = document.createElement('p');
    tempCard.classList.add('icard');
    tempImg.classList.add('circle');
    tempImg.classList.add('icon');
    tempImg.alt = 'Bild';
    tempText.classList.add('text');
    tempHead.classList.add('head');
    tempSub.classList.add('sub');
    tempSubRight.classList.add('sub-right');

    tempImg.src = imgBasePath + obj.img_url;
    var tempHeadText = document.createTextNode(obj.name);
    var tempSubText = document.createTextNode(obj.town);
    if (obj.distance >= 1000) {
        var tempSubRightText = document.createTextNode((obj.distance / 1000).toFixed(2) + "km");
    } else {
        var tempSubRightText = document.createTextNode(obj.distance + "m");
    }

    tempHead.appendChild(tempHeadText);
    tempSub.appendChild(tempSubText);
    tempSubRight.appendChild(tempSubRightText);

    tempText.appendChild(tempHead);
    tempText.appendChild(tempSub);
    tempText.appendChild(tempSubRight);

    tempCard.appendChild(tempImg);
    tempCard.appendChild(tempText);
    return tempCard;
}

function calcDistance(obj, position) {
    
    var latInMeter = distance_const;
    var longInMeter = distance_const * Math.cos(position.coords.latitude * Math.PI / 180);

    var distanceLat = Math.abs(obj.latitude - position.coords.latitude);
    var distanceLong = Math.abs(obj.longitude - position.coords.longitude);

    var distanceLatInMeter = distanceLat * latInMeter;
    var distanceLongInMeter = distanceLong * longInMeter;

    var distance = Math.sqrt(Math.pow(distanceLatInMeter, 2) + Math.pow(distanceLongInMeter, 2));

    return Math.round(distance);
}

function sortByDistance(a, b) {
    return a.distance - b.distance;
}

var oldpos;
var distance_const = 111120;
var listDiv = document.getElementById('list');
var output;
var url = "https://www.mks-software.de/jgf/beta/get_objects.php";
var imgBasePath = "https://www.mks-software.de/jgf/src/img/";
var fetched = false;
var objects;

if (typeof debug !== "undefined") {
    output = document.getElementById('output');
} else {
    start();
    var debug = false;
}