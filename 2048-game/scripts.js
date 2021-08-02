const color=[
    '#ED3453',
    '#4034ED',
    '#2FD745',
    '#FEFEFE',
    '#FEFE0D'
]

function drop() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}


function craeteSquare(){
    const section = document.querySelector('section');
    const square= document.createElement('span')

    var size=Math.random()*50;

    square.style.width=10+size+'px';
    square.style.height=10+size+'px';

    square.style.top=Math.random()*innerHeight + 'px';
    square.style.left=Math.random()*innerWidth + 'px';
    const bg=color[Math.floor(Math.random()*color.length)];
    square.style.background=bg

    section.appendChild(square);

    setTimeout(()=>{square.remove()
    },5000)


}
setInterval(craeteSquare ,160)