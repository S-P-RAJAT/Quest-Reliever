var no=0;
delay = 0;
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
  delay = 5000;
  no = no - 1;
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  delay = 5000;
  no = no - 1;
}

function showSlides(n) {
  var i;
  no =n;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
no =0
function slid(){
	no = (no%3)+1;
  	showSlides(slideIndex = no);
	setTimeout(slid, 5000+delay);
	delay=0;
	}
	slid();