import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity ,Alert, Button} from 'react-native';
import { Entypo , Feather } from '@expo/vector-icons'; 

export default class App extends Component {
  
  state = {
    grid : [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    counter : 0,
    currentPlayer : 1,
    p1 : 0,
    p2 : 0,
    
  }
  componentDidMount(){
    this.initial();
  }

  initial = () => {
    if(this.state.counter !== 0){
    const counter = this.state.counter + 1;
    this.setState({counter : counter});
    }
    this.setState({
      grid : [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer : this.state.counter % 2 == 1 ? 1 : -1,
      win : 0,
      
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
      const p1 = this.state.p1 + 1;
      this.setState({p1 : p1})
      this.setState({win : 1});
      const counter = this.state.counter + 1;
      this.setState({counter : counter});
      this.initial();
    }
    else if(sum === -3){
      Alert.alert("Player 2 win the game");
      const p2 = this.state.p2+ 1;
      this.setState({p2 : p2})
      this.setState({win : 1})
      const counter = this.state.counter + 1;
      this.setState({counter : counter });
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
    // var grid = this.state.grid;
    // let count = 0;
    //   for(let i = 0 ; i < 3 ; i++){
    //     for(let j = 0 ; j < 3 ; j++){
    //       if(grid[i][j] !== 0)
    //         count++;
    //     }
    //   }
    //   if(count === 9 && this.state.win){
    //     Alert.alert("Match Draw");
    //     this.initial();
    //   }
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

  resetscore(){
    this.setState({p1 : 0 , p2 : 0});
  }

  render(){
    return (
      <View style={styles.container}>
        <View style = {{marginBottom : 20 , borderColor : 'black' , borderWidth : 3 , padding : 30 , borderRadius : 20}}>
          <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Player 1 Score  <Feather style = {[styles.iconX , ]} name="x" size={20}  /> : {this.state.p1}</Text>
          <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Player 2 Score  <Entypo style = {[styles.iconY , ]} name="circle" size={20}  /> : {this.state.p2}</Text>
          <View style = {{marginBottom : 20}}></View>
          <Button onPress = {() => this.resetscore()} title = "Reset Score"/>

        </View>
        <Text style = {{marginBottom : 30 , fontSize : 18 , fontWeight : 'bold' }}>Player {this.state.currentPlayer === 1 ? <Feather style = {[styles.iconX , ]} name="x" size={18}  /> : <Entypo style = {[styles.iconY , ]} name="circle" size={18}  /> } Chance </Text>
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
