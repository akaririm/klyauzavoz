const runawayBtn = document.getElementById('runaway-container');
const scaler = document.getElementById('scaler');
const scaler2 = document.getElementById('scaler2');
const scaler3 = document.getElementById('scaler3');
const scaler4 = document.getElementById('scaler4');
const scaler5 = document.getElementById('scaler5');
const scaler6 = document.getElementById('scaler6');
const achievement = document.getElementById('achievement');
const blurOverlay = document.getElementById('blur-overlay');
const bigBook = document.getElementById('big-book');
const bigEnvelop = document.getElementById('big-envelop');
const bigNote2 = document.getElementById('big-note2');

const bellAudio = new Audio('sounds/bell.mp3'); 
const bookOpenAudio = new Audio('sounds/book.mp3'); 
const achAudio = new Audio('sounds/adv.mp3'); 

const audioFiles = {
    verity: new Audio('sounds/verity.mp3'),
    knocker: new Audio('sounds/knocker.mp3'),
    spyglass: new Audio('sounds/itsallyours.mp3'),
    honey: new Audio('sounds/derek.mp3'),
    slime: new Audio('sounds/avery.mp3'),
    apple: new Audio('sounds/gimme.mp3'),
    haha: new Audio('sounds/haha.mp3'),
    hurt: new Audio('sounds/hurt-minecraft.mp3'),
    dogSound: new Audio('sounds/sherrki.mp3'),
    robloxYayAudio: new Audio('sounds/yay-roblox.mp3'),
    cynSound: new Audio('sounds/scary-roblox.mp3'),
    alekSound: new Audio('sounds/hurt-roblox.mp3'),
    flower1: new Audio('sounds/flower-btn1.mp3'),
    flower2: new Audio('sounds/flower-btn2.mp3'),
    kiss: new Audio('sounds/kiss-sound.mp3'),
    drink: new Audio('sounds/roblox-drink.mp3'),
    all1: new Audio('sounds/all1.mp3'),
    all2: new Audio('sounds/all2.mp3'),
    all3: new Audio('sounds/all3.mp3'),
    creeper: new Audio('sounds/creeper.mp3'),
    explosion: new Audio('sounds/explosion.mp3'),
};

bellAudio.volume = 1.0; bookOpenAudio.volume = 1.0; achAudio.volume = 1.0;
Object.values(audioFiles).forEach(track => { track.volume = 1.0; });

function resizeInterface() {
    const scaleX = window.innerWidth / 1440;
    const scaleY = window.innerHeight / 1024;
    const minScale = Math.min(scaleX, scaleY); 
    if(scaler) scaler.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    if(scaler2) scaler2.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    if(scaler3) scaler3.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    if(scaler4) scaler4.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    if(scaler5) scaler5.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    if(scaler6) scaler6.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    const deathScaler = document.getElementById('death-scaler');
    if (deathScaler) {
        deathScaler.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    }

}
window.addEventListener('resize', resizeInterface);
resizeInterface();

if (runawayBtn) {
    runawayBtn.addEventListener('mouseenter', runAway);
    runawayBtn.addEventListener('touchstart', (e) => { e.preventDefault(); runAway(); });
}

function runAway() {
    const maxX = 1440 - runawayBtn.offsetWidth; const maxY = 1024 - runawayBtn.offsetHeight;
    const agreeLeft = 453; const agreeTop = 571; const agreeWidth = 220; const agreeHeight = 158;
    let randomX, randomY, isOverlapping = true;

    while (isOverlapping) {
        randomX = Math.floor(Math.random() * maxX); randomY = Math.floor(Math.random() * maxY);
        const buffer = 80; 
        const overlapX = randomX + runawayBtn.offsetWidth > agreeLeft - buffer && randomX < agreeLeft + agreeWidth + buffer;
        const overlapY = randomY + runawayBtn.offsetHeight > agreeTop - buffer && randomY < agreeTop + agreeHeight + buffer;
        if (!overlapX || !overlapY) isOverlapping = false; 
    }
    runawayBtn.style.left = randomX + 'px'; runawayBtn.style.top = randomY + 'px';
}

function unlockAndScroll() {
    const mainStory = document.getElementById('main-story');
    const explosionScreen = document.getElementById('explosion-screen');
    if (mainStory) mainStory.style.display = "block";
    if (explosionScreen) explosionScreen.style.display = "block";
    const fourthScreen = document.getElementById('fourth-screen');
    const fifthScreen = document.getElementById('fifth-screen');
    const sixthScreen = document.getElementById('sixth-screen');

    const vidAl = document.getElementById('al-video-item');
    const vidDox = document.getElementById('dox-video-item');
    const vidChed = document.getElementById('ched-video-item');
    
    if (vidAl) { vidAl.currentTime = 0; vidAl.play().catch(()=>{}); }
    if (vidDox) { vidDox.currentTime = 0; vidDox.play().catch(()=>{}); }
    if (vidChed) { vidChed.currentTime = 0; vidChed.play().catch(()=>{}); }
    
    if (mainStory) mainStory.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        if (achievement) achievement.classList.add('show');
        achAudio.currentTime = 0; achAudio.play().catch(()=>{});
        setTimeout(() => { if (achievement) achievement.classList.remove('show'); }, 10000);
    }, 3000);
}

function playSound(name) {
    if(audioFiles[name]) {
        Object.values(audioFiles).forEach(track => {
            if (!track.paused) {
                track.pause();
                track.currentTime = 0;
            }
        });

        if (typeof bellAudio !== 'undefined' && !bellAudio.paused) { bellAudio.pause(); bellAudio.currentTime = 0; }
        if (typeof bookOpenAudio !== 'undefined' && !bookOpenAudio.paused) { bookOpenAudio.pause(); bookOpenAudio.currentTime = 0; }

        audioFiles[name].currentTime = 0;
        audioFiles[name].play().catch(() => {});
    }
}

function ringBell() {
    bellAudio.pause(); bellAudio.currentTime = 0; bellAudio.play().catch(()=>{});
}

function openBook() {
    if (audioFiles.verity && !audioFiles.verity.paused) audioFiles.verity.pause();
    if (blurOverlay) blurOverlay.style.display = "block";
    if (bigBook) bigBook.classList.add('open');
    bookOpenAudio.pause(); bookOpenAudio.currentTime = 0; bookOpenAudio.play().catch(()=>{});
}

function closeBook() {
    if (blurOverlay) blurOverlay.style.display = "none";
    if (bigBook) bigBook.classList.remove('open');
    if (bigEnvelop) bigEnvelop.classList.remove('open');
    if (bigNote2) bigNote2.classList.remove('open');
}

function openEnvelop() {
    playSound('kiss');
    if (blurOverlay) blurOverlay.style.display = "block";
    if (bigEnvelop) bigEnvelop.classList.add('open');
}

function closeEnvelop() {
    if (blurOverlay) blurOverlay.style.display = "none";
    if (bigEnvelop) bigEnvelop.classList.remove('open');
}
function primeCreeper() {
    const creeperBtn = document.getElementById('creeper-item');
    const creeperImg = creeperBtn ? creeperBtn.querySelector('img:not(#creeper-flash)') : null;
    const creeperFlash = document.getElementById('creeper-flash');
    
    if (!creeperBtn || creeperBtn.classList.contains('creeper-primed')) return;

    creeperBtn.classList.add('creeper-primed');
    playSound('creeper');

    if (audioFiles.creeper) {
        audioFiles.creeper.onended = () => {
            creeperBtn.classList.remove('creeper-primed');
            playSound('explosion');
            
            if (creeperImg) creeperImg.style.display = "none";
            if (creeperFlash) {
                creeperFlash.style.display = "block";
                creeperFlash.classList.add('explosion-effect-active');
            }
            
            setTimeout(() => {
                if (creeperBtn) creeperBtn.style.display = "none";
                
                const deathOverlay = document.getElementById('death-screen');
                if (deathOverlay) {
                    deathOverlay.style.display = "block";
                    setTimeout(() => deathOverlay.classList.add('fade-in'), 10);
                }

            }, 400);
        };
    }
}

function respawnPlayer() {
    window.location.reload(); 
}

function goToMainMenu() {
    const deathOverlay = document.getElementById('death-screen');
    const fourthScreen = document.getElementById('fourth-screen');
    const fifthScreen = document.getElementById('fifth-screen');
    const sixthScreen = document.getElementById('sixth-screen');

    if (fourthScreen) fourthScreen.style.display = "block";
    if (fifthScreen) fifthScreen.style.display = "block";
    if (sixthScreen) sixthScreen.style.display = "block";
    
    if (deathOverlay) {
        deathOverlay.style.display = "none";
    }
    
    if (fourthScreen) {
        fourthScreen.scrollIntoView({ behavior: 'smooth' });
    }
}

function openNote2() {
    if (blurOverlay) blurOverlay.style.display = "block";
    if (bigNote2) bigNote2.classList.add('open');
}

function closeNote2() {
    if (blurOverlay) blurOverlay.style.display = "none";
    if (bigNote2) bigNote2.classList.remove('open');
}

window.addEventListener('click', () => {
    bellAudio.load(); bookOpenAudio.load(); achAudio.load();
    Object.values(audioFiles).forEach(track => track.load());
}, { once: true });
