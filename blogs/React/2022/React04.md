---
title: React学习篇章四
date: 2022-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React04

## 回顾

foreach 遍历不修改源数据

map 处理数组的每个元素返回新数组

### 列表渲染

foreach 遍历不修改元数据

`map`处理数组的每个元素返回新数组

- 在 react 中会把数组的元素挨个渲染到页面

- 添加渲染标签的时候，返回一个数组

```react
skill = ['uni-app','react']
//foreach
showALink(){
	let arr = []
this.skills.foreach((item,index)=>{
arr.push(<a>{item}</a>)
})
return arr
}
//map  箭头函数 如果结构体写了{}  就必须写return
showAlink2 =()=>this.skill.map((item,index)=>(
    <a key ={index}>{item}</a>
))
```

组件生命周期

`componentDidmount` 组件挂载时 发送请求

`componentDiaupdate` 组件更新时触发 监控组件状态[state,props]的变化

`shouldComponentUpdate`必须布尔类型的返回值 确定是否渲染 DOM true 渲染 false 不渲染 性能优化

`componentWillUnmount`组件将要挂载 回收资源操作

## 发送请求 fetch 浏览器支持发送请求的新标准 对比 XHR

```react
fetch(url).then(res=>res.json()).then(res=>{
    console.log(res)
})
```

跨域 proxy node 的代理服务插件 http-proxy-middleware

target secure pathrewrite

子元素绑定 `ref属性绑定子元素组件 可以调用到子元素的方法或者属性`

# 语法学习

hook

hook 时 React16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

```react
// rfc 函数组件快捷方式
// react16.8版本后hook特性
// hook特性 函数组件使用useState
// useState 函数组件使用state
// 引入useState
import React, { useState } from "react";

export default function App() {
  // 2.useState state 和setState方法
  // 参数1 state的名称 参数2 修改state的方法 参数3 state的默认值
  // 相当于rcc中state = {num:1}
  const [num, setNum] = useState(1);
  const [num1, setNum1] = useState(100);
  return (
    <div>
      {num}
      <button onClick={() => setNum(num + 1)}>加1</button>
      <div>
        {num1}
        <button onClick={() => setNum1(num1 + 10)}>{num1}</button>
      </div>
    </div>
  );
}

```

# 生命周期 useEffect

```react
// 函数组件的hook特性，提供了函数组件生命周期
// useEffect
import React, { useEffect, useState } from "react";

export default function App() {
  // useState
  const [show, setShow] = useState(false);
  return (
    <div>
      父组件
      {/* 调用子组件 */}
      <button onClick={() => setShow(!show)}>显示/隐藏子组件</button>
      {show ? <Son /> : null}
    </div>
  );
}

// 子组件
function Son() {
  const [num, setNum] = useState(1);
  // 练习  监控count值的变化
  // 更新前和更新后的值的变化
  // 第一段 挂载或者更新
  // 第二段 将要卸载
  // 第三段 监控数据变化
  useEffect(() => {
    // componentDidMount和componentDidUpdate结合
    console.log("挂载和刷新触发了");
    // 更新后的数据
    console.log("num更新后:", num);
    return () => {
      // componentWillMount 将要卸载触发
      console.log("将要卸载触发了");
      console.log("num更新前的数据：", num);
    };
    // [input]监控组件状态的变化 没有监控的值 就写[]
  }, [num]);
  const [count, setCount] = useState(100);
  useEffect(() => {
    console.log("Count更新后的变化", count);
    return () => {
      console.log("count更新前的变化", count);
    };
  }, [count]);
  return (
    <div style={{ border: "2px solid green" }}>
      <div>这是子组件</div>
      <button onClick={() => setNum(num + 1)}>{num}</button>
      <button onClick={() => setCount(count + 10)}>{count}</button>
    </div>
  );
}

```

# 路由系统

单页面 spa 的也买你切换 需要使用到路由功能

多个组件的路由和切换 使用路由

React 中默认没有安装路由 需要手动安装

> 安装不指定版本时最新版本 6
>
> 目前大部分的项目还可能处于版本 5

```shell
npm i react-router-dom@5
```

npm 卸载命令

```shell
npm uninstall react-router-dom
```

安装之后 在 package.json 确认下软件名称及其版本

官方文档：https://reactrouter.com/

其他中文文档 语法可能过时 要注意甄别

以下为版本 5 的写法

##### ①**建立几个页面**

在`/src/pages` 目录下建立`A.js`，`B.js`，`C.js`

![image-20220111142626883](https://gitee.com/kittors/pictures/raw/master/img/202201111426975.png)

页面组件内部，添加一些内容，生成一个组件，如果没有内容，切换路由会报错,如果页面组件内容为空，切换路由会报错

`src\pages\A.js`

```raect
import React, { Component } from 'react'

export default class A extends Component {
    render() {
        return (
            <div>
                A组件
            </div>
        )
    }
}

```

##### ② 编写路由切换

`/src/App.js`

treesharking 树摇

基于 ES6 模块机制

```react
import React, { Component } from "react";
/**
 * 路由的组成
 * 1.组件和路由对应关系  routes routes=[{path:'/a',component:'组件的名称'}]
 * 2.router 管理整个路由
 * 3.router-link 切换标签  to 路劲参数
 * 4.router-view 切换的组件展示的位置
 */
// 1.导入
// import as 别名  起个小名  方便调用
import {
  BrowserRouter as Router, //管理整个路由系统
  Route, //路径和组件的对应关系
  Switch, //类似router-view
  Link, //类似router-link的作用 切换组件
} from "react-router-dom";
// 2.导入页面组件
import A from "./pages/A";
import B from "./pages/B";
import C from "./pages/C";
// 3.路由管理
// Router 管理整个路由

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* 切换标签 */}
        <div>
          <Link to="/a">A页面</Link>
          <Link to="/b">B页面</Link>
          <Link to="/c">C页面</Link>
        </div>
        <hr />
        {/* 对应关系和组件切换展示位置 */}
        <Switch>
          {/* Router 对应关系 path路径 component组件 */}
          <Route path="/a" component={A}></Route>
          <Route path="/b" component={B}></Route>
          <Route path="/c" component={C}></Route>
        </Switch>
      </Router>
    );
  }
}

```

## 路由练习

三分钟 15：00

制作 3 个页面 名称为 HomePage，NewsPage.js,ContactPage.js

首页，新闻页，联系我们

路由切换练习 以及路由传参

`src/App.js`

```react
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/HomePage">HomePage页面</Link>
          <br />
          {/* 传参 步骤二 */}
          <Link to="/NewsPage/100/标题">NewsPage页面</Link>
          <br />
          <Link to="/ContactPage">ContactPage页面</Link>
        </div>
        <hr />
        <Switch>
          {/* 默认访问的组件页面 */}
          {/* exact精确匹配 path路径 */}
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/HomePage" component={HomePage}></Route>
          {/* 定义传参方式 步骤一 */}
          <Route path="/NewsPage/:id/:title" component={NewsPage}></Route>
          <Route path="/ContactPage" component={ContactPage}></Route>
        </Switch>
      </Router>
    );
  }
}

```

接收路由传参以及编程式跳转

`src/pages/NewsPage.js`

```react
import React, { Component } from "react";

export default class NewsPage extends Component {
  // 在React中把组件外部传入的数据存放在props
  // 默认情况下路由参数也存放在props中
  render() {
    console.log(this.props);
    // es6解构语法
    const { id, title } = this.props.match.params;
    // 获取编程式跳转路由的方法
    const { push } = this.props.history;
    return (
      <div>
        NewsPage页面
        <div>id:{id}</div>
        <div>title:{title}</div>
        {/* 编程式跳转 通过事件触发的方法 */}
        <button onClick={() => push("/HomePage")}>回到首页</button>
        <button onClick={() => push("/ContactPage")}>去联系我们</button>
      </div>
    );
  }
}

```

尝试 6 版本的写法，需要卸载 5 版本

6 版本中 编程跳转和接收路由参数 只能使用 rfc

```shell
npm install react-router-dom
```

```shell
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/HomePage">HomePage页面</Link>
          <br />
          {/* 传参 步骤二 */}
          <Link to="/NewsPage/100/标题">NewsPage页面</Link>
          <br />
          <Link to="/ContactPage">ContactPage页面</Link>
        </div>
        <hr />
        <Routes>
          {/* 默认访问的组件页面 */}
          {/* exact精确匹配 path路径 */}
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/HomePage" element={<HomePage />}></Route>
          {/* 定义传参方式 步骤一 */}
          <Route path="/NewsPage/:id/:title" element={<NewsPage />}></Route>
          <Route path="/ContactPage" element={<ContactPage />}></Route>
        </Routes>
      </Router>
    );
  }
}

```

```react
import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
// hook rfc 的特征
// 路由参数的解构  useParams()
// 编程式跳转  useNavigate()

export default function NewsPage() {
    const params =useParams();
    // es6 解构语法获取id和title
    const{id,title} = params
    // 获取跳转方式
    const navigate = useNavigate()
    return (
        <div>
            新闻页
            <div>id:{id}</div>
            <div>title:{title}</div>
            {/* 编程方式跳转 通过事件触发方法*/}
            <button onClick={()=>navigate('/HomePage')}>回到首页</button>
            <button onClick={()=>navigate('/ContactPage')}>联系我们</button>
        </div>
    )
}

```

# Redux

安装 redux

```shell
npm i react-redux
```

> Redux 是 Flux 的一种实现 ，Flux 是一种思想 杜宇所有组件状态进行统一管理，保存到同一个地方，修改入口也统一。`全局状态管理`管理组件的状态
>
> Vuex 和 Redux 就是 Flux 思想的具体实现

> 备份之前的 index.js 之后还要用 index.js,index.js 是默认的入口文件 现在用来写测试代码

`src/index.js`

```javascript
/**
 * Vuex:vue的全局状态管理工具  5个核心概念
 * State 存储共享变量的
 * Getters 计算属性
 * Mutaions 修改方法  只能通过它定义的方法进行修改
 * Actions 异步操作
 * Modules 拆分模块
 *
 * 5个概念组成一个store /src/store/index.js
 * 存 修改
 * this.$store.commit('方法名称',要修改的参数)
 *
 * 读
 * 组件值读取  this.$store.state.XXXXX
 * 语法糖  ...mapState  写在计算属性中
 *
 * Vuex对用Redux
 * Vuex                         Redux
 * state                        state   初始化值
 * mutations                    reducer 定义修改方法
 * this.$store.commit()         this.store.dispatch() 修改
 * this.$store.state.xxx        this.store.getState(xxx) 读取
 */
// 导入createStore 从redux
import { createStore } from "redux";
// 1.状态初始化
const iniState = {
  num: 1,
};
// 2.定义修改方法
// 第一个参数 初始值
// 第二个参数 action形参  操作方法的名称 传对象格式 type属性存储操作方法名称
// 参数格式：action={type:'doAdd'}
const reducer = (state = iniState, action) => {
  switch (action.type) {
    case "doAdd":
      // ...state 展开默认state
      // 修改对应state后面的值,其他的值不修改返回
      return { ...state, num: state.num + 1 };
    default:
      break;
  }
};
// 3.创建store管理reducer
const store = createStore(reducer);
// 4.操作store
// 读取
// console.log(store.getState());
// 修改
store.dispatch({ type: "doAdd" });
store.dispatch({ type: "doAdd" });
store.dispatch({ type: "doAdd" });
console.log(store.getState());

// 作业: 存储一个 count的值  定义方法每次+10  实现修改和读取的操作
```
