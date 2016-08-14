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

const findIsland = ([[x,y],[w,z]]) => _.findIndex(
  _.any(_.either(_.equals([x,y]), _.equals([w,z])))
)

const findIslands = (coords = []) => (islands = []) => {
  console.log(islands)
  console.log()
  if (_.isEmpty(coords))
    return islands

  const [[[i,j], [p,q]], ...rest] = coords,
        isle = findIsland([[i,j], [p,q]])(islands)

  // console.log(`${isle} :: (i,j)=(${i},${j}) (p,q)=(${p},${q})`)

  if (isle < 0)
    return findIslands(rest)([...islands, [[i,j]]])

  if (_.not(_.contains([i,j])(islands[isle])))
    islands[isle] = islands[isle].concat([[i,j]])
  if (_.not(_.contains([p,q])(islands[isle])))
    islands[isle] = islands[isle].concat([[p,q]])

  return findIslands(rest)(islands)
}

const countIslands = (connections) => {
  const connectedCoords = toConnectCoords(connections)

  console.log(connectedCoords)

  const islands = findIslands(connectedCoords)([])

  return islands.length
}

const numberOfIslands = (map) => {

  console.log()
  map.forEach( row => console.log(row) )
  console.log()

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
