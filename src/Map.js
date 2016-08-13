/**
 * CORE
 */

/**
 * e :: () => e, e <- random [0, 1]
 */
const e = () => ~~( Math.random() + (1/2) )

/**
 * coord :: (x) => coord <- [0, x]
 */
const coord = (max) => ~~( Math.random() * max )

/**
 * draw :: (x, y) => A, A <- x*y [[e]], e <- [0, 1], x, y <- `Z`
 */
const draw = (x = 10, y = 10) => {
  // a map of `x` columns and `y` rows with random entries `e`
  const map = [...Array(x)].map(_ => [...Array(y)].map(_ => e()))

  return map
}

/**
 * redraw = ([[n]]) => ([[n]])
 *
 * alters one coordinate at a time
 */
const redraw = (map) => {
  const x = map.length   ,
        y = map[0].length // all rows are be of equal length

  // coordinates of entry to be changed
  const [ a, b ] = [ coord(x), coord(y) ]

  // flips value 0 -> 1, 1 -> 0
  const f = {
    0 : 1,
    1 : 0
  }

  // switches value of e if (i, j) = (a, b)
  const sw = (i, j, e) => (i===a&&j===b) ? f[e] :e

  // redraws map, switching value of e at coordinate (a, b)
  const redrawn = map.map( (r, i) => r.map(( e, j ) => sw(i, j, e) ) )

  return redrawn
}

module.exports = {
  draw,
  redraw
}
