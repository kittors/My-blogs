---
title: React学习篇章九
date: 2021-01-07
tags:
  - React
  - 脚手架
categories:
  - React
---

# React09

承接 React08

## 商品页面回到顶部实现

```javascript
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
const rpx = x => (Dimensions.get('window').width / 750) * x;
export default class ProductsPage extends Component {
  // res接口返回数据 refreshing是下拉的状态 showBtn回到顶部按钮显示状态
  state = {res: null, refreshing: false, showBtn: false};
  url(pno = 1) {
    return 'https://api.jiasiyuan.cn/product/list.php?pno=' + pno;
  }
  componentDidMount() {
    fetch(this.url())
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({res});
      });
  }
  render() {
    if (this.state.res == null) return <View></View>;
    return (
      <View style={{backgroundColor: 'white'}}>
        <FlatList
          data={this.state.res.data}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this._ListFooterComponent}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          onScroll={this._onScroll}
          ref={el => (this.f1 = el)}></FlatList>
        {/* 回到顶部按钮 */}
        {this.topBtn()}
      </View>
    );
  }
  // 监控滚动距离
  _onScroll = e => {
    // 竖向滚动的距离  大于1000就显示回到顶部按钮
    const offset_y = e.nativeEvent.contentOffset.y;
    this.setState({showBtn: offset_y > 800});
  };
  // 回到顶部按钮
  topBtn = () => {
    if (this.state.showBtn == false) return null;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={ss.btnTop}
        onPress={() => this.f1.scrollToIndex({index: 0})}>
        <Text style={{color: 'white'}}>回到顶部</Text>
      </TouchableOpacity>
    );
  };
  // 下拉刷新处理
  _onRefresh = () => {
    this.setState({refreshing: true});
    fetch(this.url())
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({res, refreshing: false});
      });
  };
  _ListFooterComponent = () => {
    const {pno, pageCount} = this.state.res;
    if (pno == pageCount) {
      return (
        <View
          style={{
            padding: rpx(20),
            alignItems: 'center',
            backgroundColor: '#333',
          }}>
          <Text style={{fontSize: rpx(30)}}>没有更多了。。</Text>
        </View>
      );
    }
    // 加载中 加载更多
    return (
      <View style={{padding: rpx(20), alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large"></ActivityIndicator>
        <Text style={{fontSize: rpx(30)}}>加载中...</Text>
      </View>
    );
  };

  _onEndReached = () => {
    // 解构获取 当前页 最大页
    const {pno, pageCount, data} = this.state.res;
    if (pno == pageCount) return;
    fetch(this.url(pno + 1))
      .then(res => res.json())
      .then(res => {
        // console.log(res);
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
const ss = StyleSheet.create({
  btnTop: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: rpx(50),
    right: rpx(50),
    padding: rpx(15),
    borderRadius: rpx(8),
  },
});

```

## 商品详情页面

```javascript
import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
// RN中引入
import AutoHeightWebView from 'react-native-autoheight-webview';
const rpx = x => (Dimensions.get('window').width / 750) * x;
export default class DetailPage extends Component {
  state = {details: null};
  componentDidMount() {
    // 接收传递的商品id并发送请求
    const {lid} = this.props.route.params;
    // console.log(lid);
    const url =
      'http://www.codeboy.com:9999/data/product/details.php?lid=' + lid;
    // console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({details: res.details});
        // 启动定时器  实现图片轮播的切换
        this.timer = setInterval(() => {
          // 切换图片
          this.current++;
          //处理越界问题  最大的下标就是图片的数组的长度减一
          const maxIndex = this.state.details.picList.length - 1;
          if (this.current > maxIndex) this.current = 0;
          this.f1.scrollToIndex({index: this.current});
        }, 3000);
      });
  }
  // 组件将要卸载
  componentWillUnmount() {
    // 销毁定时器
    clearInterval(this.timer);
  }
  render() {
    const {details} = this.state;
    // 判断接口是否返回 未返回不渲染
    if (details == null) return <View></View>;
    return (
      <ScrollView>
        <Text
          style={{borderBottomWidth: 1, fontSize: rpx(30), padding: rpx(10)}}>
          产品型号:{details.lname}
        </Text>
        {/* 轮播图 */}
        <FlatList
          data={details.picList}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
          horizontal
          pagingEnabled
          onScroll={this._onScroll}
          ref={el => (this.f1 = el)}></FlatList>
        <View style={{padding: rpx(15), backgroundColor: 'white'}}>
          {/* 商品名称 */}
          <Text style={{fontSize: rpx(35), fontWeight: 'bold'}}>
            {details.title}
          </Text>
          {/* 商品描述 */}
          <Text style={{fontSize: rpx(30), color: 'gray'}}>
            {details.subtitle}
          </Text>
          {/* 价格 */}
          <Text style={{fontSize: rpx(40), color: 'red'}}>
            ￥{details.price}
          </Text>
        </View>
        {/* HTML 广告图 */}
        <AutoHeightWebView
          source={{html: this.htmlDetails()}}></AutoHeightWebView>
      </ScrollView>
    );
  }
  // 处理返回的HTML标签
  htmlDetails = () => {
    let details = this.state.details.details;
    // 添加图片的域名和图片的宽度设置
    details = details.replace(
      /src="img/g,
      'width="100%" src="http://www.codeboy.com:9999/img',
    );
    details = details.replace(/src="\/\//g, 'width="100%" src = "http://');
    return details;
  };
  // 滚动第一个下标 0
  current = 0;
  _onScroll = e => {
    e.persist();
    const offset_x = e.nativeEvent.contentOffset.x;
    const w = e.nativeEvent.layoutMeasurement.width;
    this.current = Math.floor(offset_x / w);
  };
  // 轮播图片
  _renderItem = ({item}) => (
    <Image
      source={{uri: 'http://www.codeboy.com:9999/' + item.md}}
      style={{width: rpx(750), height: rpx(750)}}></Image>
  );
}

```

