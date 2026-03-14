const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Increase Logo Size
content = content.replace('.top-bar img{max-height:45px}', '.top-bar img{max-height:85px}');

// 2. Dynamic Date placeholder for text
const dateOldText = 'Desconto exclusivo disponível somente hoje nesta página — 13/03/2026';
const dateNewText = 'Desconto exclusivo disponível somente hoje nesta página — <span id="currentDate">13/03/2026</span>';

if (content.includes(dateOldText)) {
    content = content.replace(dateOldText, dateNewText);
}

// 3. Icon update for TEA bonus
content = content.replace('Hoje: Grátis 🎁', 'Hoje: Grátis ✓');

// 4. Adjust Mobile Sizes (Testimonials and Preview) - CSS refinement
const mobileCSS = `
/* MOBILE REFINEMENTS for poly-filling polution */
@media (max-width: 640px) {
  .testi-img {
    flex: 0 0 75% !important; /* Slightly smaller to see next item but still clear */
    max-height: 480px;
    object-fit: contain;
    background: #fff;
  }
  .preview-img img {
    max-height: 400px;
    object-fit: contain;
    margin: 0 auto;
    display: block;
    width: auto !important;
  }
}
`;
content = content.replace('</style>', mobileCSS + '\n</style>');

// 5. Enhance JS (Dynamic Date + Auto-Play Carousel)
const existingJSStart = "document.addEventListener('DOMContentLoaded', function() {";
const enhancedJS = `
document.addEventListener('DOMContentLoaded', function() {
  // --- Dynamic Date ---
  const dateSpan = document.getElementById('currentDate');
  if (dateSpan) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    dateSpan.textContent = day + '/' + month + '/' + year;
  }

  // --- Carousel Auto-Play ---
  const grid = document.querySelector('.testi-grid');
  const dotsContainer = document.getElementById('testiDots');
  const items = grid.querySelectorAll('.testi-img');
  
  if (window.innerWidth <= 640 && items.length > 0) {
    items.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dotsContainer.appendChild(dot);
    });

    let isScrolling = false;
    grid.addEventListener('scroll', () => {
      if(isScrolling) return;
      const index = Math.round(grid.scrollLeft / (grid.clientWidth * 0.77)); // Adjust factor based on flex-basis
      const dots = dotsContainer.querySelectorAll('.testi-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    });

    // Auto-advance
    let currentIndex = 0;
    setInterval(() => {
      currentIndex++;
      if (currentIndex >= items.length) currentIndex = 0;
      
      isScrolling = true;
      const scrollAmount = currentIndex * (grid.clientWidth * 0.77 + 12); // item width + gap
      grid.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      const dots = dotsContainer.querySelectorAll('.testi-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      
      setTimeout(() => { isScrolling = false; }, 600);
    }, 4000);
  }
});
`;

// Replace the old JS block entirely or just the part inside script
const scriptStart = "<script>\ndocument.addEventListener('DOMContentLoaded', function() {";
const scriptEnd = "</script>";

const startIdx = content.indexOf(scriptStart);
if (startIdx !== -1) {
    const endIdx = content.indexOf(scriptEnd, startIdx);
    if (endIdx !== -1) {
        content = content.substring(0, startIdx) + "<script>" + enhancedJS + "</script>" + content.substring(endIdx + scriptEnd.length);
    }
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Refinements applied.');
