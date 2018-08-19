const Questions = require("./questions");
const Player = require("./player");
const Board = require("./board");
const Messages = require("./messages");

module.exports = function Game() {
  const players = []

  const winningScore = 6
  const totalPlaces = 12
  const numQuestions = 50
  const rewardPerTurn = 1
  const categories = ["Pop", "Science", "Sports", "Rock"]

  const questions = new Questions(categories, numQuestions)
  const gameBoard = new Board(categories, totalPlaces).prepBoard()
  const messages = new Messages({console: true})

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
    player.place = gameBoard.getNewPosition(player.place, roll)

    messages.announce('playerPosition', player)
  }

  const nextPlayer = () => {
    currentPlayerInTurn += 1
    if (currentPlayerInTurn == players.length) currentPlayerInTurn = 0
  }

  const rewardPlayer = (player, coins = 1) => {
    player.purse += coins

    messages.announce('purseStatus', player)
  }

  this.add = (playerName) => {
    const newPlayer = new Player(playerName, players.length + 1)
    players.push(newPlayer)

    messages.announce(['newPlayerAdded', 'playerNumber'], newPlayer)

    return true
  }

  this.roll = (roll) => {
    const player = currentPlayer()

    messages.announce('currentPlayer', player)
    messages.announce('roll', player, roll)

    if (player.inPenaltyBox) {
      isGettingOutOfPenaltyBox = roll % 2 != 0

      messages.announce('penaltyStatus', player, isGettingOutOfPenaltyBox)

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

    messages.announce('answerStatus', player, true)
    rewardPlayer(player, rewardPerTurn)

    const winner = didPlayerWin()
    nextPlayer()

    return winner
  }

  this.wrongAnswer = () => {
    const player = currentPlayer()
    player.inPenaltyBox = true

    messages.announce('answerStatus', player, false)
    messages.announce('inPenaltyBox', player)

    nextPlayer()
    return true
  }
}
