const Questions = require("./questions");
const Player = require("./player");
const Board = require("./board");

module.exports = function Game() {
  const players = []

  const winningScore = 6
  const totalPlaces = 12
  const numQuestions = 50
  const categories = ["Pop", "Science", "Sports", "Rock"]

  const questions = new Questions(categories, numQuestions)
  const gameBoard = new Board(categories, totalPlaces).prepBoard()

  let currentPlayerInTurn = 0
  let isGettingOutOfPenaltyBox = false

  const currentPlayer = () => {
    return players[currentPlayerInTurn]
  }

  const didPlayerWin = () => {
    return !(currentPlayer().purse == winningScore)
  }

  const currentCategory = () => {
    return gameBoard.categoryAtPosition(currentPlayer().place)
  }

  const askQuestion = (category) => {
    console.log(`The category is ${category}`)
    console.log(
      questions.askQuestion(category)
    )
  }

  const movePlayer = (player, roll) => {
    const newPlace = getNewPosition(player.place, roll)
    player.setPlace(newPlace)

    console.log(
      `${player.name}'s new location is ${player.place}`
    )
  }

  const getNewPosition = (fromPosition, rolled) => {
    let newPostion = fromPosition + rolled
    if (newPostion > (totalPlaces - 1)) newPostion -= totalPlaces

    return newPostion
  }

  const nextPlayer = () => {
    currentPlayerInTurn += 1
    if (currentPlayerInTurn == players.length) currentPlayerInTurn = 0
  }

  const rewardPlayer = (player) => {
    player.purse += 1

    console.log(
      `${player.name} now has ${player.purse} Gold Coins.`
    )
  }

  this.add = (playerName) => {
    const newPlayer = new Player(playerName)

    players.push(newPlayer)

    console.log(`${playerName} was added`)
    console.log(`They are player number ${players.length}`)

    return true
  }

  this.roll = (roll) => {
    const player = currentPlayer()

    console.log(`${player.name} is the current player`)
    console.log(`They have rolled a ${roll}`)

    if (player.inPenaltyBox) {
      isGettingOutOfPenaltyBox = roll % 2 != 0

      console.log(
        `${player.name} is ${isGettingOutOfPenaltyBox ? '' : 'not '}getting out of the penalty box`
      )

      if (!isGettingOutOfPenaltyBox) return
    }

    movePlayer(player, roll)
    askQuestion(currentCategory())
  }

  this.wasCorrectlyAnswered = () => {
    const player = currentPlayer()

    if (player.inPenaltyBox && !isGettingOutOfPenaltyBox) {
      nextPlayer()
      return true
    }

    console.log("Answer was correct!!!!")
    rewardPlayer(player)

    const winner = didPlayerWin()
    nextPlayer()

    return winner
  }

  this.wrongAnswer = () => {
    const player = currentPlayer()
    player.inPenaltyBox = true

    console.log("Question was incorrectly answered")
    console.log(`${player.name} was sent to the penalty box`)

    nextPlayer()
    return true
  }
}
