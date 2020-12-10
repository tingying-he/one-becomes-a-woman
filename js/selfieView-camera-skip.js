
// var btn=document.getElementById('btn');
// btn.onclick=function(){
//         location.href="./launch.html"
   
// }


var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}


// var val=window.localStorage.getItem('val'),
//     p=document.getElementById('p');
//     p.innerText=val