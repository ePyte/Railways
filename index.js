import { render, renderGameEnd, renderGameEndEasyOrHard } from "./render.js";
import { AppState, Stage } from "./state.js";


//Name setting
const name = document.querySelector("#playerName")
name.addEventListener("input", checkNameAndDifficulty)



//Main display selectors
const mainPageView = document.querySelector("#mainMenu");
const gamePageView = document.querySelector("#gamePage");
const gameEndInfo = document.querySelector("#gameEnd")



//Difficulty setting
let difficulty = 0
const diff5Button = document.querySelector("#fiveBut")
const diff7Button = document.querySelector("#sevenBut")

function checkNameAndDifficulty() {
    if ((name.value !=='') && (difficulty!==0)) {
        newButton.disabled = false;
    }
    else {
        newButton.disabled = true;
    }
}

function handleFiveDifClick() {
    difficulty=5
    diff5Button.style.opacity=1;
    diff7Button.style.opacity=0.5;
    checkNameAndDifficulty()
}
diff5Button.addEventListener("click", handleFiveDifClick);

function handleSevenDifClick() {
    difficulty=7
    diff7Button.style.opacity=1;
    diff5Button.style.opacity=0.5;
    checkNameAndDifficulty()
}
diff7Button.addEventListener("click", handleSevenDifClick);



//Description - display
//Main "page" -> Description
const descPage = document.querySelector("#descriptionID")
descPage.style.display = 'none'

const descriptionButton = document.querySelector("#descBut")
function fromMainPageToDescPage() {
    mainPageView.style.display = "none";
    descPage.style.display = 'block'
}
descriptionButton.addEventListener("click", fromMainPageToDescPage)

//Description -> Main "page"
const backFromDescButton = document.querySelector("#backFromDesc")
function fromDescToMain() {
    mainPageView.style.display = "block";
    descPage.style.display = 'none'
}
backFromDescButton.addEventListener("click", fromDescToMain)



//New game button
const newButton = document.querySelector("#startBut")
newButton.disabled = true;
gamePageView.style.display = 'none';

const gameTable = document.querySelector("#gameTable");
let state = new AppState();

const playerN = document.querySelector('#playerN')
const toplistWrite = document.querySelector('#scores')
const toplistEasyOrHard = document.querySelector("#toplistEasyorHard")
//Main "page" -> Game "page"
function handleNewGameButtonClick() {
    if ( difficulty === 0) {
        return
    }
    if (name.value ==='') {
        return
    }

    state=new AppState()//in case of new game

    mainPageView.style.display = "none";
    gamePageView.style.display = "block";
    gameEndInfo.style.display = "none";

    state.init(difficulty, name.value);
    gameTable.innerHTML = render(state);
    playerN.innerHTML=name.value
    toplistEasyOrHard.innerText=renderGameEndEasyOrHard(difficulty)
    toplistWrite.innerHTML = renderGameEnd(difficulty)
}
newButton.addEventListener("click", handleNewGameButtonClick)



//Game table
function handleFieldClick(event) {
    if (!event.target.matches("td")) {
        return
    }
    if (state.stage === Stage.ENDED) { //no click after completing the game
        return
    }
    const td = event.target;
    const tr = td.parentNode

    const x = td.cellIndex
    const y = tr.rowIndex

    state.changeField(y, x)

    gameTable.innerHTML = render(state);

    //Game won?
    state.checkForWin()
    if (state.stage === Stage.ENDED) {
        state.stopTimer();
        gameEndInfo.style.display = 'block'
    }

}
gameTable.addEventListener("click", handleFieldClick)



//Game "page" -> Main "page"
let backFromGameButton = document.querySelector("#backFromGame")
function fromGameToMainPage() {
    mainPageView.style.display = "block";
    gamePageView.style.display = "none";
    gameEndInfo.style.display = "none";
}
backFromGameButton.addEventListener("click", fromGameToMainPage)

