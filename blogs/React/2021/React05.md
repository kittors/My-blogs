---
title: React学习篇章五
date: 2021-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React05

## 回顾

Hook React16.8 版本引入的新特性 为了能够让 rfc 函数组件使用到 state 和生命周期等。。。

state 引入 useState

```javascript
const [uname,setUname] = useState('皮卡丘')
```

以上语法，进行如下工作

- uname state 对应的 key
- setUname 修改 uname 的值 姓党与 rcc 中 this.setState({})
- 最后的是默认值 state 是初始值

修改 state

```html
<button onClick={()=>setUname('雷丘')}></button>
```

useEffect 组件生命周期

三段

第一段 组件挂载和更新时触发

第二段 组件销毁时触发

第三段 监控更新的数据 [uname]

数据更新时 DOM 渲染 先走第二段 再走第一段

监控数据的时候 拿旧数据 第二段拿 拿新数据第一段

路由系统 react-router

版本 5 目前使用较多 6 版本出来时间不长 还没有得到大规模使用

```javascript
npm install react-router-dom@5
#不写版本号  就版本6  最新版
npm install react-router-dom
```

概念：

BrowserRouter 管理整个路由系统

Switch 路由切换组件显示对应的位置 @6 Routes

`Route`组件和路径的对应关系

- @5 path 路径 URL 路径 component 组件

  <Route path="/home" component={Home}>

- @6 path 路径 URL 路径 element 标签式调用

  <Route path="/home" element={<Home/>}>

Link 跳转切换 to 跳转到路径

编程方式跳转

- @5 rcc 写法 路由参数 `this.props.match.params`‘

  this.props.history.push 跳转方法

- @6 rfc 写法 路由参数 useParam 跳转方法 useNavigate

Redux

类 Vuex 组件全局状态管理的 组件状态共享

```javascript
// 导入  createStore
import { createStore } from "redux";
const inistate = {
  num: 1,
};
const reducer = (state = inistate, action) => {
  switch (action.type) {
    case "doAdd":
      return { num: state.num + 1 };
    // 默认返回
    default:
      return state;
  }
};

const store = createStore(reducer);
store.dispatch({ type: "doAdd" });
console.log(store.getState());

```

```javascript
// 导入  createStore
import { createStore } from "redux";
/**
 * 练习1 创建一个新的state  count 100
 * 操作方法  每次+10
 * 实现获取和修改
 *
 * 练习2 创建一个新的state skills 初始值是uni-app
 * 添加skills的技能  react react-route react-redux
 * 操作方法  添加数组元素
 * 实现读取和修改添加元素
 */
const inistate = {
  num: 1,
  count: 100,
  skills: ["uni-app"],
};
const reducer = (state = inistate, action) => {
  switch (action.type) {
    case "doAdd":
      return { ...state, num: state.num + 1 };
    // 默认返回
    case "doChange":
      return { ...state, count: state.count + 10 };
    case "addSkill":
      return { ...state, skills: [...state.skills, action.skill] };
    default:
      return state;
  }
};
const store = createStore(reducer);
// 监听器  当state发生改变时 会触发
// store.subscribe(() => {
//   console.log(store.getState());
// });

store.dispatch({ type: "doAdd" });
store.dispatch({ type: "doAdd" });
store.dispatch({ type: "doAdd" });
store.dispatch({ type: "doChange" });
store.dispatch({ type: "addSkill", skill: "react" });
store.dispatch({ type: "addSkill", skill: "react-router" });
store.dispatch({ type: "addSkill", skill: "react-redux" });

console.log(store.getState());

```

# Redux

使用组件 react-redux 共享组件状态

① 创建 store

`/src/store/index.js`

```javascript
import { createStore } from "redux";
const iniState = {
  num: 1,
};
const readucer = (state = iniState, action) => {
  switch (action.type) {
    case "doAdd":
      return { ...state, num: state.num + 1 };

    default:
      // 不做操作时 返回元数据
      return state;
  }
};
// 导出后  外部才可以使用
export const store = createStore(readucer);
```

② 恢复之前的备份 index.js

/src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// 引入store 不写index 默认也是找index
import { store } from "./store/index";
// Provider  把store注入到组件中
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    {/* 注入store到根组件 在整个应用中就可以使用到 store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

③ 创建测试组件实现数据共享

`/src/components/One.js`

```react
// rcredux  快捷生成rcc使用redux
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class One extends Component {
    render() {
        return (
            <div style={{border:"2px solid green"}}>
                One组件
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(One)

```

`/src/components/two.js`

```react
import React, { Component } from "react";
import { connect } from "react-redux";

export class Two extends Component {
  render() {
    return <div style={{ border: "2px solid blue" }}>Two组件</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Two);

```

`/src/App.js`

```react
import React, { Component } from "react";
import One from "./components/One";
import Two from "./components/Two";

export default class App extends Component {
  render() {
    return (
      <div>
        <One />
        <Two />
      </div>
    );
  }
}

```

# ReactNative 学习

在 RN 代码编写中，开发者服务器是热更新服务器 代码写完之后会立即同步到模拟器 。 `代码没写完，就同步过去了，会造成模拟器里 的App崩溃` 不要使用 vscode 里的自动保存

![image-20220112165231124](https://gitee.com/kittors/pictures/raw/master/img/202201121652252.png)

## 组件

RN 提供了一套组件进行开发使用，它是官方维护的，兼容性更好一些

官方组件文档：https://reactnative.cn/docs/components-and-apis

## 样式使用
