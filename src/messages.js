'use strict'

class Messages {
  constructor(options = {}) {
    this.showInConsole = options.console || false
  }

  playerPosition(player) {
    return this.returnMessage(`${player.name}'s new location is ${player.place}`)
  }

  purseStatus(player) {
    return this.returnMessage(`${player.name} now has ${player.purse} Gold Coins.`)
  }

  newPlayerAdded(player) {
    return [
      this.returnMessage(`${player.name} was added`),
      this.returnMessage(`They are player number ${player.playerNumber}`)
    ]
  }

  announceCurrentPlayer(player) {
    return this.returnMessage(`${player.name} is the current player`)
  }

  announceRoll(roll) {
    return this.returnMessage(`They have rolled a ${roll}`)
  }

  announcePenaltyStatus(player, isGettingOutOfPenaltyBox) {
    return this.returnMessage(`${player.name} is ${isGettingOutOfPenaltyBox ? '' : 'not '}getting out of the penalty box`)
  }

  announceAnswerStatus(status) {
    const message = status ? "Answer was correct!!!!" : "Question was incorrectly answered"
    return this.returnMessage(message)
  }

  playerInPenaltyBox(player) {
    return this.returnMessage(`${player.name} was sent to the penalty box`)
  }

  returnMessage(message) {
    if (this.showInConsole) return console.log(message)

    return message
  }
}

module.exports = Messages