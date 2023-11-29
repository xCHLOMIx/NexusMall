document.addEventListener('DOMContentLoaded', function() {
    var Form1 = document.getElementById("Form1");
    var Form2 = document.getElementById("Form2");
    var img = document.getElementById("img")

    var Next1 = document.getElementById("Next1");
    var Next2 = document.getElementById("Next2");

    Next1.onclick = function(){
        Form1.style.left = "-100%";
        Form2.style.left = "15%";
        img.style.opacity = "100%";
    }
    img.onclick = function(){
        Form1.style.left = "15%";
        Form2.style.left = "100%";
        img.style.opacity = "0%";
    }
});