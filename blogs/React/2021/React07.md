---
title: React学习篇章七
date: 2021-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React07

`ReactNative`的组件使用

View 组件 根 容器组件 没有一些相关样式 color

Image 组件 图片

- 远程图片 `<Image src={{uri:'http://xxx.xxx.xxx/1.png'}} style={{width:200,height:180}}>`
  - `uri` 链接
  - 默认宽高为 0 不显示 需要设置宽高
- 本地图片 <Image src={require('./assets/1.png')} style={{width:200,height:180}}>
  - require 语法 习惯存放目录为 assets

Text 文本组件

- RN 中文本必须放在 Text 组件中
- 可以修饰文本相关的样式 color
- number

按钮组件

- button
- `touchableOpacity` 透明容器 有点击反馈效果
  - 背景色 填充 圆角
  - 文字使用文本组件 文字大小 颜色 间距

状态栏 和背景图

可穿透的状态栏 透明的

背景图 `ImageBackground` 需要动态获取屏幕的大小 设置背景的图的宽高

- 背景图组件标签作为根标签使用，把其它内容都包裹起来

开关和输入框

Switch 、`TextInput`

活动提示期 loading 小图标

## Native 网络请求与收据接收

```react
// rnc
/**
 * SrollView 可以滚动
 *
 * 将接口数据展示到页面  实现的基本步骤
 * 发送请求=>接收返回数据=>存储本地=>展示渲染
 *
 */
import React, {Component} from 'react';
import {Text, View, Dimensions, Image, ScrollView} from 'react-native';
const {width} = Dimensions.get('window');
const rpx = x => (width / 750) * x;
export default class App extends Component {
  // state组件状态
  state = {result: []};
  // 组件挂载时触发
  componentDidMount() {
    const url = 'https://api.apiopen.top/getWangYiNews';
    // 发送请求调用接口
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        /**
         * RN中 控制台打印的信息 需要在命令行控制台查看
         * 使用起来不方便，RN提供了debug调试模式
         * 注意：调试模式目前 还不稳定，需要时候打开它，不适用的时候关闭。否则，会出现一些奇怪的问题。异常报错，一些
         * 调试模式打开方式:
         * 1.CMD里 敲D 打开开发者菜单
         * 2.模拟器里选择菜单  debug
         * 3.浏览器弹出debug  ui工具
         * 打开console就可以看到打印信息了
         *
         * 关闭和打开过程类似 先cmd敲d 模拟器选择stop debugging
         */
        this.setState({result: res.result});
      });
  }
  showNews() {
    return this.state.result.map((item, index) => (
      <View key={index} style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.image}}
          style={{
            width: rpx(250),
            height: rpx(150),
          }}></Image>
        <View style={{flex: 1, borderBottomWidth: 1}}>
          <Text style={{fontSize: rpx(25)}}>{item.title}</Text>
          <Text style={{fontSize: rpx(25)}}>{item.passtime}</Text>
        </View>
      </View>
    ));
  }
  render() {
    return (
      // 用ScrollView替换原来的View使页面可以滚动
      <ScrollView>
        {/* 调用方法  实现页面的展示 */}
        {this.showNews()}
      </ScrollView>
    );
  }
}

```

## `FlatList`

高性能的列表组件，提供了多个属性使用。方便开发者快速开发一些功能

> FlatList 三个核心属性:
>
> - data 需要显示的数组数据
> - renderItem 数组每个渲染元素对应的 UI 界面的标签和样式?
> - keyExtractor 每一个 UI 标签的唯一标

```react

```

## 可选属性

> ItemSeparatorComponent 行与行之间的分隔组件
>
> ListHeaderComponent 显示到 FlatList 组件头部
>
> ListFooterComponent 显示到 FlatList 组件尾部

```React
//rnc
import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';

/**
 * 通过FlatList遍历显示数组对象数据
 * 核心属性：
 * data数据
 * renderItem 每一个元素标签样式
 * keyExtractor key唯一值
 */
export default class App extends Component {
  heros = [
    {name: '后裔', job: '射手', price: 3888},
    {name: '安其拉', job: '法师', price: 6888},
    {name: '廉颇', job: '坦克', price: 13888},
    {name: '李白', job: '打野', price: 16888},
    {name: '夏侯惇', job: '边路', price: 3888},
  ];
  render() {
    return (
      <FlatList
        data={this.heros}
        renderItem={this._renderItem}
        keyExtractor={({item, index}) => index}
        ItemSeparatorComponent={this._ItemSeparatorComponet}
        ListFooterComponent={this._ListFooterComponent}
        ListHeaderComponent={this._ListHeaderComponent}></FlatList>
    );
  }
  // 头部组件
  _ListHeaderComponent() {
    return <Text style={{fontSize: 35, color: 'green'}}>头部组件</Text>;
  }
  // 尾部组件
  _ListFooterComponent() {
    return <Text style={{fontSize: 35, color: 'green'}}>尾部组件</Text>;
  }
  // 分隔组件
  _ItemSeparatorComponet = () => (
    <View style={{height: 3, backgroundColor: 'gray'}}></View>
  );
  _renderItem = ({index, item}) => {
    return (
      <Text style={{fontSize: 25}}>
        {index + 1}.{item.name}：{item.job}--
        {item.price}金币
      </Text>
    );
  };
}

```

## 下拉刷新和新闻列表

```react
// rnc
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const rpx = x => (width / 750) * x;
export default class App extends Component {
  // data 接口返回数据 refreshing 下拉刷新数据
  // showBtn 回到顶部显示状态
  state = {data: null, refreshing: false, showBtn: false};
  url(page = 1) {
    return 'https://api.jiasiyuan.cn/news?page=' + page;
  }
  componentDidMount() {
    fetch(this.url())
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({data: res});
      });
  }
  render() {
    if (this.state.data === null) {
      return <View></View>;
    }
    return (
      <View>
        <FlatList
          data={this.state.data.result}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          ListHeaderComponent={this._ListHeaderComponent}
          ListFooterComponent={this._ListFooterComponent}
          // 触底事件
          onEndReached={this._onEndReached}
          // 触底的阈值 未显示高度的百分比 默认是50%  触发太早了 习惯上修改为10%
          onEndReachedThreshold={0.1}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          onScroll={this._onScroll}
          // 子元素组件方法的调用需要 绑定ref
          // el当前FlatList组件标签
          // f1代表绑定的变量
          ref={el => (this.f1 = el)}></FlatList>
        {/* 回到顶部按钮 */}
        {/* 根据判断showBtn确定是否显示按钮 */}
        {this.state.showBtn ? (
          <TouchableOpacity
            onPress={() => this.f1.scrollToIndex({index: 0})}
            activeOpacity={0.7}
            style={{
              position: 'absolute',
              bottom: rpx(100),
              right: rpx(50),
              backgroundColor: 'red',
              padding: rpx(10),
              borderRadius: rpx(10),
            }}>
            <Text style={{fontSize: rpx(30), color: 'white'}}>回到顶部</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  _ListHeaderComponent = () => (
    <View style={{backgroundColor: 'red', alignItems: 'center'}}>
      <Text style={{color: 'white', fontSize: rpx(40)}}>网易新闻</Text>
    </View>
  );
  _onScroll = e => {
    // 获取竖向滚动距离  和顶部的距离
    // RN的事件处理方式 经过特殊处理的 如果需要打印其中的值 需要再之前调用persist()
    // e.persist()
    // console.log(e.nativeEvent.contentOffset.y)
    // 距离1500以上时  showBtn为true 显示按钮
    this.setState({showBtn: e.nativeEvent.contentOffset.y > 1500});
  };
  _onRefresh = () => {
    console.log('下拉刷新触发了');
    // 下载之后loading加载 当下拉数据返回之后,再修改为false关闭
    this.setState({refreshing: true});
    fetch(this.url())
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({data: res, refreshing: false});
      });
  };
  _onEndReached = () => {
    // console.log('触底了加载数据');
    // 加载翻页数据  当前页+1
    // page当前页数  pageCount最大页数
    const {page, pageCount} = this.state.data;
    // 判断当前页面等于最大也买你 后续没有数据 不进行请求
    if (page == pageCount) {
      return;
    }
    fetch(this.url(page + 1))
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // 拼接数据 拼数组
        res.result = [...this.state.data.result, ...res.result];
        this.setState({data: res});
      });
  };
  _ListFooterComponent = () => {
    const {page, pageCount} = this.state.data;
    if (page == pageCount) {
      return (
        <View
          style={{
            alignItems: 'center',
            padding: rpx(10),
            backgroundColor: '#CCCCCC',
          }}>
          <Text style={{fontSize: rpx(30)}}>没了</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          alignItems: 'center',
          padding: rpx(10),
          backgroundColor: '#CCCCCC',
        }}>
        <ActivityIndicator color="red" size="large"></ActivityIndicator>
        <Text style={{fontSize: rpx(30)}}>加载中....</Text>
      </View>
    );
  };

  _ItemSeparatorComponent = () => (
    <View style={{height: 1, backgroundColor: '#757575'}}></View>
  );
  _renderItem = ({index, item}) => (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={{uri: item.image}}
        style={{width: rpx(250), height: rpx(150), marginRight: 10}}></Image>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <Text style={{fontSize: rpx(30)}}>{item.title}</Text>
        <Text style={{fontSize: rpx(30)}}>{item.passtime}</Text>
      </View>
    </View>
  );
}

```
