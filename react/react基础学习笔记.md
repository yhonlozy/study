### React 的特点

1. 使用 JSX 语法 创建组件，实现组件化开发，为函数式的 UI 编程方式打开了大门
2. 性能高的让人称赞：通过 diff 算法 和 虚拟 DOM 实现视图的高效更新

**为什么要用 React**

1. 使用组件化开发方式，符合现代 Web 开发的趋势
2. 技术成熟，社区完善，配件齐全，适用于大型 Web 项目（生态系统健全）
3. 由 Facebook 专门的团队维护，技术支持可靠
4. ReactNative - Learn once, write anywhere: Build mobile apps with React
5. 使用方式简单，性能非常高，支持服务端渲染
6. React 非常火，从技术角度，可以满足好奇心，提高技术水平；从职业角度，有利于求职和晋升，有利于参与潜力大的项目

### 创建组件的两种方式

1. 通过 JS 函数 创建（无状态组件）
2. 通过 class 创建（有状态组件）

#### JS 函数创建

1. 函数名称必须为大写字母开头，React 通过这个特点来判断是不是一个组件
2. 函数必须有返回值，返回值可以是：JSX 对象或 null
3. 返回的 JSX，必须有一个根元素
4. 组件的返回值使用()包裹，避免换行问题

```js
function LearningList(props) {
  return (
    <div className="list">
      <h1>LearningList for {props.name}</h1>
      <ul>
        <li>Vue</li>
        <li>React</li>
        <li>Angular</li>
      </ul>
    </div>
  )
}

ReactDOM.render(<Welcome name="lzg" />, document.getElementById('app'))
```

#### class 创建

在 es6 中 class 仅仅是一个语法糖，不是真正的类，本质上还是构造函数+原型 实现继承

```js
class LearningList extends React.Component {
  constructor(props) {
    super(props)
  }
  // class创建的组件中 必须有render方法 且显示return一个react对象或者null
  render() {
    return (
      <div className="list">
        <h1>LearningList for {props.name}</h1>
        <ul>
          <li>Vue</li>
          <li>React</li>
          <li>Angular</li>
        </ul>
      </div>
    )
  }
}
```

### jsx 语法

jsx 语法是一种 JavaScript 语法扩展，在 React 中可以方便地用来描述 UI。比如下面就是一段 jsx 语法

```js
const element = <h1>Hello, world!</h1>
```

上面的代码实质上等价于：

```js
var element = React.createElement('h1', null, 'Hello, world!')
```

#### jsx 的书写规范

- jsx 的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个 div（或者使用 Fragment）
- jsx 中的标签可以是单标签，也可以是双标签；如果是单标签，必须以/>结尾
- jsx 的外层包裹一个小括号()，这样可以方便阅读，并且 jsx 可以进行换行书写
- 在{}内部，可以写任何符合 JS 规范的代码；如果要写注释，注释必须放到 {} 内部

#### jsx 中嵌入表达式

在 jsx 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式，它可以是

- 运算表达式
- 三元运算符
- 执行一个函数

```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: 'kobe',
      lastName: 'bryant',
      age: 20,
    }
  }

  sayHello(name) {
    return 'Hello ' + name
  }

  render() {
    return (
      <div>
        <h2>{this.state.firstName + ' ' + this.state.lastName}</h2>
        <h2>{this.state.age >= 18 ? '成年人' : '未成年人'}</h2>
        <h2>{this.sayHello('lzg')}</h2>
      </div>
    )
  }
}
```

#### jsx 条件渲染

1、两个组件二选一的渲染

```js
class HelloMessage extends React.Component {
  render() {
    let userMessage
    if (this.props.loggedIn) {
      userMessage = (
       <h1>Welcome back!</h1>
      )
    } else {
      userMessage = (
        <h1>Please sign up.</h1>;
      )
    }

    return (
      <div>
         <h1>My Super React App</h1>       
         {userMessage}
      </div>
    )
  }
}
```

2、一个组件有无的渲染

```js
function MessageList(props) {
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages.</h2>}
    </div>
  )
}
```

#### jsx 列表循环

在jsx语法中，循环渲染是利用数组的遍历 map() 方法返回一个集合。  

遍历时必须有唯一索引 key 提高遍历的效率。一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串，万不得已可以使用 index。

```js
class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [
        { icon: require('../imag/home/ic_noti_block@2x.png'), title: '菜单1' },
        { icon: require('../imag/home/ic_noti_block@2x.png'), title: '菜单2' },
        { icon: require('../imag/home/ic_noti_block@2x.png'), title: '菜单3' },
        { icon: require('../imag/home/ic_noti_block@2x.png'), title: '菜单4' },
      ],
    }
  }
  renderList(value, index) {
    return (
      <li key={index}>
        <p>张三</p>
        <p>18岁</p>
      </li>
    )
  }

  render() {
    return (
      <div>
        <ul>
          {[1, 2, 3, 4, 5].map((value, index) => {
            return this.renderList(value, index)
          })}
        </ul>
        <ul>
          {this.state.menus.map((value, index) => {
            return (
              <li key={index}>
                <img src={value.icon} width="30" />
                <div>{value.title}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
```

### 接收数据 props

我们想要在组件之间进行传值，那么 props 属性就起到了这个作用。react 的每个组件都可以接受一个 props 参数，它是一个对象，包含了所有你对这个组件的配置。

**特点**

- React 把传递给组件的属性转化为一个对象并交给 props
- props 是只读的，无法给 props 添加或修改属性

```js
function Person(props) {
  return (
    <ul>
      <li>姓名: {props.name}</li>
      <li>年龄: {props.age}</li>
    </ul>
  )
}

ReactDOM.render(<Welcome name="lzg" age="18" />, document.getElementById('app'))
```

### 组件状态 state

如果需要定义组件的自定义属性，需要在组件的 constructor 构造函数里面去定义 state

**特点**

- 只有通过 class 创建的组件才具有 state
- state 是私有的，完全由组件来控制
- 不要在 state 中添加 render() 方法中不需要的数据，会影响渲染性能！
- 不要在 render() 方法中调用 setState() 方法来修改 state 的值

#### state 和 props 的区别

props 是组件对外的接口，state 是组件对内的接口。两者主要的区别： state 是可变的，是组件内部维护的一组返回 ui 组件的集合，而 props 是组件的只读属性，组件内不能直接修改 props，只能在组件的上层修改。

#### 创建 state

如果需要定义组件的自定义属性，在组件的 constructor 构造函数里面去定义 state

```js
class Mycom extends React.Component {
  constructor(props) {
    super(props)
    //给this.state赋值一个对象，对象的属性就是组件的自定义属性
    this.state = {
      name: 'lzg',
    }
  }
}
```

#### 修改 state

不能直接去修改 state 的值，否则数据无法驱动关联，需要使用 setState，setState 方法接收一个参数，参数为一个对象，类似于小程序原生的 setData。

```js
//  错误方式
this.state.name = 'lzg'

//  正确方式
this.setState({ name: 'lzg' })
```

使用 this.setState()的第二种形式总是更安全的，因为更新的 props 和状态是异步的。这里，我们根据这些 props 更新状态。

```js
// 错误方式
this.setState({
  total: this.state.total + this.props.count,
})

// 正确方式
this.setState((state, props) => {
  total: state.total + props.count
})
```

**另外，setState 还可以接收第二个参数，第二个参数为一个回调函数**

```js
this.setState(
  {
    name: 'lzg',
  },
  () => {
    console.log('state值修改成功，现在的name值为' + this.state.name)
  }
)
```

为啥不能直接修改 state，要 setState 一下呢？setState 做的事情不仅仅只是修改了 this.state 的值，另外最重要的是它会触发 React 的更新机制，会进行 diff ，然后将 patch 部分更新到真实 dom 里。

### 事件绑定

1、 在调用的时候使用 bind 绑定 this

```js
class Foo extends React.Component {
  handleClick() {
    this.setState({ name: 'lzg' })
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>Click me</button>
  }
}
```

2、在构造函数中使用 bind 绑定 this

```js
class Foo extends React.Component {
  constuctor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ name: 'lzg' })
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>
  }
}
```

3、使用箭头函数绑定 this

```js
class Foo extends React.Component {
  handleClick() {
    this.setState({ name: 'lzg' })
  }

  render() {
    return <button onClick={(e) => this.handleClick(e)}>Click me</button>
  }
}
```

4、public class fields 型

```js
class Foo extends React.Component {
  handleClick = () => {
    this.setState({ name: 'lzg' })
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>
  }
}
```

### react 样式

1. 直接写行内样式：

```js
export const Footer = () => {
  return <div style={{{color:'orange', fontSize:'12px'}}>All Rights Reserved 2019</div>
}
```

2. 抽离为对象形式

```js
import React from 'react'

const footerStyle = {
  backgroundColor: 'green',
  fontSize: '12px',
  color: 'orange',
  fontWeight: 'bold',
}

export const Footer = () => {
  return <div style={footerStyle}>All Rights Reserved 2019</div>
}
```

3. 使用样式表定义样式：

```js
import '../css/comment.css'

export const Footer = () => {
  return <div className="footer">All Rights Reserved 2019</div>
}
```

### 生命周期函数

组件的生命周期包含三个阶段：创建阶段（Mounting）、运行和交互阶段（Updating）、卸载阶段（Unmounting）

1. Mounting 依次调用以下函数

   - constructor():ES6 类的构造函数（为了初始化 state 或绑定 this）
   - getInitialState():ES5 中初始化 state。
   - getDefaultProps():ES5 中初始化 props。在 ES6 中使用 defaultProps()方法。
   - componentWillMount():在组件被挂载前调用。只执行一次。
   - render():渲染组件，必须实现该方法。
   - componentDidMount():在组件装载后调用。这时已经生成了真实的 DOM 节点。只执行一次。

2. Updating 依次调用以下函数

   - componentWillReceiveProps() 组件接受到新的 props 前触发这个方法
   - shouldComponentUpdate() 根据这个方法的返回值决定是否重新渲染组件，返回 true 重新渲染，否则不渲染
   - componentWillUpdate() 组件将要更新
   - render() 重新渲染组件，与 Mounting 阶段的 render 是同一个函数
   - componentDidUpdate() 组件已经被更新

3. Unmounting

   - componentWillUnmount() 卸载组件；清除定时器，清除 dom

### PropTypes

随着时间的推移，应用程序会变得越来越大，因此类型检查非常重要。PropTypes 为组件提供类型检查，并为其他开发人员提供很好的文档。如果 react 项目不使用 Typescript，建议为组件添加 PropTypes。

```js
// 旧的写法
class PropTypeOne extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.email}</div>
      </div>
    )
  }
}

PropTypeOne.propTypes = {
  name: PropTypes.string,
  email: function (props, propName, componentName) {
    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(props[propName])) {
      return new Error('组件' + componentName + '里的属性' + propName + '不符合邮箱的格式')
    }
  },
}

// 新的写法
class PropTypeTwo extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
      </div>
    )
  }
}
```

当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，propTypes 仅在开发模式下进行检查。

您可以通过配置特定的 defaultProps 属性来定义 props 的默认值：

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger',
}

// 渲染出 "Hello, Stranger"：
ReactDOM.render(<Greeting />, document.getElementById('app'))
```

### 受控与非受控组件

#### 受控组件

我们要经常使用表单来搜集用户输入，例如` <input>` `<select>` `<textearea> `等元素都要绑定一个 change 事件，当表单的状态发生变化，就会触发 onChange 事件，更新组件的 state。这种组件在 React 中被称为受控组件，在受控组件中，组件渲染出的状态与他的 value 或 checked 属性相对应，react 通过这种方式消除了组件的局部状态，使整个状态可控。react 官方同样推荐使用受控表单组件。

```js
import React, { Component } from 'react'
export default class MyInput extends Component {
  handleContentChange = (e) => {
    this.setState({
      content: e.target.value,
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleContentChange} />
      </div>
    )
  }
}
```

受控组件更新 state 的流程：

- 可以通过初始 state 中设置表单的默认值
- 每当表单的值发生变化时，调用 onChange 事件处理器
- 事件处理器通过事件对象 e 拿到改变后的状态，并更新组件的 state
- 一旦通过 setState 方法更新 state，就会触发视图的重新渲染，完成表单组件的更新

react 中数据是单项流动的，从示例中，我们看出来表单的数据来源于组件的 state，并通过 props 传入，这也称为**单向数据绑定**。然后我们又通过 onChange 事件处理器将新的数据写回到 state，完成了**双向数据绑定**。

#### 非受控组件

如果一个表单组件没有 value props（单选和复选按钮对应的是 checked props）时，就可以称为非受控组件.在非受控组件中，我们可以使用一个 ref 来从 DOM 获得表单值。而不是为每个状态更新编写一个事件处理程序。

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

### ref

React 支持一种非常特殊的属性 Ref ，你可以用来绑定到 render() 输出的任何组件上。

#### 字符串用法

通过 `this.refs['inputRef']`来访问

```html
<input ref="inputRef" />
```

#### ref 作为回调函数

```js
class AutoFocusTextInput extends Component {
  componentDidMount(){
    this.textInput.focus();
  }
  render(){
    return (
      <Input ref={(input) => { this.textInput = input }}>
    )
  }
}
```

父组件的 ref 回调函数可以使用子组件的 DOM。

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  )
}

class Parent extends React.Component {
  render() {
    return <CustomTextInput inputRef={(el) => (this.inputElement = el)} />
  }
}
```

#### React.createRef()

在 React 16.3 版本后，使用此方法来创建 ref。将其赋值给一个变量，通过 ref 挂载在 dom 节点或组件上，该 ref 的 current 属性
将能拿到 dom 节点或组件的实例

```js
class Child extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  componentDidMount() {
    console.log(this.myRef.current)
  }
  render() {
    return <input ref={this.myRef} />
  }
}
```

### react-router

react-router-dom 是应用程序中路由的库。 React 库中没有路由功能，需要单独安装 react-router-dom。

react-router-dom 提供两个路由器 BrowserRouter 和 HashRoauter。前者基于 url 的 pathname 段，后者基于 hash 段。

#### 基本使用：

```
npm install react-router-dom --save
```

```js
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

class MyRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Link to="/">router1</Link>
        &nbsp;&nbsp;
        <Link to="/router2">router2</Link>
        &nbsp;&nbsp;
        <Link to="/router3">router3</Link>
        &nbsp;&nbsp;
        <hr />
        <Redirect exact from="/" to="/router1" />
        <Route path="/router1" component={router1}></Route>
        <Route path="/router2" component={router2}></Route>
        <Route path="/router3" component={router3}></Route>
      </BrowserRouter>
    )
  }
}
```

#### 路由跳转

**1、用 Link 标签跳转**

```js
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

class MyRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Link to="/">router1</Link>
        &nbsp;&nbsp;
        <Link to="/router2">router2</Link>
        &nbsp;&nbsp;
        <Link to="/router3">router3</Link>
        &nbsp;&nbsp;
        <hr />
        <Redirect exact from="/" to="/router1" />
        <Route path="/router1" component={router1}></Route>
        <Route path="/router2" component={router2}></Route>
        <Route path="/router3" component={router3}></Route>
      </BrowserRouter>
    )
  }
}
```

**2、编程式导航**

- 路由组件可以直接从 this.props.history 上拿到 history
- 非路由组件无法直接拿到 history，需要配合 withRouter

```js
this.props.history.push(url)

this.props.history.go(-1)
```

#### 路由传参

1.params

```js
<Route path='/path/:name' component={Path}/>
<link to="/path/123">xxx</Link>

this.props.history.push({pathname:"/path/" + name});
// 读取参数用:this.props.match.params.name
```

2.query

```js
<Route path='/query' component={Query}/>
<Link to={{ pathname : '/query' , query : { name : 'sunny' }}}></Link>

this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
// 读取参数用:this.props.location.query.name
```

3.state

```js
<Route path='/sort ' component={Sort}/>
<Link to={{ pathname : '/sort ' , state : { name : 'sunny' }}}></Link>

this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
// 读取参数用: this.props.location.query.state
```

4.search

```js
<Route path='/web/search ' component={Search}/>
<link to="web/search?id=12121212">xxx</Link>

this.props.history.push({pathname:`/web/search?id ${row.id}`});
// 读取参数用: this.props.location.search
```

#### 路由守卫

Route 组件可以接收一个 Component 组件，当 path 匹配上的时候，这个 Route 组件就会被渲染出来。我们还可以在路径匹配之后做一点事情，这一点类似于 Vue 中的路由守卫。

用到的还是 Route 这个组件，只不过这次组件不通过 Component 去传递数据，通过 render 属性。

```js
import { Route } from 'react-router-dom'

function Custom() {
  return (
    <Route
      path="/index"
      Render={() => {
        //isLogin判断用户是否登录，如果登录了渲染首页，没有登录渲染登录
        if (isLogin) {
          return <Index></Index>
        } else {
          return <Login></Login>
        }
      }}
    />
  )
}
```

#### withRouter

高阶组件中的 withRouter, 作用是将一个组件包裹进 Route 里面, 然后 react-router 的三个对象 history, location, match 就会被放进这个组件的 props 属性中。

默认情况下必须是经过路由匹配渲染的组件才存在 `this.props`，才拥有路由参数，才能使用编程式导航的写法，执行 `this.props.history.push('/detail')` 跳转到对应路由的页面，然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用 withRouter 就可以给此组件传入路由参数，此时就可以使用 this.props。

```js
import React,{Component} from 'react'
import {Switch,Route,NavLink,Redirect,withRouter} from 'react-router-dom' //引入withRouter
import One from './One'
import NotFound from './NotFound'
class App extends Component{
  //此时才能获取this.props,包含（history, match, location）三个对象
  console.log(this.props);  //输出{match: {…}, location: {…}, history: {…}, 等}
  render(){
    return (<div className='app'>
      <NavLink to='/one/users'>用户列表</NavLink>
      <NavLink to='/one/companies'>公司列表</NavLink>
      <Switch>
         <Route path='/one/:type?' component={One} />
         <Redirect from='/' to='/one' exact />
         <Route component={NotFound} />
      </Switch>
    </div>)
  }
}
export default withRouter(App);  //这里要执行一下WithRouter
```
