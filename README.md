# node-islands

## see it in action

if you don't have node, [install nvm](https://github.com/creationix/nvm#install-script).

then,

```bash
$ nvm use 5.6.0
$ npm run start
```

and watch the maps go...

## `map`

a `map` is a 2-dimensional array of values in range `[0,1]`.

```javascript
/* map */

[
  [0, 1, 0],
  [1, 1, 0],
  [0, 0, 0]
]
```

## `connections`

`connections` in this map are represented as a list of tuples.

every point `[x,y]` is connected to itself.

given a point `[x,y]`, there exists a point upward (`[x-1,y]`) and
leftward (`[x,y-1]`) from that point. if the value in the `map` at
either of these points equals `1`, a connection is made. if there is no
point leftward or upward from `[x,y]`, its value defaults to `0`.

the `connections` in the map above are listed:
```javascript
/* connections */

[ [ [0,1], [0,1] ],
  [ [1,0], [1,0] ],
  [ [1,1], [1,1] ],
  [ [1,1], [0,1] ],
  [ [1,1], [1,0] ] ]
```

## `island`

an `island` is a blob of `1`s that are mutually connected to each other.
each island is represented as an array of points `[x,y]`

an island in the map above:
```javascript
/* island */

[ [0,1], [1,0], [1,1] ]
```

`islands` are a list of these `island`s:

```javascript
/* islands */

[ [ [0,1], [1,0], [1,1] ] ]
```

## the algorithm

### 1. gather connections

defining representation of `map` as grid `x * y`,

```
  0 1 2 3 . . . y
0 . . % .       <- % @ [0,2],
1 . # * .          * @ [1,2],
2 . . . .          # @ [1,1]
3 . . . .          % is upward of *
.                  # is leftward of *
.
.
x
```

, for any two points `[x,y]`, `[p,q]` such that `map[x][y] = map[p][q] =
1`, we define a connection `[[x,y],[p,q]]`

1. between a point `[x,y]` and itself (where `x = p, y = q`). `(1)`
2. between a point `[x,y]` and leftward point `[p,q]` where `x = p` and
   `y > q`. `(2)`
3. between a point `[x,y]` and upward point `[p,q]` where `x > p` and `y
   = q`. `(3)`

therefore, for any given connection `[[x,y],[p,q]]`, `x >= p` and `y >=
q`. `(4)`

when processing arrays, we iterate right-to-left and up-to-down - i.e.,
in _increasing_ order. therefore, for any point `[p,q]` `= 1` left- or
up- ward from `[x,y]` during iteration, by `(1)` and `(4)`, there will
already exist a connection `[[p,q],[p,q]]`. `(5)`

by only storing in one direction per dimension, we do not store
duplicate connections.

so, given these connections...

### 2. find islands, i.e., cluster of mutual connections

this is done recursively, by calling `findIslands` with `(connections)`
and `(islands)`. in the steps below, any __recur__ signifies going back
to step __1.__.

1. if `connections = []`, __return__ `islands` (how we break out of recursion)
2. take connection `[[a,b],[p,q]]` from `connections`, storing the rest
   of the connections in `knxs`
3. find index `isle` of island in `islands` that contains point `[p,q]`
   (`(5)`)
4. if there exists no island in `islands` (indicated by `isle < 0`),
   __recur__ with `(knxs)` and concatenation of island `[[p,q]]` to
   `islands`.
5. if there does exist an island containing `[p,q]`, construct new
   island from concatentation of `islands[isle]` and `[a,b]` and look
   for index of a connected island `kntdIsle` containing `[a,b]`
6. if there is no such `kntdIsle`, __recur__ with `(knxs)` and updated
   `islands`
7. if it does exist, integrate this island into `islands[isle]`, taking
   all points `[x,y] != [a,b]` in `islands[kntdIsle]` and removing
   `islands[kntdIsle]`, and __recur__ with `(knxs)` and updated `islands`.

### 3. take length of `islands`

and... that's it.

## sample pass through:

```javascript
/* map */

[ [ 0, 0, 1 ],
  [ 1, 1, 0 ],
  [ 1, 0, 0 ] ]

/* connections */

[ [ [ 0, 2 ], [ 0, 2 ] ],
  [ [ 1, 0 ], [ 1, 0 ] ],
  [ [ 1, 1 ], [ 1, 1 ] ],
  [ [ 1, 1 ], [ 1, 0 ] ],
  [ [ 2, 0 ], [ 2, 0 ] ],
  [ [ 2, 0 ], [ 1, 0 ] ] ]

  islands = []

[ a, b ] [ p, q ]
[ 0, 2 ] [ 0, 2 ] 'index of isle:' -1
  islands = [ [ [0,2] ] ]

[ a, b ] [ p, q ]
[ 1, 0 ] [ 1, 0 ] 'index of isle:' -1
  islands = [ [ [0,2] ], [ [1,0] ] ]

[ a, b ] [ p, q ]
[ 1, 1 ] [ 1, 1 ] 'index of isle:' -1
[ [ [0,2] ], [ [1,0] ], [ [1,1] ] ]

[ a, b ] [ p, q ]
[ 1, 1 ] [ 1, 0 ] 'index of isle:' 1
  islands = [ [ [0,2] ], [ [1,0], [1,1] ] ]

[ a, b ] [ p, q ]
[ 2, 0 ] [ 2, 0 ] 'index of isle:' -1
  islands = [ [ [0,2] ], [ [1,0], [1,1] ], [ [2,0] ] ]

[ a, b ] [ p, q ]
[ 2, 0 ] [ 1, 0 ] 'index of isle:' 1
  islands = [ [ [0,2] ], [ [1,0], [1,1], [2,0] ] ]
```
