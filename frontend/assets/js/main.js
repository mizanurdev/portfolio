// nav toggle start
let menuIcon = document.querySelector("#menu-icon");
let navList = document.querySelector(".navlist");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("open");
}
// nav toggle end

// dark light start
const themeToggle = document.getElementById('theme-toggle');
const rootElement = document.documentElement;
const currentTheme = localStorage.getItem('theme');

// Apply saved theme on initial load
if (currentTheme) {
    rootElement.setAttribute('data-bs-theme', currentTheme);
    // Update the toggle state
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }
}
// Handle theme toggle change
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        rootElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Save theme preference to localStorage
    } else {
        rootElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light'); // Save theme preference to localStorage
    }
});
// dark light end

// change designation section start...
let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex +1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);

    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 :currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000);
// change designation section end...

// portfolio start

// Animation on scroll function and init
function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);
  
  //Initiate glightbox
  const glightbox = GLightbox({
    selector: '.glightbox'
  });
  
  //Init isotope layout and filters
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
  
    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });
  
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  
  });
// portfolio end

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);