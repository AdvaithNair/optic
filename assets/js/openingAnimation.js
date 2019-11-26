//Optic Opening Animation
const dollar = popmotion.styler(document.querySelector('.opticDollar')); //Outline Circle
const circle = popmotion.styler(document.querySelector('.opticCircle')); //Dollar Sign
const container = popmotion.styler(document.querySelector('.container')); //Animation Overlay

//Rotate and Fade In Outline Circle
popmotion.tween({
    from: {
        opacity: 0,
        rotate: 0
    },
    to: {
        opacity: 1,
        rotate: 180
    },
    duration: 2000
}).start(circle.set)

//Pop In Dollar Sign
popmotion.tween({
    from: {
        opacity: 1,
        scale: .2
    },
    to: {
        opacity: 1,
        scale: 1
    },
    duration: 1000
}).start(dollar.set)

//Fade Out Animation Overlay
function fadeDiv() {
    popmotion.tween({
        from: {
            opacity: 1
        },
        to: {
            opacity: 0
        },
        duration: 500
    }).start(container.set)
    setTimeout(hideDiv, 300);
}

function hideDiv() {
    document.getElementById("blackBox").style.display = "none"; //Hide the div
    document.location.href = "main.html"; //Hide the div
}

setTimeout(fadeDiv, 2500); //Delay
