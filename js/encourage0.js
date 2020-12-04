var not = document.getElementById('not')
var iframe = document.getElementById('iframe1')
var val=window.localStorage.getItem('val'),
    p=document.getElementById('p');
    p.innerText=val
    // p.onclick=function(){
    //     location.href='./encourage1.html'
    // }

    p.addEventListener('click', function (evt) {
        if (evt.detail === 5) {
            // alert('5 click!');
            not.style.cssText = "color: #AD0053;text-transform:uppercase;font-weight:bold"; 
            document.body.style.backgroundImage = "url('./images/scatters_bg.png')";
            // body.style.cssText="background-image:url('../images/scatters_bg.png');"
            // iframe.style.display = "none";
            document.getElementById("iframe1").style.cssText = "width:0; height:0; border:0; border:none";
            
        }
    });


    