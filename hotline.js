const startButton = document.getElementById("start-button")
const welcomeScreen = document.getElementById("welcome-screen")
const phoneScreen = document.getElementById("phone-screen")
const backButton = document.getElementById("back-button")
const numberButtons = document.querySelectorAll(".number-button")
const message = document.getElementById("message")
const callStatus = document.getElementById("call-status")

const  welcomeAudio = new Audio("audios/wlcome.mp3")
const invalidAudio = new Audio("audios/invalid.mp3")
const beepAudio = new Audio("audios/beep.mp3")
const messageAudios = {
    "1": new Audio("audios/msg1.mp3"),
    "2": new Audio("audios/msg2.mp3"),
    "3": new Audio("audios/msg3.mp3"),
    "4": new Audio("audios/msg4.mp3"),
    "5": new Audio("audios/msg5.mp3"),
    "6": new Audio("audios/msg6.mp3"),
    "7": new Audio("audios/msg7.mp3"),
    "8": new Audio("audios/msg8.mp3"),
    "9": new Audio("audios/msg9.mp3"),
    "0": new Audio("audios/msg0.mp3")
};



function stopAllAudio() { 
    clearTimeout(timer);

    const allAudios = [
        welcomeAudio,
        invalidAudio,
        beepAudio,
        ...Object.values(messageAudios)
    ];

    allAudios.forEach(function(audio) {
        audio.pause();
        audio.currentTime = 0;
    });

    currentAudio = null;
}


startButton.addEventListener("click", function() {
    stopAllAudio();

    message.textContent = "";
    callStatus.textContent = "";

    welcomeScreen.hidden = true;
    phoneScreen.hidden = false;

    welcomeAudio.play().catch(error =>
        console.error("welcome audio error:", error)
    );
})

backButton.addEventListener("click", function() {
    stopAllAudio();

    message.textContent = ""
    callStatus.textContent = ""

    phoneScreen.hidden = true;
    welcomeScreen.hidden = false;
})
let timer;
let currentAudio;

numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        stopAllAudio()
        clearTimeout(timer);

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        beepAudio.pause();
        beepAudio.currentTime = 0;

        const number = button.textContent.trim();
        message.textContent = "";
        message.textContent = "Connecting...";
        callStatus.textContent = "";

        if (number === "#" || number === "*") {
            timer = setTimeout(function() {
                message.textContent = "";
                callStatus.textContent = "Connected";

                currentAudio = invalidAudio;
                currentAudio.currentTime = 0;
                currentAudio.play();
            }, 3500);

            beepAudio.currentTime = 0;
            beepAudio.play();

            return;
        }

        beepAudio.currentTime = 0;
        beepAudio.play();
        timer = setTimeout(function() {
            message.textContent = "";
            callStatus.textContent = "Connected";

            currentAudio = messageAudios[number];
            if (currentAudio) {
                currentAudio.currentTime = 0;
                currentAudio.play()
            }
        }, 3500);
    });
});

[invalidAudio, ...Object.values(messageAudios)].forEach(function(audio) {
    audio.addEventListener("ended", function() {
        if (currentAudio === audio) {
            callStatus.textContent = "";
            currentAudio = null;
        }
    });
});