// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
  
  window.onload=()=>{
    if (localStorage.getItem('userScore')) {
      user_score = parseInt(localStorage.getItem('userScore'));
      ai_score = parseInt(localStorage.getItem('pcScore'));
      scoreNumber.innerText = user_score;
      scoreNumberAI.innerText = ai_score;
    }
    else{
      user_score=0;
      ai_score=0;
    }
  }
  // DOM
  const btnRules = document.querySelector(".rules-btn");
  const btnClose = document.querySelector(".close-btn");
  const modalRules = document.querySelector(".modal");

  const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissor",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissor",
    },
  ];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const HurrayPlayAgainBtn = document.querySelector(".play-again1");

const scoreNumber = document.querySelector(".score__number__user");
const scoreNumberAI = document.querySelector(".score__number__AI");
const nextrulesbtn=document.querySelector(".next-btn");
const userHurray = document.querySelector(".winning");
const scoreboard = document.querySelector(".header");



// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, 0);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
        btnRules.style.right="12rem";
        nextrulesbtn.classList.remove("hidden");
        resultText.innerText = "you win against pc";
        resultDivs[0].classList.toggle("winner");
        playAgainBtn.innerText="play again";
        keepScore(1);
    } else if (aiWins) {
        resultText.innerText = "you lost against pc";
        resultDivs[1].classList.toggle("winner");
        playAgainBtn.innerText="play again";
        aiKeepScore(1);
    } else{
      resultText.innerText = "tie up";
      playAgainBtn.innerText="replay";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  user_score += point;
  scoreNumber.innerText = user_score;
  localStorage.setItem('userScore',user_score);
}

function aiKeepScore(point){
    ai_score+=point;
    scoreNumberAI.innerText = ai_score;
    localStorage.setItem('pcScore',ai_score);
}


function togglePlayagain(){
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
}


function nextButtonToggle(){
  btnRules.style.right="2rem";
  scoreboard.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  userHurray.classList.toggle("hidden");
}

// Play Again
playAgainBtn.addEventListener("click", () => {
    togglePlayagain()
});

//Hurray Play Again
HurrayPlayAgainBtn.addEventListener("click", () => {
    nextButtonToggle();
    togglePlayagain();
});

//Next button display Hurray
nextrulesbtn.addEventListener("click",()=>{
    nextrulesbtn.classList.toggle("hidden");
    nextButtonToggle();
});


// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

// toggle()