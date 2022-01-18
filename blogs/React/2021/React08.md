---
title: React学习篇章八
date: 2021-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React08

## RN 学习

### 多列布局

```javascript
// rnc react native component
import React, { Component } from "react";
// 组件或者API使用时,需要提前导入
import { Text, View, FlatList, Dimensions, Image } from "react-native";
// 获取屏幕的宽高
const { height, width } = Dimensions.get("window");
// rpx换算为物理像素  使用方法  例如:30rpx  rpx(30)
const rpx = (x) => (width / 750) * x;
export default class App extends Component {
  // 实现一个加载网络请求获取数据,并显示到页面 需要经过以下步骤：
  // 发送请求  接收数据  存本地  做展示
  // 页面上数据 需要发生改变 一般存储在组件状态中 state
  state = { result: [] };
  // 挂在时触发
  componentDidMount() {
    // 发送请求
    const url = "https://api.apiopen.top/getWangYiNews";
    // 发送请求 JS代码  早期xmlHttpRequest
    // 新的webAPI 建议使用Fetch
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ result: data.result });
      });
  }
  render() {
    return (
      <FlatList
        data={this.state.result}
        keyExtractor={(item, index) => index}
        renderItem={this._renderItem}
        // 列数
        numColumns={2}
        // 每行的样式 多列布局使用
        columnWrapperStyle={{
          justifyContent: "space-evenly",
          marginTop: rpx(10),
        }}
      ></FlatList>
    );
  }
  _renderItem = ({ item }) => (
    // 计算每个元素的宽度 rpx
    // 每个块填充10 两个边 总共4个
    // 750-10*4  710/2
    // 355
    <View style={{ width: rpx(355) }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: rpx(200), borderRadius: rpx(10) }}
      ></Image>
      <Text style={{ fontSize: rpx(30), padding: rpx(10) }}>{item.title}</Text>
    </View>
  );
}
```

### 实现滚动效果

```javascript
// rnc
/***
 * 横向滚动展示 通过FlatList实现轮播效果
 *
 *
 */
import React, { Component } from "react";
import { Text, View, Dimensions, FlatList, Image } from "react-native";
// rpx计算
const rpx = (x) => (Dimensions.get("window").width / 750) * x;
export default class App extends Component {
  banners = [
    "http://www.codeboy.com:9999/img/index/banner1.png",
    "http://www.codeboy.com:9999/img/index/banner2.png",
    "http://www.codeboy.com:9999/img/index/banner3.png",
    "http://www.codeboy.com:9999/img/index/banner4.png",
  ];
  // 挂在时触发
  componentDidMount() {
    // 启动一个定时器 实现自动滚动
    setInterval(() => {
      // 下一张
      this.current++;
      // 判断 越界情况 重置为0
      if (this.current == this.banners.length) this.current = 0;
      // 调用FlatList的滚动到指定位置方法
      this.f1.scrollToIndex({ index: this.current });
    }, 2500);
  }
  render() {
    return (
      <FlatList
        data={this.banners}
        keyExtractor={(item, index) => index}
        renderItem={this._renderItem}
        // 横向排列
        horizontal
        // 按页滚动
        pagingEnabled
        // 监控滚动
        onScroll={this._onScroll}
        // ref绑定  需要调用FlatList提供到的方法
        // 当前组件类中 this.f1就代表FlatList组件对象
        ref={(el) => (this.f1 = el)}
      ></FlatList>
    );
  }
  // 默认滚动第一个 下标为0
  current = 0;
  _onScroll = (e) => {
    // RN的事件经过特殊处理,如果打印需要先执行persist
    // e.persist();
    // console.log(e.nativeEvent.contentOffset.x);
    // 滚动过程中 滚动的距离 偏移量
    const offset_x = e.nativeEvent.contentOffset.x;
    // 滚动的位置的宽度
    const w = e.nativeEvent.layoutMeasurement.width;
    // 滚动的偏移量/滚动位置的宽度  计算出滚动的是第几个 第几页
    // console.log(offset_x / w);
    // 后续滚动 是按页滚动的 取整
    this.current = Math.round(offset_x / w);
  };
  _renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{ width: rpx(750), height: rpx(300) }}
    ></Image>
  );
}
```

### ReactNative 路由

react 提供了 router 路由 roact-router-dom

ReactNative 为了能够在移动端有更好的使用体验，专门开发了针对 RN 的路由系统。

官方网址：https://reactnavigation.org/

**① 生成几个测试页面**

![image-20220118140623159](https://gitee.com/kittors/pictures/raw/master/img/202201181406242.png)

`在页面中写入基础结构和识别内容，一定要生成组件结构，否则路由切换报错`

```javascript
import React, { Component } from "react";
import { Text, View } from "react-native";

export default class APage extends Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 30 }}> A页面 </Text>
      </View>
    );
  }
}
```

`App.js`

```javascript
// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";

// 路由容器
import { NavigationContainer } from "@react-navigation/native";
// 栈式导航
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 1.引入页面组件
import APage from "./pages/APage";
import BPage from "./pages/BPage";
import CPage from "./pages/CPage";
import DPage from "./pages/DPage";
// 函数组件
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

// 创建一个栈式导航
const Stack = createNativeStackNavigator();

// 应用根组件
function App() {
  return (
    // 最外层包裹一个路由容器
    <NavigationContainer>
      {/* 栈式导航 */}
      <Stack.Navigator>
        {/* 组件和路由名称的匹配对应关系 */}
        {/* name 路由名称 */}
        {/* component 组件名称 */}
        {/* 默认加载第一个Stack.Screen */}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* options 可定制属性 */}
        {/* 参数说明文档:https://reactnavigation.org/docs/native-stack-navigator#options */}
        <Stack.Screen
          name="A"
          component={APage}
          options={{
            headerTitle: "首页",
            headerStyle: { backgroundColor: "orangered" },
            headerTitleStyle: { color: "white" },
          }}
        ></Stack.Screen>
        <Stack.Screen name="B" component={BPage}></Stack.Screen>
        <Stack.Screen name="C" component={CPage}></Stack.Screen>
        <Stack.Screen name="D" component={DPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

`pages\APage.js`

```javascript
import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

/**
 * 路由会向组件props注入两个属性
 * 1.navigation 包含操作路由的方法  跳转方法
 * 2.route  包含了路由的相关参数
 *
 */

export default class APage extends Component {
  render() {
    // 解构出跳转方法
    const { push } = this.props.navigation;
    // push('路由名称')
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={ss.btn}
          onPress={() => push("B")}
        >
          <Text style={{ fontSize: 30, color: "white" }}>跳转到B页面</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={ss.btn}
          onPress={() => push("C")}
        >
          <Text style={{ fontSize: 30, color: "white" }}>跳转到C页面</Text>
        </TouchableOpacity>
        {/* 参数传递  通过push方法的第二个参数 */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={ss.btn}
          onPress={() =>
            push("D", { name: "JavaScript", msg: "JavaScript是React的基础" })
          }
        >
          <Text style={{ fontSize: 30, color: "white" }}>跳转到D页面</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const ss = StyleSheet.create({
  btn: {
    backgroundColor: "#007acc",
    padding: 10,
    marginTop: 10,
  },
});
```

`pages\DPage.js`

```javascript
import React, { Component } from "react";
import { Text, View } from "react-native";

export default class DPage extends Component {
  // 组件挂在时
  componentDidMount() {
    // 获取路由参数
    // console.log(this.props);
    // const {name, msg} = this.props.route.params;
    // console.log('name:',name);
    // console.log('msg:',msg);
  }
  render() {
    const { name, msg } = this.props.route.params;
    return (
      <View>
        <Text style={{ fontSize: 30 }}> D页面 </Text>
        <Text style={{ fontSize: 30 }}>name:{name}</Text>
        <Text style={{ fontSize: 30 }}>msg:{msg}</Text>
      </View>
    );
  }
}
```

## 学子商城 App 开发

> 准备项目包并和模拟器关联，使用之前网盘共享的项目和 APK 即可。

登录页面 `LoginPage.js`

管理主界面 `MainPage.js`

商品列表页面 `ProductsPage.js`

商品详情页面 `DetailPage.js`

`从FTP获取图片资源存储到项目包/assets下`

### 路由模块

**① 创建页面**

创建文件，并在文件中通过`rnc代码提示生成结构代码`，写标识信息

![image-20220118140700695](https://gitee.com/kittors/pictures/raw/master/img/202201181407770.png)

**② 根组件配置路由**

```javascript
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// 导入页面
import Login from "./pages/LoginPage";
import Main from "./pages/MainPage";
import Products from "./pages/ProductsPage";
import Detail from "./pages/DetailPage";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* name 路由名称 componet 组件 options 配置项  titlte 头部导航栏的标题文字*/}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "管理员登录" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "管理主菜单" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Products"
          component={Products}
          options={{ title: "商品列表" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: "商品详情" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

### 登录页面

分析：

`登录功能`实现

① 点击按钮后，触发事件处理方法

② 处理方法 把用户名和密码 发送请求到服务端接口

③ 服务端检验用户名和密码是否正确，返回给客户端。

- 校验成功 跳转路由页面到主菜单页面
- 校验失败 提示用户名或者密码错误

> 对于登录功能，前端需要做：
>
> - 传递参数[用户名，密码] 发送给服务端
> - 对于服务端校验后[用户名和密码是否正确]的结果进行处理和提示

拿用户名唯一的，查看到这条数据 数据中包含密码字段的值，密码字段的值是经过加密的，需要拿用户输入的密码加密后，进行对比存储的加密字段。

`pages\LoginPage.js`

```javascript
import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
// rpx
const rpx = (x) => (Dimensions.get("window").width / 750) * x;
export default class LoginPage extends Component {
  // 初始化用户名uname 密码upwd
  state = { uname: "", upwd: "" };
  // 登录处理方法
  _doLogin = () => {
    // 获取用户名和密码
    const { uname, upwd } = this.state;
    // 登录地址
    const url = "http://www.codeboy.com:9999/data/user/login.php";
    // 参数拼接
    // 测试账号 uname=doudou  upwd=123456
    const body = `uname=${uname}&upwd=${upwd}`;
    // POST请求
    // fetch的参数
    // 第一个参数接口地址
    // 第二个参数
    // method 请求方法 方式  POST
    // headers 头信息
    // body  参数结构
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          // alert('登录成功')
          // 跳转到管理主菜单页面
          this.props.navigation.push("Main");
        } else {
          alert("用户名或者密码错误");
        }
      });
  };
  render() {
    // 解构state
    const { uname, upwd } = this.state;
    return (
      <View style={{ padding: rpx(80) }}>
        {/* 用户名 */}
        <TextInput
          style={ss.input}
          placeholder="请输入管理员用户名"
          value={uname}
          onChangeText={(uname) => this.setState({ uname })}
        ></TextInput>
        {/* 密码 */}
        <TextInput
          secureTextEntry
          style={ss.input}
          placeholder="请输入用户登录密码"
          value={upwd}
          onChangeText={(upwd) => this.setState({ upwd })}
        ></TextInput>
        {/* 登录按钮 */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: "#1390f7",
            paddingVertical: rpx(10),
            borderRadius: rpx(10),
            marginTop: rpx(50),
            alignItems: "center",
          }}
          // 绑定点击事件 触发登录方法
          onPress={this._doLogin}
        >
          <Text
            style={{
              fontSize: rpx(40),
              letterSpacing: rpx(20),
              color: "white",
            }}
          >
            登录
          </Text>
        </TouchableOpacity>
        {/* logo 文字 */}
        <View
          style={{
            marginTop: rpx(100),
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Image source={require("../assets/logo.png")}></Image>
          <Text style={{ fontSize: rpx(40), color: "#9598a6" }}>
            后台管理系统
          </Text>
        </View>
        {/* 底部版权信息 */}
        <Text
          style={{
            marginTop: rpx(100),
            textAlign: "center",
            fontSize: rpx(30),
            color: "#9598a6",
          }}
        >
          &copy;2017 版权所有,CODEBOY.COM
        </Text>
      </View>
    );
  }
}
const ss = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    fontSize: rpx(40),
    color: "black",
    padding: rpx(15),
  },
});
```

### 主菜单界面

- 页面导航标题 右侧有一个小图标
- 统计数据 真实情况数据是接口返回 这里需要模拟数据
- 按钮导航 导航的名称图片和跳转路由地址
- 统计数据和按钮导航的结构布局，是使用 FlatList 高性能的列表组件

`pages\MainPage.js`

```javascript
import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
// rpx
const rpx = (x) => (Dimensions.get("window").width / 750) * x;
export default class MainPage extends Component {
  data = [
    // 模拟统计数据
    {
      title: "上架商品总数",
      data: "24380",
      desc: "+128%较上月",
      color: "blue",
    },
    { title: "注册用户总数", data: "1965", desc: "-50%较上月", color: "blue" },
    { title: "下架商品总数", data: "24380", desc: "+128%较上月", color: "red" },
    { title: "当日PC端PV量", data: "14281", desc: "-50%较昨日", color: "red" },
    { title: "移动端PV量", data: "29315", desc: "-34%较昨日", color: "blue" },
    { title: "App总下载量", data: "7422", desc: "+18%较上周", color: "red" },
    // 导航按钮数据
    {
      title: "商品管理",
      icon: require("../assets/menu_product.jpg"),
      target: "Products",
    },
    {
      title: "用户管理",
      icon: require("../assets/menu_user.jpg"),
      target: "Products",
    },
    {
      title: "订单管理",
      icon: require("../assets/menu_order.jpg"),
      target: "Products",
    },
    {
      title: "首页管理",
      icon: require("../assets/menu_refresh.jpg"),
      target: "Main",
    },
  ];
  // 组件挂在时
  componentDidMount() {
    // 解构出配置项  react-navigation reactNative路由 提供了头部导航 及其设置方式
    const { setOptions } = this.props.navigation;
    setOptions({
      // 右侧图标 函数调用返回的是一个JSX结构
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("../assets/user.png")}
            style={{
              width: rpx(50),
              height: rpx(50),
              borderRadius: rpx(25),
            }}
          ></Image>
        </TouchableOpacity>
      ),
    });
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          numColumns={2}
        ></FlatList>
      </View>
    );
  }
  _renderItem = ({ item, index }) => {
    // 模拟数据data
    // 统计数据
    if (index < 6) {
      return (
        <View style={ss.cell}>
          <Text style={{ fontSize: rpx(30), color: "#666666" }}>
            {item.title}
          </Text>
          <Text
            style={{ color: item.color, fontSize: rpx(30), fontWeight: "bold" }}
          >
            {item.data}
          </Text>
          <Text style={{ fontSize: rpx(28), color: "#666666" }}>
            {item.desc}
          </Text>
        </View>
      );
    }
    // 按钮导航数据
    return (
      <View
        style={{
          width: rpx(375),
          alignItems: "center",
          paddingVertical: rpx(30),
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          // 事件触发的方法不能写() 写括号就立即触发了
          // 使用箭头函数中转以下
          onPress={() => this.props.navigation.push(item.target)}
        >
          <Image
            source={item.icon}
            style={{ width: rpx(120), height: rpx(120) }}
          ></Image>
          <Text style={{ fontSize: rpx(30), textAlign: "center" }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const ss = StyleSheet.create({
  cell: {
    // 750rpx 分两半 一半是375
    width: rpx(375),
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#666666",
    alignItems: "center",
    paddingVertical: rpx(20),
    backgroundColor: "white",
  },
});
```

### 商品列表页

分析：

- FlatList 列表布局
- 触底加载
- 下拉刷新
- 回到顶部

```javascript
import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
// rpx rpx(30)代表30rpx
const rpx = (x) => (Dimensions.get("window").width / 750) * x;
export default class ProductsPage extends Component {
  // 发请求  拿数据  存本地  做展示
  state = { res: null };
  url(pno = 1) {
    return "http://www.codeboy.com:9999/data/product/list.php?pno=" + pno;
  }
  componentDidMount() {
    fetch(this.url())
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ res });
      });
  }
  render() {
    // 判断res接口数据未返回时 不渲染 防止报错
    if (this.state.res == null) return <View></View>;
    return (
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          data={this.state.res.data}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.1}
        ></FlatList>
      </View>
    );
  }
  // 触底加载数据
  _onEndReached = () => {
    // 解构获取 当前页 最大页
    const { pno, pageCount, data } = this.state.res;
    if (pno == pageCount) return;
    fetch(this.url(pno + 1))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // 数据拼接  拼数组
        res.data = [...data, ...res.data];
        this.setState({ res });
      });
  };
  // 分隔组件
  _ItemSeparatorComponent = () => (
    <View style={{ height: 1, backgroundColor: "#666666" }}></View>
  );
  _renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ flexDirection: "row", padding: rpx(20) }}
    >
      <Image
        source={{ uri: "http://www.codeboy.com:9999/" + item.pic }}
        style={{ width: rpx(200), height: rpx(200) }}
      ></Image>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text numberOfLines={2} style={{ fontSize: rpx(35) }}>
          {item.title}
        </Text>
        <Text style={{ fontSize: rpx(38), fontWeight: "bold", color: "red" }}>
          ¥{item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
```
