/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  TouchableHighlight,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var REQUEST_URL = 'http://apis.is/tv/';

var mTV = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .catch((error) => {
        console.error(error);
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("data",responseData.results[0].channels);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results[0].channels),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTv}
        style={styles.listView}
      ></ListView>
    );
  },

  renderLoadingView: function() {
    return (
        <View style={styles.container}>
          <Text>
            Loading Channels...
          </Text>
        </View>
    );
  },

  renderTv: function(tv) {
    return (
      <TouchableHighlight onPress={() => {console.log('Item click');}}>
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{tv.name.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b94d6',
  },
  rightContainer: {
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('mTV', () => mTV);