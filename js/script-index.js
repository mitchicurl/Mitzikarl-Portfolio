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

/*=============== TYPE ANIMATION ===============*/
var typed = new Typed(".auto-type", {
  strings: ["Student", "Web Developer", "Designer", "Music Critic"],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 1200,
  loop: true
})

/*=============== ACTIVE AND REMOVE MENU ===============*/
var links = document.querySelectorAll(".nav__link");
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
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPath || (linkHref === '' && (currentPath === '/' || currentPath.endsWith('/index.html')))) {
    link.classList.add('active');
  }
});

showMenu('nav-toggle','nav-menu')
