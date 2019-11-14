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



  var urlValues = new getUrlValues(location.search);