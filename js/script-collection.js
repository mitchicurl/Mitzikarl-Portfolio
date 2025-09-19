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

const pictureItems = document.querySelectorAll('.picture-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentIndex = 0;

const showItem = (index) => {
  const item = pictureItems[index];
  const img = item.querySelector('img');
  if (img) {
    lightboxImage.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" 
           style="max-width: 90vw; max-height: 90vh; border-radius: 10px; object-fit: contain;">
    `;
  }
};

pictureItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    showItem(currentIndex);
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxImage.innerHTML = '';
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + pictureItems.length) % pictureItems.length;
  showItem(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % pictureItems.length;
  showItem(currentIndex);
});

// Close lightbox when clicking outside
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    lightboxImage.innerHTML = '';
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return; // only when lightbox is open

  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + pictureItems.length) % pictureItems.length;
    showItem(currentIndex);
  } 
  else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % pictureItems.length;
    showItem(currentIndex);
  } 
  else if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    lightboxImage.innerHTML = '';
  }
});