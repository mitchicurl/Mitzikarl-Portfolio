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

// Genre filtering
const tabButtons = document.querySelectorAll('.tab-button');
const albumCards = document.querySelectorAll('.album-card');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedGenre = button.dataset.genre;

    albumCards.forEach(card => {
      if (selectedGenre === 'all' || card.dataset.genre === selectedGenre) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Mood filtering
const moodTags = document.querySelectorAll('.mood-tag');

moodTags.forEach(tag => {
  tag.addEventListener('click', () => {
    moodTags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');

    // Add visual feedback
    tag.style.transform = 'scale(1.2)';
    setTimeout(() => {
      tag.style.transform = 'scale(1.1)';
    }, 200);
  });
});

// Play button interactions
const playButtons = document.querySelectorAll('.play-button:not(a)');

playButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();

    // Reset all buttons
    playButtons.forEach(btn => {
      btn.innerHTML = '▶';
      btn.style.background = '#FF9505';
    });

    // Set clicked button to playing state
    button.innerHTML = '⏸';
    button.style.background = '#d9c6b0';

    // Simulate song playing effect
    setTimeout(() => {
      button.innerHTML = '▶';
      button.style.background = '#FF9505';
    }, 3000);
  });
});

// Add CSS for fadeIn animation
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
document.head.appendChild(style);