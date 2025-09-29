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

showMenu('nav-toggle', 'nav-menu')

/*=============== FAQ FUNCTIONALITY ===============*/
class FAQManager {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.searchBox = document.getElementById('searchBox');
    this.faqContainer = document.getElementById('faqContainer');
    this.noResults = document.getElementById('noResults');
    this.init();
  }

  init() {
    this.bindEvents();
    this.animateItems();
  }

  bindEvents() {
    // FAQ item click events
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => this.toggleFAQ(item));
    });

    // Search functionality
    this.searchBox.addEventListener('input', (e) => this.handleSearch(e.target.value));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  toggleFAQ(item) {
    const isActive = item.classList.contains('active');

    // Close all items first
    this.faqItems.forEach(faq => {
      faq.classList.remove('active');
      faq.querySelector('.faq-answer').style.maxHeight = null;
    });

    // If the clicked one was not active, open it
    if (!isActive) {
      item.classList.add('active');
      this.animateAnswer(item.querySelector('.faq-answer'));
    }
  }

  animateAnswer(answer) {
    const content = answer.querySelector('.faq-answer-content');
    answer.style.maxHeight = content.scrollHeight + 'px';
  }

  handleSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    let visibleCount = 0;

    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question').textContent.toLowerCase();
      const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();

      const matches = question.includes(lowerQuery) || answer.includes(lowerQuery);

      if (matches || lowerQuery === '') {
        item.style.display = 'block';
        item.classList.add('fade-in');
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
      }
    });

    // Show/hide no results message
    this.faqContainer.style.display = visibleCount > 0 ? 'block' : 'none';
    this.noResults.style.display = visibleCount === 0 && lowerQuery !== '' ? 'block' : 'none';
  }

  handleKeyboard(e) {
    // ESC to close all FAQs
    if (e.key === 'Escape') {
      this.faqItems.forEach(item => item.classList.remove('active'));
    }

    // Focus search with '/' key
    if (e.key === '/' && e.target !== this.searchBox) {
      e.preventDefault();
      this.searchBox.focus();
    }
  }

  animateItems() {
    this.faqItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.animationDelay = `${index * 0.1}s`;
      }, 100);
    });
  }
}

// Initialize FAQ manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FAQManager();
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/*=============== SET ACTIVE LINK BASED ON CURRENT PAGE ===============*/
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.dropdown__sublink');
navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPath || (linkHref === '' && (currentPath === '/' || currentPath.endsWith('/skills.html')))) {
    link.classList.add('active');
  }
});