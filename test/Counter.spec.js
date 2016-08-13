const { expect } = require('chai')

const Counter = require('../src/Counter')

describe('Counter', () => {
  describe('numIslands', () => {
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
  })
})
