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
    if (U(map)(i,j)) knx = _.assocPath([i, j, i-1], j  )(knx)
    if (D(map)(i,j)) knx = _.assocPath([i, j, i+1], j  )(knx)
    if (L(map)(i,j)) knx = _.assocPath([i, j, i  ], j-1)(knx)
    if (R(map)(i,j)) knx = _.assocPath([i, j, i  ], j+1)(knx)
  }
  return knx
}

/**
 * connect :: ([[n]]) => ([n], i) => {i:{j:{x:y}}} x,y <- connected point
 */
const connect = (map) => (row, i) => row.reduce(toConnections(map, i), {})

/**
 * connectMap :: ([[n]]) => {i:{j:{x:y}}} x,y <- connected point
 */
const connectMap = (map) => map.reduce((acc, r, i) => _.merge(acc)(connect(map)(r, i)), {})

const toConnectCoords = (connections) => _.pipe(
  _.keys,
  _.reduce((acc, i) => {
    const js     = _.keys(connections[i]),
          coords = _.map(j => [i, j])(js)
    return [...acc, ...coords]
  }, []),
  _.reduce((acc, [i, j]) => {
    const knxs  = _.toPairs(connections[i][j]),
          _knxs = _.map(k => [[i, j],k])(knxs)
    return [...acc, ..._knxs ]
  }, [])
)(connections) // ({ 0 : 1 : { 1 : 1 } }) => [[0,1], [1,1]]

const countIslands = (connections) => {
  const connectedCoords = toConnectCoords(connections)

  let islands = []
  connectedCoords.forEach(([[i, j], [p, q]]) => {
    console.log(`(${i}, ${j}) : (${p}, ${q})`)
    const pqKnx = _.toPairs(connections[p][q])

    pqKnx.forEach(([s, t], n) => {
      console.log(`${n} > (${s}, ${t})`)
    })

  })
}

const numberOfIslands = (map) => {

  console.log()
  map.forEach( row => console.log(row) )
  console.log()

  const connections = connectMap(map)
  console.log(JSON.stringify(connections, null, 2))

  const numConnex = countIslands(connections)

  return;
}

module.exports = {
  toConnections,
  connect,
  numberOfIslands,
  countIslands
}
