var btn = document.getElementById("nextBtn");
if(document.getElementById('popBox-demo')){
  btn.onclick = function () {
    location.href = "./question.html";
  };
  window.onload=function(){
    showPopBox();
  }
}

var goMouse = document.getElementById("goMouse");
if (goMouse){
  goMouse.onclick = function(){
    // location.href="./maleView_mouse.html"
    hidePopBox();
    window.localStorage.setItem('look',"./images/selfie/look-black.gif");
    window.localStorage.setItem('camera',"off");
  }
}

var goEye = document.getElementById("goEye");
if(goEye){
  goEye.onclick = function(){
    console.log("selectEye");
    location.href="./train.html"
    window.localStorage.setItem('look',"./images/selfie/look-camera.gif");
    window.localStorage.setItem('camera',"on");
    
  }
}

// testBtn.onclick= function(){
//   console.log("testBtn is clicked");
//   location.href="./train.html";
  
// }

function showPopBox(){
  document.getElementById('popBox-demo').style.display = 'block';
}
function hidePopBox(){
  document.getElementById('popBox-demo').style.display = 'none';
}





// var hover=document.getElementById('hover');
// var video = document.getElementById('bodyShape');
// hover.onmouseover=function(){
// video.play();
// }
// hover.onmouseout=function(){
//         video.pause();
// }

function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 2000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.container-fluid', true);
  setVisible('#loading', false);
});

// onReady(function () {
//   setVisible(".container-fluid", true);
//   setVisible("#loading", false);
//   // introJs().start();
//   introJs().setOptions({
//     steps: [{
//       intro: "Experience with your gazes!"
//     }, {
//       element: document.getElementById('camera'),
//       intro: 'Make sure your face within the box and it\'s green!'
//     }]
//   }).start();
// });

// var iframe2 = document.getElementById('iframe2')
// iframe2.onload = function()
//     {
//         //display loader on page load
//         $('#loading').fadeOut();
//     }

// $(document).ready(function() {

//   $("#iframe2").load(function() {
//      $("#loading").hide();
//   });
// });



