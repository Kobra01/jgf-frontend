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
        // objects = response.objects;
        console.log('Success:', JSON.stringify(response));
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


var url = "https://www.mks-software.de/jgf/beta/get_details.php";
var urlValues = new getUrlValues(location.search);