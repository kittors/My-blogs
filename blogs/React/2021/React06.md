---
title: React学习篇章六
date: 2021-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React06

> 提前把项目包和环境准备好，启动运行。稍后回顾知识点后，就开始新的组件语法学习。

## 回顾

ReactNative 原生手机端解决方案

webapp H5 网页

hybrid app 混合开发 基于 H5 开发 编译成原生和 web 网页混合 APP 国内的解决方案 ：uni-app[Dcloud] APIcloud Taro..... `微信小程序` 目前中小企业 选择混合开发

Native 原生开发 IOS[oc，swift] ANDROID[java kotlin] 体验度最好 中大型企业

ReactNative 目的是将通过 web 相关技术开发的 APP 编译称为原生代码的 APP。提高使用体验。 中大企业

![image-20220118141254975](https://gitee.com/kittors/pictures/raw/master/img/202201181412020.png)

使用 ReactNative 开发:

在项目包 启动开发服务 `npm start` ip:8081

在模拟器中安装 app-debug.apk，启动并配置其远程服务地址

ip 地址需要`ipconfig`查看

在开发过程中，会出现白屏无响应的情况。关闭 APP,重启。在 cmd 命令行下通过`r`重载刷新应用。

## RN 学习

### Text 文本

```javascript
// rnc
/**
 * Text文本组件
 * RN 文本内容需要包裹在Text组件中
 *
 */
import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class App extends Component {
  render() {
    return (
      // View组件 唯一的根组件
      // View中没有style的一些属性 fontSize color
      <View>
        <Text style={{fontSize: 25}}>text组件1</Text>
        <Text style={{fontSize: 25}}>text组件</Text>
        {/* Text组件作为容器 下级的文本可以继承样式 */}
        <Text style={{fontSize: 25}}>
          <Text>text组件1</Text>
          <Text>text组件</Text>
        </Text>
        {/* 文字折行隐藏 ...  */}
        <Text style={{fontSize:25,fontWeight:"800",color:'#009933'}} numberOfLines={3}>
          今天天气还不错,反正太阳挺大的。今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的今天天气还不错,反正太阳挺大的
        </Text>
      </View>
    );
  }
}
```

### rpx

![image-20220118141354453](https://gitee.com/kittors/pictures/raw/master/img/202201181413489.png)

```javascript
// rnc
/***
 * 移动端中为了能够使文字显示和图片大小显示适应不同屏幕大小的设备。尺寸的大小会使用相对单位。
 * 微信小程序中 rpx 把屏幕宽度分为750份,1rpx代表1份屏幕大小
 * 需要计算出物理像素到rpx的方式
 *
 */
import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';

// 获取屏幕的宽度
const {width, height} = Dimensions.get('window');
// rpx换算成物理像素  rpx(35)
const rpx = x => (width / 750) * x;
export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={{fontSize:rpx(50)}}> textInComponent </Text>
      </View>
    );
  }
}
```

### 布局

View 根组件，View 组件的默认布局就是 flex，主轴竖向排列，横向拉伸

相关属性：

> flexDirection 主轴排列方式
>
> justfyContent 主轴对齐方式
>
> alignItems 对称轴对齐方式 效果

```javascript
// rnc
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
/***
 * ReactNative 默认布局方式就是flex 弹性布局
 *
 *
 */
export default class App extends Component {
  render() {
    return (
      // 默认View中布局方式 flex
      // 竖向排列 横向拉伸
      <View style={ss.body}>
        <Text style={ss.red}>1.Red</Text>
        <Text style={ss.green}>2.Green</Text>
        <Text style={ss.blue}>3.Blue</Text>
      </View>
    );
  }
}
const base = {fontSize: 25, color: 'white', padding: 30};
const ss = StyleSheet.create({
  body:{
    // 布局排列方式
    flexDirection:'row', //横向
    flexDirection:'column-reverse', // 竖向逆向
    flexDirection:'row-reverse', //横向逆向
    flexDirection:'column', //默认值 垂直 竖向

    // 对齐方式 主轴方向
    justifyContent:'flex-start', //默认值 首部对齐
    justifyContent:'center', // 居中对齐
    justifyContent:'flex-end', //尾部对齐
    justifyContent:'space-around', //空白环绕
    justifyContent:'space-evenly', //空白均分
    justifyContent:'space-between', //中间留白

    // 交叉轴  与主轴方向 相对 flexDirection
    alignItems:'stretch', //默认值 拉伸
    alignItems:'flex-start', // 起始对齐
    alignItems:'flex-end', // 尾部对齐
    alignItems:'center', // 居中对齐

    // 添加一个高度和背景色 识别
    height:400,
    backgroundColor:'pink'
  },
  // 把相同的公共的样式,可以抽离,通过es6 对象合并语法 整合到一起
  red: {
    ...base,
    backgroundColor: 'red',
  },
  green: {
    ...base,
    backgroundColor: 'green',
  },
  blue: {
    ...base,
    backgroundColor: 'blue',
  },
});
```

### 按钮

```javascript
// rnc
/***
 * 实现按钮的方式:
 * 方式一: button组件
 * 方式二: touchableOpacity 容器 写样式
 *
 * 练习:
 * 要求通过touchableOpacity 实现一个按钮
 * 按钮颜色为天蓝色
 * 按钮的内容  '退出'  字体颜色为白色  字体大小30
 *
 *
 * 点击按钮之后出发点击事件 显示alert 退出成功
 *
 */
import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}} s>
        <Button title="登录"></Button>
        {/* touchableOpacity 实现按钮*/}
        {/* activeOpacity 点中透明度 */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            marginTop: 100,
            backgroundColor: 'orange',
            paddingHorizontal: 100, //横向填充 左右
            paddingVertical: 10, //垂直方向
            borderRadius: 6,
          }}>
          <Text style={{color: 'white', fontSize: 20, letterSpacing: 10}}>
            登录
          </Text>
        </TouchableOpacity>

        {/* 练习按钮 */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            marginTop: 100,
            backgroundColor: '#0686f1',
            paddingHorizontal: 100,
            paddingVertical: 10,
          }}
          // 在手机端APP RN中点击事件 onPress
          onPress={() => alert('退出成功')}>
          <Text style={{fontSize: 30, color: 'white'}}>退出</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

### 活动提示器

显示一个圆形的 loading 提示符号。

```javascript
// rnc
/**
 * 活动提示器 ActivityIndicator
 * 显示一个圆形的 loading 提示符号。
 *
 *
 */
import React, { Component } from 'react'
import { Text, View,ActivityIndicator } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
        <View style={{height:100}}></View>
        {/* 自定义写一个加载组件 */}
        <View style={{alignItems:"center",backgroundColor:"#eeeeee"}}>
          <ActivityIndicator color="red" size={38}></ActivityIndicator>
          <Text style={{fontSize:28}}>加载中...</Text>
        </View>
      </View>
    )
  }
}
```

### 状态栏和背景图

```javascript
// rnc
/***
 * 状态栏 Statusbar
 * 背景图 ImageBackground
 *
 * 背景图需要覆盖整个屏幕 需要动态的获取屏幕大小
 *  Dimensions
 */
import React, {Component} from 'react';
import {Text, View, StatusBar, ImageBackground, Dimensions} from 'react-native';

// 获取宽高
const {width, height} = Dimensions.get('window');
export default class App extends Component {
  render() {
    return (
        // 背景图必须给宽高 背景图组件需要把所有内容包裹
        <ImageBackground source={require('./assets/bg.jpg')} style={{width,height}}>
          {/* 在背景图中,为了能够让整体效果更好一些 可以自定义状态栏 */}
          {/* transparent 透明的 和rgba(0,0,0,0) */}
          {/* translucent 可穿透的 */}
          <StatusBar backgroundColor="transparent" translucent/>
          {/* 沉浸式状态栏 会出现内容覆盖写在状态栏 */}
          {/* 获取状态栏的高度 把高度撑出来 */}
          {/* <View style={{height:StatusBar.currentHeight}}></View> */}
          {/* 编写一些文本信息 */}
          <Text style={{color:'white',fontSize:30,marginTop:StatusBar.currentHeight}}>这是一个背景图和沉浸式状态栏的案例</Text>
        </ImageBackground>
    );
  }
}

```

> 关于语法报错和 App 奔溃：
>
> ① 看语法报错的信息，确认是否为语法错误
>
> ![image-20220118141331391](https://gitee.com/kittors/pictures/raw/master/img/202201181413443.png)
>
> ② 尝试最简单的代码 通过 vscode 插件的快捷提示`rnc`，检查是否可以运行成功，如果可以运行成功，就说明是文件代码错误了
>
> ③ 确认代码没有问题，还是报错或 app 无法启动
>
> - 把项目包重新解压一份使用
> - app-debug.apk 文件重新安装到模拟器
> - 将项目包的开发服务和模拟器里的 app-debug 进行重新配置关联
>
> 重启电脑试试看，可能由于电脑系统资源不足导致无法运行。重启实际回收资源了。

### 开关和文本输入框

```javascript
// rnc
/****
 * 受控组件  它是具有状态的 进行双向绑定
 * Switch  开关 两种状态  true  false
 * TextInput 文本输入框
 */
import React, {Component} from 'react';
import {Text, View, Switch, TextInput, StyleSheet} from 'react-native';

export default class App extends Component {
  // status Switch的状态 false默认为关
  state = {status: false, uname: '', upwd: ''};
  render() {
    // 为了方便后续使用state属性 会提前es6解构
    const {status, uname, upwd} = this.state;
    return (
      <View>
        {/* 开关 */}
        <Switch
          value={status}
          // open 当开关切换后 传入的状态 true false
          onValueChange={status => this.setState({status})}></Switch>
        {/* 文本输入框  */}
        <View
          style={ss.inputView}>
          <Text style={{fontSize: 25}}>账号:</Text>
          <TextInput
            style={ss.input}
            value={uname}
            onChangeText={uname => this.setState({uname})}
            placeholder="请输入账号"></TextInput>
        </View>
        <View style={{height:50}}></View>
        {/* 密码框 */}
        <View
          style={ss.inputView}>
          <Text style={{fontSize: 25}}>密码:</Text>
          {/* secureTextEntry 密码显示状态 true密文 false为明文 */}
          <TextInput
            secureTextEntry={!status}
            style={ss.input}
            value={upwd}
            onChangeText={upwd => this.setState({upwd})}
            placeholder="请输入密码"></TextInput>
        </View>
      </View>
    );
  }
}
const ss = StyleSheet.create({
  inputView:{
    flexDirection: 'row',
    borderWidth: 1,
    width: 400,
    marginLeft: 30,
  },
  input: {
    fontSize: 25,
    color: '#333',
    borderWidth: 1,
    padding: 5,
    borderRadius: 6,
    // 占整个1份
    flex: 1,
    alignSelf: 'center',
  },
});

```

### 登录页面布局

![image-20220118141431028](https://gitee.com/kittors/pictures/raw/master/img/202201181414120.png)

分析：

背景图，沉浸式状态栏

输入框 文本输入 密码输入 小图标

自定义按钮

记住密码状态和图片可以进行切换

新用户注册

其它方式登录 图片的弹性布局

```javascript
// rnc
import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
// 获取宽高
const {width, height} = Dimensions.get('window');
// rpx转物理像素  使用 例如: 35rpx rpx(35)
const rpx = x => (width / 750) * x;
export default class App extends Component {
  state = {rememberPwd: false};
  // 判断是否记住密码的状态 返回对应的图片地址
  img_remember() {
    return this.state.rememberPwd
      ? require('./assets/check.png')
      : require('./assets/uncheck.png');
  }
  render() {
    return (
      <ImageBackground
        source={require('./assets/bg1.jpg')}
        style={{width, height}}>
        {/* 沉浸式状态栏 */}
        <StatusBar backgroundColor="transparent" translucent></StatusBar>
        {/* 撑一个高度为状态栏高度的容器 把状态栏的高度部分撑出来 防止状态栏被内容覆盖 */}
        <View style={{height: StatusBar.currentHeight}}></View>
        {/* 把页面其它内容包裹到容器 */}
        <View style={ss.content}>
          {/* 用户名 */}
          <View style={ss.area_input}>
            <Image
              style={ss.area_input_icon}
              source={require('./assets/user.png')}></Image>
            <TextInput
              style={ss.area_input_text}
              placeholder="用户名"
              placeholderTextColor="white"></TextInput>
          </View>
          {/* 密码 */}
          <View style={[ss.area_input, {marginTop: rpx(30)}]}>
            <Image
              style={ss.area_input_icon}
              source={require('./assets/pwd.png')}></Image>
            <TextInput
              secureTextEntry
              style={ss.area_input_text}
              placeholder="密码"
              placeholderTextColor="white"></TextInput>
          </View>
          {/* 账户操作区域 */}
          <View
            style={{
              marginTop: rpx(30),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{padding: rpx(5)}}
                onPress={() =>
                  this.setState({rememberPwd: !this.state.rememberPwd})
                }>
                <Image
                  source={this.img_remember()}
                  style={{width: rpx(35), height: rpx(35)}}></Image>
              </TouchableOpacity>
              <Text style={{fontSize: rpx(35), color: 'white'}}>记住密码</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={{fontSize: rpx(35), color: 'white'}}>忘记密码</Text>
            </TouchableOpacity>
          </View>
          {/* 登录按钮 */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: '#55c596',
              paddingVertical: rpx(10),
              alignItems: 'center',
              borderRadius: rpx(10),
              marginTop: rpx(50),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: rpx(40),
                letterSpacing: rpx(15),
              }}>
              登录
            </Text>
          </TouchableOpacity>
          {/* 新用户注册 */}
          <TouchableOpacity
            style={{
              paddingVertical: rpx(10),
              alignItems: 'center',
              borderRadius: rpx(10),
              marginTop: rpx(50),
            }}
            activeOpacity={0.7}>
            <Text style={{color: 'white', fontSize: rpx(35)}}>新用户注册</Text>
          </TouchableOpacity>
          {/* 其它登录方式 */}
          <View style={{position: 'absolute', bottom: rpx(0),alignSelf:'center'}}>
            {/* 文字 */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={ss.line}></View>
              <View>
                <Text style={{fontSize:rpx(20),color:'white',marginHorizontal:rpx(20)}}>其它方式登录</Text>
              </View>
              <View style={ss.line}></View>
            </View>
            {/* 图标 */}
            <View></View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const ss = StyleSheet.create({
  content: {
    paddingTop: rpx(200),
    paddingHorizontal: rpx(50),
  },
  area_input: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: rpx(10),
    borderRadius: rpx(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  area_input_icon: {
    width: rpx(50),
    height: rpx(50),
    marginHorizontal: rpx(20),
  },
  area_input_text: {
    fontSize: rpx(40),
    color: 'white',
    flex: 1,
  },
  line:{
    backgroundColor:'#55c596',
    height:1,
    width:rpx(200)
  }
});

```
