---
title: React学习篇章一
date: 2021-12-28
tags:
 - React
 - 脚本化
categories:
 -  React
---


# React01

介绍

React 国内三大前端框架  vue React Angular

Angular 2009  google 引入工程概念  服务端的一些特性引入进来MVC依赖注入。。。 为了方便大型项目的开发

React 2013  虚拟DOM 不需要平凡操作真实DOM结构，一次性操作 性能更好一些

Vue 2014  借鉴了Angular 和React一些特性和写法 数据监听当数据变化时，DOM会渲染  

没有绝对的好，选择使用框架和公司团队技术栈有关系





React

用于构建用户界面的JavaScript库  渲染库  操作DOM的

https://react.docschina.org/

## 快速入门

React的编写方式：

- 脚本方式引入  script标签 初学时使用

  react.development.js react 库

  react-dom.development.js react dom操作库

- 脚手架 类vue-cli工程化  企业中使用

  create-react-app

  

  ## React封装方式

  ```react
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React入门</title>
  </head>
  
  <body>
    <!-- 根标签 -->
    <div id="root"></div>
    <!-- 引入React相关类库文件 -->
    <!-- 先引入React 注意顺序-->
    <script src="/react.development.js"></script>
    <script src="/react-dom.development.js"></script>
    <!-- React代码 -->
    <script>
      // 1.创建虚拟DOM对象
      // DOM结构 <div id = "mydiv" class = "cls">hello React!</div>
      // 参数结构（标签 属性 内容）
      const vNode = React.createElement(
        "div", {
          id: "mydiv",
          className: "cls"
        },
        "hello React!"
      )
      // 2.获取根节点挂载对象
      const root = document.getElementById("root")
      // 3.渲染页面
      // 参数（虚拟DOM对象，挂在对象）
      ReactDOM.render(vNode, root)
    </script>
  </body>
  
  </html>
  ```
  
  ## JSX语法
  
  在javascript代码中编写xml代码。使用xml语法来描述html的结构和内容信息。一般意义上，可以认为xml和html差别不大。
  
  只有一些细节上的不同。
  
  ```react
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>JSX语法</title>
  </head>
  
  <body>
      <!-- 根标签 -->
      <div id="root"></div>
      <!-- 引入babel文件 用来翻译jsx代码 -->
      <script src="/babel.min.js"></script>
      <!-- 引入React相关类库文件 -->
      <!-- 先引入React 注意顺序-->
      <script src="/react.development.js"></script>
      <script src="/react-dom.development.js"></script>
      <!-- script标签中 添加属性 告知babel进行处理-->
      <script type="text/babel">
          // JSX语法描述虚拟DOM结构
          const vNode = (
              <div id="mydiv" className="cls">
                  Hello React!
              </div>
          );
          ReactDOM.render(vNode,document.getElementById("root"))
      </script>
  </body>
  
  </html>
  ```
  
  # 组件
  
  组件：开发页面里 的组成零件，页面的组成模块
  
  封装组件的目的时为了复用。
  
  React组件封装方式
  
  - 函数组件 rfc react function component
  - 类组件 rcc react class component

```react
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>函数组件传参</title>
</head>

<body>
    <div id="root"></div>
    <script src="/babel.min.js"></script>
    <script src="/react.development.js"></script>
    <script src="/react-dom.development.js"></script>
    <script type="text/babel">
        // props通常会传递一个对象 可扩展性更强
        function Hello(props){
            // rerturn <h1> hello 组件！</h1>
            return <h1> hello {props.name} {props.age}</h1>
        }
        // 函数调用参数
        let vNode = Hello({name:'react',age:1})
        // 语法糖调用方式 传参
        vNode = <Hello name="你好"/>
        vNode = (
            <div>
                {Hello({name:'html'})}
                {Hello({name:'css'})}
                {Hello({name:'javascript'})}
                <Hello name="你好"/>
                <Hello name="晚上好" age="1"/>
            </div>
        )
        ReactDOM.render(vNode,document.getElementById("root"))
    </script>
</body>
```

