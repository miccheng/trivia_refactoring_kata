const Messages = require("../src/messages");
const Player = require("../src/player");

describe("Messages", () => {
  const playerName = 'Max'
  const playerNumber = 3
  let messages, player

  beforeEach(() => {
    messages = new Messages({console: false})
    player = new Player(playerName, playerNumber)
  })

  it('new player position', () => {
    const message = messages.announce('playerPosition', player)
    expect(message).toEqual(`${playerName}'s new location is ${player.place}`)
  })

  it('coin status', () => {
    player.purse = 5
    const message = messages.announce('purseStatus', player)
    expect(message).toEqual(`${playerName} now has ${player.purse} Gold Coins.`)
  })

  it('new player added', () => {
    const message = messages.announce(['newPlayerAdded', 'playerNumber'], player)
    expect(message).toEqual([`${playerName} was added`, `They are player number ${playerNumber}`])
  })

  it('announce current player', () => {
    const message = messages.announce('currentPlayer', player)
    expect(message).toEqual(`${playerName} is the current player`)
  })

  it('announces rolled', () => {
    const roll = 5
    const message = messages.announce('roll', player, roll)
    expect(message).toEqual(`They have rolled a ${roll}`)
  })

  it('announces penalty box', () => {
    const isGettingOutOfPenaltyBox = false
    const message = messages.announce('penaltyStatus', player, isGettingOutOfPenaltyBox)
    expect(message).toEqual(`${player.name} is not getting out of the penalty box`)
  })

  it('announce answer status', () => {
    let status = true
    let message = messages.announce('answerStatus', player, status)
    expect(message).toEqual("Answer was correct!!!!")

    status = false
    message = messages.announce('answerStatus', player, status)
    expect(message).toEqual("Question was incorrectly answered")
  })

  it('announce in penalty box', () => {
    const message = messages.announce('inPenaltyBox', player)
    expect(message).toEqual(`${playerName} was sent to the penalty box`)
  })
})