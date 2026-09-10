const images = [
    'IMG_4928.jpg',
    'IMG_4929.jpg',
    'IMG_4930.jpg',
    'IMG_4931.jpg',
    'IMG_4933.jpg',
    'IMG_4934.jpg',
    'IMG_4935.jpg',
    'IMG_4936.jpg',
    'IMG_4938.jpg',
    'IMG_4939.jpg',
    'IMG_4940.jpg'
];

const logData = `IP: 92.28.211.234
N: 43.7462
W: 12.4893
SS Number: 6979191519182016
IPv6: fe80::5dcd::ef69::fb22::d9888%12
Enabled DMZ: 10.11.42.15
MAC: 5A:78:3E:7E:00
ISP: Ucom Universal DNS: 8.8.8.8
ALT DNS: 1.1.1.8.1
Dlink WAN: 100.23.10.15
GATEWAY: 192.168.0.1
SUBNET MASK: 255.255.0.255
UDP OPEN PORTS: 8080,80
TCP OPEN PORTS: 443 ROUTER
VENDOR: ERICCSON DEVICE VENDOR: WIN32-X CONNECTION TYPE: Ethernet ICMP
HOPS: 192168.0.1 192168.1.1 100.73.43.4 host-132.12.32.167.ucom.com host-66.120.12.111.ucom.com 36.134.67.189 216.239.78.111 sof02s32-in-f14.1e100.net TOTAL HOPS: 8 
ACTIVE SERVICES: 
[HTTP] 192.168.3.1:80=>92.28.211.234:80 
[HTTP] 192.168.3.1:443=>92.28.211.234:443 
[UDP] 192.168.0.1:788=>192.168:6557 
[TCP] 192.168.1.1:67891=>92.28.211.234:345 
[TCP] 192.168.52.43:7777=>192.168.1.1:7778 
[TCP] 192.168.78.12:898=>192.168.89.9:667
EXTERNAL MAC: 6U:78:89:ER:O4
MODEM JUMPS: 64`;

window.addEventListener('DOMContentLoaded', () => {
    const warningScreen = document.getElementById('warning-screen');
    const dataScreen = document.getElementById('data-screen');
    const scareScreen = document.getElementById('scare-screen');
    const scaryImg = document.getElementById('scary-img');
    const typewriterText = document.getElementById('typewriter-text');
    const screamAudio = document.getElementById('scream-audio');
    const launchBtn = document.getElementById('launch-btn');

    let hasStarted = false;

    // Endless audio loop handler
    screamAudio.addEventListener('ended', () => {
        screamAudio.currentTime = 0;
        screamAudio.play().catch(() => {});
    });

    function launchPrankSequence() {
        if (hasStarted) return;
        hasStarted = true;

        // Silently prime the audio on the user's tap
        screamAudio.play().then(() => {
            screamAudio.pause();
            screamAudio.currentTime = 0;
        }).catch(() => {});

        // Transition immediately to Terminal (Screen 2)
        warningScreen.classList.add('hidden');
        dataScreen.classList.remove('hidden');
        document.title = "DOWNLOADING DATA (84%)...";

        // Fast Typewriter animation
        let charIndex = 0;
        const typingSpeed = 5;

        function typeLog() {
            if (charIndex < logData.length) {
                typewriterText.textContent += logData.charAt(charIndex);
                charIndex++;
                setTimeout(typeLog, typingSpeed);
            }
        }
        typeLog();

        // Signal Glitch Effect
        const glitchInterval = setInterval(() => {
            document.body.classList.add('signal-glitch');
            setTimeout(() => document.body.classList.remove('signal-glitch'), 40);
        }, 1200);

        // Transition to Jump Scare after 4 seconds
        setTimeout(() => {
            clearInterval(glitchInterval);
            dataScreen.classList.add('hidden');
            scareScreen.classList.remove('hidden');
            document.title = "I SEE YOU";

            // Unmute and force endless audio playback
            screamAudio.volume = 1.0;
            screamAudio.loop = true;
            screamAudio.play().catch(e => console.log("Audio playback error:", e));

            // Cycle image frames endlessly
            let imageIndex = 0;
            setInterval(() => {
                imageIndex = (imageIndex + 1) % images.length;
                scaryImg.src = images[imageIndex];
            }, 350);

            // Frame shake
            document.body.style.animation = "creepyShake 0.12s infinite";
        }, 4000);
    }

    // Attach click/touch listener to the "Open" button
    launchBtn.addEventListener('click', launchPrankSequence);
    launchBtn.addEventListener('touchstart', launchPrankSequence);
});