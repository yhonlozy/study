## MutationObserver

MutationObserver 是一个可以监听 DOM 结构变化的接口。当 DOM 对象树发生任何变动时，MutationObserver 会得到通知。

#### API

MutationObserver 是一个构造器，接受一个 callback 参数，用来处理节点变化的回调函数，返回两个参数：

- mutations：节点变化记录列表`（sequence<MutationRecord>）`
- observer：构造 MutationObserver 对象。

MutationObserver 对象有三个方法，分别如下：

- observe：设置观察目标，接受两个参数，target：观察目标，options：通过对象成员来设置观察选项
- disconnect：阻止观察者观察任何改变
- takeRecords：清空记录队列并返回里面的内容

```js
//选择一个需要观察的节点
var targetNode = document.getElementById('root')

// 设置observer的配置选项
var config = { attributes: true, childList: true, subtree: true }

// 当节点发生变化时的需要执行的函数
var callback = function (mutationsList, observer) {
  for (var mutation of mutationsList) {
    if (mutation.type == 'childList') {
      console.log('A child node has been added or removed.')
    } else if (mutation.type == 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.')
    }
  }
}

// 创建一个observer示例与回调函数相关联
var observer = new MutationObserver(callback)

//使用配置文件对目标节点进行观测
observer.observe(targetNode, config)

// 停止观测
observer.disconnect()
```

observe 方法中 options 参数有已下几个选项：

- childList：设置 true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
- attributes：设置 true，表示观察目标属性的改变
- characterData：设置 true，表示观察目标数据的改变
- subtree：设置为 true，目标以及目标的后代改变都会观察
- attributeOldValue：如果属性为 true 或者省略，则相当于设置为 true，表示需要记录改变前的目标属性值，设置了 attributeOldValue 可以省略 attributes 设置
- characterDataOldValue：如果 characterData 为 true 或省略，则相当于设置为 true,表示需要记录改变之前的目标数据，设置了 characterDataOldValue 可以省略 characterData 设置
- attributeFilter：如果不是所有的属性改变都需要被观察，并且 attributes 设置为 true 或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表

#### 特点

MutationObserver 有以下特点：

- 它等待所有脚本任务完成后才会运行，即采用异步方式
- 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条地个别处理 DOM 变动。
- 它即可以观察发生在 DOM 节点的所有变动，也可以观察某一类变动

当 DOM 发生变动会触发 MutationObserver 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说 DOM 发生变动立刻会触发相应的事件；MutationObserver 则是异步触发，DOM 发生变动以后，并不会马上触发，而是要等到当前所有 DOM 操作都结束后才触发。

举例来说，如果在文档中连续插入 1000 个段落（p 元素），会连续触发 1000 个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 MutationObserver 完全不同，只在 1000 个段落都插入结束后才会触发，而且只触发一次，这样较少了 DOM 的频繁变动，大大有利于性能。

## IntersectionObserver

网页开发时，常常需要了解某个元素是否进入了"视口"（viewport），即用户能不能看到它。

传统的实现方法是，监听到 scroll 事件后，调用目标元素的 getBoundingClientRect()方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 scroll 事件密集发生，计算量很大，容易造成性能问题。

目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

#### API

IntersectionObserver 是浏览器原生提供的构造函数，接受两个参数：callback 是可见性变化时的回调函数，option 是配置对象（该参数可选）。

```js
var io = new IntersectionObserver(callback, option)

// 开始观察
io.observe(document.getElementById('example'))

// 停止观察
io.unobserve(element)

// 关闭观察器
io.disconnect()
```

如果要观察多个节点，就要多次调用这个方法。

```js
io.observe(elementA)
io.observe(elementB)
```

目标元素的可见性变化时，就会调用观察器的回调函数 callback。callback 一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。

```js
var io = new IntersectionObserver((entries) => {
  console.log(entries)
})
```

callback 函数的参数（entries）是一个数组，每个成员都是一个 IntersectionObserverEntry 对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，entries 数组就会有两个成员。

- time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
- target：被观察的目标元素，是一个 DOM 节点对象
- isIntersecting: 目标是否可见
- rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null
- boundingClientRect：目标元素的矩形区域的信息
- intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
- intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0

举个例子

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      #div1 {
        position: sticky;
        top: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: black;
        color: #ffffff;
        font-size: 18px;
      }
    </style>
  </head>

  <body>
    <div id="div1">首页</div>
    <div style="height: 1000px;"></div>
    <div id="div2" style="height: 100px; background: red;"></div>
    <script>
      var div2 = document.getElementById('div2')
      let observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (element, index) {
            console.log(element)
            if (element.isIntersecting) {
              div1.innerText = '我出来了'
            } else {
              div1.innerText = '首页'
            }
          })
        },
        {
          root: null,
          threshold: [0, 1]
        }
      )

      observer.observe(div2)
    </script>
  </body>
</html>
```

相比于 getBoundingClientRect，它的优点是不会引起重绘回流。兼容性如下

<img src="../img/IntersectionObserver.png">

#### 图片懒加载

图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的。这样可以节省带宽，提高网页性能。传统的突破懒加载是通过监听 scroll 事件实现的，但是 scroll 事件会在很短的时间内触发很多次，严重影响页面性能。为提高页面性能，我们可以使用 IntersectionObserver 来实现图片懒加载。

```js
const imgs = document.querySelectorAll('img[data-src]')
const config = {
  rootMargin: '0px',
  threshold: 0
}
let observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target
      let src = img.dataset.src
      if (src) {
        img.src = src
        img.removeAttribute('data-src')
      }
      // 解除观察
      self.unobserve(entry.target)
    }
  })
}, config)

imgs.forEach((image) => {
  observer.observe(image)
})
```

#### 无限滚动

无限滚动（infinite scroll）的实现也很简单。

```js
var intersectionObserver = new IntersectionObserver(function (entries) {
  // 如果不可见，就返回
  if (entries[0].intersectionRatio <= 0) return
  loadItems(10)
  console.log('Loaded new items')
})

// 开始观察
intersectionObserver.observe(document.querySelector('.scrollerFooter'))
```

## getComputedStyle()

DOM2 Style 在 `document.defaultView` 上增加了 getComputedStyle()方法，该方法返回一个 `CSSStyleDeclaration`
对象（与 style 属性的类型一样），包含元素的计算样式。

#### API

```js
document.defaultView.getComputedStyle(element[,pseudo-element])
// or
window.getComputedStyle(element[,pseudo-element])
```

这个方法接收两个参数：要取得计算样式的元素和伪元素字符串（如":after"）。如果不需要查询伪元素，则第二个参数可以传 null。

```html
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      #myDiv {
        background-color: blue;
        width: 100px;
        height: 200px;
      }
    </style>
  </head>
  <body>
    <div id="myDiv" style="background-color: red; border: 1px solid black"></div>
  </body>
  <script>
    function getStyleByAttr(obj, name) {
      return window.getComputedStyle ? window.getComputedStyle(obj, null)[name] : obj.currentStyle[name]
    }
    let node = document.getElementById('myDiv')
    console.log(getStyleByAttr(node, 'backgroundColor'))
    console.log(getStyleByAttr(node, 'width'))
    console.log(getStyleByAttr(node, 'height'))
    console.log(getStyleByAttr(node, 'border'))
  </script>
</html>
```

#### 和 style 的异同
getComputedStyle 和 element.style 的相同点就是二者返回的都是 CSSStyleDeclaration 对象。而不同点就是：

* element.style 读取的只是元素的内联样式，即写在元素的 style 属性上的样式；而 getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式。
* element.style 既支持读也支持写，我们通过 element.style 即可改写元素的样式。而 getComputedStyle 仅支持读并不支持写入。我们可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式

## getBoundingClientRect

getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。

#### API

```js
let DOMRect = object.getBoundingClientRect()
```

它的返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合，就是该元素的 CSS 边框大小。返回的结果是包含完整元素的最小矩形，并且拥有 left, top, right, bottom, x, y, width, 和 height 这几个以像素为单位的只读属性用于描述整个边框。除了 width 和 height 以外的属性是相对于视图窗口的左上角来计算的。

<img src="../img/getBoundingClientRect.png">

#### 应用场景

1、获取 dom 元素相对于网页左上角定位的距离

以前的写法是通过 offsetParent 找到元素到定位父级元素，直至递归到顶级元素 body 或 html。

```js
// 获取dom元素相对于网页左上角定位的距离
function offset(el) {
  var top = 0
  var left = 0
  do {
    top += el.offsetTop
    left += el.offsetLeft
  } while ((el = el.offsetParent)) // 存在兼容性问题，需要兼容
  return {
    top: top,
    left: left
  }
}

var odiv = document.getElementsByClassName('markdown-body')
offset(a[0]) // {top: 271, left: 136}
```

现在根据 getBoundingClientRect 这个 api，可以写成这样：

```js
var positionX = this.getBoundingClientRect().left + document.documentElement.scrollLeft
var positionY = this.getBoundingClientRect().top + document.documentElement.scrollTop
```

2、判断元素是否在可视区域内

```js
function isElView(el) {
  var top = el.getBoundingClientRect().top // 元素顶端到可见区域顶端的距离
  var bottom = el.getBoundingClientRect().bottom // 元素底部端到可见区域顶端的距离
  var se = document.documentElement.clientHeight // 浏览器可见区域高度。
  if (top < se && bottom > 0) {
    return true
  } else if (top >= se || bottom <= 0) {
    // 不可见
  }
  return false
}
```

## requestAnimationFrame

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。

#### API
该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

```js
window.requestAnimationFrame(callback)
```

兼容性处理

```js
window._requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()
```

结束动画

```js
var globalID
function animate() {
  // done(); 一直运行
  globalID = requestAnimationFrame(animate) // Do something animate
}
globalID = requestAnimationFrame(animate) //开始
cancelAnimationFrame(globalID) //结束
```

与 setTimeout 相比，requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是 60Hz,那么回调函数就每 16.7ms 被执行一次，如果刷新率是 75Hz，那么这个时间间隔就变成了 1000/75=13.3ms，换句话说就是，requestAnimationFrame 的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。这个 API 的调用很简单，如下所示：

```js
var progress = 0
//回调函数
function render() {
  progress += 1 //修改图像的位置
  if (progress < 100) {
    //在动画没有结束前，递归渲染
    window.requestAnimationFrame(render)
  }
}
//第一帧渲染
window.requestAnimationFrame(render)
```

#### 优点：

- CPU 节能：使用 setTimeout 实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 requestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的 requestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。

- 函数节流：在高频率事件(resize,scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，使用 requestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。

####  应用场景
1、监听 scroll 函数  

页面滚动事件（scroll）的监听函数，就很适合用这个 api，推迟到下一次重新渲染。

```js
$(window).on('scroll', function () {
  window.requestAnimationFrame(scrollHandler)
})
```

平滑滚动到页面顶部

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

scrollToTop()
```

2、大量数据渲染  

比如对十万条数据进行渲染，主要由以下几种方法：

（1）使用定时器

```js
//需要插入的容器
let ul = document.getElementById('container')
// 插入十万条数据
let total = 100000
// 一次插入 20 条
let once = 20
//总页数
let page = total / once
//每条记录的索引
let index = 0
//循环加载数据
function loop(curTotal, curIndex) {
  if (curTotal <= 0) {
    return false
  }
  //每页多少条
  let pageCount = Math.min(curTotal, once)
  setTimeout(() => {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement('li')
      li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
      ul.appendChild(li)
    }
    loop(curTotal - pageCount, curIndex + pageCount)
  }, 0)
}
loop(total, index)
```

（2）使用 requestAnimationFrame

```js
//需要插入的容器
let ul = document.getElementById('container')
// 插入十万条数据
let total = 100000
// 一次插入 20 条
let once = 20
//总页数
let page = total / once
//每条记录的索引
let index = 0
//循环加载数据
function loop(curTotal, curIndex) {
  if (curTotal <= 0) {
    return false
  }
  //每页多少条
  let pageCount = Math.min(curTotal, once)
  window.requestAnimationFrame(function () {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement('li')
      li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
      ul.appendChild(li)
    }
    loop(curTotal - pageCount, curIndex + pageCount)
  })
}
loop(total, index)
```

#### 监控卡顿方法

每秒中计算一次网页的 FPS，获得一列数据，然后分析。通俗地解释就是，通过 requestAnimationFrame API 来定时执行一些 JS 代码，如果浏览器卡顿，无法很好地保证渲染的频率，1s 中 frame 无法达到 60 帧，即可间接地反映浏览器的渲染帧率。

```js
var lastTime = performance.now()
var frame = 0
var lastFameTime = performance.now()
var loop = function (time) {
  var now = performance.now()
  var fs = now - lastFameTime
  lastFameTime = now
  var fps = Math.round(1000 / fs)
  frame++
  if (now > 1000 + lastTime) {
    var fps = Math.round((frame * 1000) / (now - lastTime))
    frame = 0
    lastTime = now
  }
  window.requestAnimationFrame(loop)
}
```

我们可以定义一些边界值，比如连续出现 3 个低于 20 的 FPS 即可认为网页存在卡顿。
