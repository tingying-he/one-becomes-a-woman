
var btn=document.getElementById('btn');
btn.onclick=function(){
        showPopBox();
   
}
closeBtn.onclick= function(){
        hidePopBox();
}
goMouse.onclick = function(){
        location.href="./maleView-mouse.html"
}
goEye.onclick = function(){
        location.href="./maleView.html"
}


function showPopBox(){
        document.getElementById('popBox-demo').style.display = 'block';
    }
    function hidePopBox(){
        document.getElementById('popBox-demo').style.display = 'none';
    }


