import React from 'react';
import { Dimensions, Button, Text, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { DropdownState } from 'react-native-ultimate-modal-picker';
import { LineChart } from 'react-native-chart-kit';




export function Graph({navigation}) {
    
    const [ stateValue, setStateValue ] = useState('AL');

    const [estimates, setEstimates] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [stateName, setStateName] = useState("None");

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
    };

    if (estimates.length < 1) {
        return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Select a State to display the graph</Text>
            <DropdownState
            title="State"
            onChange={async (value) => {  
                const data = ((await getData(getCode(value)))); 
                setEstimates(data.est); 
                setLanguages(data.lan); 
                setStateName(data.name);}}
            />
        </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DropdownState
            title="State"
            onChange={async (value) => {  
                const data= await getData(getCode(value)); 
                setEstimates(data.est); 
                setLanguages(data.lan); 
                setStateName(data.name)
            }}
        />

        <Text> Top 10 non-English Language Speakers per State</Text>
        <Text>{stateName}(2013)</Text>

        <LineChart
            data={{labels: languages, datasets : [{data:estimates}]}}
            width={screenWidth - 10}
            height={400}
            chartConfig={chartConfig}
            verticalLabelRotation={45}
            horizontalLabelRotation={-70}
        />
        </View>
    );
}

function getCode(value){
    const stateMap = new Map();
    const codes = [1,2,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,45,46,47,48,49,50,51,53,54,55,56];
    const state = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
    for (var i = 0; i < codes.length; ++i){
        stateMap.set(state[i],codes[i]);
    }  
    return stateMap.get(value);
}

async function getData(state, numberOfLanguages = 10){

    const estimates = new Array();
    const languages = new Array();
    let stateName = null;
  
    estimates.length = 0;
    languages.length = 0;
  
    state = state < 10? "0"+state:state;
    const url = "https://api.census.gov/data/2013/language.html?get=EST,LANLABEL,LAN,NAME&for=state:" + state;
    const response = await fetch(url);
    const data = await response.json();
  
    data.sort((a,b)=>b[0]-a[0]);
      
    for (var i = 1; estimates.length<numberOfLanguages;++i){
      if (data.at(i).at(0) != null){
        estimates.push(data.at(i).at(0));
        languages.push(data.at(i).at(1));
      }
    }
  
    stateName = data[1][3];

    return {'est':estimates,'lan':languages,'name':stateName}   
  }

export default Graph;