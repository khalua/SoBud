$(function()  {
  console.log("ready Freddy!");
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:4567/refresh.json";
  window.currentSong = null;
  window.lastSong = null;

  function getStatus() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var speakerStatus = JSON.parse(xmlhttp.responseText);
          window.currentSong = speakerStatus.uri;
          console.log(speakerStatus);
          console.log(speakerStatus.status);
        }
    };
  }

  function refresh() {
    if (window.lastSong != null && window.currentSong != window.lastSong) {
      console.log('fire in the hole');
    }
  }

  setInterval(getStatus,3000);
  setInterval(refresh,3000);


});

