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
DDDDDDDDDDDDDDDD` ])
