'use strict'

class Player {
  constructor(name) {
    this.name = name
    this.place = 0
    this.purse = 0
    this.inPenaltyBox = false
  }

  setPlace(newPlace) {
    this.place = newPlace
  }

  setInPenaltyBox(status) {
    this.inPenaltyBox = status
  }
}

module.exports = Player