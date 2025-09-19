/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')

       // Add show-icon to show and hide the menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle', 'nav-menu')

/*=============== ACTIVE AND REMOVE MENU ===============*/
var links = document.querySelectorAll(".dropdown__sublink");
for(link of links){
  link.addEventListener("click", function(e){
    // Prevent clicking on active link
    if (e.target.classList.contains('active')) {
      e.preventDefault();
      return;
    }
    for(inlink of links){
      inlink.classList.remove("active");
    }
    e.target.classList.add("active");
  });
}

/*=============== SET ACTIVE LINK BASED ON CURRENT PAGE ===============*/
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.dropdown__sublink');
navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPath || (linkHref === '' && (currentPath === '/' || currentPath.endsWith('/skills.html')))) {
    link.classList.add('active');
  }
});

/*=============== SKILLS ANIMATION ON SCROLL ===============*/
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe skill boxes
const skillBoxes = document.querySelectorAll('.skill-box');
skillBoxes.forEach(box => {
  box.style.opacity = '0';
  box.style.transform = 'translateY(30px)';
  box.style.transition = 'all 0.8s ease-out';
  observer.observe(box);
});