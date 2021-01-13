
// var btn=document.getElementById('btn');
// btn.onclick=function(){
//         location.href="./launch.html"
   
// }


var video = document.querySelector("#video-camera");
var camera = window.localStorage.getItem('camera')

if(camera == "on")
{if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}}


var val=window.localStorage.getItem('val'),
    p=document.getElementById('word');
    p.innerText=val;

var lookSrc = window.localStorage.getItem('look');
var lookImg = document.getElementById('look');

lookImg.setAttribute("src",lookSrc);

