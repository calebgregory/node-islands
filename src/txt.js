const intro = `
                           ~ welcome to islands ~

it randomly draws an x * y map and counts the islands of 1s in the sea of 0s

please enter the size of each dimension x and y...
`

const drawTextMap = (map) => map.reduce((acc, row) => `${acc}${row.join(' ').replace(/0/g, ' ').replace(/1/g, '@')}\n`, '')

const caption = (x, y, cnt) => `
a ${x} * ${y} map with ${cnt} islands
`

module.exports = {
  intro,
  drawTextMap,
  caption
}
