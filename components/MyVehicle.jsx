import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground, Image ,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../URL';
import { SelectList } from 'react-native-dropdown-select-list'
import { Ionicons } from '@expo/vector-icons';
import BackButton from './BackButton';

const MyVehicle =({route,navigation})=>{
    
    const [vehicles,setVehicles] = useState([])
    const [cusID,setCusId] =useState(0);
 
    const serverCall=()=>{
        const Url=serverURL+"customerCN/viewVehicles/"
        const data={
                cus_id: cusID        
        }
        axios.post(Url,JSON.stringify(data))
        .then(response => {
            let vehicles=[]
            const values = response.data;
            console.log(values)
            if(response.hasOwnProperty('data') ){
                vehicles = response.data;
            }

            setVehicles(vehicles)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        try{
            AsyncStorage.getItem('customerId').then(value => {
                console.log(value)
                setCusId(value)
                
            }).catch(err=>{
                console.log(err)
                
            })
        }catch(err){
            console.log(err)
        }
        console.log(cusID+"log1")
        serverCall()
            
    },[cusID])

    return ( 
        <>
       
        <View style={styles.container}>
        
            {/* *******header************ */}
            <View style={styles.headerCard}>
            
        <LinearGradient colors={['#050A30', '#050A30']} style={styles.header}>
          <Text style={styles.headerText}>My Vehicles</Text><BackButton />
        </LinearGradient>
        </View>
            {/* ************************ */}

            <View style={styles.scrollCard}>
            <ScrollView style={styles.container3}>
            
            {/* contentContainer={styles.contentContainer3}
            <Text style={styles.previousTxt}>My Vehicless</Text> */}
    
            <View style={styles.secondContainer}>
                {
                    vehicles.map((data, index)=>{
                        return(
                            <VehicleCard key={index} type={ data.type} brand={data.brand} model={data.model} year={data.year} v_no ={data.v_no} navigation={navigation} />
                        )
                    })
                }
          
            </View>
            </ScrollView>
            <LinearGradient   colors={['#050A30', '#050A30']} style={styles.loginButtonGradient}>
            <TouchableOpacity style={styles.viewDetButton} onPress={()=>{navigation.navigate('AddVehicle')}} >
                <Text style={styles.viewTxt}>Add Vehicle</Text>
            </TouchableOpacity>
            </LinearGradient>

            </View>
        </View>
        </>
    )
};

const VehicleCard= (props)=>{
    console.log(props.serviceType)
    return(
        <View style = {styles.container}>
        
        <View style = {styles.loginContainer}>
            
        <View style={{alignItems:'center',paddingTop:10,}}>
             <Ionicons name="md-car-sport" size={30} color="#050A30" />
            </View>

            <Text style={styles.labelTxt}>Type:{" "+props.type}</Text>
            <Text style={styles.labelTxt}>Brand:{" "+props.brand}</Text>
            <Text style={styles.labelTxt}>Model:{" "+props.model}</Text>            
            <Text style={styles.labelTxt}>Year:{" "+props.year}</Text>
            <Text style={styles.labelTxt}>Vehicle No:{" "+props.v_no}</Text>
        </View>
    
    </View>
    
    )
}
const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems: 'center',
        backgroundColor:'#fff',
        // justifyContent:'center',
        // backgroundColor:'red',
        // paddingTop:140,
    },

    addButton:{
       padding:10,
       borderRadius:10,
       marginTop: 240,
    
    },

    previousTxt:{
        fontWeight:"bold",
        color:"#3050a4",
        fontWeight:"bold",
        textAlign:"center",
        justifyContent:"center",
        padding:10,
        fontSize:20,
    },

    labelTxt:{
        width: 260,
        fontWeight:"bold",
        color:"black",
        fontWeight:"bold",
        justifyContent:"center",
        padding:10,
        

    },
    loginContainer:{
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundColor:'#F5F5F5',
        
        borderRadius:20,
        width:300,
        margin:10,
        padding:8,
        
    },
    container4:{
        // width:'100%',
        justifyContent:'center',
        alignItems:'center',
        
    },
    viewTxt:{
        fontWeight:"bold",
        textAlign:'center',
        fontSize:16,
        color:'white',
        padding:10,

    },
    viewDetButton:{
        paddingLeft:25,
        paddingRight:25,
        borderRadius:10,
        // width:'40%',
        justifyContent:"center",
        alignSelf:"center",
        // marginTop:10,
        // marginBottom:10,
    },
    linearGradient:{
        padding:15,
        // width:250,
        alignSelf:"center",
        borderRadius:6,
        marginTop:10,
    },
    loginButtonGradient:{
        borderRadius:100,
        justifyContent:"center",
        alignSelf:"center",
        width:'74%',
        marginTop:30,
    },
    container3:{
        flex:1,
        width:'100%',
        borderRadius:6, 
        backgroundColor:'#fff',   
        marginTop:30,
        // alignItems:'center'
        
    },
    
    headerCard:{
        height:'20%',
        width:'100%',
        backgroundColor:'blue'
  
      },
      header: {
        position:'relative',
        width:'100%',
        top:0,
        height:230,
        // height: '28%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom:50,
      },
      scrollCard:{
        marginTop:0,
        backgroundColor:'#fff',
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        height:680,
        width:405,
        
        
      }


})  

export default MyVehicle;
export {VehicleCard}