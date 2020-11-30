var val=window.localStorage.getItem('val'),
    p=document.getElementById('p');
    p.innerText=val
    p.onclick=function(){
        location.href='./encourage1.html'
    }