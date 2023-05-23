
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import BackButton from './BackButton';


const colors = ['#ECE3F0', '#ECE3F0']; // gradient colors
const colorHeader = [ '#050A30','#050A30' ];



export default function BreakDownTypes({navigation}){
  return (
    <>
    {/* <View>
    <BackButton />
    
  </View> */}

    <View style={styles.container}>
    <BackButton />

      <View style={styles.header}>
     
        <LinearGradient colors={colorHeader}  style={styles.gradient}start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
        <Text style={styles.headerText}>Home Dash</Text>
        
      </View>

                  <View style={styles.card}>

        <TouchableOpacity onPress={()=>{navigation.navigate('MyVehicle')}} style={styles.button}>
          <LinearGradient
            colors={['#fff', '#fff']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>My Vehicle</Text>
            
            <AntDesign name="right" size={24} color="#000" style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{navigation.navigate('ServiceDash')}} style={styles.button}>
          <LinearGradient
            colors={['#fff', '#fff']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Request Service</Text> 
            <AntDesign name="right" size={24} color="#000" style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('MyService')}} style={styles.button}>
          <LinearGradient
            colors={['#fff', '#fff']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>My Service</Text>
            <AntDesign name="right" size={24} color="#000" style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('ViewBreakdownServices')}} style={styles.button}>
          <LinearGradient
            colors={['#fff', '#fff']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>My Breakdown Services</Text>
            <AntDesign name="right" size={24} color="#000" style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
    
    
         </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A30',
  },
  header: {
    height: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerText: {
    fontSize: 28,
    // fontSize:40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: -50,
    // marginLeft:20,
    
  },
  
  logo: {
    height: '50%',
    width: '80%',
    resizeMode: 'contain',
  },
  card: {
    width: '100%',
    height: '85%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    marginTop: 140,
    elevation: 10,
    padding: 20,
    paddingTop:55,
  },
  button: {
    height: 90,
    width: '100%',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    
    elevation: 5,
  },
  
  gradient: {
    height: 90,
    width: '100%',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight:'bold',
  }
 
});