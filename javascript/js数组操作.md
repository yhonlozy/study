# js 数组操作

## 随机排序

方法一、生成随机数

遍历数组，每次循环都随机一个在数组长度范围内的数，并交换本次循环的位置和随机数位置上的元素

```js
function randomSort1(arr) {
  for (let i = 0, l = arr.length; i < l; i++) {
    let rc = parseInt(Math.random() * l)
    // 让当前循环的数组元素和随机出来的数组元素交换位置
    const empty = arr[i]
    arr[i] = arr[rc]
    arr[rc] = empty
  }
  return arr
}

var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 下面两次的结果肯定是不一样的；
console.log(randomSort1(arr1))
console.log(randomSort1(arr1))
```

方法二、生成新数组

1. 申明一个新的空数组,利用 while 循环，如果数组长度大于 0，就继续循环；
2. 每次循环都随机一个在数组长度范围内的数，将随机数位置上的元素 push 到新数组里，
3. 并利用 splice（对 splice 不太理解的同学可以看这里）截取出随机数位置上的元素，同时也修改了原始数组的长度；

```js
function randomSort2(arr) {
  var mixedArr = []
  while (arr.length > 0) {
    let rc = parseInt(Math.random() * arr.length)
    mixedArr.push(arr[rc])
    arr.splice(rc, 1)
  }
  return mixedArr
}
// 例子
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(randomSort2(arr1))
```

方法三、 arr.sort

1. 如果 compareFunction(a, b)的返回值 小于 0 ，那么 a 会被排列到 b 之前；
2. 如果 compareFunction(a, b)的返回值 等于 0 ，那么 a 和 b 的相对位置不变；
3. 如果 compareFunction(a, b)的返回值 大于 0 ，那么 b 会被排列到 a 之前；

```js
function randomSort3(arr) {
  arr.sort(function (a, b) {
    return Math.random() - 0.5
  })
  return arr
}
// 例子
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(randomSort3(arr1))
```

## 数组对象排序

1. 单个属性排序

```js
function compare(property) {
  return function (a, b) {
    let value1 = a[property]
    let value2 = b[property]
    return value1 - value2
  }
}

let arr = [
  { name: 'zopp', age: 10 },
  { name: 'gpp', age: 18 },
  { name: 'yjj', age: 8 },
]

console.log(arr.sort(compare('age')))
```

2. 多个属性排序

```js
function by(name, minor) {
  return function(o, p) {
    let a, b
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name]
      b = p[name]
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
      return typeof a < typeof b ? -1 : 1
    } else {
      thro('error')
    }
  }
},
```
