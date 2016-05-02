$(function()  {
  console.log("Ready Freddy!");
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:4567/refresh.json";
  var song1; // always current song
  var song2; // current OR last song
  var speakerStatus;
  var state1;  // always current state
  var state2;  // current OR last state

  function getSpeakerInfo() {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
          speakerStatus = JSON.parse(xmlhttp.responseText);
          if ( song1 == undefined ) {
            song1 = speakerStatus.uri;
          }
          song2 = speakerStatus.uri;
          console.log(speakerStatus);
          // some state shit now
          if ( state1 == undefined ) {
            state1 = speakerStatus.state;
          }
          state2 = speakerStatus.state;
    }
    }
  }

  function refresh() {
    if ( song1 != undefined && song1 != song2) {
        console.log("new song! reload");
        location.reload();
    }
    if ( state1 != state2 ) {
        console.log("pause detected! reload");
        location.reload();
    }

    //debugging
//    console.log("song1: " + song1);
//    console.log("song2: " + song2);
//    console.log("state1: " + state1);
//    console.log("state2: " + state2);
//    console.log("speakerStatus.state: " + speakerStatus.state );
  }

  setInterval(getSpeakerInfo, 3000);
  setInterval(refresh, 3000);

});




