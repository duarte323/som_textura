let linhaElipses;
let diametro = 30;
let corBackground;
let som;
let playSom = false;
let amp;

function preload() {
    som = loadSound('843325__flavioconcini__drums-bass.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    linhaElipses = width / diametro;
    amp = new p5.Amplitude();
}

function draw() {
    let vermelho = map(mouseX, 0, width, 0, 255);
    let azul = map(mouseY, 0, height, 0, 255);
    corBackground = color(vermelho, 200, azul);

    background(corBackground);

    for (let i = 0; i < linhaElipses; i++) {
        for (let j = 0; j < height; j += diametro) {
            stroke(random(0, 255), random(0, 255), j);
            rect(random(0, width), random(0, height), random(0, width), random(0, height));

            fill(corBackground);
            noStroke();
            ellipse(i * diametro + diametro / 2, j + diametro / 2 + random(-1, 1), diametro, diametro);
        }
    }

    let myRate = map(mouseX, 0, width, 0.1, 3.0);
    som.rate(myRate);
    let myVolume = map(mouseY, 0, height, 0.0, 1.0);
    som.setVolume(myVolume);

    let level = amp.getLevel();
    let tamanhoCara = map(level, 0, 0.5, 100, 500);

    push();
    translate(width / 2, height / 2);


    stroke(0);
    strokeWeight(4);
    fill(255, 230, 0);
    ellipse(0, 0, tamanhoCara, tamanhoCara);


    fill(0);
    noStroke();
    let olhoX = tamanhoCara * 0.2;
    let olhoY = -tamanhoCara * 0.15;
    let olhoTam = tamanhoCara * 0.12;
    ellipse(-olhoX, olhoY, olhoTam, olhoTam);
    ellipse(olhoX, olhoY, olhoTam, olhoTam);


    fill(223, 154, 87);
    stroke(0);
    strokeWeight(tamanhoCara * 0.05);
    let bocaLargura = tamanhoCara * 0.5;
    let bocaAltura = map(level, 0, 0.5, 10, tamanhoCara * 0.4);
    rect(-23, tamanhoCara * 0.1, bocaLargura, bocaAltura, tamanhoCara);

}

function mousePressed() {
    if (!playSom) {
        som.play();
        playSom = true;
    } else {
        som.pause();
        playSom = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    linhaElipses = width / diametro;
}