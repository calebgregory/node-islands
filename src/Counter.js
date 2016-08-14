const _ = require('ramda')

/**
 * U, D, L, R :: ([[n]]) => (i, j) => e <- [0,1]
 *
 * C | DIRECTION
 * --+----------
 * U | UP
 * D | DOWN
 * L | LEFT
 * R | RIGHT
 *
 * returns value of point C-ward to (i, j)
 */
const U = (map) => (i, j) => (map[i-1]||{})[j] || 0
const D = (map) => (i, j) => (map[i+1]||{})[j] || 0
const L = (map) => (i, j) => map[i][j-1] || 0
const R = (map) => (i, j) => map[i][j+1] || 0

/**
 * toConnections :: ([[n]], i) => ({}, e, j) => {i:{j:{x,y}} x,y <- connected point
 */
const toConnections = (map, i) => (knx, e, j) => {
  if (e) {
    knx = _.append([[i, j], [i, j]])(knx) // every island is connected to itself
    if (U(map)(i,j)) knx = _.append([[i, j], [i-1, j  ]])(knx)
//    if (D(map)(i,j)) knx = _.append([[i, j], [i+1, j  ]])(knx)
    if (L(map)(i,j)) knx = _.append([[i, j], [i  , j-1]])(knx)
//    if (R(map)(i,j)) knx = _.append([[i, j], [i  , j+1]])(knx)
  }
  return knx
}

/**
 * connect :: ([[n]]) => ([n], i) => {i:{j:{p:q}}} p,q <- connected point
 */
const connect = (map) => (row, i) => row.reduce(toConnections(map, i), [])

/**
 * connectMap :: ([[n]]) => {i:{j:{p:q}}} p,q <- connected point
 */
const connectMap = (map) => map.reduce((acc, r, i) => _.concat(acc)(connect(map)(r, i)), [])

const findIsland = ([w,z]) => _.findIndex( _.contains([w,z]) )

const findIslands = (coords = []) => (islands = []) => {
  if (_.isEmpty(coords)) return islands

  const [[[x,y], [p,q]], ...rst] = coords,
        isle = findIsland([p,q])(islands)

  if (isle < 0)
    return findIslands(rst)([...islands, [[p,q]]])

  else {
    const newIsle  = [...islands[isle], [x,y]],
          kntdIsle = findIsland([x,y])(islands) // <- [x,y] = [1,2]

    if (kntdIsle < 0)
      return findIslands(rst)([
        ...islands.slice(0, isle),
        newIsle,
        ...islands.slice(isle+1)
      ])

    else {
      const [ min, max ] = _.sort((a,b) => a - b)([isle, kntdIsle])

      const restOfKntdIsle = _.filter(([a,b]) => !_.equals([a,b])([x,y]))(islands[kntdIsle])

      return findIslands(rst)([
        ...islands.slice(0, min),
        [ ...newIsle, ...restOfKntdIsle ],
        ...islands.slice(min+1, max),
        ...islands.slice(max+1)
      ])
    }
  }
}

const countIslands = (connections) => {
  const islands = findIslands(connections)([])

  return islands.length
}

const numberOfIslands = (map) => {
  const connections = connectMap(map)

  const numConnex = countIslands(connections)

  return numConnex;
}

module.exports = {
  toConnections,
  connectMap,
  numberOfIslands,
  countIslands
}
