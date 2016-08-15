#!/usr/bin/env node
'use strict'

const co      = require('co'),
      prompt  = require('co-prompt')

const Map     = require('./Map'),
      Counter = require('./Counter'),
      txt     = require('./txt')

console.log(txt.intro)

co(function *() {
  const x = yield prompt('size of x dimension: ')
  const y = yield prompt('size of y dimension: ')

  let map = Map.draw(parseInt(x), parseInt(y))

  const draw = () => {
    console.log('\n'+txt.drawTextMap(map))

    let cnt = Counter.numberOfIslands(map)
    console.log(txt.caption(x,y,cnt))

    map = Map.redraw(map)
  }

  draw(map, x, y)

  setInterval(draw, 5000)
})
