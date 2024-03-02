//Локал дээр хувьсагч зарлаж байна
let score = JSON.parse(localStorage.getItem("score")) || {
  yalalt: 0,
  yalagdal: 0,
  tentssen: 0,
};

updateScoreElement();

document.querySelector(".js-haich-button").addEventListener("click", () => {
  playGame("haich");
});

document.querySelector(".js-chuluu-button").addEventListener("click", () => {
  playGame("chuluu");
});

document.querySelector(".js-daavuu-button").addEventListener("click", () => {
  playGame("daavuu");
});

function playComputer() {
  const randomNumber = Math.random(); //[0,1]
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "haich";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "chuluu";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "daavuu";
  }
  return computerMove;
}

function playGame(playUser) {
  let result = "";
  const computer = playComputer();
  if (playUser === "haich") {
    if (computer === "haich") {
      result = "Тэнцлээ";
    } else if (computer === "chuluu") {
      result = "Ялагдлаа";
    } else if (computer === "daavuu") {
      result = "Яллаа";
    }
  } else if (playUser === "chuluu") {
    if (computer === "haich") {
      result = "Яллаа";
    } else if (computer === "chuluu") {
      result = "Тэнцлээ";
    } else if (computer === "daavuu") {
      result = "Ялагдлаа";
    }
  } else if (playUser === "daavuu") {
    if (computer === "haich") {
      result = "Ялагдлаа";
    } else if (computer === "chuluu") {
      result = "Яллаа";
    } else if (computer === "daavuu") {
      result = "Тэнцлээ";
    }
  }

  //Хувсачгчийн утга олгох
  if (result === "Яллаа") {
    score.yalalt += 1;
  } else if (result === "Ялагдлаа") {
    score.yalagdal += 1;
  } else if (result === "Тэнцлээ") {
    score.tentssen += 1;
  }

  updateScoreElement();

  document.querySelector(".result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `Та 
    <img src="images/${playUser}-emoji.png" class="move-icon">
    <img src="images/${computer}-emoji.png" class="move-icon"> Компьютер`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Ялалт: ${score.yalalt} , Ялагдал: ${score.yalagdal}   , Тэнцсэн: ${score.tentssen} `;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = playComputer();
      playGame(playerMove);
    }, 1000);

    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
