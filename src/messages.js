'use strict'

class Messages {
  constructor(options = {}) {
    this.showInConsole = options.console || false
  }

  announce(type, player, ...otherArgs) {
    if (typeof(type) !== 'string') {
      return type.map(subType => this.announce(subType, player, ...otherArgs))
    }

    let message
    switch(type) {
      case 'playerPosition':
        message = `${player.name}'s new location is ${player.place}`
        break
      case 'purseStatus':
        message = `${player.name} now has ${player.purse} Gold Coins.`
        break
      case 'currentPlayer':
        message = `${player.name} is the current player`
        break
      case 'inPenaltyBox':
        message = `${player.name} was sent to the penalty box`
        break
      case 'penaltyStatus':
        const isGettingOutOfPenaltyBox = otherArgs[0]
        message = `${player.name} is ${isGettingOutOfPenaltyBox ? '' : 'not '}getting out of the penalty box`
        break
      case 'roll':
        const roll = otherArgs[0]
        message = `They have rolled a ${roll}`
        break
      case 'answerStatus':
        const status = otherArgs[0]
        message = status ? "Answer was correct!!!!" : "Question was incorrectly answered"
        break
      case 'newPlayerAdded':
        message = `${player.name} was added`
        break
      case 'playerNumber':
        message = `They are player number ${player.playerNumber}`
        break
    }

    return this.returnMessage(message)
  }

  returnMessage(message) {
    if (this.showInConsole) return console.log(message)

    return message
  }
}

module.exports = Messages