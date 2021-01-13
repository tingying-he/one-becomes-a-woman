webgazer.setGazeListener(function(data, elapsedTime) {
  if (data == null) {
      return;
  }
  var xprediction = data.x; //these x coordinates are relative to the viewport
  var yprediction = data.y; //these y coordinates are relative to the viewport
  console.log(elapsedTime); //elapsed time is based on time since begin was called
}).begin();

window.saveDataAcrossSessions = true;

const eyes = document.getElementsByClassName("eye");
for (let i = 0; i < eyes.length; i++) {
  eyes[i].onclick = function() {
    this.src = "https://media.giphy.com/media/ule4vhcY1xEKQ/giphy.gif"
  }
}