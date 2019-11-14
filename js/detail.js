function getUrlValues (querystring) {
    if (querystring == '') return;
    var valuestring = querystring.slice(1);
    var pairs = valuestring.split("&");
    var pair, name, value;
    for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i].split("=");
        name = pair[0];
        value = pair[1];
        name = unescape(name).replace("+", " ");
        value = unescape(value).replace("+", " ");
        this[name] = value;
    }
}

function fetchDetails(obj_id) {

    const data = {
        object_id: obj_id
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
        showDetails(response.details, response.information);
        console.log('Success:', JSON.stringify(response));
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showDetails(details, infos) {

    while (listDiv.firstChild) {
        listDiv.removeChild(listDiv.firstChild);
    }

    var imgCard = document.createElement('div');
    var img = document.createElement('img');
    var infoCard = document.createElement('div');
    var objectName = document.createElement('h3');
    var infoText = document.createElement('p');
    imgCard.classList.add('card');
    img.alt = 'Bild';
    img.src = imgBasePath + details.img_url;
    img.style.width = '100%';
    infoCard.classList.add('card');
    objectName.innerText = details.name;
    infoText.innerHTML = "<br>" + details.short_text + "<br><br>Eingereicht: " + details.created;

    infoCard.appendChild(objectName);
    infoCard.appendChild(infoText);
    imgCard.appendChild(img);
    listDiv.appendChild(imgCard);
    listDiv.appendChild(infoCard);


    infos.forEach(inf => {
        listDiv.appendChild(createCard(inf));
    });
}

function createCard(info) {
    var tempCard = document.createElement('div');
    var headline = document.createElement('h3');
    var infotext = document.createElement('p');
    var infosource = document.createElement('p');
    var creator = document.createElement('p');

    tempCard.classList.add('card');
    headline.innerText(info.type);
    if (info.checked != 1) {
        headline.innerText = info.type + " (?)";
    }
    if (info.further_info.startsWith("http")) {
        infotext.innerHTML = "<br>" + info.text + '<br><a href="' + info.further_info + '" style="text-decoration: none">mehr dazu...</a>';
    } else {
        infotext.innerHTML = "<br>" + info.text + "<br><br>mehr dazu: " + info.further_info;
    }
    if (info.source.startsWith("http")) {
        infosource.innerHTML = '<br>Quelle: <a href="' + info.source + '">' + info.source + '</a><br>';
    } else {
        infosource.innerHTML = "<br>Quelle: " + info.source + "<br>";
    }
    creator.innerHTML = "<br><i>Von: " + info.firstname + info.lastname.substring(0, 1); + "</i>";

    tempCard.appendChild(headline);
    tempCard.appendChild(infotext);
    tempCard.appendChild(infosource);
    tempCard.appendChild(creator);

    return tempCard;
}


var listDiv = document.getElementById('list');
var url = "https://www.mks-software.de/jgf/beta/get_details.php";
var imgBasePath = "https://www.mks-software.de/jgf/src/img/";
var urlValues = new getUrlValues(location.search);

fetchDetails(urlValues['o']);