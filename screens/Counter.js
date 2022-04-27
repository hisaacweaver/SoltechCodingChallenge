
import { StatusBar } from 'expo-status-bar';
import { Switch, ImageBackground, Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react';


export function Counter({navigation}){

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
      let secTimer = setInterval( () => {
        setTime(new Date().toLocaleTimeString())
      },1000)
  
      return () => clearInterval(secTimer);
    }, []);
  
    const [count, setCount] = useState(0);
  
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {setIsEnabled(!isEnabled); setCount(0);};
    
  
    return (
      <ImageBackground source={require("../assets/background.jpg")} style={styles.container}>
  
        <View style={styles.timeView}>
          <Text style={{fontSize:40,color:"#fff",fontStyle:"italic",textShadowColor:"dodgerblue",textShadowRadius:10,textShadowOffset:{width:5,height:5}}}>{time}</Text>
        </View>
  
        <View style={styles.counter}>
          <Text style={[styles.counterText,{textShadowColor:count%2==0?"green":"red"}]}>{count}</Text>
        </View>
  
        <View style={styles.buttons}>
  
          <TouchableHighlight style={styles.decrease} onPress={()=>setCount(count-(isEnabled?2:1))}>
              <Text style={{fontSize:40, color:'white',}}>-</Text>
          </TouchableHighlight>
        
          <TouchableHighlight style={styles.increase} onPress={()=>setCount(count+(isEnabled?2:1))}>
              <Text style={{fontSize:40, color:'white',}}>+</Text>
          </TouchableHighlight>
  
        </View>
  
        <View style={styles.increment}>
  
          <Text style={{fontSize:20,color:"#fff",right:10}}>{"\u00B1"}1</Text>
  
          <Switch
            trackColor={{ false: "#333333", true: "#C0C0C0" }}
            thumbColor={isEnabled ? "#333333" : "#C0C0C0"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
  
          <Text style={{fontSize:20,color:"#fff",left:10}}>{"\u00B1"}2</Text>
  
        </View>
  
        <StatusBar style="auto" />
      </ImageBackground>
    );
  }
  export default Counter;
  
  const styles = StyleSheet.create({
    buttons:{
      position: "absolute",
      top: "60%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
    },
    counter:{
      position: "absolute",
      top:"35%",
      height: 200,
      width: 200,
      flex:1,
      justifyContent:"center",
      alignItems:"center",
    },
    counterText:{
      fontSize:100,
      color:"white",
      textShadowRadius: 1,
      textShadowOffset:{width:1,height:1},    
    },
    decrease: {
      flex:.5,
      justifyContent: "center",
      alignItems:'center',
      height:75,
      width: 75,
      backgroundColor:"red",
      borderColor: "black",
    },
    increment:{
      flex:1,
      flexDirection: "row",
      position: "absolute",
      bottom: "20%",
      alignItems: "center",    
  
    },
    increase:{
      flex:.5,
      width:75,
      height:75,
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:"green",
      color:"green",
    },
    timeView:{
      bottom:200,
      //backgroundColor:"#fff3"
  
    },
    
  });