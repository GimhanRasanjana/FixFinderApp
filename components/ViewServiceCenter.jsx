
import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../URL';
import AsyncStorage from '@react-native-async-storage/async-storage'
const ViewServiceCenter = ({route, navigation})=>{

    const initVals ={
        serviceId:"",
        price:"",
        serviceName:"",
        serviceCenterId:route.params.sc_id,
        city:"",
        ServiceCenter:"",       
    }
    const [bookingDetails, setBookingDetails]= useState(initVals)
    useEffect(()=>{

        axios.get(`${serverURL}/ServiceCenterCN/viewServiceCenterByID/${route.params.sc_id}`)
        .then(res=>{
            console.log(route.params.vehicleId)
            console.log(route.params.sc_id)
            console.log(res.data)
            setBookingDetails(pre =>{ return {...pre,
                serviceCenterId:res.data.sc_id,
                city:res.data.address,
                ServiceCenter:res.data.name
                
            }})
            
            serverServiceCall(route.params.serviceName,route.params.sc_id)

        })
        .catch((err)=>{

        })
    },[route.params.sc_id])
   
    const serverServiceCall =(service,sc_id)=>{
        console.log(service)
        const data=JSON.stringify({
            "service":service,
            "sc_id":sc_id
        })
        //console.log(`${serverURL}ServiceCenterCN/getServiceByName`)
        axios.post(`${serverURL}ServiceCenterCN/getServiceByName`,data)
        .then(res=>{
            console.log(res.data)
            setBookingDetails(pre =>{ return {...pre,
                serviceId:res.data.sv_id,
                price:res.data.price,
                serviceName:res.data.serviceName
            }})

        })
        .catch((err)=>{

        })
    }
    
    return (
        <View style={styles.container2}>

            
              {/* *******header************ */}
              <View style={styles.headerCard}>
        <LinearGradient colors={['#050A30', '#050A30']} style={styles.header}>
          <Text style={styles.headerText}>Booking Confirmations</Text>
        </LinearGradient>
        </View>
            {/* ************************ */}
            <View style={styles.scrollCard}>
            <ScrollView style={styles.container3} contentContainer={styles.contentContainer3}>
                <View style={styles.container4}>
                    <Text style={styles.headingTxt}></Text>
                    <ServiceCentersCard SCname= {bookingDetails.ServiceCenter} vehicleId={route.params.vehicleId} sv_id={bookingDetails.serviceId} Sname ={bookingDetails.serviceName} date={route.params.date} time={route.params.time} city={bookingDetails.city} price={bookingDetails.price} mainType={route.params.mainType} sc_id={bookingDetails.serviceCenterId} navigation={navigation} ></ServiceCentersCard>
                </View>  
            </ScrollView>
            </View>
        </View>
    )
};

const ServiceCentersCard = (props)=>{
    const makeReservation=()=>{
        console.log("popa")
        var cus_id=1;
        try{
            AsyncStorage.getItem('customerId').then(value => {
                cus_id=value;
                const data=JSON.stringify({
                    cus_id:cus_id,
                    type : props.Sname,
                    time_slot: props.time,
                    date: props.date,
                    sv_id :props.sv_id,
                    sc_id :props.sc_id,
                    v_id :props.vehicleId,
                    mainType:props.mainType
                })
                console.log(data)
                axios.post(`${serverURL}CustomerCN/makeReservation`,data)
                .then(res=>{
                    console.log(res.data)
                    if(res.status==200){
                        Alert.alert("Reservation has successed!")
                        props.navigation.navigate('HomeDash')
                    }else{
                        console.log(res.status)
                        Alert.alert("Reservation has failed!")
                    }
                        
                })
                .catch(err=>{
                    Alert.alert("Reservation has failed!")
                })
                
            }).catch(err=>{
                console.log(err)
                
            })
        }catch(err){
            console.log(err)
        }
    }
    return(
        <View style = {styles.container}>
            <View style = {styles.loginContainer}>
            <Text style={styles.labelTxt}>Service Center:{" "+props.SCname}</Text>
            <Text style={styles.labelTxt}>Service Name:{" "+props.Sname}</Text>
            <Text style={styles.labelTxt}>Date:{" "+props.date}</Text>
            <Text style={styles.labelTxt}>Time:{" "+props.time}</Text>
            <Text style={styles.labelTxt}>City:{" "+props.city}</Text>
            <Text style={styles.labelTxt}>Price:{" "+props.price}</Text>
         
            
            <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#050A30', '#050A30']} style={styles.loginButtonGradient}>
            <TouchableOpacity style={styles.viewDetButton}  onPress={makeReservation} >
                <Text style={styles.viewTxt}>Make Reservation</Text>
            </TouchableOpacity>
            </LinearGradient>
            
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    container2:{
        flex:1,
        width:'100%',
        borderRadius:6,
        alignItems: 'center',
        justifyContent:'center',
    },

    headingTxt:{
        fontWeight:"bold",
        color:"#3050a4",
        fontWeight:"bold",
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
        marginLeft:15,
    },

    container:{
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius:20,
        width:300,
        margin:10,
        // padding:8,
    },
    container4:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    loginContainer:{
      backgroundColor:'#F5F5F5',
      borderRadius:20,
    },
       
       
 


    viewTxt:{
        fontWeight:"bold",
        textAlign:'center',
        fontSize:16,
        color:'white',
        
    },
    viewDetButton:{
        // position:'absolute',
        backgroundColor:'#050A30',
        padding:10,
        borderBottomRightRadius:20,
       borderBottomLeftRadius:20,
       
    },

    linearGradient:{ 
        // padding:15,
        width:200,
        alignSelf:"center",
        borderRadius:6,
        marginTop:10,
        
    },

    loginButtonGradient:{
        borderBottomRightRadius:20,
       borderBottomLeftRadius:20,
    },

    container3:{
        flex:1,
        width:'100%',
        borderRadius:6,
    },

    contentContainer3:{
        justifyContent:'center',
        alignItems:'center',
    },

    // ****************************************

    headerCard:{
        height:'20%',
        width:'100%',
        backgroundColor:'blue'
  
      },
      header: {
        position:'relative',
        width:'100%',
        
        height:250,
        
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        
      },
      scrollCard:{
        
       marginTop:10,
        backgroundColor:'#fff',
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        height:750,
        width:405,
       
        
      }
})
export default ViewServiceCenter;