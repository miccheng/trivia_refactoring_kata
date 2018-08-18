const Questions = require("./questions");

module.exports = function Game() {
  const players = []
  const places = []
  const purses = []
  const inPenaltyBox = []

  const numQuestions = 50
  const categories = ["Pop", "Science", "Sports", "Rock"]
  const questions = new Questions(categories, numQuestions)

  let currentPlayer = 0
  let isGettingOutOfPenaltyBox = false

  const didPlayerWin = () => {
    return !(purses[currentPlayer] == 6)
  }

  const currentCategory = () => {
    const allPlaces = ["Pop", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock"]
    const currentPlace = places[currentPlayer]

    return allPlaces[currentPlace]
  }

  this.isPlayable = (howManyPlayers) => {
    return howManyPlayers >= 2
  }

  this.add = (playerName) => {
    players.push(playerName)
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

  const askQuestion = () => {
    console.log(questions.questions[currentCategory()].shift())
  }

  this.roll = (roll) => {
    console.log(`${players[currentPlayer]} is the current player`)
    console.log(`They have rolled a ${roll}`)

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true

        console.log(
          `${players[currentPlayer]} is getting out of the penalty box`
        )
        places[currentPlayer] = places[currentPlayer] + roll
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12
        }

        console.log(
          `${players[currentPlayer]}'s new location is ${places[currentPlayer]}`
        )
        console.log(`The category is ${currentCategory()}`)
        askQuestion()
      } else {
        console.log(
          `${players[currentPlayer]} is not getting out of the penalty box`
        )
        isGettingOutOfPenaltyBox = false
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12
      }

      console.log(
        `${players[currentPlayer]}'s new location is ${places[currentPlayer]}`
      )
      console.log(`The category is ${currentCategory()}`)
      askQuestion()
    }
  }

  this.wasCorrectlyAnswered = () => {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!")
        purses[currentPlayer] += 1
        console.log(
          `${players[currentPlayer]} now has ${purses[currentPlayer]} Gold Coins.`
        )

        const winner = didPlayerWin()
        currentPlayer += 1
        if (currentPlayer == players.length) currentPlayer = 0

        return winner
      } else {
        currentPlayer += 1
        if (currentPlayer == players.length) currentPlayer = 0
        return true
      }
    } else {
      console.log("Answer was correct!!!!")

      purses[currentPlayer] += 1
      console.log(
        `${players[currentPlayer]} now has ${purses[currentPlayer]} Gold Coins.`
      )

      const winner = didPlayerWin()

      currentPlayer += 1
      if (currentPlayer == players.length) currentPlayer = 0

      return winner
    }
  }

  this.wrongAnswer = () => {
    console.log("Question was incorrectly answered")
    console.log(`${players[currentPlayer]} was sent to the penalty box`)
    inPenaltyBox[currentPlayer] = true

    currentPlayer += 1
    if (currentPlayer == players.length) currentPlayer = 0
    return true
  }
}
