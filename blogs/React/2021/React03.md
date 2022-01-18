---
title: React学习篇章三
date: 2021-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React03

## 语法学习

### 列表渲染

页面上处理的数据较为复杂一些，一般的格式为数组和数组对象

#### 数组

```html
// rcc 类组件的快捷代码提示
import React, { Component } from "react";

export default class App extends Component {
  // 使用state存储还是普通类属性存储？
  // 如果是state修改后然后DOM刷新 那就用state
  // 普通属性 只作为存储 不修改
  skills = ["uni-app", "react", "reactNative", "angular", "ionic"];
  // 把数组元素显示在单独的按钮上
  // 分析：1.数组元素需要一个一个遍历出来，外层包裹一个button标签
  // 2.把拼接好的标签元素 添加到一个数组中 在页面上渲染这个数组
  showBtn() {
    // 1.声明一个空数组
    let arr = [];
    // 2.遍历原数据  拼接标签 并添加到新数组
    // item代表的是数组的元素值  index代表的是数组的下标
    this.skills.forEach((item, index) => {
      // key 标签唯一值 涉及diff算法  渲染过程中 判断节点的更新 如果DOM节点重复就不会再重复渲染 提高了性能
      let tmp = (
        <button key={index} style={{ marginLeft: "10px" }}>
          {item}
        </button>
      );
      arr.push(tmp);
    });
    // 3.返回拼接好的数组
    return arr;
  }
  showList() {
    let arr = [];
    this.skills.forEach((item, index) => {
      let tmp = <li key={index}>{item}</li>;
      arr.push(tmp);
    });
    return arr;
  }
  // 练习:将skills数组内容显示到列表标签中
  // 分析:最外层是ul 每一个元素标签是li标签
  render() {
    return (
      <div>
        {/*默认的数组的元素会挨个渲染到页面上*/}
        {/* 调用button数组 */}
        {/* 事件触发的方法不加() */}
        {/* 普通方法调用 需要加() */}
        {this.showBtn()}
        {/* 调用显示列表 */}
        <ul>{this.showList()}</ul>
      </div>
    );
  }
}

```

### 数组对象

```html
import React, { Component } from "react";

export default class App extends Component {
  banners = [
    {
      title: "联想笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner1.png",
    },
    {
      title: "戴尔笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner2.png",
    },
    {
      title: "皮面笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner3.png",
    },
    {
      title: "网格笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner4.png",
    },
  ];
  showBanners() {
    let arr = [];
    this.banners.forEach((itme, index) => {
      let tmp = (
        <div key={index}>
          <img src={itme.url} style={{ width: "250px" }}></img>
          <div>{itme.title}</div>
        </div>
      );
      arr.push(tmp);
    });
    return arr;
  }
  render() {
    return (
      <div>
        {/* 调用显示图片和标题 */}
        {this.showBanners()}
      </div>
    );
  }
}

```

### map 方法遍历

map 语法 会处理数组的元素直接返回新数组

```html
// rcc 类组件的快捷代码提示
import React, { Component } from "react";

export default class App extends Component {
  skills = ["uni-app", "react", "reactNative", "angular", "ionic"];

  showBtn() {
    let arr = this.skills.map((item, index) => {
      return (
        <button style={{ marginLeft: "10px" }} key={index}>
          {item}
        </button>
      );
    });
    return arr;
  }

  render() {
    return (
      <div>
        <ul>{this.showBtn()}</ul>
      </div>
    );
  }
}

```

数组对象使用 map 语法

```html
import React, { Component } from "react";

export default class App extends Component {
  banners = [
    {
      title: "联想笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner1.png",
    },
    {
      title: "戴尔笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner2.png",
    },
    {
      title: "皮面笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner3.png",
    },
    {
      title: "网格笔记本",
      url: "http://www.codeboy.com:9999/img/index/banner4.png",
    },
  ];
  showBanners = () =>
    this.banners.map((item, index) => (
      <div key={index}>
        <img src={item.url} style={{ width: "250px" }}></img>
        <div>{item.title}</div>
      </div>
    ));
  showBanners1() {
    let arr = [];
    this.banners.forEach((item, index) => {
      let tmp = (
        <div key={index}>
          <img src={item.url} style={{ width: "250px" }}></img>
          <div>{item.title}</div>
        </div>
      );
      arr.push(tmp);
    });
    return arr;
  }
  render() {
    return (
      <div>
        {/* 调用显示图片和标题 */}
        {this.showBanners()}
      </div>
    );
  }
}

```

### 生命周期

`组件生命周期` 组件从开始到结束的整个过程。react 提供了组件再各个生命节点的一些操作方法，这些方法称为`钩子函数`

> `vue`的组件生命周期：created->mounted->updated->`destoryed`

**`componentDidmount`组件挂载时触发 初始化操作和发送网络请求 ##重点**

`shouldcomponentUpdate`组件将要更新 可以用来控制刷新 DOM 时机 重新绘制 DOM 必须要有一个返回值 false 代表不渲染 true 代表渲染

`componentDidUpdate`组件状态更新时触发 监控到状态的变化 如果状态发生改变需要执行特定业务操作 可以写在这里

`componentWillUnmount`组件将要销毁时触发 回收资源操作

### 网络请求

客户端请求服务端接口，需要通过 JS 代码发送请求。是浏览器 XHR 对象

不同的框架，对于`XHR对象`进行了`封装`

> JQuery $.get() $.post $.ajax()
>
> Vue axios
>
> wx wx.request
>
> uni-app uni.request
>
> .....

```html
// rcc // 网络请求 import React, { Component } from "react"; export default
class App extends Component { componentDidMount() { // 发送请求写在这里 const
url = "https://api.apiopen.top/getWangYiNews"; // get请求 //
res.json()处理数据为json对象格式 fetch(url) .then((res) => res.json())
.then((res) => { console.log(res); }); } render() { return
<div></div>
; } }
```

### 跨域代理

浏览器端因为`同源策略`的安全机制，存在跨域问题。一般开发过程中，使用 proxy 代理方式解决。

vue 框架：

`vue.config.js`

react 需要安装一个代理插件`http-proxy-middleware`

①**在项目包根路劲安装代理插件**

```shell
npm i http-proxy-middleware
```

安装之后在项目包的`package.json`中查看依赖，是否安装成功了

在 src 路径创建一个 setupProxy.js 文件存放代理的设置

```javascript
// /src/setupProxy.js路径和文件名称注意写对
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  // 插件使用
  //如果有多个域名需要配置跨域 使用多个app.use()
  app.use(
    // 配置代理相关信息
    createProxyMiddleware("/douyu", {
      target: "https://m.douyu.com",
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        "^/douyu": "",
      },
    })
  );
};
```

```html
// rcc // 网络请求 import React, { Component } from "react"; export default
class App extends Component { componentDidMount() { this.getData(); } getData()
{ // 配合代理 需要修改url地址 添加一个表示信息 const url =
"/douyu/api/room/list?type=yz"; fetch(url) .then((res) => res.json())
.then((res) => { console.log(res); }); } render() { return
<div></div>
; } }
```
