import { Button, SafeAreaView, StyleSheet, TouchableOpacity, View,Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import * as Location from 'expo-location';

const RequestLocation =({route,navigation})=>{
    const [location, setLocation] = useState({
        latitude :6.821306, 
        longitude : 80.041728,
        latitudeDelta: 0.0922,
        longitudeDelta:0.0421
      })
   const [rangeRadius, setRangeRadius] =useState(2500)
    const [errorMsg, setErrorMsg] = useState(null);
   
    useEffect(() => {
      userLocation()
    },[]);
  
    const userLocation = async ()=>{
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location_now = await Location.getCurrentPositionAsync ({
        enableHighAccuracy : true
      })
      console.log({
        latitude : location_now.coords.latitude,
        longitude : location_now.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta:0.0421,
        test:'check'
      })
  
      setLocation({
        latitude : location_now.coords.latitude,
        longitude : location_now.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta:0.0421
      })
    }

    const serviceType1= route.params.serviceType
    const servicePrimarytype = route.params.servicePrimarytype
    const vehicleId=route.params.vehicleId 

    console.log("check point vehicle ID "+route.params.vehicleId)
    const nextPage = servicePrimarytype=="Breakdown" ?"BreakdownServiceCenters" :"NormalServiceCenters"
    return (
       <ScrollView> 
        <View style={styles.container}>
        <MapView style={styles.map}
            region={location}
            onPress={ (event) => {
                const coords=event.nativeEvent.coordinate
                console.log(event.nativeEvent.coordinate)
                setLocation((prev)=>{return {...prev,
                    latitude:coords.latitude,
                    longitude:coords.longitude
                }})
            }}
        >
            {/* <Marker coordinate={location} title='Marker2'/> */}
            <Marker coordinate={location} title='Marker' draggable={true} />
            {/* <Marker coordinate={{
            latitude : location.latitude+(rangeRadius-290)/100000,
            longitude : location.longitude
            }} title='Marker 2' draggable={true} />
            <Marker coordinate={{
            latitude : location.latitude,
            longitude : location.longitude+(rangeRadius-290)/100000
            }} title='Marker 2' draggable={true} />
            <Marker coordinate={{
            latitude : location.latitude,
            longitude : location.longitude-(rangeRadius-290)/100000
            }} title='Marker 2' draggable={true} /> */}
            <Circle center={location} radius={rangeRadius}/>
        </MapView>
        <View style={styles.navbar}>
           
        <View style={styles.row}>

<TouchableOpacity style={styles.button} onPress={()=>{
        if(location.latitudeDelta>0.018 && location.longitudeDelta>0.008){
            setLocation((prev)=>{return {...prev,
            
            latitudeDelta: location.latitudeDelta/2,
            longitudeDelta:location.longitudeDelta/2
            }})
        }
        
        }}>
  <View style={styles.iconWrapper}>
    <Feather name="zoom-in" size={24} color="#050A30" />
  </View>
  <Text style={styles.buttonText}>Zoom In</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.button} onPress={()=>{
        if(location.latitudeDelta<0.4 && location.longitudeDelta<0.1){
            setLocation((prev)=>{return {...prev,
            
            latitudeDelta: location.latitudeDelta*2,
            longitudeDelta:location.longitudeDelta*2
            }})
        }
        }}>
  <View style={styles.iconWrapper}>
    <Feather name="zoom-out" size={24} color="#050A30" />
  </View>
  <Text style={styles.buttonText}>Zoom Out</Text>
</TouchableOpacity>


</View>



<View style={styles.row}>

<TouchableOpacity style={styles.button} onPress={()=>{
        if(rangeRadius<15000){
            setRangeRadius((prev)=>prev+500)
        }
        
        }}>
  <View style={styles.iconWrapper}>
    <Feather name="arrow-up" size={24} color="#050A30" />
  </View>
  <Text style={styles.buttonText}>Range Up</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={()=>{
        if(rangeRadius>2500){
            setRangeRadius((prev)=>prev-500)
        }
        }}>
  <View style={styles.iconWrapper}>
    <Feather name="arrow-down" size={24} color="#050A30" />
  </View>
  <Text style={styles.buttonText}>Range Down</Text>
</TouchableOpacity>


</View>


        </View>
        {/* ************************ */}
            <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#050A30', '#050A30']} style={styles.serviceButton}>
            <TouchableOpacity onPress={()=>{navigation.navigate(nextPage,{serviceType:serviceType1,vehicleId:vehicleId,location:location,rangeRadius:rangeRadius})}}>
                <Text style={styles.vehicleTxt}>LOCATE ME</Text>
            </TouchableOpacity>
            </LinearGradient>
        </View>
    </ScrollView>
    )
};

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            width:'100%',
            alignItems: 'center',
            justifyContent: 'center',
            
        },

        map: {
            width: '99%',
            height: 650,
          },
          navbar:{
            width: '100%',
            height:150,
            
            alignItems:'center',
            justifyContent:'center',
          },

        vehicleTxt:{
            fontWeight:"bold",
            textAlign:"center",
            color:"#fff",
            // fontSize:16, 
        },

        serviceButton:{
            width:315,
            alignSelf:"center",
            borderRadius:50,
            padding:10,
            marginTop:10,
      },

    //   ****************************
    row: {
        flexDirection: 'row',
        marginVertical: 10,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050A30',
        borderRadius: 50,
        width: 150,
        height: 50,
        marginHorizontal: 5,
      },
      iconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#BFD7ED',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
    });


export default RequestLocation;