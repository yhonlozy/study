# 数据状态管理 vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

#### 什么是数据状态管理

首先说说什么叫“前端状态"。所有程序都有“状态”，状态表现在代码中的各种类型的变量，在程序运行的过程中发生改变的过程，而我们编写的程序就是在控制这些“状态”如何发生改变。

#### 为什么要进行数据状态管理

数据状态管理是近年随着在 React/Vue 等现代化的前端框架流行起来的，主要应用在单页应用 SPA(Single Page Application)中。在以前前端“刀耕火种”的年代还没有这种概念的。

前端技术在如火如荼地发展，前端工作也越来越复杂，现阶段的前端不在只是传统意义上的“切图仔”，更多地负责页面数据逻辑处理，原有的很多技术体系、解决方案已经不能很好的支撑这些越来越复杂的需求。而且，现在 Vue/React 等前端框架都是使用 MVVM 的设计模式，都是依靠数据驱动视图的更新。

比如 Vue 使用了 Virtual DOM 的 思想。将 DOM 放到内存中，当 data 发生变化的时候，生成新的 Virtual DOM，再将它和之前的 Virtual DOM 通过一个 diff 算法进行对比，将被改变的内容在浏览器中渲染，大大减少了对 DOM 的操作，提升了前端性能。

其次数据管理逻辑和页面渲染逻辑分离，使得代码更容易维护。操作数据的地方不会关心页面如何展示，展示页面的地方不会关心数据从哪里来的。

#### 数据状态管理的方法

- localStorage 和 sessionStorage : 适合小量简单数据的存储
- prop 和 \$emit: 适合父子组件传值
- provide 和 inject: 允许一个祖先组件向其所有子孙后代注入一个依赖
- vuex: 全局数据状态管理，适合数据复杂的大型应用

#### vuex 解决了什么问题

- 多个组件依赖于同一状态时，对于多层嵌套的组件的传参将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
- 来自不同组件的行为需要变更同一状态。以往采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

#### 五个核心属性

- state：存储状态（变量）
- getters：对数据获取之前的再次编译，可以理解为 state 的计算属性。我们在组件中使用 `$sotre.getters.fun()`
- mutations：修改状态，并且是同步的。在组件中使用`$store.commit('',params)`。这个和我们组件中的自定义事件类似。
- actions：异步操作。在组件中使用是`$store.dispath('')`
- modules：store 的子模块，为了开发大型项目，方便状态管理而使用的。这里我们就不解释了，用起来和上面的一样。

#### state

state 是存储状态，它是一个对象。

```js
const store = new Vuex.Store({
  state: {
    count: 10,
    price: 10,
  },
})
```

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性。

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
export default {
  computed: mapState({
    count: (state) => state.count,
    price: (state) => state.price,
  }),
}

// 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
computed: mapState(['count', 'price'])
```

#### getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数，这时候我们就用到 getter 属性。

```js
export default new Vuex.Store({
  state: {
    list: [1, 2, 3, 4]
  },
  getters: { //  这个主要是对状态的处理，相当于把状态处理的方法抽成公共部分来管理了
    filterArr(state) { // 一般化getter
      return state.list.filter((item, index, arr) => {
        return item % 2 === 0;
      })
    },
    getLength(state, getter) { // 方法里面传getter，调用modifyArr来计算长度
      return getter.filterArr.length;
    }
})
```

然后在组件中可以用计算属性 computed 来访问这些派生转态。

```js
computed: {
  list() {
    return this.$store.getters.filterArr
  },
}
```

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，当我们想在组件里面引入多个 getter 时，可以使用 mapGetters：

```js
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['filterArr', 'getLength']),
  },
}
```

#### mutation

**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。** Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type) 和 一个 回调函数 (handler)。
它会接受 state 作为第一个参数，提交载荷（Payload）作为第二个参数。

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state, n) {
      // 变更状态
      state.count += n
    },
  },
})

store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.count
  }
}

store.commit('increment', {
  count: 10
})
```

提交 mutation 的另一种方式是直接使用包含 type 属性的对象：

```js
store.commit({
  type: 'increment',
  count: 10,
})
```

**在组件中提交 Mutation**
你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 store）。

```js
import { mapMutations } from 'vuex'
export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
  },
}
```

#### Action

Action 类似于 mutation，不同在于：

- action 提交的是 mutation，而不是直接变更状态。mutation 可以直接变更状态。
- action 可以包含任意异步操作。mutation 只能是同步操作。
- 提交方式不同，action 是用`this.$store.dispatch('ACTION_NAME',data)`来提交。mutation 是用`this.$store.commit('SET_NUMBER',10)`来提交。
- 接收参数不同，mutation 第一个参数是 state，而 action 第一个参数是 context。

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    },
  },
  actions: {
    increment(context) {
      context.commit('increment')
    },
  },
})
```

**注意：vuex 的 mutation 中不能做异步操作**

vuex 中所有的状态更新的唯一方式都是提交 mutation，异步操作需要通过 action 来提交 mutation（dispatch）。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地使用 vuex

#### Module

Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  getters: { ... },
  mutations: { ... },
  actions: { ... },
}

const moduleB = {
  state: { ... },
  getters: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 实现一个简易版的 vuex

我们先来看一下 vuex 的使用方法

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
})
```

通过上面可以看到，`vuex` 是通过 `Vue.use()` 注入到 `Vue` 的。使用`Vue.use()` 的插件，如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 `install` 方法。`install` 方法调用时，会将 Vue 作为参数传入。

#### 实现 Store 类

首先来实现一个 Store 类，代码如下

```js
class Store {
  constructor(options) {
    this.state = new Vue({
      data: options.state,
    })

    this.mutations = options.mutations
    this.actions = options.actions

    options.getters && this.handleGetters(options.getters)
  }

  commit = (type, arg) => {
    this.mutations[type](this.state, arg)
  }

  dispatch(type, arg) {
    this.actions[type](
      {
        commit: this.commit,
        state: this.state,
      },
      arg
    )
  }
  // getters为参数 而this.getters是实例化的
  handleGetters(getters) {
    this.getters = {}
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        },
      })
    })
  }
}
```

#### 实现 install 方法

使用`Vue.use()` 的插件，必须提供 `install` 方法。并将 Vue 作为参数传入。

```js
let Vue
function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}
```

vuex 最终 export 了一个对象这个对象包括了一个 install 方法和一个类 Store, 注意对应我们的使用方法。

```js
export default { Store, install }
```

#### 使用简易版 vuex

1、新建 store.js

```js
import Vue from 'vue'
import Vuex from './store'

Vue.use(Vuex)

const state = {
  count: 0,
}
const getters = {
  getCount(state) {
    return state.count
  },
}
const mutations = {
  addCount(state, payload) {
    state.count += payload
  },
}
const actions = {
  asyncAdd(context, payload) {
    context.commit('addCount', payload)
  },
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})

export default store
```

2、main.js 引入

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
```

3、页面使用数据状态管理

```html
<template>
  <div>
    <div class="item">当前数量是{{count}} <button @click="add">增加</button></div>
    <button @click="asyncAdd">异步操作+10</button>
  </div>
</template>

<script>
  export default {
    computed: {
      count() {
        return this.$store.getters.getCount
      },
    },
    methods: {
      add() {
        this.$store.commit('add', 1)
      },
      asyncAdd() {
        setTimeout(() => {
          this.$store.dispatch('asyncAdd', 10)
        }, 1000)
      },
    },
  }
</script>
```

这样就能完成一个简易版的 vuex 了。
