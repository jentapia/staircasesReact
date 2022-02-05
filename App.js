import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  let [inputNumber, setInputNumber] = useState(0);
  let [res, setRes] = useState('');
  let [status, setStatus] = useState(false);
    
  function getStairs() {
    console.log(inputNumber);
    if (!inputNumber) {
        alert('Please Enter a Number');
        return;
      }
    if(parseInt(inputNumber) < 5 || parseInt(inputNumber) > 500){
      alert('Please Enter a Number Between 5 and 500');
      return;
    }

    fetch('http://localhost:8080/result?number='+inputNumber, {
      method: 'GET',  
      headers : { 
          'Content-Type': 'application/json',
      }
        
      }).then((response) => response.json())
      .then(data => {
          console.log(data);
          setRes(data);
          setStatus(true);
      })
        
    .catch(error => {
        console.log(error)
    });
    
    
  }

  let validate = (e) => {
    //console.log(e);
    let reg = /^[0-9]+$/;     //pattern   
    
    if (reg.test(e) === false) {   
      //console.log("Is not a number"); 
      setInputNumber('');
      return false;
    }
    else {
      //valid number
      setInputNumber(e);
      //console.log("Is a number");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>STAIRCASES</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a number of bricks"
          placeholderTextColor="#003f5c"
          onChangeText={(num) => validate(num)}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={getStairs}>
        <Text style={styles.text} >GET THE STAIRS</Text>
      </TouchableOpacity>

      <View> 
        {status ? <Text style={styles.titleRes}>Result: {res}</Text> : null }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#003f5c',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 70
  },
  
  inputView: {
    borderWidth: 2,
    borderColor: "lightseagreen",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
   
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },

  button: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "lightseagreen",
  },

  text: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  
  titleRes: {
    color: '#003f5c',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 30
  },

});
