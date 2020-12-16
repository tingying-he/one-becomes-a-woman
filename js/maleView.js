
var btn=document.getElementById('nextBtn');
btn.onclick=function(){
        location.href="./question.html"
   
}

// var hover=document.getElementById('hover');
// var video = document.getElementById('bodyShape');
// hover.onmouseover=function(){
// video.play();
// }
// hover.onmouseout=function(){
//         video.pause();
// }

function onReady(callback) {
        var intervalId = window.setInterval(function() {
          if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
          }
        }, 1000);
      }
      
      function setVisible(selector, visible) {
        document.querySelector(selector).style.display = visible ? 'block' : 'none';
      }
      
      onReady(function() {
        setVisible('.page', true);
        setVisible('#loading', false);
      });