
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity , Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import BackButton from './BackButton';
import { Ionicons } from '@expo/vector-icons';

const colors = ['#ECE3F0', '#ECE3F0']; // gradient colors

const colorHeader = [ '#050A30','#050A30' ];

export default function HomeDash({navigation}){
  return (
    <View style={styles.container}>

      <View style={styles.header}>
      
        <LinearGradient colors={colorHeader}  style={styles.gradient}start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
        <Text style={styles.headerText}>Request Service Dash</Text>
        <BackButton style={styles.backButton} />
        
      </View>

         <View style={styles.card}>
         
        <TouchableOpacity onPress={()=>{navigation.navigate('BreakdownDash')}} style={styles.button}>
          <LinearGradient
            colors={['#F5F5F5', '#F5F5F5']}
            
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Breakdown Services</Text>
            <Image
                source={require('../images/tow-truck.png')}
                style={styles.imagePng}
                />
           
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{navigation.navigate('InspectionDash')}} style={styles.button}>
          <LinearGradient
            colors={['#F5F5F5', '#F5F5F5']}
            
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Vehicle Inspection</Text> 
            <Image
                source={require('../images/searching.png')}
                style={styles.imagePng}
                />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('MaintainDash')}} style={styles.button}>
          <LinearGradient
           colors={['#F5F5F5', '#F5F5F5']}
           
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Vehicle Maintain & Repair</Text>
            <Image
                source={require('../images/repair.png')}
                style={styles.imagePng}
                />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('WashVaxDash')}} style={styles.button}>
          <LinearGradient
           colors={['#F5F5F5', '#F5F5F5']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Vehicle Wash & Detailing</Text>
            <Image
                source={require('../images/car-wash.png')}
                style={styles.imagePng}
                />
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A30',
  },
  backButton:{
   marginLeft:15,
   marginTop:20,
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
  imagePng:{
    position:'absolute',
    top:4,
    width:66.13, 
    height: 66.13, 
    resizeMode: 'contain',
    color:'#050A30',
    
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
    paddingTop:25,
  },
  button: {
    height:130,
    width: '100%',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    
  },
  
  gradient: {
    height: 130,
    width: '100%',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    justifyContent:'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight:'bold',
    marginTop:80,
   
  }
 
});