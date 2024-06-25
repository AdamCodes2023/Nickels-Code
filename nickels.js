/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

/* 
Nickels by Adam Miller. Made on June 24th, 2024.
Nickels is a fun die game that has players compete to be the first one to fill a board.
Players roll two dice and cover up the matching sum on their board with a nickel.
If a player already has already covered the number that he or she rolls,
the next player has a chance to steal that value for his or her own board.
Play continues to the next player after the stealer.
If a player rolls the same number on both dice and does not get stolen from,
he or she gets to roll again.
If a player rolls a 7, a random nickel is removed from his or her own board.
The first player to fill all ten spaces on the board is the winner!
In this digital version, all decisions are handled randomly and immediately.
The goal is to beat the computer opponent.
*/

//Keep Track of Covered Values.
const pRolledNums = [];
const cRolledNums = [];

//Random Number Generation.
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Update Dice Sprites with New Rolls.
function updateDice(x, y, val) {
  clearTile(x, y);
  addSprite(x, y, val);
}

//Roll a Die.
function roll() {
  return getRndInteger(1, 6);
}

//Find Sprite Information for Any Board Tile.
function findNumberTileInfo(diceSum, isX, isY, isType, isPlayer) {
  if (diceSum == 2) {
    if (isX) {
      return 0;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "b";
    }
  }
  if (diceSum == 3) {
    if (isX) {
      return 1;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "c";
    }
  }
  if (diceSum == 4) {
    if (isX) {
      return 2;
    }
    if (isY) {
      if (isPlayer) {
        return 4;
      }
      else {
        return 1;
      }
    }
    if (isType) {
      return "d";
    }
  }
}

//Graphics, Sound, and Map Organization.
const dot1Dice = "1"
const dot2Dice = "2"
const dot3Dice = "3"
const dot4Dice = "4"
const dot5Dice = "5"
const dot6Dice = "6"
const nickel = "n"
const board2 = "b"
const board3 = "c"
const board4 = "d"
const board5 = "e"
const board6 = "f"
const board8 = "h"
const board9 = "i"
const board10 = "j"
const board11 = "k"
const board12 = "l"
const background = "z"

setLegend(
  [ dot1Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111110011111DD
DD111110011111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot2Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD111111110011DD
DD111111110011DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD110011111111DD
DD110011111111DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot3Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011111111DD
DD110011111111DD
DD111111111111DD
DD111110011111DD
DD111110011111DD
DD111111111111DD
DD111111110011DD
DD111111110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot4Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot5Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111110011111DD
DD111110011111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dot6Dice, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD111111111111DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD110011110011DD
DD110011110011DD
DD111111111111DD
DD111111111111DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ nickel, bitmap`
................
................
.....111111.....
...1111111111...
...1111111111...
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
...1111111111...
...1111111111...
.....111111.....
................
................` ],
  [ board2, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0770077777777770
0770077777777770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board3, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board4, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777700777770
0777777000777770
0777770070777770
0777700770777770
0777000000007770
0777000000007770
0777777700777770
0777777700777770
0777777700777770
0777777700777770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board5, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770077777777770
0770077777777770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board6, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770077777777770
0770077777777770
0770000000000770
0770000000000770
0770077777700770
0770077777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board8, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770000770000770
0770000770000770
0770000000000770
0770000000000770
0770000770000770
0770000770000770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board9, bitmap`
0000000000000000
0777777777777770
0777777777777770
0770000000000770
0770000000000770
0770077777700770
0770077777700770
0770000000000770
0770000000000770
0777777777700770
0777777777700770
0770000000000770
0770000000000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board10, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777077777000770
0770077770777070
0707077770777070
0777077770777070
0777077770777070
0777077770777070
0777077770777070
0777077770777070
0777077770777070
0700000777000770
0777777777777770
0777777777777770
0000000000000000` ],
  [ board11, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777077777707770
0770077777007770
0707077770707770
0777077777707770
0777077777707770
0777077777707770
0777077777707770
0777077777707770
0777077777707770
0700000770000070
0777777777777770
0777777777777770
0000000000000000` ],
  [ board12, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777077770000070
0770077777777070
0707077777777070
0777077777777070
0777077770000070
0777077770000070
0777077770777770
0777077770777770
0777077770777770
0700000770000070
0777777777777770
0777777777777770
0000000000000000` ],
  [ background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ])

const melody = tune`
369.2307692307692,
46.15384615384615: B4~46.15384615384615,
46.15384615384615: B4~46.15384615384615,
46.15384615384615: B4~46.15384615384615,
969.2307692307692`

setSolids([])

let level = 0
const levels = [
  map`
z1z1z
bcdef
hijkl
zzzzz
bcdef
hijkl
z1z1z`
]

setMap(levels[level])

setPushables({})

//Decide Who Goes First and Define Variables to Stop Controls When the Game Is Over.
let canGoC = false;
let canGoP = true;
let firstMove = getRndInteger(0, 1);
if (firstMove == 1) {
  computerTurn();
  addText("Computer Went First!", {x: 0, y: 7, color: color`3`});
  addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
}
else {
  addText("Player Goes First!", {x: 1, y: 7, color: color`3`});
  addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
}

//Play the Player's Turn on Input and Check Win Conditions.
onInput("l", () => {
  if (canGoP) {
    canGoC = true;
    clearText();
    playTune(melody);
    playerTurn();
    if (pRolledNums.length == 10) {
      addText("PLAYER WINS!", {x: 4, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
    if (cRolledNums.length == 10) {
      addText("COMPUTER WINS!", {x: 3, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
  }
})

//Reset the Game.
onInput("k", () => {
  canGoC = false;
  canGoP = true;
  setMap(levels[level]);
  clearText();
  pRolledNums.splice(0, pRolledNums.length);
  cRolledNums.splice(0, cRolledNums.length);
  firstMove = getRndInteger(0, 1);
  if (firstMove == 1) {
    computerTurn();
    addText("Computer Went First!", {x: 0, y: 7, color: color`3`});
    addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
  }
  else {
    addText("Player Goes First!", {x: 1, y: 7, color: color`3`});
    addText("Press \"l\" to Roll!", {x: 1, y: 8, color: color`3`});
  }
})

//Play the Computer's Turn After the Player and Check Win Conditions.
afterInput(() => {
  if (canGoC) {
    computerTurn();
    if (cRolledNums.length == 10) {
      addText("COMPUTER WINS!", {x: 3, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
    if (pRolledNums.length == 10) {
      addText("PLAYER WINS!", {x: 4, y: 7, color: color`3`});
      addText("Press \"k\" to Reset!", {x: 1, y: 8, color: color`3`});
      canGoC = false;
      canGoP = false;
    }
  }
})
