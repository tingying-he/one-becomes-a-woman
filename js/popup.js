var goMouse = document.getElementById("goMouse");
if (goMouse){
  goMouse.onclick = function(){
    location.href="./maleView_mouse.html"
    // hidePopBox();
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
