'use strict'

class Board {
  constructor(categories, totalPlaces) {
    this.categories = categories
    this.totalPlaces = totalPlaces
  }

  prepBoard() {
    this.boardPlaces = []
    let categoryID = 0
    for(let i = 0; i < this.totalPlaces; i++) {
      if (categoryID == this.categories.length) categoryID = 0

      this.boardPlaces[i] = this.categories[categoryID]
      categoryID += 1
    }

    return this
  }

  categoryAtPosition(place) {
    return this.boardPlaces[place]
  }

  getNewPosition(fromPosition, rolled) {
    let newPostion = fromPosition + rolled
    if (newPostion > (this.totalPlaces - 1)) newPostion -= this.totalPlaces

    return newPostion
  }
}

module.exports = Board