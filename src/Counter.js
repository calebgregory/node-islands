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
 * connect :: ([[n]]) => ([n], i) => {i:{j:{p:q}}} p,q <- connected point
 */
const connect = (map) => (row, i) => row.reduce(toConnections(map, i), {})

/**
 * connectMap :: ([[n]]) => {i:{j:{p:q}}} p,q <- connected point
 */
const connectMap = (map) => map.reduce((acc, r, i) => _.merge(acc)(connect(map)(r, i)), {})

/**
 * toConnectCoords :: ({i:{j:{p:q}}}) => [[i, j], [p, q]]
 *
 *  e.g., ({ 0 : 1 : { 1 : 1 } }) => [[0,1], [1,1]]
 */
const toConnectCoords = (connections) => _.pipe(
  _.keys,
  _.reduce((acc, i) => {
    const coords = _.pipe(
      _.keys,
      _.map(j => [i, j])
    )(connections[i])

    return [...acc, ...coords]
  }, []),
  _.reduce((acc, [i, j]) => {
    const knxs = _.pipe(
      _.toPairs, // ({p:q}) => [p,q]
      _.map(([p, q]) => [[i, j], [p, q]])
    )(connections[i][j])

    return [...acc, ...knxs ]
  }, [])
)(connections)

/**
 * the game plan here is to
 *
 * traverse the connections tree,
 *   node a
 *        |
 *        b - c
 *            |\
 *            d e
 * adding member coordinates to island Set
 */
const countIslands = (connections) => {
  const connectedCoords = toConnectCoords(connections)

  let islands = []

  connectedCoords.forEach(([[i, j], [p, q]]) => {
    console.log(`(${i}, ${j}) : (${p}, ${q})`)
    const pqKnx = _.toPairs(connections[p][q])

    pqKnx.forEach(([s, t]) => {
      if (s == i && t == j)
        return;
      console.log(`(i, j) : (p, q) -> (s, t) = (${s}, ${t})`)
      islands.forEach((island, n) => {
        island.forEach(([X, Y]) => {
          console.log('X', X, 'Y', Y)
          if (_.equals(X, [p, q]) || _.equals(Y, [p, q]))
            console.log(';)')
        })
      })
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
