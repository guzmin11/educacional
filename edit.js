const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Avatars
content = content.replace(
  '<span>C</span><span>M</span><span>V</span><span>J</span>',
  '<img src="testimonial-1.png" alt="Professora 1" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" /></span><span><img src="testimonial-2.png" alt="Professora 2" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" /></span><span><img src="testimonial-3.png" alt="Professora 3" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" /></span><span><img src="testimonial-4.jpg" alt="Professora 4" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />'
);

// 2. 1000+ Satisfeitas -> 500+
content = content.replace(
  '<span class="stat-n">1.000+</span><span class="stat-l">👩‍🏫 Professoras Satisfeitas</span>',
  '<span class="stat-n">500+</span><span class="stat-l">👩‍🏫 Professoras Satisfeitas</span>'
);

// 3. Espaço para pais
const profPart = `<div class="fw-card">\r
        <span class="ic">🏠</span>\r
        <h3>Professora Particular</h3>\r
        <p>Que quer impressionar os pais dos alunos com materiais organizados e de qualidade profissional.</p>\r
      </div>`;
const paisCard = `\n      <div class="fw-card">\n        <span class="ic">👨‍👩‍👧</span>\n        <h3>Pais e Mães</h3>\n        <p>Que desejam auxiliar na alfabetização dos filhos em casa com atividades lúdicas e eficientes.</p>\n      </div>`;

// Fallback search with regex to ignore precise line endings
const profPartRegex = /<div class="fw-card">\s*<span class="ic">🏠<\/span>\s*<h3>Professora Particular<\/h3>\s*<p>Que quer impressionar os pais dos alunos com materiais organizados e de qualidade profissional\.<\/p>\s*<\/div>/;

if (profPartRegex.test(content)) {
  content = content.replace(profPartRegex, match => match + paisCard);
  console.log("Replaced Professora Particular");
} else {
  console.log("Could not find Professora Particular card!");
}

// 4. Bonus TEA
const bonusMatch = /<div class="bonus-list">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
const bList = content.match(bonusMatch);
if (bList) {
  const newBonus = `\n      <div class="bonus-row">\n        <div class="bonus-thumb" style="line-height:1.2;font-size:11px;font-weight:600;"><span class="ic">🧩</span>Bônus 07</div>\n        <div class="bonus-info">\n          <h3>+140 Atividades para Crianças com TEA</h3>\n          <p>Material adaptado e inclusivo para o desenvolvimento de crianças com Transtorno do Espectro Autista.</p>\n        </div>\n        <div class="bonus-price"><del>R$ 37,90</del><strong>Hoje: Grátis 🎁</strong></div>\n      </div>\n    `;
  content = content.replace(bList[1], bList[1] + newBonus);
  console.log("Added Bonus TEA");
} else {
  console.log("Could not find bonus-list section!");
}

// 5. Garantia
const seloRegex = /<div class="g-seal">[\s\S]*?\[ Seu selo<br>de garantia \][\s\S]*?<\/div>/;
if (seloRegex.test(content)) {
  content = content.replace(seloRegex, '<img src="garantia.png" alt="Garantia" style="width:120px; height:auto; flex-shrink:0;">');
  console.log("Replaced Garantia");
} else {
  console.log("Could not replace garantia!");
}

fs.writeFileSync('index.html', content, 'utf8');
console.log("Updated index.html");
