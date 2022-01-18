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

```react
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
