const numberOfIslands = (map) => {

  const L = (i, j) => map[i][j-1] || 0
  const R = (i, j) => map[i][j+1] || 0
  const U = (i, j) => (map[i-1] || {})[j] || 0
  const D = (i, j) => (map[i+1] || {})[j] || 0

  let coordinates = []
  let count = 0

  console.log()
  map.forEach( row => console.log(row) )
  console.log()

  console.log('e (i, j) | {R} {D}')
  console.log()

  map.forEach((row, i) => {
    row.forEach((e, j) => {
      const coords = `${i},${j}`

      console.log(`${e} (${i}, ${j}) | >${R(i,j)}> v${D(i,j)}v`)

      if (e) {
        const indexOfCoords = coordinates.indexOf(coords)
        if (indexOfCoords < 0) {
          count++
          console.log(count)
          if (R(i,j)) { coordinates.push(`${i},${j+1}`); console.log(`   ${i}, ${j+1}`) }
          if (D(i,j)) { coordinates.push(`${i+1},${j}`); console.log(`   ${i+1}, ${j}`) }
        } else {
          console.log('N:', count, 'coordinates:', coordinates)
          coordinates = [
            ...coordinates.slice(0, indexOfCoords),
            ...coordinates.slice(indexOfCoords+1)
          ]
        }
      }

    })
      console.log()
  })

  return count
}

module.exports = {
  numberOfIslands
}
