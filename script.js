const buyers = [
    { name: "Mariana – SP", action: "acabou de adquirir o Kit Completo", gender: "female" },
    { name: "Fernanda – PR", action: "garantiu o Plano Premium", gender: "female" },
    { name: "Ricardo – RJ", action: "começou o aprendizado do filho hoje", gender: "male" },
    { name: "Juliana – MG", action: "acabou de baixar o material extra", gender: "female" },
    { name: "Carla – RS", action: "garantiu o Kit Completo com bônus", gender: "female" },
    { name: "Marcos – SC", action: "acabou de adquirir o Kit Completo", gender: "male" },
    { name: "Beatriz – DF", action: "garantiu o kit para sua sala de aula", gender: "female" },
    { name: "Tiago – CE", action: "começou a aplicar as atividades agora", gender: "male" },
    { name: "Luciana – BA", action: "acabou de baixar o Plano Premium", gender: "female" },
    { name: "Rodrigo – GO", action: "garantiu o material para o reforço escolar", gender: "male" },
    { name: "Aline – ES", action: "acabou de assinar o Kit Completo", gender: "female" },
    { name: "Gustavo – PE", action: "garantiu o bônus de alfabetização", gender: "male" },
    { name: "Camila – MS", action: "acabou de baixar as 500 atividades", gender: "female" },
    { name: "André – AM", action: "garantiu o Plano Premium para o filho", gender: "male" },
    { name: "Patrícia – PB", action: "acabou de iniciar as atividades lúdicas", gender: "female" },
    { name: "Felipe – RN", action: "garantiu o material de matemática", gender: "male" },
    { name: "Renata – MT", action: "acabou de baixar o guia para pais", gender: "female" },
    { name: "Bruno – TO", action: "garantiu o Kit completo para a escola", gender: "male" },
    { name: "Sônia – PI", action: "acabou de assinar o Plano Premium", gender: "female" },
    { name: "Marcelo – AL", action: "garantiu as atividades de reforço", gender: "male" }
];

const femaleAvatars = ["👩", "👩‍🏫", "🙋‍♀️", "👸", "👩‍💻"];
const maleAvatars = ["👨", "👨‍🏫", "🙋‍♂️", "🤴", "👨‍💻"];

// Shuffle function to ensure unique order every time the site is loaded
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(buyers); // Randomized sequence on page load

let currentBuyerIndex = 0;

function showPopup() {
    const popup = document.getElementById('purchase-popup');
    if (!popup) return;

    const nameEl = document.getElementById('buyer-name');
    const actionEl = document.getElementById('buyer-action');
    const avatarEl = document.querySelector('.popup-avatar');

    // Get current buyer from the shuffled list
    const currentBuyer = buyers[currentBuyerIndex];

    // Select avatar based on gender
    const avatarPool = currentBuyer.gender === "female" ? femaleAvatars : maleAvatars;
    const randomAvatar = avatarPool[Math.floor(Math.random() * avatarPool.length)];

    nameEl.textContent = currentBuyer.name;
    actionEl.textContent = currentBuyer.action;
    avatarEl.textContent = randomAvatar;

    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 4500);

    // Increment index and loop if reached the end
    currentBuyerIndex = (currentBuyerIndex + 1) % buyers.length;
}

// Show first popup after 5 seconds
setTimeout(showPopup, 5000);

// Cycle popups every 18 seconds (slightly faster to show more variety)
setInterval(showPopup, 18000);

// Smooth scroll to anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Popup Upgrade Logic
function openUpgradePopup(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('upgradeModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeUpgradePopup(event) {
    // If event is provided (click on overlay), only close if target is overlay
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-modal')) {
        return;
    }

    const modal = document.getElementById('upgradeModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Inicialização AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
