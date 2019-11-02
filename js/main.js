function starttest() {
    a = new Date();
    b = a.getHours();
    c = a.getMinutes();
    d = a.getSeconds();
    zeit = b+':'+c+':'+d;

    var ausgabe = document.getElementById('ausgabe');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(evCoords, evError, {
            enableHighAccuracy: true, 
            timeout: 5000, 
            maximumAge: 5000
         });
    } else { 
        ausgabe.innerHTML = 'Ihr Browser unterstützt keine Geolocation.';
    }
}

function evCoords(position) {
    a1 = new Date(position.timestamp);
    b1 = a1.getHours();
    c1 = a1.getMinutes();
    d1 = a1.getSeconds();
    zeit1 = b1+':'+c1+':'+d1;
    ausgabe.innerHTML = "Test Erfolgreich:<br>" 
        
        + "<br>Endzeit: " + zeit1
        + "<br>Breite: " + position.coords.latitude 
        + "<br>Länge: " + position.coords.longitude
        + "<br>Genauigkeit: " + position.coords.accuracy
        + "<br>Höhe: " + position.coords.altitude
        + "<br>Höhengenauigkeit: " + position.coords.altitudeAccuracy
        + "<br>Richtung: " + position.coords.heading
        + "<br>Geschwindigkeit: " + position.coords.speed;
}

function evError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            ausgabe.innerHTML = "Benutzer lehnte Standortabfrage ab."
            break;
        case error.POSITION_UNAVAILABLE:
            ausgabe.innerHTML = "Standortdaten sind nicht verfügbar."
            break;
        case error.TIMEOUT:
            ausgabe.innerHTML = "Die Standortabfrage dauerte zu lange (Time-out)."
            break;
        case error.UNKNOWN_ERROR:
            ausgabe.innerHTML = "unbekannter Fehler."
            break;
    }
}

function starttest2() {

    var ausgabe2 = document.getElementById('ausgabe2');
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(evCoords2, evError, {
            enableHighAccuracy: true, 
            timeout: 5000, 
            maximumAge: 5000
         });
    } else { 
        ausgabe2.innerHTML = 'Ihr Browser unterstützt keine Geolocation.';
    }
}

function evCoords2(position) {
    a1 = new Date(position.timestamp);
    b1 = a1.getHours();
    c1 = a1.getMinutes();
    d1 = a1.getSeconds();
    zeit1 = b1+':'+c1+':'+d1;
    ausgabe2.innerHTML = "Test Erfolgreich:<br>"
        + "<br>Zeitpunkt: " + zeit1
        + "<br>Breite: " + position.coords.latitude 
        + "<br>Länge: " + position.coords.longitude
        + "<br>Genauigkeit: " + position.coords.accuracy
        + "<br>Höhe: " + position.coords.altitude
        + "<br>Höhengenauigkeit: " + position.coords.altitudeAccuracy
        + "<br>Richtung: " + position.coords.heading
        + "<br>Geschwindigkeit: " + position.coords.speed;
}

function stop() {
    navigator.geolocation.clearWatch();
}