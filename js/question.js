
var nextBtn=document.getElementById('nextBtn');
nextBtn.onclick=function(){
    var ipt=document.getElementById('ipt').value;
    console.log(ipt)
    if(ipt){
        window.localStorage.setItem('val',ipt)
        // location.href="./encourage0.html"
        confirmCamera();
    }else{
        alert('Please enter a word')
    }
}

var skipBtn=document.getElementById('skipBtn');
skipBtn.onclick = function(){
    location.href='./selfieView.html'
}


function confirmCamera() {
    var txt;
    if (confirm("Do you want to open your camera?")) {
       location.href="./selfieView-Camera.html"
    } else {
      location.href="./selfieView.html"
    }
  }