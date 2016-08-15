#!/usr/bin/env node
'use strict'

const co      = require('co'),
      prompt  = require('co-prompt')

const Map     = require('./Map'),
      Counter = require('./Counter'),
      txt     = require('./txt')

const draw = (map, x, y) => {
  map = Map.redraw(map)
  console.log('\n'+txt.drawTextMap(map))

  let cnt = Counter.numberOfIslands(map)
  console.log(txt.caption(x,y,cnt))
}

console.log(txt.intro)

co(function *() {
  const x = yield prompt('size of x dimension: ')
  const y = yield prompt('size of y dimension: ')

  let map = Map.draw(parseInt(x), parseInt(y))

  draw(map, x, y)

  setInterval(() => draw(map, x, y), 5000)
})
