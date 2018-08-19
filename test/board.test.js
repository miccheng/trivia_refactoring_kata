const Board = require("../src/board");

describe('Board', () => {
  const categories = ["Pop", "Science", "Sports", "Rock"]
  const totalPlaces = 12
  let board

  beforeEach(() => {
    board = new Board(categories, totalPlaces).prepBoard()
  })

  it('Prepares board places', () => {
    expect(board.boardPlaces.length).toEqual(totalPlaces)
  })

  it('Prepare board categories in sequence', () => {
    board.totalPlaces = 6
    board.prepBoard()
    expect(board.boardPlaces).toEqual(["Pop", "Science", "Sports", "Rock", "Pop", "Science"])
  })

  it('Returns categoryAtPosition', () => {
    expect(board.categoryAtPosition(4)).toEqual("Pop")
  })

  it('returns new position of player after roll', () => {
    board.totalPlaces = 6
    board.prepBoard()

    const startPosition = 4
    const roll = 3
    expect(board.getNewPosition(startPosition, roll)).toEqual(1)
  })
});
