const _ = require('ramda')

/**
 * U, L :: ([[n]]) => (i, j) => e <- [0,1]
 *
 * C | DIRECTION
 * --+----------
 * U | UP
 * L | LEFT
 *
 * returns value of point C-ward to (i, j)
 *
 * e.g., given map
 *
 *  0 0 1
 *  1 1 1
 *  1 0 0,
 *
 * U(map)(1,2) => map[0][2] => 1
 *
 * defaults to 0
 */
const U = (map) => (i, j) => (map[i-1]||[])[j] || 0
const L = (map) => (i, j) => map[i][j-1] || 0

/**
 * toConnections :: ([[n]], i) => ([], e, j) => [[i,j],[p,q]],
 *                                        where [p,q] = coordinates of connected point
 *
 * takes `map` and index `i` of row in map, returns callback for reducer,
 * which takes `knx` (accumulator) list of connections in given row, represented as tuples,
 *              `e` value at map[i][j],
 *              `j` index of column in map
 *
 * returns accumulator
 */
const toConnections = (map, i) => (knx, e, j) => {
  if (e) {
    knx = _.append([[i, j], [i, j]])(knx) // every island is connected to itself
    if (U(map)(i,j)) knx = _.append([[i, j], [i-1, j  ]])(knx)
    if (L(map)(i,j)) knx = _.append([[i, j], [i  , j-1]])(knx)
  }
  return knx
}

/**
 * connect :: ([[n]]) => ([n], i) => [[[x,y],[p,q]]], where [[x,y],[p,q]] = connected points
 */
const connect = (map) => (row, i) => row.reduce(toConnections(map, i), [])

/**
 * connectMap :: ([[n]]) => [[[x,y],[p,q]]], where [[x,y],[p,q]] = connected points
 *
 * reduces connections in each row into one array using concatenation
 */
const connectMap = (map) => map.reduce((acc, r, i) => _.concat(acc)(connect(map)(r, i)), [])

/**
 * findIsland :: ([x,y]) => ([[[x,y]]]) => N, N <- [-1, L], L = length of islands array
 *
 * returns the index of "island" that contains point [x,y]
 */
const findIsland = ([x,y]) => _.findIndex( _.contains([x,y]) )

/**
 * findIslands :: ([[[x,y],[p,q]]]) => ([[[x,y]]]) => [[[x,y]]]
 *
 */
const findIslands = (knx = []) => (islands = []) => {
  if (_.isEmpty(knx)) return islands

  const [[[a,b], [p,q]], ...knxs] = knx,
        isle = findIsland([p,q])(islands) // index of isle containing [p,q]

  if (isle < 0)
    return findIslands(knxs)([...islands, [[p,q]]])

  else {
    const isleWithAb = [...islands[isle], [a,b]],
          kntdIsle   = findIsland([a,b])(islands) // <- [x,y] = [1,2]

    if (kntdIsle < 0)
      return findIslands(knxs)([
        ...islands.slice(0, isle),
        isleWithAb,
        ...islands.slice(isle+1)
      ])

    else {
      const restOfKntdIsle    = _.filter(_.complement(_.equals)([a,b]))(islands[kntdIsle]),
            isleWithAbAndKntd = [ ...isleWithAb, ...restOfKntdIsle ]

      const [ min, max ] = _.sort((x,y) => x - y)([ isle, kntdIsle ])

      return findIslands(knxs)([
        ..._.slice(0, min)(islands),
        isleWithAbAndKntd,
        ..._.slice(min+1, max)(islands),
        ..._.slice(max+1, Infinity)(islands)
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
  U,
  L,
  toConnections,
  connect,
  connectMap,
  findIsland,
  numberOfIslands,
  countIslands
}
