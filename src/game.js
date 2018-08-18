const Questions = require("./questions");
const Player = require("./player");

module.exports = function Game() {
  const players = []
  const places = []
  const purses = []
  const inPenaltyBox = []

  const totalPlaces = 12
  const numQuestions = 50
  const categories = ["Pop", "Science", "Sports", "Rock"]
  const questions = new Questions(categories, numQuestions)

  let currentPlayerInTurn = 0
  let isGettingOutOfPenaltyBox = false

  const currentPlayer = () => {
    return players[currentPlayerInTurn]
  }

  const didPlayerWin = () => {
    return !(purses[currentPlayerInTurn] == 6)
  }

  const currentCategory = () => {
    const allPlaces = ["Pop", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock"]
    const currentPlace = places[currentPlayerInTurn]

    return allPlaces[currentPlace]
  }

  this.isPlayable = (howManyPlayers) => {
    return howManyPlayers >= 2
  }

  this.add = (playerName) => {
    const newPlayer = new Player(playerName)

    players.push(newPlayer)
    places[this.howManyPlayers() - 1] = 0
    purses[this.howManyPlayers() - 1] = 0
    inPenaltyBox[this.howManyPlayers() - 1] = false

    console.log(`${playerName} was added`)
    console.log(`They are player number ${players.length}`)

    return true
  }

  this.howManyPlayers = () => {
    return players.length
  }

  const askQuestion = (category) => {
    console.log(
      questions.askQuestion(category)
    )
  }

  this.roll = (roll) => {
    const player = currentPlayer()

    console.log(`${player.name} is the current player`)
    console.log(`They have rolled a ${roll}`)

    if (inPenaltyBox[currentPlayerInTurn]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true

        console.log(
          `${player.name} is getting out of the penalty box`
        )
        movePlayer(player, roll)
      } else {
        console.log(
          `${player.name} is not getting out of the penalty box`
        )
        isGettingOutOfPenaltyBox = false
      }
    } else {
      movePlayer(player, roll)
    }
  }

  const movePlayer = (player, roll) => {
    places[currentPlayerInTurn] = getNewPosition(places[currentPlayerInTurn], roll)

    console.log(
      `${player.name}'s new location is ${places[currentPlayerInTurn]}`
    )
    const category = currentCategory()
    console.log(`The category is ${category}`)
    askQuestion(category)
  }

  const getNewPosition = (fromPosition, rolled) => {
    let newPostion = fromPosition + rolled
    if (newPostion > (totalPlaces - 1)) newPostion -= totalPlaces

    return newPostion
  }

  this.wasCorrectlyAnswered = () => {
    const player = currentPlayer()

    if (inPenaltyBox[currentPlayerInTurn]) {
      if (isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!")
        purses[currentPlayerInTurn] += 1
        console.log(
          `${player.name} now has ${purses[currentPlayerInTurn]} Gold Coins.`
        )

        const winner = didPlayerWin()
        currentPlayerInTurn += 1
        if (currentPlayerInTurn == players.length) currentPlayerInTurn = 0

        return winner
      } else {
        currentPlayerInTurn += 1
        if (currentPlayerInTurn == players.length) currentPlayerInTurn = 0
        return true
      }
    } else {
      console.log("Answer was correct!!!!")

      purses[currentPlayerInTurn] += 1
      console.log(
        `${player.name} now has ${purses[currentPlayerInTurn]} Gold Coins.`
      )

      const winner = didPlayerWin()

      currentPlayerInTurn += 1
      if (currentPlayerInTurn == players.length) currentPlayerInTurn = 0

      return winner
    }
  }

  this.wrongAnswer = () => {
    const player = currentPlayer()

    console.log("Question was incorrectly answered")
    console.log(`${player.name} was sent to the penalty box`)
    inPenaltyBox[currentPlayerInTurn] = true

    currentPlayerInTurn += 1
    if (currentPlayerInTurn == players.length) currentPlayerInTurn = 0
    return true
  }
}
