$(function()  {
  console.log("Ready Freddy!");
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:4567/refresh.json";
  var lastSong;
  var currentSong;


  function getStatus() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var speakerStatus = JSON.parse(xmlhttp.responseText);
          currentSong = speakerStatus.uri;
          console.log(speakerStatus);
        }
    };
  
  }

  function refresher() {
    lastSong   
  }

  setInterval(getStatus,10000);
  setInterval(wtf, 5000) 

});




