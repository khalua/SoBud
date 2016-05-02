$(function()  {
  console.log("Ready Freddy!");
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:4567/refresh.json";
  var song1; // always current song
  var song2; // current OR last song


  function getStatus() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var speakerStatus = JSON.parse(xmlhttp.responseText);
          if (song1 === undefined) {
            song1 = speakerStatus.uri;
            }
          song2 = speakerStatus.uri;
          console.log(speakerStatus);
        }
    };

  }

  function refresh() {
    if (song1 != undefined && song1 != song2) {
       console.log("new song!");
       location.reload();
    }
  }


  setInterval(getStatus, 3000);
  setInterval(refresh, 3000);

});




