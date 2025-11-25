// Counter functionality
let count = 0;
const countDisplay = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');
const resetBtn = document.getElementById('resetBtn');

incrementBtn.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
    animateCount();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    countDisplay.textContent = count;
    animateCount();
});

function animateCount() {
    countDisplay.style.transform = 'scale(1.3)';
    setTimeout(() => {
        countDisplay.style.transform = 'scale(1)';
    }, 200);
}

// Color changer functionality
const colorBtn = document.getElementById('colorBtn');
const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
];

let currentColorIndex = 0;

colorBtn.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.body.style.background = colors[currentColorIndex];
});

// Name greeting functionality
const nameInput = document.getElementById('nameInput');
const greetBtn = document.getElementById('greetBtn');
const personalGreeting = document.getElementById('personalGreeting');

greetBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        personalGreeting.textContent = `Hello, ${name}! Nice to meet you! 😊`;
        personalGreeting.style.animation = 'fadeInDown 0.5s ease';
    } else {
        personalGreeting.textContent = 'Please enter your name!';
        personalGreeting.style.color = '#f5576c';
        setTimeout(() => {
            personalGreeting.style.color = '#667eea';
        }, 2000);
    }
});

// Allow Enter key to trigger greeting
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        greetBtn.click();
    }
});

// Add transition to count display
countDisplay.style.transition = 'transform 0.2s ease';

console.log('Interactive Hello World App loaded! 🚀');
