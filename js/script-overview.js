/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
    // Add show-menu class to nav menu
    nav.classList.toggle('show-menu')

    // Add show-icon to show and hide the menu icon
    toggle.classList.toggle('show-icon')
  })
}

/*=============== ACTIVE AND REMOVE MENU ===============*/
var links = document.querySelectorAll(".dropdown__link");
for (link of links) {
  link.addEventListener("click", function (e) {
    // Prevent clicking on active link
    if (e.target.classList.contains('active')) {
      e.preventDefault();
      return;
    }
    for (inlink of links) {
      inlink.classList.remove("active");
    }
    e.target.classList.add("active");
  });
}

/*=============== SET ACTIVE LINK BASED ON CURRENT PAGE ===============*/
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.dropdown__link');
navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPath || (linkHref === '' && (currentPath === '/' || currentPath.endsWith('/contact.html')))) {
    link.classList.add('active');
  }
});

showMenu('nav-toggle', 'nav-menu')

/*=============== SLIDESHOW FUNCTIONALITY ===============*/
let slideIndex = 0;
const slides = document.querySelectorAll('.mySlides');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Show current slide
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function currentSlide(index) {
  slideIndex = index - 1;
  showSlide(slideIndex);
}

// Auto slideshow - change slide every 10 seconds
setInterval(nextSlide, 10000);

// Initialize first slide
showSlide(0);

/*=============== SCROLL ANIMATION ===============*/
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe the about-content-2 element
const aboutContent2 = document.querySelector('.about-content-2');
if (aboutContent2) {
  observer.observe(aboutContent2);
}