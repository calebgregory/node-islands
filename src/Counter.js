const _ = require('ramda')

const R = (map) => (i, j) => map[i][j+1] || 0
const D = (map) => (i, j) => (map[i+1] || {})[j] || 0

const toConnections = (map, i) => (knx, e, j) => {
  if (e) {
    if (R(map)(i,j)) knx = _.assocPath([i, j, i  ], j+1)(knx)
    if (D(map)(i,j)) knx = _.assocPath([i, j, i+1], j  )(knx)
  }
  return knx
}

const connect = (map) => (row, i) => row.reduce(toConnections(map, i), {})

const connectMap = (map) => map.reduce((acc, r, i) => _.merge(acc)(connect(map)(r, i)), {})

const numberOfIslands = (map) => {

  console.log()
  map.forEach( row => console.log(row) )
  console.log()

  const connections = connectMap(map)

  console.log(JSON.stringify(connections, null, 2))

  return;
}

module.exports = {
  toConnections,
  connect,
  numberOfIslands
}
