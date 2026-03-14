const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Replace preview image placeholder
const previewOld = `<div class="preview-img">
        <div class="ic">🖼️</div>
        <strong>[ Prévia do material ]</strong>
        <p style="margin-top:6px;font-size:12px;color:#9CA3AF">Ex: folha de atividade impressa, tela com PDF aberto</p>
      </div>`;
const previewNew = `<div class="preview-img" style="padding: 0; border: none; background: none;">
        <img src="previa.png" style="width: 100%; border-radius: 14px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);" alt="Previa do Material">
      </div>`;

// 2. Replace offer mockup placeholder
const offerOld = `<div class="offer-mockup">
          <div class="ic">🖼️</div>
          <strong>[ Mockup do kit completo ]</strong>
          <p style="margin-top:6px;font-size:12px;color:#9CA3AF">Ex: todos os volumes + bônus em perspectiva</p>
        </div>`;
const offerNew = `<div class="offer-mockup" style="background: none; border: none; padding: 0;">
          <img src="mockup.png" style="width: 100%; border-radius: 12px;" alt="Kit Completo">
        </div>`;

content = content.replace(previewOld, previewNew).replace(offerOld, offerNew);

// 3. Add Carousel CSS and Mobile adjustments
const carouselStyles = `
/* CAROUSEL TESTIMONIALS */
@media (max-width: 640px) {
  .testi-grid {
    display: flex !important;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 12px;
    padding-bottom: 20px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }
  .testi-grid::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  .testi-img {
    flex: 0 0 85%;
    scroll-snap-align: center;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .testi-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: -10px;
    margin-bottom: 20px;
  }
  .testi-dot {
    width: 8px;
    height: 8px;
    background: #CBD5E1;
    border-radius: 50%;
    transition: background 0.3s;
  }
  .testi-dot.active {
    background: var(--blue);
    width: 20px;
    border-radius: 4px;
  }
}

/* RESPONSIVENESS FIXES */
body { overflow-x: hidden; }
.wrap { padding-left: 20px; padding-right: 20px; }
@media (max-width: 480px) {
  .hero-title { font-size: 28px !important; }
  .sec-title { font-size: 24px !important; }
  .stats-bar { flex-direction: column; gap: 15px; padding: 20px; }
  .offer-box { padding: 20px 15px; }
}
`;

// Inject styles before closing </style>
content = content.replace('</style>', carouselStyles + '\n</style>');

// 4. Add Dots and JS for carousel indicator
const testiGridEnd = '</div>\n    <div class="testi-dots" id="testiDots"></div>';
content = content.replace('</div>\n  </div>\n</section>\n\n<!-- É PARA VOCÊ -->', testiGridEnd + '\n  </div>\n</section>\n\n<!-- É PARA VOCÊ -->');

const carouselJS = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.testi-grid');
  const dotsContainer = document.getElementById('testiDots');
  const items = grid.querySelectorAll('.testi-img');
  
  if (window.innerWidth <= 640) {
    items.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dotsContainer.appendChild(dot);
    });

    grid.addEventListener('scroll', () => {
      const index = Math.round(grid.scrollLeft / (grid.clientWidth * 0.85));
      const dots = dotsContainer.querySelectorAll('.testi-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    });
  }
});
</script>
`;

// Inject JS before closing </body>
content = content.replace('</body>', carouselJS + '\n</body>');

fs.writeFileSync('index.html', content, 'utf8');
console.log('Final touches applied successfully.');
