---
title: React学习篇章六
date: 2022-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React06

> 提前把项目包和环境准备号，启动运行。稍后回顾指示点后，就开始新的组件语法学习。

# 回顾

`ReactNative` 原生手机端解决方案

`webapp` H5 网页

hybrid app 混合开发 基于 H5 开发 编译成原生和 web 网页混合的 APP 国内的解决方案：`uni-app`[`Dcloud`] `APIcloud` Taro.......微信小程序其实也属于这一套方案 目前中小企业 选择混合开发

目前中小企业 选择混合开发

Native 原生开发 iOS[`oc`,swift] 和 Android[java，`kotlin`] 体验度最好的 中大型企业使用 成本高

`ReactNative` 目的是将通过 web 相关技术开发 的 APP 编译成原生代码的 APP 提高使用体验。适合中大型企业

![image-20220113091827244](https://gitee.com/kittors/pictures/raw/master/img/202201130918297.png)

使用`ReactNative`开发:

在项目包 启动开发服务 `npm start ` ip:8081

在模拟器中安装`app-debug.apk` 启动并配置其远程服务地址

`ip`地址需要 `ipconfig`查看

在开发过程中，会出现白屏无响应的情况。关闭 APP，重启，在 CMD 命令行下通过`r`关键字重载刷新应用

# RN 学习

## Text 文本组件

```react
//rnc
/**
 * Text文本组件
 * RN中文本内容需要包裹在Text组件中
 */
import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class App extends Component {
  render() {
    return (
      // View组件是唯一的根组件  和之前的vue的template类似 如果不写会导致报错
      // View中没有style的一些属性，例如没有fontSize的属性，此属性就只能加载Text组件中  还有color也没有
      // View因为没有一些style属性 可以使用Text标签包裹
      <View>
        <Text style={{fontSize: 25}}> Text组件1 </Text>
        <Text> Text组件2 </Text>
        {/* Text组件作为容器 下级的文本会继承上级的样式 */}
        <Text style={{fontSize: 30}}>
          <Text>Text组件3</Text>
        </Text>
        {/* 文字折行隐藏... */}
        {/* numberOfLines 折行隐藏 填写行数 折多少行显示 其余...省略 */}
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'InkFree',
            color: '#1e1e1e',
            fontWeight: '900',
          }}
          numberOfLines={1}>
          今天的天气还不错，反正太阳挺大的。今天的天气还不错，反正太阳挺大的。今天的天气还不错，反正太阳挺大的。今天的天气还不错，反正太阳挺大的。今天的天气还不错，反正太阳挺大的。今天的天气还不错，反正太阳挺大的。今天的天气还不错，反正太阳挺大的。今天的天气还不错，反正太阳挺大的。
        </Text>
      </View>
    );
  }
}

```

rpx

- rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为 750rpx。如在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素。
