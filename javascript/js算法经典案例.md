# 递归算法

递归算法，是将问题转化为规模缩小的同类问题的子问题，每一个子问题都用一个同样的算法去解决。一个递归算法就是**函数调用自身去解决它的子问题**。

**递归算法的特点**：

- 在函数过程中调用自身。
- 必须有一个明确的条件判断递归的结束，既递归出口。

**递归算法的步骤**

- 假设递归函数已经写好
- 寻找递推关系
- 将递推关系的结构转换为递归体
- 将临界条件加入到递归体中

### 阶乘

阶乘，定义为 n！，表示从 1 到 n 的整数的乘积。

方法 1： for 循环

```js
const factorial = (n) => {
  if (n <= 1) return 1
  let total = 1
  for (let i = n; i > 1; i--) {
    total = total * i
  }
  return total
}

console.log(factorial(5)) // 120
```

方法 2：递归

```js
const factorial = (n) => {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

console.log(factorial(5)) // 120
```

这种递归方法写起来很方便，但是也存在缺点，就是会保存很多个调用帧，比如上边的 factorial(5)，这个方法要执行 5 次，才能返回最终的计算表达式，这样每次都要保存这个方法，就容易造成栈溢出。为了解决这个问题，我们可以使用**尾递归**。

当递归调用是整个函数体中最后执行的语句且它的返回值不属于表达式的一部分时，这个递归调用就是尾递归。

```js
const factorial = (n, total = 1) => {
  if (n <= 1) return total
  return factorial(n - 1, total * n)
}

console.log(factorial(5)) // 120
```

这样，每一次返回的就是一个新的函数，不带上一个函数的参数，也就不需要储存上一个函数了。只需要一个帧即可。

### 斐波那契数列

斐波那契数列从第三项开始，每一项都等于前两项之和。0, 1, 1, 2, 3, 5, 8, 13...

方法 1: 非递归，时间复杂度为 O(n)

```js
function fib(n) {
  let a = 0
  let b = 1
  let c = a + b
  for (let i = 3; i < n; i++) {
    a = b
    b = c
    c = a + b
  }
  return c
}
console.log(fib(10)) // 34
```

方法 2：递归。时间复杂度为 O(2^n)

```js
function fib(n) {
  if (n === 1 || n === 2) return n - 1
  return fib(n - 1) + fib(n - 2)
}
console.log(fib(10)) // 34
```

方法 3：尾递归

```js
function fib(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2
  }
  return fib(n - 1, ac2, ac1 + ac2)
}
console.log(fib(10)) // 34
```

### 爬楼梯

问题描述：一共 10 级楼梯，每次可以走一步或两步，求一共多少种走法。

要想走到 N(N=10)级,可以分为 2 种情况。

- 从 n-2 级迈两步
- 从 n-1 级迈一步

那么对于 n-2 和 n-1 的情况也是各自分为两种，以此类推。那么走法的和就是 n-2 的走法和 n-1 的走法之和。

```js
function climbStairs(n) {
  if (n == 1) return 1
  if (n == 2) return 2
  return climbStairs(n - 1) + climbStairs(n - 2)
}
```

### 最大公约数

方法 1：短除法

```js
function gcd(a, b) {
  var result = 1
  for (var i = 1; i <= a && i <= b; i++) {
    if (a % i == 0 && b % i == 0) {
      result = i
    }
  }
  return result
}
```

方法 2：辗转相除法

```js
function gcd(m, n) {
  var a = Math.max(m, n)
  var b = Math.min(m, n)
  if (a % b == 0) return b
  return gcd(b, a % b)
}
```

### 二分法排序

二分法排序的原理如下

- 取数组一个随机索引值作为比较值
- 数组每一项与比较值做大小比较，比之小的放在左边数组，比之大的放在右边数组
- 依次递归直到执行的数组长度为 1
- concat() 方法连接两个或多个数组

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr
  var leftArr = []
  var rightArr = []
  var pivot = Math.random(arr.length / 2)
  var baseNum = arr.splice(pivot, 1)

  arr.forEach(function (num) {
    if (num < baseNum) {
      leftArr.push(num)
    } else {
      rightArr.push(num)
    }
  })
  return quickSort(leftArr).concat(baseNum, quickSort(rightArr))
}
console.log(quickSort([1, 10, 2, 5, 9, 12, 5, 2, 3]))
```
