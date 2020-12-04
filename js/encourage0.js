var bgImg = document.getElementById("bg");
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
          
            // document.body.style.backgroundImage = "url('./images/scatters_bg.png')";
            fadeIn(bgImg);
            fadeOut(iframe);
            // document.getElementById("iframe1").style.cssText = "width:0; height:0; border:0; border:none";
            
            toSelfieView();
        }
    });

    function toSelfieView() {
        setTimeout(
          function() {
            location.href='./selfieView.html'
          }, 7000);
      }

      function fadeIn(el) {
        el.style.opacity = 0;
        var tick = function () {
            el.style.opacity = +el.style.opacity + 0.01;
            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };
        tick();
    }

    function fadeOut(el) {
        el.style.opacity = 1;
        var tick = function () {
            el.style.opacity = +el.style.opacity - 0.01;
            if (+el.style.opacity >0) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };
        tick();
    }
