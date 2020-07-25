import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity ,Alert, Button} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

export default class App extends Component {
  
  state = {
    grid : [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    currentPlayer : 1
  }
  componentDidMount(){
    this.initial();
  }

  initial = () => {
    this.setState({
      grid : [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer : 1,
      win : 0
    });
  }

  checkWinner(){
    var sum = 0;
    var grid = this.state.grid;
    for(let i = 0 ; i < 3 ; i++){
      sum = 0;
      for(let j = 0 ; j < 3 ; j++){
        sum = sum + grid[i][j];
      }
      this.output(sum);
    }
    sum = 0;
    for(let i = 0 ; i < 3 ; i++){
      sum = 0;
      for(let j = 0 ; j < 3 ; j++){
        sum = sum + grid[j][i];
      }
      this.output(sum);
    }
    sum = 0;
    sum = grid[0][0] + grid[1][1] + grid[2][2];
    this.output(sum);
    sum = 0;
    sum = grid[2][0] + grid[1][1] + grid[0][2];
    this.output(sum);
  }

  output(sum){
    var grid = this.state.grid;
    if(sum === 3) {
      Alert.alert("Player 1 win the game");
      this.setState({win : 1});
      this.initial();
    }
    else if(sum === -3){
      Alert.alert("Player 2 win the game");
      this.setState({win : 1});
      this.initial();
    }
  }

  printValue = (row,col) => {
    if(this.state.grid[row][col] !== 0)
      return;
    if(this.state.currentPlayer === 1){
      var g = this.state.grid;
      g[row][col] = 1;
      this.setState({grid : g , currentPlayer : -1})
    } else {
      var g = this.state.grid;
      g[row][col] = -1;
      this.setState({grid : g , currentPlayer : 1})
    }
    this.checkWinner();
  }

  getValue = (row,col) => {
    var arr = this.state.grid;
    if(arr[row][col] === 0)
      return <View></View>
    if(this.state.grid[row][col] === 1)
      return <Entypo style = {styles.iconX} name="cross" size={80} />;
    else if(this.state.grid[row][col] === -1)
      return <Entypo style = {styles.iconY} name="circle" size={52} />;
    else
    return <View></View>;
  }


  render(){
    return (
      <View style={styles.container}>
        <View style = {styles.row}>
          <TouchableOpacity onPress = {() => this.printValue(0,0)}  style = {[styles.block , {borderLeftWidth : 0 , borderTopWidth : 0}]}>
            {this.getValue(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.printValue(0,1)}  style = {[styles.block , { borderTopWidth : 0}]}>
            {this.getValue(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.printValue(0,2)} style = {[styles.block , {borderRightWidth : 0 , borderTopWidth : 0}]}>
            {this.getValue(0,2)}
          </TouchableOpacity>
        </View>
        <View style = {styles.row}>
          <TouchableOpacity onPress = {() => this.printValue(1,0)}  style = {[styles.block , {borderLeftWidth : 0}]}>
            {this.getValue(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.printValue(1,1)}  style = {styles.block}>
            {this.getValue(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.printValue(1,2)}  style = {[styles.block , {borderRightWidth : 0}]}>
            {this.getValue(1,2)}
          </TouchableOpacity>
        </View>
        <View style = {styles.row}>
          <TouchableOpacity onPress = {() => this.printValue(2,0)}  style = {[styles.block , {borderLeftWidth : 0 , borderBottomWidth : 0}]}>
            {this.getValue(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.printValue(2,1)} style = {[styles.block , { borderBottomWidth : 0}]}>
            {this.getValue(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.printValue(2,2)} style = {[styles.block , {borderRightWidth : 0 , borderBottomWidth : 0}]}>
            {this.getValue(2,2)}
          </TouchableOpacity>
        </View>
        <View style = {{marginBottom : 50}}></View>
        <Button onPress = {() => this.initial()} title = "New Game"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row : {
    display : 'flex',
    flexDirection : 'row',
  },
  block : {
    width : 100,
    height : 100,
    borderColor : 'black',
    borderWidth : 10,
    alignItems : 'center',
    justifyContent : 'center'
  },
  iconX : {
    color : 'red',
  },
  iconY : {
    color : 'green'
  }
});
