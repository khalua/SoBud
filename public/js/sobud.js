$(function()  {
  console.log("Ready Freddy!");
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:4567/refresh.json";
  var song1; // always current song
  var song2; // current OR last song
  var speakerStatus;

  function getStatus() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          speakerStatus = JSON.parse(xmlhttp.responseText);
          if ( typeof song1 === undefined ) {
            song1 = speakerStatus.uri;
          }
          song2 = speakerStatus.uri;
          console.log(speakerStatus);
    }
    }
  }

  function refresh() {
    console.log("song1: " + song1);
    console.log("song2: " + song2);
    if ( typeof song1 !== undefined && song1 != song2) {
        console.log("new song! reload");
        location.reload();
    }

    if ( typeof song1 === undefined && typeof song2 !== undefined ) {
      if (speakerStatus.status == 'playing') {
        console.log("maybe new song, let's reload!");
        location.reload();
      }
    }
  }

  setInterval(getStatus, 3000);
  setInterval(refresh, 3000);

});




