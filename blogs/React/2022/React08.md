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

## ReactNative 学习

## 多列布局

```react
// rnc  react native component
import React, {Component} from 'react';
import {Text, View, FlatList, Dimensions, Image} from 'react-native';

// 获取屏幕的宽高
const {width} = Dimensions.get('window');
// rpx换算为物理像素 使用方法 例如30rpx  rpx(30)
const rpx = x => (width / 750) * x;
export default class App extends Component {
  // 实现一个加载网络请求获取数据，并显示到页面，需要经过以下的步骤：
  // 发送请求 接收数据 存本地 做展示
  // 页面上数据 需要发生改变 一般存储在组件的状态中 state
  state = {result: []};
  componentDidMount() {
    const url = 'https://api.apiopen.top/getWangYiNews';
    // 发送请求 JS代码 早期xmlHttpRequest
    // 新的webAPI 建议使用Fetch
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.setState({result: data.result});
      });
  }
  render() {
    return (
      <FlatList
        data={this.state.result}
        keyExtractor={index => index}
        renderItem={this._renderItem}
        // 列数
        numColumns={2}
        // 每行的样式 多列布局使用
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
          marginTop: rpx(10),
        }}>
        <Text> textInComponent </Text>
      </FlatList>
    );
  }
  _renderItem = ({item}) => (
    // 计算每个元素的宽度 rpx
    // 每个块填充10 两个边 总共4个
    // 750
    <View style={{width: rpx(355)}}>
      <Image
        source={{uri: item.image}}
        style={{width: '100%', height: rpx(200)}}></Image>
      <Text style={{fontSize: rpx(30), padding: rpx(10)}}>{item.title}</Text>
    </View>
  );
}

```

# 实现滚动效果

实现图片轮播的的效果

```react
// rnc
/**
 * 通过FlatList实现图片的轮播
 */
import React, {Component} from 'react';
import {Text, View, Dimensions, Image, FlatList} from 'react-native';
const {width} = Dimensions.get('window');
const rpx = x => (width / 750) * x;

export default class App extends Component {
  banners = [
    'http://www.codeboy.com:9999/img/index/banner1.png',
    'http://www.codeboy.com:9999/img/index/banner2.png',
    'http://www.codeboy.com:9999/img/index/banner3.png',
    'http://www.codeboy.com:9999/img/index/banner4.png',
  ];
  // 挂载时触发
  componentDidMount() {
    // 启动一个定时器  实现自动滚动
    setInterval(() => {
      // 下一张
      this.current++;
      // 判断越界情况 重置为0
      if (this.current == this.banners.length) {
        this.current = 0;
      }
      // 调用FlatList的滚动到指定的位置方法
      this.f1.scrollToIndex({index: this.current});
    }, 2500);
  }
  render() {
    return (
      <FlatList
        data={this.banners}
        keyExtractor={index => index}
        renderItem={this._renderItem}
        // 横向排列
        horizontal
        // 按页滚动
        pagingEnabled
        // 监听滚动
        onScroll={this._onScroll}
        // ref绑定 需要调用FlatList提供的方法
        // 当前组件类中  f1就代表FlatList对象
        ref={el => (this.f1 = el)}></FlatList>
    );
  }
  // 默认滚动第一个 下标0
  current = 0;
  _onScroll = e => {
    // RN的事件经过特殊处理，如果打印需要执行persist
    e.persist();
    // console.log(e.nativeEvent.contentOffset.x);
    const offset_x = e.nativeEvent.contentOffset.x;
    // 滚动的位置的宽度
    const w = e.nativeEvent.layoutMeasurement.width;
    // 滚动的偏移量/滚动位置的宽度  计算出滚动的是第几个 第几页
    // console.log(offset_x / w);
    // 后续的滚动 是按页滚动的  去整
    this.current = Math.floor(offset_x / w);
  };

  _renderItem = ({item}) => (
    <Image source={{uri: item}} style={{width, height: rpx(300)}}></Image>
  );
}

```

## ReactNative 路由

react 提供了 router 路由 roact-router-dom

ReactNative 为了能够在移动端有更好的使用体验，专门开发了针对 React 的路由系统

ReactNative router 的官网

https://reactnavigation.org/docs/hello-react-navigation/

① 生成几个测试页面

![image-20220117105927221](https://gitee.com/kittors/pictures/raw/master/img/202201171059279.png)

在页面中写入基础解构，不然在页面切换的时候会报错

```react
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class DPage extends Component {
    render() {
        return (
            <View>
                <Text style={{fontSize:30}}> DPagetextInComponent </Text>
            </View>
        )
    }
}

```

`App.js`

找到组的根组件

```react
// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

# 学子商城 App 开发

准备个项目包

登录页面 LoginPage.js

管理主页面 MainPage.js

商品列表页面 ProductsPage.js

商品详情页面 DetailPage.js

将静态资源放置到 assets 中、

## 路由模块

`App.js`

```react
// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProductsPage from './pages/ProductsPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* name路由名称 component组件 options配置项  title 头部导航栏的标题文字*/}
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{title: '管理员登录'}}
        />
        <Stack.Screen
          name="main"
          component={MainPage}
          options={{title: '主页'}}
        />
        <Stack.Screen
          name="product"
          component={ProductsPage}
          options={{title: '商品页面'}}
        />
        <Stack.Screen
          name="detail"
          component={DetailPage}
          options={{title: '商品详情页面'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

```

## 登录页面

`LoginPage.js`

分析：

登录页面的实现

① 点击按钮后，触发事件处理方法

② 处理方法 把用户名和密码发送请求到服务端接口

③ 服务端校验用户名和密码是否正确，并返回给客户端

- 校验成功 跳转路由到主菜单页面
- 校验失败 提示用户名或者密码错误

> 对于登录功能 大部分的工作都在服务端 前端需要做的：
>
> - 传递参数[用户名，密码]发送给服务端
> - 对于服务端校验后[用户名和密码是否正确]的结果进行处理和提示

拿用户唯一的，查到这条数据 数据中包含了密码字段 密码字段的值是经过加密的 需要拿用户输入的密码加密后进行对比存储的加密字段

```react
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
// rpx
const rpx = x => (Dimensions.get('window').width / 750) * x;
export default class LoginPage extends Component {
  // 用户名和密码的初始化
  state = {uname: '', upwd: ''};
  //   登录处理方法:
  _doLogin = () => {
    //   获取用户名和密码
    const {uname, upwd} = this.state;
    // 登录地址
    const url = 'http://www.codeboy.com:9999/data/user/login.php';
    // 参数传递 POST请求
    // 参数拼接
    const body = `uname=${uname}&upwd=${upwd}`;
    // POST请求
    // fetch的参数 第一个参数接口地址 第二个参数header头信息
    // methods 请求方式 方式POST
    // headers 头信息
    // body 参数解构
    fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      body,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.code == 200) {
          //   alert('登录成功');
          this.props.navigation.push('main');
        } else {
          alert('用户名或者密码错误');
        }
      });
  };

  render() {
    const {push} = this.props.navigation;
    const {uname, upwd} = this.state;
    return (
      <View style={{padding: rpx(100)}}>
        {/* 用户名 */}
        <TextInput
          style={ss.input}
          placeholder="请输入管理员用户名"
          value={uname}
          onChangeText={uname => this.setState({uname})}></TextInput>
        {/* 密码 */}
        <TextInput
          style={ss.input}
          placeholder="请输入管理员密码"
          secureTextEntry
          value={upwd}
          onChangeText={upwd => this.setState({upwd})}></TextInput>
        {/* 登录按钮 */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={ss.loginBtn}
          //   绑定登录
          onPress={this._doLogin}>
          <Text
            style={{fontSize: rpx(40), letterSpacing: rpx(20), color: 'white'}}>
            登录
          </Text>
        </TouchableOpacity>
        {/* logo文字 */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: rpx(100),
            justifyContent: 'space-evenly',
          }}>
          <Image source={require('../assets/logo.png')}></Image>
          <Text style={{fontSize: rpx(40), color: '#888'}}>后台管理系统</Text>
        </View>
        {/* 底部版权信息 */}
        <Text
          style={{
            marginTop: rpx(100),
            marginTop: rpx(100),
            color: '#888',
            textAlign: 'center',
          }}>
          &copy;2107 版权所有,CODEBOY.COM
        </Text>
      </View>
    );
  }
}
const ss = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    fontSize: rpx(30),
    padding: rpx(15),
    color: 'black',
  },
  loginBtn: {
    backgroundColor: '#0080ff',
    paddingVertical: rpx(10),
    borderRadius: rpx(10),
    marginTop: rpx(50),
    alignItems: 'center',
  },
});

```

## 主菜单界面

- 页面导航标题 右侧有一个小图标
- 统计数据 真实情况是接口返回的 这里需要模拟假数据
- 按钮导航 模拟导航的名称图片和跳转路由地址
- 统计数据和按钮导航的结构

```react
import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// rpx
const rpx = x => (Dimensions.get('window').width / 750) * x;
export default class MainPage extends Component {
  data = [
    // 模拟的统计数据
    {
      title: '上架商品总数',
      data: '24380',
      desc: '+128%较上个月',
      color: 'blue',
    },
    {
      title: '注册用户总数',
      data: '1965',
      desc: '-50%%较上个月',
      color: 'blue',
    },
    {
      title: '下架商品总数',
      data: '24380',
      desc: '+128%较上个月',
      color: 'red',
    },
    {
      title: '当日PC端PV量',
      data: '14281',
      desc: '-50%较昨日',
      color: 'red',
    },
    {
      title: '当日移动端PV量',
      data: '12312',
      desc: '-34%较昨日',
      color: 'blue',
    },
    {
      title: 'App下载量',
      data: '7422',
      desc: '+18%较上周',
      color: 'red',
    },
    // 导航按钮的数据
    {
      title: '商品管理',
      icon: require('../assets/menu_product.jpg'),
      target: 'product',
    },
    {
      title: '用户管理',
      icon: require('../assets/menu_user.jpg'),
      target: 'product',
    },
    {
      title: '订单管理',
      icon: require('../assets/menu_order.jpg'),
      target: 'product',
    },
    {
      title: '首页管理',
      icon: require('../assets/menu_cloud.jpg'),
      target: 'main',
    },
  ];
  // 组件挂在时
  componentDidMount() {
    // 解构出配置项
    const {setOptions} = this.props.navigation;
    setOptions({
      // 右侧图标 函数调用返回的是一个JSX结构
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require('../assets/user.png')}
            style={{
              width: rpx(50),
              height: rpx(50),
              borderRadius: rpx(25),
              backgroundColor: 'black',
            }}></Image>
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
          keyExtractor={index => index}
          numColumns={2}></FlatList>
      </View>
    );
  }
  _renderItem = ({item, index}) => {
    // 模拟数据data
    // 统计数据
    if (index < 6) {
      return (
        <View style={ss.cell}>
          <Text
            style={{
              color: item.color,
              fontSize: rpx(30),
              fontWeight: 'bold',
            }}>
            {item.title}
          </Text>
          <Text
            style={{color: item.color, fontSize: rpx(30), fontWeight: 'bold'}}>
            {item.data}
          </Text>
          <Text style={{fontSize: rpx(30), color: '#666'}}>{item.desc}</Text>
        </View>
      );
    }
    // 按钮导航数据
    return (
      <View
        style={{
          width: rpx(375),
          alignItems: 'center',
          paddingVertical: rpx(30),
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          // 事件触发的方法不能写() 写括号就立即触发了
          // 使用箭头函数中转以下
          onPress={() => this.props.navigation.push(item.target)}>
          <Image
            source={item.icon}
            style={{width: rpx(120), height: rpx(120)}}></Image>
          <Text style={{fontSize: rpx(30), textAlign: 'center'}}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}
const ss = StyleSheet.create({
  cell: {
    // 750rpx  分两半  一半是375rpx
    width: rpx(375),
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
    paddingVertical: rpx(20),
    backgroundColor: 'white',
  },
});

```

## 商品列表页面

分析：

- FlatList 列表布局
- 触底加载
- 下拉刷新
- 回到顶部

```react
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
const rpx = x => (Dimensions.get('window').width / 750) * x;
export default class ProductsPage extends Component {
  state = {res: null};
  url(pno = 1) {
    return 'http://www.codeboy.com:9999/data/product/list.php?pno=' + pno;
  }
  componentDidMount() {
    fetch(this.url())
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({res});
      });
  }
  render() {
    if (this.state.res == null) return <View></View>;
    return (
      <View style={{backgroundColor: 'white'}}>
        <FlatList
          data={this.state.res.data}
          keyExtractor={index => index}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.1}></FlatList>
      </View>
    );
  }
  _onEndReached = () => {
    // 解构获取 当前页 最大页
    const {pno, pageCount, data} = this.state.res;
    if (pno == pageCount) return;
    fetch(this.url(pno + 1))
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res.data = [...data, ...res.data];
        this.setState({res});
      });
  };
  _ItemSeparatorComponent = () => (
    <View style={{borderWidth: 1, borderColor: '#888'}}></View>
  );
  _renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{flexDirection: 'row', padding: rpx(20)}}>
      <Image
        source={{uri: 'http://www.codeboy.com:9999/' + item.pic}}
        style={{width: rpx(200), height: rpx(200)}}></Image>
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
        <Text numberOfLines={2} style={{fontSize: rpx(30)}}>
          {item.title}
        </Text>
        <Text style={{fontSize: rpx(35), fontWeight: 'bold', color: 'red'}}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

```
