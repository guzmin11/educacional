const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const bonusHtml = `
      <div class="bonus-row" style="align-items: center; justify-content: flex-start; gap: 16px;">
        <div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <img src="bonus_tea_1773443973120.png" style="width: 100%; height: 100%; object-fit: cover;" alt="TEA">
        </div>
        <div class="bonus-info">
          <h3>+140 Atividades para Crianças com TEA</h3>
          <p>Material adaptado e inclusivo para o desenvolvimento de crianças com Transtorno do Espectro Autista.</p>
        </div>
        <div class="bonus-price"><del>R$ 37,90</del><strong>Hoje: Grátis 🎁</strong></div>
      </div>

      <div class="bonus-row" style="align-items: center; justify-content: flex-start; gap: 16px;">
        <div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <img src="bonus_dinamicas_1773443986879.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Dinâmicas">
        </div>
        <div class="bonus-info">
          <h3>100 Dinâmicas Educativas para Sala de Aula</h3>
          <p>Brincadeiras prontas para animar sua aula — é só imprimir e aplicar.</p>
        </div>
        <div class="bonus-price"><del>R$ 27,90</del><strong>Hoje: Grátis ✓</strong></div>
      </div>

      <div class="bonus-row" style="align-items: center; justify-content: flex-start; gap: 16px;">
        <div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <img src="bonus_desenhos_1773444009029.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Desenhos">
        </div>
        <div class="bonus-info">
          <h3>100+ Desenhos para Colorir Temáticos</h3>
          <p>Ilustrações educativas para completar a aula com propósito e alegria.</p>
        </div>
        <div class="bonus-price"><del>R$ 22,90</del><strong>Hoje: Grátis ✓</strong></div>
      </div>

      <div class="bonus-row" style="align-items: center; justify-content: flex-start; gap: 16px;">
        <div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <img src="bonus_caca_palavras_1773444098685.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Caça-palavras">
        </div>
        <div class="bonus-info">
          <h3>Caça-palavras e Cruzadinhas Educativos</h3>
          <p>Passatempos que desenvolvem concentração enquanto fixam o vocabulário.</p>
        </div>
        <div class="bonus-price"><del>R$ 17,90</del><strong>Hoje: Grátis ✓</strong></div>
      </div>

      <div class="bonus-row" style="align-items: center; justify-content: flex-start; gap: 16px;">
        <div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <img src="bonus_cartazes_1773444131147.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Cartazes">
        </div>
        <div class="bonus-info">
          <h3>Cartazes Decorativos Pedagógicos</h3>
          <p>Cartazes lindos para decorar a sala e estimular o aprendizado visual.</p>
        </div>
        <div class="bonus-price"><del>R$ 17,90</del><strong>Hoje: Grátis ✓</strong></div>
      </div>

      <div class="bonus-row" style="align-items: center; justify-content: flex-start; gap: 16px;">
        <div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <img src="bonus_guia_pais_1773444263442.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Guia Pais">
        </div>
        <div class="bonus-info">
          <h3>Guia de Apoio para Pais</h3>
          <p>Oriente os pais sobre como reforçar o aprendizado em casa.</p>
        </div>
        <div class="bonus-price"><del>R$ 22,90</del><strong>Hoje: Grátis ✓</strong></div>
      </div>

      <div class="bonus-row" style="align-items: center; justify-content: flex-start; gap: 16px;">
        <div class="bonus-thumb" style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-shrink: 0; padding: 0; border: none;">
          <span class="ic">🏆</span>
        </div>
        <div class="bonus-info">
          <h3>Certificado de Conquista para os Alunos</h3>
          <p>Celebre cada etapa com um certificado que enche a criança de orgulho.</p>
        </div>
        <div class="bonus-price"><del>R$ 17,90</del><strong>Hoje: Grátis ✓</strong></div>
      </div>
`;

const startIndex = content.indexOf('<div class="bonus-list">');
const endIndex = content.indexOf('</div>\n  </div>\n</section>\n\n<!-- OFERTA -->');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex + '<div class="bonus-list">'.length) + '\n' + bonusHtml + '\n    ' + content.substring(endIndex);
  fs.writeFileSync('index.html', content, 'utf8');
  console.log('Bonuses reordered successfully.');
} else {
  console.log('Could not find bonus section.');
}
