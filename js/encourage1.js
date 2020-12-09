var val = window.localStorage.getItem('val'),
    p = document.getElementById('p'),
   btn = document.getElementById('btn');
p.innerText = val

btn.onclick = function () {

		location.href = './welcome.html'

}

