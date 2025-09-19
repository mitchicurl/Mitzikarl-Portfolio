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
showMenu('nav-toggle','nav-menu')

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

/*=============== CONTACTS ===============*/
const inputs = document.querySelectorAll('.input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focus');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focus');
        }
    });
});

// Handle form submission with custom success message
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(this);
    
    // Submit to Formspree
    fetch('https://formspree.io/f/xandkkwr', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            showSuccessMessage();
            // Reset form
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        alert('Sorry, there was an error sending your message. Please try again.');
    });
});

function showSuccessMessage() {
    document.getElementById('overlay').classList.add('show');
    document.getElementById('successMessage').classList.add('show');
}

function closeSuccessMessage() {
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('successMessage').classList.remove('show');
}

document.getElementById('overlay').addEventListener('click', closeSuccessMessage);