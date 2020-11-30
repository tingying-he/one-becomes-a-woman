
var btn=document.getElementById('btn');
btn.onclick=function(){
    var ipt=document.getElementById('ipt').value;
    console.log(ipt)
    if(ipt){
        window.localStorage.setItem('val',ipt)
        location.href="./maleView.html"
    }else{
        alert('您输入的值不能为空')
    }
}
