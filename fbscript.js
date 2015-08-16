function notifyMe(userName) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification( userName + ' Online', {
      icon: 'iconimage',
      body: userName + " is online",
    });

    notification.onclick = function () {
      window.open("https://www.facebook.com/messages/");      
    };

  }

}


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
  return text.match('"is_callable":(.*)?,"reason_code')[1];
}

// Make the actual CORS request.
function makeCorsRequest(uname,uid) {
  // All HTML5 Rocks properties support CORS.
var url="https://m.facebook.com/rtc/callability/?user_id="+uid;
var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    doc=xhr.responseText;
    //alert(text+" ** "+getCallable(text));
	if(getCallable(text)=="true"){
	notifyMe(uname);
	}else{console.log(uname + " Offline"); }
    
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function isOnline(uname,uid) {
makeCorsRequest(uname,uid);
}
