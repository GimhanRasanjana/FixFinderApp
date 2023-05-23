import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverURL } from '../URL';


const BreakdownServiceCenters = ({route, navigation})=>{
    
    const [servicCenters,setServiceCenters] = useState([])
    const serviceType= route.params.serviceType
    const vehicleId=route.params.vehicleId
    console.log(serviceType)
    useEffect(()=>{
        serverCall()
        
    },[serviceType])

    const serverCall=()=>{
        const Url=serverURL+"ServiceCenterCN/getServiceCenters"
        const data={
                type:"Breakdown",
                service:serviceType,
                latitude:route.params.location.latitude,
                longitude:route.params.location.longitude,
                rangeRadius:(route.params.rangeRadius-300)/100000,
                
        }

        axios.post(Url,JSON.stringify(data))
        .then(response => {
            const svc_staions=[]
            const values = response.data.data;

            for(var i=0; i < values.length; i++ ){
                svc_staions.push(
                    {
                        sc_id:values[i].sc_id,
                        name:values[i].name,
                        contact_no:values[i].contact_no,
                        city:values[i].location,
                        price:values[i].price
                    }
                )
            } 
            setServiceCenters(svc_staions)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <View style={styles.container2}>
               {/* *******header************ */}
               <View style={styles.headerCard}>
        <LinearGradient colors={['#050A30', '#050A30']} style={styles.header}>
          <Text style={styles.headerText}>Select Service Center</Text>
        </LinearGradient>
        </View>
            {/* ************************ */}
            <View style={styles.scrollCard}>
            <ScrollView style={styles.container3} contentContainer={styles.contentContainer3}>
                <View style={styles.container4}>
                    
                    {
                        servicCenters.map((data, index)=>{
                            console.log(data)
                            console.log(index)
                             return(
                                <ServiceCentersCard key={index}sc_id={data.sc_id} serviceName={serviceType} name={data.name} city={data.city} price={data.price} vehicleId={route.params.vehicleId} navigation={navigation}></ServiceCentersCard>
                             )                  
                        })
                    }
                </View>  
            </ScrollView>
            </View>
        </View>
    )
};

const ServiceCentersCard = (props)=>{
    const viewService= ()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var time=today.getHours() + ":" + today.getMinutes()+":00"
        today = yyyy  + '/' + mm+ '/' + dd;
        props.navigation.navigate('ViewServiceCenter',{sc_id:props.sc_id,serviceName:props.serviceName,vehicleId:props.vehicleId,time:time, date:today,mainType:"Breakdown"})
    }
    
    return(
        <View style = {styles.container}>
            
            <View style = {styles.loginContainer}>
            <Text style={styles.labelTxt}>Service Center:{" "+props.name}</Text>
            <Text style={styles.labelTxt}>City:{" "+props.city}</Text>
            <Text style={styles.labelTxt}>Price(Rs):{" "+props.price}</Text>

            <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#050A30', '#050A30']} style={styles.loginButtonGradient}>
            <TouchableOpacity style={styles.viewDetButton} onPress={viewService} >
                <Text style={styles.viewTxt}>VIEW</Text>
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

   
    labelTxt:{
        width: 260,
        fontWeight:"bold",
        color:"black",
        fontWeight:"bold",
        justifyContent:"center",
        padding:10,
        marginLeft:12,
        

    },

    container:{
        flex:1,
        alignItems: 'center',
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    container4:{
        width:'100%',
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
        width:"100%",
        alignSelf:"center",
        borderRadius:6,
        marginTop:10,
    },
    loginContainer:{
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundColor:'#F5F5F5',
        
        borderRadius:20,
        width:300,
        margin:10,
        paddingTop:12,
        
        
        
    },

    loginButtonGradient:{
        
        justifyContent:"center",
        alignSelf:"center",
        width:'100%',
        marginTop:15,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },

    container3:{
        flex:1,
        width:'100%',
        borderRadius:6, 
        backgroundColor:'#fff',   
        marginTop:30,
        // alignItems:'center'
        
    },

    contentContainer3:{
        justifyContent:'center',
        alignItems:'center',
    },

    // *****************************
     
    headerCard:{
        height:'20%',
        width:'100%',
        backgroundColor:'blue'
  
      },
      header: {
        
        width:'100%',
        top:-10,
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
export default BreakdownServiceCenters;