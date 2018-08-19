'use strict'

class Player {
  constructor(name, playerNumber) {
    this.name = name
    this.place = 0
    this.purse = 0
    this.inPenaltyBox = false
    this.playerNumber = playerNumber
  }
}

module.exports = Player