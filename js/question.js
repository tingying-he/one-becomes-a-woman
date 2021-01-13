
var nextBtn=document.getElementById('nextBtn');
var camera = window.localStorage.getItem('camera')

nextBtn.onclick=function(){
    var ipt=document.getElementById('ipt').value;
    console.log(ipt)
    if(ipt){
        window.localStorage.setItem('val',ipt);
        location.href="./selfieView.html";
        if (camera == "on") {          
            window.localStorage.setItem('look',"./images/selfie/look-camera.gif");
         } else {
            window.localStorage.setItem('look',"./images/selfie/look-black.gif");
         }
    }else{
        alert('Please enter a word');
    }
}

