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

    it.only("counts 1 island if there are 1's touching each other", () => {
      const map = [
        [0, 1],
        [1, 1]
      ]

      const numberOfIslands = Counter.numberOfIslands(map)

      expect(numberOfIslands).to.equal(1)
    })

  })

  describe('connect', () => {
    it('takes map and row and index, creates an entry in tree for Downward connection', () => {
      const map = [
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0]
      ]

      const connect = Counter.connect(map)(map[0], 0)

      const expected = { 0: { 2: { 1: 2 } } }

      expect(connect).to.eql(expected)
    })

    it('takes map and row and index, creates an entry in tree for Rightward connection', () => {
      const map = [
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0]
      ]

      const connect = Counter.connect(map)(map[1], 1)

      const expected = {
        1: {
          0: { 1: 1, 2: 0 },
          1: { 1: 2 }
        }
      }

      expect(connect).to.eql(expected)
    })
  })

  describe('countIslands', () => {
    it('takes a tree representation of connections and finds the connectedness of an island', () => {
      const map = [
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0]
      ]

      const connections = {
        0: { 1 : { 1: 2 } },
        1: { 0 : { 1: 1 ,
                   2: 0 },
             1 : { 1: 2 } }
      }

      const numberOfIslands = Counter.countIslands(connections)

      expect(numberOfIslands).to.equal(1)
    })
  })
})
