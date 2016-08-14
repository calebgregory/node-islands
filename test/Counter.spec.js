const { expect } = require('chai')

const Counter = require('../src/Counter')

describe('Counter', () => {
  describe('numberOfIslands', () => {
    it("counts two islands if there are two 1's not touching each other", () => {
      const map = [
        [0, 0, 1],
        [1, 1, 0],
        [1, 0, 0]
      ]
      const numberOfIslands = Counter.numberOfIslands(map)

      expect(numberOfIslands).to.equal(2)
    })

    it("counts 1 island if there are 1's touching each other", () => {
      const map = [
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0]
      ]

      const numberOfIslands = Counter.numberOfIslands(map)

      expect(numberOfIslands).to.equal(1)
    })

    it("counts 1 island if there are 1's touching each other", () => {
      const map = [
        [0, 1],
        [1, 1]
      ]

      const numberOfIslands = Counter.numberOfIslands(map)

      expect(numberOfIslands).to.equal(1)
    })
  })

  describe('connectMap', () => {
    it('takes a map and returns a two-dimensional array of Up, Left, and Self connections', () => {
      const map = [
        [0, 1],
        [1, 1]
      ]

      const connections = Counter.connectMap(map)

      const expected = [
        [[0,1],[0,1]],
        [[1,0],[1,0]],
        [[1,1],[1,1]],
        [[1,1],[0,1]],
        [[1,1],[1,0]]
      ]

      expect(connections).to.eql(expected)
    })
  })
})
