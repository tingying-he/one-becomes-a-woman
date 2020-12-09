
var nextBtn=document.getElementById('nextBtn');
nextBtn.onclick=function(){
    var ipt=document.getElementById('ipt').value;
    console.log(ipt)
    if(ipt){
        window.localStorage.setItem('val',ipt)
        location.href="./encourage0.html"
    }else{
        alert('Please enter a word')
    }
}

var skipBtn=document.getElementById('skipBtn');
skipBtn.onclick = function(){
    location.href='./selfieView.html'
}