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

    var ausgabe2 = document.getElementById('ausgabe');
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