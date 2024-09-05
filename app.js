const target = document.getElementById('target');
const current = document.getElementById('current');
const tapper = document.getElementById('tapper');

const morseCode = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
}

let letter = "";
let answer = "";

let code = "";
let lastTime = 0;
let pressing = false;

let dotTime = 400; // miliseconds

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

async function next() {
    current.childNodes.forEach(node => {
        if (node.className == "dot") {
            node.className = "dot green";
            return;
        }
        node.className = "dash green";
    });
    await new Promise(r => setTimeout(r, 500));
    code = [];
    current.innerHTML = '';

    letter = randomProperty(morseCode);
    answer = morseCode[letter];

    target.innerText = letter;
    pressing = false;
}

function nextr() {
    code = [];
    current.innerHTML = '';

    letter = randomProperty(morseCode);
    answer = morseCode[letter];

    target.innerText = letter;
}

document.body.onkeydown = (event) => {
    if (event.key == "Enter") {
        nextr();
    };
    if (event.key == " ") {
        down(event);
    }
};

document.body.onkeyup = (event) => {
    if (event.key == " ") {
        up(event);
    }
}

function down(event) {
    if (pressing == true) {
        return; // key press repeat
    }
    pressing = true;
    lastTime = Date.now();
}

function up(event) {
    if (pressing == false) {
        return;
    }
    pressing = false;
    let time = Date.now();
    let heldFor = time - lastTime;

    if (heldFor <= dotTime) {
        code += '.';
        addDot();
    } else {
        code += '-';
        addDash();
    }
    if (code != answer) {
        return;
    }
    next();
}

tapper.onmousedown = (event) => {
    down(event);
};

tapper.onmouseup = (event) => {
    up(event)
};

function addDot() {
    let dot = document.createElement("div");
    dot.className = "dot";
    current.appendChild(dot);
}

function addDash() {
    let dash = document.createElement("div");
    dash.className = "dash";
    current.appendChild(dash);
}

next();