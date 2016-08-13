const { expect } = require('chai')

const Map = require('../src/Map')

describe('Map', () => {
  describe('draw', () => {
    it('draws a map as a 2-dimensional array', () => {
      const map = Map.draw()

      expect(map).to.be.an('array')
      expect(map[0]).to.be.an('array')
    })

    it("draws an array of 0's and 1's", () => {
      const map = Map.draw()

      map.forEach(row => {
        row.forEach(value => {
          const valueIsZeroOrOne = value === 0 || value === 1
          expect(valueIsZeroOrOne).to.be.true
        })
      })
    })
  })

  describe('redraw', () => {
    it('takes a map, and alters one character at random', () => {
      const map = [
        [0, 1],
        [1, 0]
      ]

      const redrawn = Map.redraw(map)

      const diffGraph = map.map((row, i) => row.map((x, j) => Math.abs(x - redrawn[i][j])))

      const sum = x => x.reduce((acc, y) => acc + y, 0)
      const numDiff = sum(diffGraph.map(x => sum(x)))

      expect(numDiff).to.equal(1)
    })
  })
})
