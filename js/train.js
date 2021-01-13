webgazer.setGazeListener(function(data, elapsedTime) {
  if (data == null) {
      return;
  }
  var xprediction = data.x; //these x coordinates are relative to the viewport
  var yprediction = data.y; //these y coordinates are relative to the viewport
  console.log(elapsedTime); //elapsed time is based on time since begin was called
}).begin();

window.saveDataAcrossSessions = true;

var eyesNum = 0;
var nextBtn = document.getElementById("next");

const eyes = document.getElementsByClassName("eye");
for (let i = 0; i < eyes.length; i++) {
  eyes[i].onclick = function() {
    this.src = "./images/male/open.gif";
    eyesNum ++
    if(eyesNum == 5){
      nextBtn.disabled = false;
    }
  }
}