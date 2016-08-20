const { expect } = require('chai')

const Counter = require('../src/Counter')

describe('Counter', () => {
  describe('U', () => {
    it('takes map, coordinates, and returns the value of the point directly upward', () => {
      const map = [
        [1],
        [1] // [1,0]
      ]

      const upwardPoint = Counter.U(map)(1, 0)

      expect(upwardPoint).to.equal(1)
    })

    it('defaults to 0 if no point exists leftward', () => {
      const map = [
        [0]
      ]

      const leftwardPoint = Counter.L(map)(0, 0)

      expect(leftwardPoint).to.equal(0)
    })
  })

  describe('L', () => {
    it('takes map, coordinates, and returns value of the point directly leftward', () => {
      const map = [
        [1, 0],
      ]  // [0,1]

      const leftwardPoint = Counter.L(map)(0, 1)

      expect(leftwardPoint).to.equal(1)
    })

    it('defaults to 0 if no point exists leftward', () => {
      const map = [
        [0]
      ]

      const leftwardPoint = Counter.L(map)(0, 0)

      expect(leftwardPoint).to.equal(0)
    })
  })

  describe('connect', () => {
    it('takes map, row, returns upward, leftward, and self- connections within that row represented as strings', () => {
      const map = [
        [1, 0], // row 0
        [1, 0], // row 1
        [1, 0], // row 2
      ]

      const connected = Counter.connect(map)([1, 0], 1)

      const expected = [
        [ '1,0','1,0' ], // every point is connected to itself
        [ '1,0','0,0' ]  // upward connection
      ]

      expect(connected).to.eql(expected)
    })
  })

  describe('connectMap', () => {
    it('takes map, returns connections in all rows in map', () => {
      const map = [
        [1,0],
        [1,0],
        [1,0]
      ]

      const mapConnections = Counter.connectMap(map)

      const expected = [
        [ '0,0','0,0' ],
        [ '1,0','1,0' ],
        [ '1,0','0,0' ],
        [ '2,0','2,0' ],
        [ '2,0','1,0' ]
      ]

      expect(mapConnections).to.eql(expected)
    })
  })

  describe('findIsland', () => {
    it('takes a point [x,y] and returns function that takes islands [[[p,q]]] and returns index of island that contains [x,y] || -1', () => {
      const point   =                '1,0',
            islands = [ [ '1,2' ], [ '1,0', '0,0' ] ]
                                   // index = 1
      const islandIndex = Counter.findIsland(point)(islands)

      expect(islandIndex).to.equal(1)
    })
  })

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
        ['0,1','0,1'],
        ['1,0','1,0'],
        ['1,1','1,1'],
        ['1,1','0,1'],
        ['1,1','1,0']
      ]

      expect(connections).to.eql(expected)
    })
  })
})
