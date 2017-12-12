
let table = $("table tr");

// player set up
let player1 = prompt("Player One: Input your name. Your assigned disc color will be Black");
let player1Color = "rgb(0,0,0)";
let player2 = prompt("Player Two: Input your name. Your assigned disc color will be will be Red");
let player2Color = "rgb(237, 45, 73)";

let activePlayer = 1;
let activeName = player1;
let activeColor = player1Color;

// Game Mechanics
$(document).ready(function() {
    $("h3").text(player1 + ": it is your move to choose a column to drop your black discs");
    $(".board button").on("click", function() {
        let col = $(this)
        .closest("td")
        .index();
        let bottomOpen = reviewBottom(col);
        switchColor(bottomOpen, col, activeColor);

        if(horizontalWinCondition()){
            gameEnd(activeName);
        }

        activePlayer = activePlayer * -1;

        if (activePlayer === 1) {
            activeName = player1;
            $("h3").text(activeName +": it is your move to choose a column to drop your black discs.");
            activeColor = player1Color;
        } else {
            activeName = player2;
            $("h3").text(activeName +": it is your move to choose a column to drop your red discs.");
            activeColor = player2Color;
        }
    })
});

let showWin = (rowNum, colNum) => {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

// Color Assignments
function switchColor(rowIndex, colIndex, color) {
    return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color", color);
}

function returnColor(rowIndex, colIndex) {
    return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
}

function reviewBottom(colIndex) {
    let showColor = returnColor (5, colIndex);
    for (let row = 5; row >= 0; row--) {
        showColor = returnColor(row, colIndex);
        if (showColor === "rgb(255, 255, 255)") {
            return row;
        }
    }
}

function reviewColorMatch(one, two, three, four) {
    return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(255, 255, 255)" &&
    one !== undefined
    );
}

function reviewColorMatch(one, two, three, four) {
    return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(255, 255, 255)" &&
    one !== undefined
    );
}

// Win Conditions Logic
function horizontalWinCondition() {
    for (var row = 0; row <= 7 ; row++) {
        for (var col = 0; col < 4; col++) {
            if (reviewColorMatch(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
                console.log('horiz');
                showWin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Game Ending Mechanic
function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 7; row++) {
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
            $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
        }
    }
}