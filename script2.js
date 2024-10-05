let randomInt;
let randomEL = document.querySelector(".random");
let randomEL2 = document.querySelector(".random2");
let randomEL3 = document.querySelector(".random3");
let highestEl = document.querySelector(".highestEl");
let progress1 = document.querySelector(".progress");
let progress2 = document.querySelector(".progress2");
let progress3 = document.querySelector(".progress3");

// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const barContainer = document.querySelector(".bar-container");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  barContainer.classList.toggle("bar-hidden");
});

// generate random num
function randomGen() {
  randomInt = Math.floor(Math.random() * 20) + 1;
}

// create progressBar
function createBar(progressType) {
  let track = document.createElement("div");
  track.classList.add("track");

  let bar = document.createElement("div");

  // Set different gradient and shadow effects based on randomInt
  if (randomInt <= 6) {
    bar.classList.add("bar");
    progressType.appendChild(track);
    track.appendChild(bar);
    bar.style.backgroundImage =
      "linear-gradient(to top, rgba(255, 0, 0, 1), rgba(200, 0, 0, 0.80))";
    bar.style.boxShadow = `
      0px 0px 5px rgba(255, 0, 0, 0.6),
      0px 0px 10px rgba(255, 0, 0, 0.4),
      0px 0px 15px rgba(255, 0, 0, 0.3),
      0px 0px 20px rgba(255, 0, 0, 0.2)
    `;
    // bar.style.height = randomInt * 10 + "px";
    bar.style.height = randomInt * 1.3 + "rem";
  } else if (randomInt > 6 && randomInt <= 12) {
    bar.classList.add("bar");
    progressType.appendChild(track);
    track.appendChild(bar);
    bar.style.backgroundImage =
      "linear-gradient(to top, rgba(255, 0, 0, 1), rgba(255, 165, 0, 1))";
    bar.style.boxShadow = `
      0px 0px 5px rgba(255, 0, 0, 0.6),
      0px 0px 10px rgba(255, 69, 0, 0.5),
      0px 0px 15px rgba(255, 140, 0, 0.4),
      0px 0px 20px rgba(255, 165, 0, 0.3)
    `;
    bar.style.height = randomInt * 1.3 + "rem";
  } else {
    bar.classList.add("bar");
    progressType.appendChild(track);
    track.appendChild(bar);
    // bar.style.backgroundImage = 'linear-gradient(to top, rgba(255, 0, 0, 1), rgba(255, 165, 0, 1), rgba(0, 128, 0, 1))';
    bar.style.backgroundImage =
      "linear-gradient(to top, " +
      "rgba(255, 0, 0, 1) 30%, " +
      "rgba(255, 165, 0, 1) 60%, " +
      "rgba(0, 128, 0, 1) 100%";
    (")");
    bar.style.boxShadow = `
      0px 0px 5px rgba(255, 0, 0, 0.6),
      0px 0px 10px rgba(255, 102, 102, 0.4),
      0px 0px 15px rgba(102, 255, 102, 0.4),
      0px 0px 20px rgba(0, 128, 0, 0.3)
    `;
    bar.style.height = randomInt * 1.3 + "rem";
  }
}

const progressType = [1, 2, 3];

function calculateHighest(highestRandom, currentRandom) {
  if (highestRandom < currentRandom) {
    highestRandom = currentRandom;
  }
  return highestRandom;
}
function locateHighestBar(barHighest, arrRandom) {
  if (arrRandom[0] > arrRandom[1] && arrRandom[0] > arrRandom[2]) {
    barHighest = 1;
  } else if (arrRandom[1] > arrRandom[0] && arrRandom[1] > arrRandom[2]) {
    barHighest = 2;
  } else {
    barHighest = 3;
  }
  return barHighest;
}

let barHighest = 0;
let highestRandom = 0;
let arrRandom = [];
let image1 = document.querySelector(".globeImg");
let image2 = document.querySelector(".smartImg");
let image3 = document.querySelector(".ditoImg");

// randomInt = 20;
randomGen();
arrRandom[0] = randomInt;
barHighest = locateHighestBar(barHighest, arrRandom);
highestRandom = calculateHighest(highestRandom, randomInt);
createBar(progress1);
// randomEL.innerHTML = "random = " + randomInt;
// randomGen();
// randomInt = 13;
randomGen();
arrRandom[1] = randomInt;
barHighest = locateHighestBar(barHighest, arrRandom);
highestRandom = calculateHighest(highestRandom, randomInt);
createBar(progress2);
// randomEL2.innerHTML = "random = " + randomInt;

// randomInt = 12;
randomGen();
arrRandom[2] = randomInt;
barHighest = locateHighestBar(barHighest, arrRandom);
highestRandom = calculateHighest(highestRandom, randomInt);
createBar(progress3);
// randomEL3.innerHTML = "random = " + randomInt;

let imagePath;
let toConvert = document.querySelector(".toConvert");

if (highestRandom === arrRandom[0]) {
  // imagePath = "/img/globeColored.png";
  imagePath = "globeImg";
  // toConvert.innerHTML = "GLOBE";
} else if (highestRandom === arrRandom[1]) {
  imagePath = "smartImg";
  // toConvert.innerHTML = "SMART";
} else if (highestRandom === arrRandom[2]) {
  imagePath = "ditoImg";
  // toConvert.innerHTML = "DITO";
}

let highestElText = document.querySelector(".highestElText");
// highestElText.innerHTML = "We suggest to use: ";
toConvert.classList.add(imagePath);

// Create the image div
let imageDiv = document.createElement("div");
// imageDiv.classList.add(imagePath);
// highestEl.appendChild(imageDiv);

////////////////////////////////////

let signalBar = document.querySelector(".signalBar");

function createRec(highestRandom) {
  signalBar.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    let rectangle = document.createElement("div");
    rectangle.classList.add("rectangle");
    rectangle.style.width = "5rem";
    // rectangle.style.height = i * 4 + "rem";
    rectangle.style.height = i * 20 + "%";
    rectangle.style.border = "1px solid rgba(56, 86, 130, 0.3)";
    // rectangle.style.borderRadius = "0.4rem";
    rectangle.style.borderRadius = "4%";
    rectangle.style.borderRight =
      i === 5 ? "1px solid rgba(56, 86, 130, 0.3)" : "none";
    signalBar.appendChild(rectangle);
  }

  //
  let rect = document.querySelectorAll(".rectangle");

  //
  if (highestRandom >= 1 && highestRandom <= 6) {
    let tri = [
      "linear-gradient(to right,#FF0000, #FF0000 )",
      "linear-gradient(to right, #FF0000, #FFAAAA)",
      "transparent",
      "transparent",
      "transparent",
    ];

    for (let i = 0; i < rect.length; i++) {
      rect[i].style.background = tri[i];
    }
  } else if (highestRandom >= 7 && highestRandom <= 12) {
    let tri = [
      "linear-gradient(to right,#FF0000, #FF0000 )",
      "linear-gradient(to right, #FF0000, #FFAAAA)",
      "linear-gradient(to right,#FFDAB9,#FFA500)",
      "linear-gradient(to right,#FFA500,#FFDAB9)",
      "transparent",
    ];

    for (let i = 0; i < rect.length; i++) {
      rect[i].style.background = tri[i];
    }
  } else {
    let tri = [
      "linear-gradient(to right,#FF0000, #FF0000 )",
      "linear-gradient(to right, #FF0000, #FFAAAA)",
      "linear-gradient(to right,#FFDAB9,#FFA500)",
      "linear-gradient(to right,#FFA500,#FFDAB9)",
      "linear-gradient(to right, #90EE90, #008000)",
    ];

    for (let i = 0; i < rect.length; i++) {
      rect[i].style.background = tri[i];
    }
  }
}

createRec(highestRandom);
