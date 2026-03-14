const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Increase Logo Size (from 85px to 115px)
content = content.replace('.top-bar img{max-height:85px}', '.top-bar img{max-height:115px}');

// 2. Center Offer Heading
if (content.includes('.offer-top{')) {
    content = content.replace('.offer-top{', '.offer-top{text-align:center;');
} else {
    // Fallback search
    content = content.replace('.offer-top{', '.offer-top{display:flex;flex-direction:column;align-items:center;text-align:center;');
}
// Ensure badge is centered if flexed
content = content.replace('.offer-top{', '.offer-top{display: flex; flex-direction: column; align-items: center; ');

// 3. Add Certificate Image
const certOld = `<div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <span class="ic">🏆</span>
        </div>`;
const certNew = `<div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <img src="bonus_certificado.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Certificado">
        </div>`;

if (content.includes(certOld)) {
    content = content.replace(certOld, certNew);
} else {
    console.log('Warn: Certificate placeholder not found exactly as expected.');
}

// 4. Update Hero CTA Flow
// Find the hero CTA button. It usually has "Quero Garantir Meu Acesso Agora" and the checkout link.
const heroCTAOld = 'href="https://checkout.educacaodivertida.site/VCCL1O8SCQ9R" class="btn-cta"';
const heroCTANew = 'href="#oferta" class="btn-cta"';

// Only replace the first occurrence (hero section)
let heroCtaFound = false;
content = content.replace('https://checkout.educacaodivertida.site/VCCL1O8SCQ9R" class="btn-cta"', (match) => {
    if (!heroCtaFound) {
        heroCtaFound = true;
        return '#oferta" class="btn-cta"';
    }
    return match;
});

fs.writeFileSync('index.html', content, 'utf8');
console.log('Final refinements applied.');
