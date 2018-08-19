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
    const message = messages.playerPosition(player)
    expect(message).toEqual(`${playerName}'s new location is ${player.place}`)
  })

  it('coin status', () => {
    player.purse = 5
    const message = messages.purseStatus(player)
    expect(message).toEqual(`${playerName} now has ${player.purse} Gold Coins.`)
  })

  it('new player added', () => {
    const message = messages.newPlayerAdded(player)
    expect(message).toEqual([`${playerName} was added`, `They are player number ${playerNumber}`])
  })

  it('announce current player', () => {
    const message = messages.announceCurrentPlayer(player)
    expect(message).toEqual(`${playerName} is the current player`)
  })

  it('announces rolled', () => {
    const roll = 5
    const message = messages.announceRoll(roll)
    expect(message).toEqual(`They have rolled a ${roll}`)
  })

  it('announces penalty box', () => {
    const isGettingOutOfPenaltyBox = false
    const message = messages.announcePenaltyStatus(player, isGettingOutOfPenaltyBox)
    expect(message).toEqual(`${player.name} is not getting out of the penalty box`)
  })

  it('announce answer status', () => {
    let status = true
    expect(messages.announceAnswerStatus(status)).toEqual("Answer was correct!!!!")

    status = false
    expect(messages.announceAnswerStatus(status)).toEqual("Question was incorrectly answered")
  })

  it('announce in penalty box', () => {
    const message = messages.playerInPenaltyBox(player)
    expect(message).toEqual(`${playerName} was sent to the penalty box`)
  })
})