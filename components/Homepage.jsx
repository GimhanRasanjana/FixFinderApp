
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground } from 'react-native';


export default function Homepage({navigation}) {


  return (
    <>
    
    <ImageBackground
      source={require('../images/firstIMG.png')}
      style={{flex: 1,resizeMode: 'cover'}}
    >
       

      <View style={styles.btnCard}> 
        
        <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Home')}}>
            
            <Text style={styles.btnTxt}>Get started</Text>
            
            </TouchableOpacity>
        </View>
      
    </ImageBackground>
     

      
      

    
    </>
  )
};


const styles = StyleSheet.create({
   
    btnCard:{
      alignItems:'center',
      marginTop:780,
    },
   btn:{
    width:330,
    height:50,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
   },
    btnTxt:{
      fontSize:22,
      fontWeight:'bold',
      color:'#000',
      
      
    }
})
