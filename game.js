let size = 15;
let board = [];
let rightClicked = false;
let leftClicked = false;
let bombs = ["BOOM", "SAVEBOOM", "EXPLODED"]

function setup() {
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            if (random(0, 1) < 0.2) {
                board[i][j] = "BOOM";
            } else {
                board[i][j] = ""
            }
        }
    }


    createCanvas(size * 40, size * 40);
    background(255, 255, 255);
    for (let i = 1; i < size; i++) {
        line(i * 40, 0, i * 40, height);
    }
    for (let i = 1; i < size; i++) {
        line(0, i * 40, width, i * 40);
    }
}

function mouseClicked() {
    if(mouseX < size*40 && mouseY < size*40) {
        leftClicked = true;
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        rightClicked = true;
    }
}

function bombCount(x, y) {
    let count = 0;

    if (x != 0 && y != 0) {
        if (bombs.includes(board[x - 1][y - 1])) {
            count++;
        }
    }
    if (x != 0) {
        if (bombs.includes(board[x - 1][y])) {
            count++;
        }
    }
    if (x != 0 && y != size - 1) {
        if (bombs.includes(board[x - 1][y + 1])) {
            count++;
        }
    }
    if (y != 0) {
        if (bombs.includes(board[x][y - 1])) {
            count++;
        }
    }
    if (y != size - 1) {
        if (bombs.includes(board[x][y + 1])) {
            count++;
        }
    }
    if (x != size - 1 && y != 0) {
        if (bombs.includes(board[x + 1][y - 1])) {
            count++;
        }
    }
    if (x != size - 1) {
        if (bombs.includes(board[x + 1][y])) {
            count++;
        }
    }
    if (x != size - 1 && y != size - 1) {
        if (bombs.includes(board[x + 1][y + 1])) {
            count++;
        }
    }
    return count;
}

function draw() {
    let xCoor = floor(mouseX / 40);
    let yCoor = floor(mouseY / 40);
    if (leftClicked) {
        leftClicked = false;
        show(xCoor, yCoor)
    }
    if (rightClicked) {
        rightClicked = false;
        mark(xCoor,yCoor)
    }
}

function show(x,y) {
    if (board[x][y] === "BOOM") {
        fill(255, 0, 0);
        rect(x * 40, y * 40, 40, 40);
        board[x][y] = "EXPLODED"
    } else if (board[x][y] === "") {
        if(bombCount(x, y) === 0) {
            fill(190, 190, 190);
            rect(x * 40, y * 40, 40, 40);
            board[x][y] = "GUESSED"
            explosion(x,y);
        } else {
            push()
            board[x][y] = "GUESSED";
            textSize(40);
            fill(0,0,0);
            translate(10, 35);
            text(bombCount(x, y), x * 40, y * 40);
            pop()
        }


    }
}

function mark(x,y) {
    if (board[x][y] === "SAVE") {
        board[x][y] = "";
        fill(255, 255, 255);
        rect(x * 40, y * 40, 40, 40);
    } else if (board[x][y] === "SAVEBOOM") {
        board[x][y] = "BOOM";
        fill(255, 255, 255);
        rect(x * 40, y * 40, 40, 40);
    } else if (board[x][y] == "BOOM") {
        board[x][y] = "SAVEBOOM";
        fill(255, 255, 0);
        rect(x * 40, y * 40, 40, 40);
    } else if (board[x][y] == "") {
        board[x][y] = "SAVE";
        fill(255, 255, 0);
        rect(x * 40, y * 40, 40, 40);
    }
}

function explosion(x,y) {
    if (x != 0 && y != 0) {
        if (board[x - 1][y - 1] == "" || board[x - 1][y - 1] == "GUESSED") {
            show(x-1,y-1)
        }
    }
    if (x != 0) {
        if (board[x - 1][y] == "" || board[x - 1][y] == "GUESSED") {
            show(x-1, y)
        }
    }
    if (x != 0 && y != size - 1) {
        if (board[x - 1][y + 1] == "" || board[x - 1][y + 1] == "GUESSED") {
            show(x-1,y+1)
        }
    }
    if (y != 0) {
        if (board[x][y - 1] == "" || board[x][y - 1] == "GUESSED") {
            show(x,y-1)
        }
    }
    if (y != size - 1) {
        if (board[x][y + 1] == "" || board[x][y + 1] == "GUESSED") {
            show(x,y+1)
        }
    }
    if (x != size - 1 && y != 0) {
        if (board[x + 1][y - 1] == "" || board[x + 1][y - 1] == "GUESSED") {
            show(x+1,y-1)
        }
    }
    if (x != size - 1) {
        if (board[x + 1][y] == "" || board[x + 1][y] == "GUESSED") {
            show(x+1,y)
        }
    }
    if (x != size - 1 && y != size - 1) {
        if (board[x + 1][y + 1]  == "" || board[x + 1][y + 1]  == "GUESSED") {
            show(x+1,y+1)
        }
    }

}

document.oncontextmenu = function() {
    return false;
}