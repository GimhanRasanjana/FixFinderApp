import React, { useState } from 'react';
import {
  StyleSheet,Text,View,SafeAreaView,TouchableWithoutFeedback,TouchableOpacity,Animated,Button,TextInput, Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { serverURL } from '../URL';

export default function Feedback( props) {
  const [starRating, setStarRating] = useState(null);
  const [feedback, setFeedback]= useState("")
  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    // <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
        <View></View>
        <View style={styles.stars}>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(1)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 1 ? 'star' : 'star-border'}
                size={32}
                style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(2)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 2 ? 'star' : 'star-border'}
                size={32}
                style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(3)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 3 ? 'star' : 'star-border'}
                size={32}
                style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(4)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 4 ? 'star' : 'star-border'}
                size={32}
                style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(5)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 5 ? 'star' : 'star-border'}
                size={32}
                style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
              />
            </Animated.View>
          </TouchableWithoutFeedback>

          
        </View>
        <View style={styles.writeReviewText}>
          <Text style = {styles.lableTxt}>Please write your Feedback here</Text>
          </View>
          <TextInput style ={styles.txtinputFeed} value={feedback} onChangeText={(newText)=>{
                        
                        setFeedback(newText)
                    }}>
          </TextInput>
          <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#3050a4', '#3050a4']} style={styles.SubmitBtn}>
          <TouchableOpacity onPress={()=>{
            const data= JSON.stringify({
              cus_id:props.cus_id,
              sc_id:props.sc_id,
              sv_id:props.sv_id,
              r_id:props.r_id,
              rating:starRating,
              feedback:feedback

            })
            console.log(data)
            axios.post(`${serverURL}CustomerCN/addFeedback`, data).then(res=>{
              console.log(res.data)
              if(res.status==200){
                Alert.alert("Feedback has Added")
              }else{
                Alert.alert("Feedback has not Added")
              }
              
            }).catch(
              err=>{
                Alert.alert("Feedback has not Added")
              }
            )
          }}> 
          <Text style={styles.SubmitTxt}>Submit</Text>
          </TouchableOpacity>
          </LinearGradient>
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeContainer:{
    flex:1,
    width:'100%',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  SubmitBtn:{
    padding:15,
    width:200,
    alignSelf:"center",
    borderRadius:6,
    marginTop:10,
    marginBottom:10
  },
  

  writeReviewText:{
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtinputFeed:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 320,
    textAlign:'center',
    borderWidth: 2,
    borderColor:"#444444",
    padding: 10,
    margin:25,
    borderRadius:6
  },

  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"red",
  },

  animatedScaleStyle:{
   
    alignItems: 'center',
    justifyContent: 'center',
  },

  lableTxt:{
    width: 260,
    fontWeight:"bold",
    color:"red",
    textAlign:'center',
    fontWeight:"bold",
  },

  SubmitTxt:{
  fontWeight:"bold",
  color:"#fff",
  fontSize:16,
  textAlign:"center",
  
},

inputError:{
  height: 50,
  width: 250,
  textAlign:'center',
  borderWidth: 2,
  padding: 10,
  marginTop:15,
  marginLeft:25,
  marginRight:25,
  borderRadius:6,
  borderColor:"red",
},

  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});