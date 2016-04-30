$(function()  {
  console.log("ready freddy!");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://localhost:4567/refresh.json", true);
  xhr.send();

  xhr.addEventListener("readystatechange", processRequest, false);

  xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        alert(response);
    }
  }

});


