import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground, Image ,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../URL';
import Feedback from "./Feedback"
import StripeApp from './PaymentGateway';
import { VehicleCard } from './MyVehicle';
import { Ionicons } from '@expo/vector-icons';

export default ViewSingleBreakdownReservation = ( {route, navigation} )=>{
    const [cusID, setCusId]= useState(0)
    const [Vehicle, setVehicle]=useState(null)

    
    const getCus =() =>{
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
    }
    useEffect(()=>{
        getCus()
    },[])
    
    useEffect(()=>{
        axios.post(`${serverURL}CustomerCN/getBreakdownReservationVehicle` ,JSON.stringify({
            r_id:route.params.r_id
        })).then(res=>{
            console.log(res.data)
            setVehicle(res.data)
        })
    },[])

    return(
        <View style={styles.container}>
          {/* *******header************ */}
          <View style={styles.headerCard}>
          <LinearGradient colors={c['#F5F5F5', '#F5F5F5']} style={styles.header}>
            <Text style={styles.headerText}>My Vehicles</Text>
          </LinearGradient>
          </View>
              {/* ************************ */}
              <View style={styles.scrollCard}>
            <ScrollView style={styles.container3}>
            <View style={styles.container2}>
            <Text style = {styles.vehiHeadTxt}>Service Details</Text>
                <View style = {styles.container}>

                <View style = {styles.loginContainer}>

                    {/* ************************* */}
                    <View style={{alignItems:'center',paddingTop:10,}}>
             <Ionicons name="md-car-sport" size={30} color="#7F00FF" />
            </View>
                    {/* ************************* */}
                    <Text style={styles.labelTxt}>Reservation ID:{" "+route.params.r_id}</Text>
                    <Text style={styles.labelTxt}>Status:{" "+route.params.status}</Text>
                    <Text style={styles.labelTxt}>Service Name:{" "+route.params.serviceName}</Text>
                    <Text style={styles.labelTxt}>Price(Rs):{" "+route.params.price}</Text>
                    <Text style={styles.labelTxt}>Service Center:{" "+route.params.serviceCenter}</Text>
                    
                </View>
                </View>
                {
                
                    Vehicle !==null?
                        <>
                            <Text style = {styles.vehiHeadTxt}>Vehicle Details</Text>
                          
                            <View style = {styles.container}>
                               <View style = {styles.loginContainer}>

                            {/* ******************** */}
                            <View style={{alignItems:'center',paddingTop:10,}}>
                              <Ionicons name="md-car-sport" size={30} color="#7F00FF" />
                              </View>
                              {/* ************************ */}
            
                            <VehicleCard type={ Vehicle.type} brand = {Vehicle.brand} model={Vehicle.model} year={Vehicle.year} v_no ={Vehicle.v_no} navigation={navigation}/>
                            </View>
                          </View>
                        </>
                        
                    : <></>
                }
                {
                        route.params.status=="Done" ?
                            <Feedback r_id={route.params.r_id} sv_id={route.params.sv_id} sc_id={route.params.sc_id} cus_id={cusID}  />
                            : route.params.status==="Accept" ? <StripeApp navigation={navigation} sv_id={route.params.sv_id} sc_id={route.params.sc_id} cus_id={cusID} r_id={route.params.r_id} price={route.params.price}/>
                            :<></>  

                    }
                <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#3050a4', '#3050a4']} style={styles.loginButtonGradient}>
                        <TouchableOpacity style={styles.viewDetButton} onPress={()=>{navigation.navigate('HomeDash')}} >
                            <Text style={styles.viewTxt}>Go To Dashboardd</Text>
                        </TouchableOpacity>
                </LinearGradient> 
            </View>

        </ScrollView>   
        </View>  
        </View> 
    )
    
}

const styles = StyleSheet.create({
  
    container:{
        flex:1,
        alignItems: 'center',
        
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
        backgroundColor:'#ECE3F0',
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
        color:'white'
    },
    viewDetButton:{
        paddingLeft:25,
        paddingRight:25,
        borderRadius:10,
        // width:'40%',
        justifyContent:"center",
        alignSelf:"center",
        marginTop:10,
        marginBottom:10,
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
        width:'74%'
    },
    container3:{
        flex:1,
        width:'100%',
        borderRadius:6, 
        backgroundColor:'#ffffff',   
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
        height:180,
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
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:590,
        width:400,
     }
})