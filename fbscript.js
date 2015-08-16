var doc;
window.onload=function(){
    setInterval(function(){ isOnline("100006915194491"); }, 20000);	
};
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getCallable(text) {
  return text.match('"is_callable":(.*)?,')[1];
}

// Make the actual CORS request.
function makeCorsRequest(id) {
  // All HTML5 Rocks properties support CORS.
var url="https://m.facebook.com/rtc/callability/?user_id=";
var xhr = createCORSRequest('GET', url+id);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    doc=xhr.responseText;
    alert(text+" "+getCallable(text));
    
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function isOnline(str) {
makeCorsRequest(str);
}
