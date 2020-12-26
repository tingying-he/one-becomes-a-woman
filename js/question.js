
var nextBtn=document.getElementById('nextBtn');
nextBtn.onclick=function(){
    var ipt=document.getElementById('ipt').value;
    console.log(ipt)
    if(ipt){
        window.localStorage.setItem('val',ipt)
        if (confirm("To continue your experience, you can choose OK to open your camera or Cancel to experience without camera.")) {
            location.href="./selfieView-camera-word.html"
            window.localStorage.setItem('look',"./images/selfie/look-camera.gif");
         } else {
            location.href="./selfieView-camera-word.html"
            window.localStorage.setItem('look',"./images/selfie/look-black.gif");
         }
    }else{
        alert('Please enter a word')
    }
}

