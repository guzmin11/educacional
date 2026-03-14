const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Update text: 1000 to 650, 500 to 650
content = content.replace('Mais de <strong>1.000 professoras</strong>', 'Mais de <strong>650 professoras</strong>');
content = content.replace('<span class="stat-n">500+</span>', '<span class="stat-n">650+</span>');
content = content.replace('Mais de 1.000 professoras já economizam', 'Mais de 650 professoras já economizam');

// 2. Smooth Scroll & Animations
const customCSS = `
html { scroll-behavior: smooth; }
.btn-cta { transition: all 0.3s ease; }
.btn-cta:hover { transform: scale(1.03); box-shadow: 0 4px 15px rgba(232, 135, 74, 0.4); }
.fw-card { transition: all 0.3s ease; }
.fw-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); border-color: var(--orange); }
.t-card { transition: all 0.3s ease; }
.t-card:hover { transform: scale(1.02); }
.bonus-row { transition: all 0.3s ease; cursor: pointer; }
.bonus-row:hover { transform: translateX(8px); border-color: var(--orange); background: var(--white); box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.proof-avatars span { transition: all 0.3s ease; }
.proof-avatars span:hover { z-index: 10; transform: scale(1.2); }
`;
if (!content.includes('scroll-behavior: smooth')) {
    content = content.replace('</style>', customCSS + '\n</style>');
}

// 3. UTMfy Script
const utmScript = `
  <script>
      window.pixelId = "69ac9ea2d2280f217e7b0247";
      var a = document.createElement("script");
      a.setAttribute("async", "");
      a.setAttribute("defer", "");
      a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      document.head.appendChild(a);
  </script>
`;
if (!content.includes('pixelId = "69ac9')) {
    content = content.replace('</head>', utmScript + '\n</head>');
}

// 4. Update checkout URLs
const checkOutLink = "https://checkout.educacaodivertida.site/VCCL1O8SCQ9R";
content = content.replace(/href="#oferta"/g, 'href="' + checkOutLink + '"');

// 5. Reposition Logo
if(content.includes('<nav')) {
  // Using string methods to safely remove the nav segment
  const navStart = content.indexOf('<!-- NAV / LOGO -->');
  if (navStart !== -1) {
    const navEnd = content.indexOf('</nav>', navStart);
    if (navEnd !== -1) {
      content = content.slice(0, navStart) + content.slice(navEnd + 6);
    }
  }
}

const heroEyebrow = '<div class="hero-eyebrow">Kit de Alfabetização Infantil</div>';
if (content.includes(heroEyebrow) && !content.includes('object-fit: contain;"></div>\\n    <div class="hero-eyebrow"')) {
    const newLogoHTML = '<div style="margin-bottom: 20px;"><img src="logo.png" alt="Educação Divertida" style="max-height: 90px; width: auto; object-fit: contain;"></div>\n    ' + heroEyebrow;
    content = content.replace(heroEyebrow, newLogoHTML);
}

// 6. Fix mockups placeholders
// Hero Mockup
const heroMockupOld = `<div class="hero-mockup">
      <div class="ic">🖼️</div>
      <strong>[ Coloque aqui o mockup principal do kit ]</strong>
      <p style="margin-top:6px;color:#9CA3AF;font-size:13px">Ex: capa do kit aberta, PDFs em perspectiva, tablet com atividades</p>
    </div>`;
if (content.includes(heroMockupOld)) {
   content = content.replace(heroMockupOld, `<div class="hero-mockup" style="background:transparent;border:none;padding:0;max-width:800px;margin:48px auto 0;">\n      <img src="mockup.png" alt="Mockup do Kit" style="width:100%;height:auto;border-radius:16px;">\n    </div>`);
}

// Previa
const materialMockupOld = `<div style="background:var(--cream2);border:2px dashed var(--border);border-radius:16px;height:300px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-weight:600;margin-top:32px">
      [ Imagens/Gifs de atividades por dentro ]
    </div>`;
if (content.includes(materialMockupOld)) {
   content = content.replace(materialMockupOld, `<div style="margin-top:32px; border-radius:16px; overflow:hidden;">\n      <img src="previa.png" alt="Prévia do Material" style="width:100%;height:auto;display:block;">\n    </div>`);
}

// Offer Mockup
const offerBoxStart = `<div class="offer-box">
      <div class="offer-top">
        <span style="font-weight:700;letter-spacing:1px;font-size:12px;text-transform:uppercase">Acesso Vitálicio</span>
        <span style="background:rgba(255,255,255,.2);padding:4px 10px;border-radius:4px;font-size:12px;font-weight:600">⚡ Acesso Imediato</span>
      </div>
      
      <div style="background:var(--cream2);height:260px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-weight:600;font-size:14px">
        [ Mockup final + Bônus ]
      </div>`;
if (content.includes(offerBoxStart)) {
  const newOfferBox = `<div class="offer-box">
      <div class="offer-top">
        <span style="font-weight:700;letter-spacing:1px;font-size:12px;text-transform:uppercase">Acesso Vitálicio</span>
        <span style="background:rgba(255,255,255,.2);padding:4px 10px;border-radius:4px;font-size:12px;font-weight:600">⚡ Acesso Imediato</span>
      </div>
      
      <div style="background:var(--white);display:flex;align-items:center;justify-content:center;">
        <img src="mockup.png" alt="Mockup da Oferta" style="width:100%;height:auto;">
      </div>`;
  content = content.replace(offerBoxStart, newOfferBox);
}


fs.writeFileSync('index.html', content, 'utf8');
console.log("Applied updates successfully");
