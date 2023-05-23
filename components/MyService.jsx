import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground, Image ,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverURL } from '../URL';
import { Fontisto } from '@expo/vector-icons';



const  ViewServices = ({routes,navigation}) => {

    const [penddingServices,setPendingServices] = useState([])
    const [AcceptedServices,setAcceptedServices] = useState([])
    const [paidServices,setPaidServices] = useState([])
    const [cusID,setCusId] =useState(0);

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
    },["test"])
    useEffect(()=>{

        serverCall()
    },[cusID])

    const serverCall=()=>{
        const Url=serverURL+"customerCN/viewReservations/"
        const data={
                cus_id: cusID,
                status: "Pending"
                   
        }
        axios.post(Url,JSON.stringify(data))
        .then(response => {
            let services=[]
            const values = response.data;
            console.log(values)
            if(response.hasOwnProperty('data') ){
                services = response.data;
            }

            setPendingServices(services)
        })
        .catch(error => {
            console.log(error)
        })

        data.status="Accept"
        axios.post(Url,JSON.stringify(data))
        .then(response => {
            let services=[]
            const values = response.data;
            console.log(values)
            if(response.hasOwnProperty('data') ){
                services = response.data;
            }

            setAcceptedServices(services)
        })
        .catch(error => {
            console.log(error)
        })

        data.status="Done"
        axios.post(Url,JSON.stringify(data))
        .then(response => {
            let services=[]
            const values = response.data;
            console.log(values)
            if(response.hasOwnProperty('data') ){
                services = response.data;
            }

            setPaidServices(services)
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
        
    },["uniq"])

    return(
        <View style={styles.container2}>
             {/* *******header************ */}
             <View style={styles.headerCard}>
        <LinearGradient colors={['#050A30', '#050A30']} style={styles.header}>
          <Text style={styles.headerText}>My Services</Text>
        </LinearGradient>
        </View>
            {/* ************************ */}
            <ScrollView style={styles.container3} contentContainer={styles.contentContainer3}>
                <View style={styles.container4}>
                  
                    <Text style={styles.subHeadingTxt}>Pending</Text>
                    {   
                        penddingServices.map((data, index)=>{
                            return(
                                    <ServiceCard navigation={navigation} key={index} id={data.r_id} type={data.type} name={ data.serviceName} serviceCenter={data.name} sv_id={data.sv_id} sc_id={data.sc_id} status={data.status} price={data.price}></ServiceCard> 
                            )
                        })
                    }
                    <Text style={styles.subHeadingTxt} >To Pay & Confirm</Text>
                    {   
                        AcceptedServices.map((data, index)=>{
                            return(
                                    <ServiceCard navigation={navigation} key={index} id={data.r_id} type={data.type} name={ data.serviceName} serviceCenter={data.name} sv_id={data.sv_id} sc_id={data.sc_id} status={data.status} price={data.price}></ServiceCard> 
                            )
                        })
                    }

                    <Text style={styles.subHeadingTxt}>Paid & Done</Text>
                    {   
                        paidServices.map((data, index)=>{
                            return(
                                    <ServiceCard navigation={navigation} key={index} id={data.r_id} type={ data.type} name={ data.serviceName} serviceCenter={data.name} sv_id={data.sv_id} sc_id={data.sc_id} status={data.status} price={data.price}></ServiceCard> 
                            )
                        })
                    }  
                    {/* <ServiceCard id="1" type="Wash & Vax" name="Full Body Wash" servicecenter="Auto Miraj" navigation={navigation}></ServiceCard>
                    <ServiceCard id="2" type="Maintain" name="Engine TuneUp" servicecenter="Auto Miraj" navigation={navigation}></ServiceCard> */}
                </View>
            </ScrollView>
        </View>
    )
}
const  ViewBreakdownServices = ({routes,navigation}) => {

    const [penddingServices,setPendingServices] = useState([])
    const [AcceptedServices,setAcceptedServices] = useState([])
    const [paidServices,setPaidServices] = useState([])
    const [cusID,setCusId] =useState(0);

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
    },["test"])
    useEffect(()=>{

        serverCall()
    },[cusID])

    const serverCall=()=>{
        const Url=serverURL+"customerCN/viewBreakdownReservations/"
        const data={
                cus_id: cusID,
                status: "Pending"
                   
        }
        axios.post(Url,JSON.stringify(data))
        .then(response => {
            let services=[]
            const values = response.data;
            console.log(values)
            if(response.hasOwnProperty('data') ){
                services = response.data;
            }

            setPendingServices(services)
        })
        .catch(error => {
            console.log(error)
        })

        data.status="Accept"
        axios.post(Url,JSON.stringify(data))
        .then(response => {
            let services=[]
            const values = response.data;
            console.log(values)
            if(response.hasOwnProperty('data') ){
                services = response.data;
            }

            setAcceptedServices(services)
        })
        .catch(error => {
            console.log(error)
        })

        data.status="Done"
        axios.post(Url,JSON.stringify(data))
        .then(response => {
            let services=[]
            const values = response.data;
            console.log(values)
            if(response.hasOwnProperty('data') ){
                services = response.data;
            }

            setPaidServices(services)
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
        
    },["uniq"])

    return(
        <View style={styles.container2}>
            
             {/* *******header************ */}
             <View style={styles.headerCard}>
        <LinearGradient colors={['#050A30', '#050A30']} style={styles.header}>
          <Text style={styles.headerText}>My Service</Text>
        </LinearGradient>
        </View>
            {/* ************************ */}

               {/* ************************ */}
               <View style={styles.mainCard}>
            <View style={styles.scrollCard}>
            <ScrollView style={styles.container3} contentContainer={styles.contentContainer3}>
                <View style={styles.container4}>
                   
                    <Text style={styles.subHeadingTxt}>Pending</Text>
                    {   
                        penddingServices.map((data, index)=>{
                            return(
                                    <BreakdownServiceCard navigation={navigation} key={index} id={data.r_id} type={data.type} name={ data.serviceName} serviceCenter={data.name} sv_id={data.sv_id} sc_id={data.sc_id} status={data.status} price={data.price}></BreakdownServiceCard> 
                            )
                        })
                    }
                    <Text style={styles.subHeadingTxt} >To Pay & Confirm</Text>
                    {   
                        AcceptedServices.map((data, index)=>{
                            return(
                                    <BreakdownServiceCard navigation={navigation} key={index} id={data.r_id} type={data.type} name={ data.serviceName} serviceCenter={data.name} sv_id={data.sv_id} sc_id={data.sc_id} status={data.status} price={data.price}></BreakdownServiceCard> 
                            )
                        })
                    }

                    <Text style={styles.subHeadingTxt}>Paid & Done</Text>
                    {   
                        paidServices.map((data, index)=>{
                            return(
                                    <BreakdownServiceCard navigation={navigation} key={index} id={data.r_id} type={ data.type} name={ data.serviceName} serviceCenter={data.name} sv_id={data.sv_id} sc_id={data.sc_id} status={data.status} price={data.price}></BreakdownServiceCard> 
                            )
                        })
                    }  
                    {/* <ServiceCard id="1" type="Wash & Vax" name="Full Body Wash" servicecenter="Auto Miraj" navigation={navigation}></ServiceCard>
                    <ServiceCard id="2" type="Maintain" name="Engine TuneUp" servicecenter="Auto Miraj" navigation={navigation}></ServiceCard> */}
                </View>
            </ScrollView>
            </View>
            </View>
        </View>
    )
}

const ServiceCard= (props)=>{
    return(
        <View style = {styles.container}>
            <Text style={styles.labelTxt}>Service ID:{" "+props.id}</Text>
            <Text style={styles.labelTxt}>Type:{" "+props.type}</Text>
            <Text style={styles.labelTxt}>Name:{" "+props.name}</Text>
            <Text style={styles.labelTxt}>Service Center:{" "+props.serviceCenter}</Text>

            <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#050A30', '#050A30']} style={styles.loginButtonGradient}>
            <TouchableOpacity style={styles.viewDetButton} onPress={()=>{props.navigation.navigate('ViewSingleReservation',{'r_id':props.id, 'serviceName':props.name, 'serviceCenter':props.serviceCenter,'sv_id':props.sv_id, 'sc_id':props.sc_id, 'status':props.status,'price':props.price})}} >
                <Text style={styles.viewTxt}>VIEW</Text>
            </TouchableOpacity>
            <View style={styles.icon}>
            <Fontisto name="car" size={34} color="#050A30" />
            </View>
            </LinearGradient>
        </View>
    )
}
const BreakdownServiceCard= (props)=>{
    return(
        <View style = {styles.container}>
            <Text style={styles.labelTxt}>Service ID:{" "+props.id}</Text>
            <Text style={styles.labelTxt}>Type:{" "+props.type}</Text>
            <Text style={styles.labelTxt}>Name:{" "+props.name}</Text>
            <Text style={styles.labelTxt}>Service Center:{" "+props.serviceCenter}</Text>

            <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#050A30', '#050A30']} style={styles.loginButtonGradient}>
            <TouchableOpacity style={styles.viewDetButton} onPress={()=>{props.navigation.navigate('ViewSingleBreakdownReservation',{'r_id':props.id, 'serviceName':props.name, 'serviceCenter':props.serviceCenter,'sv_id':props.sv_id, 'sc_id':props.sc_id, 'status':props.status,'price':props.price})}} >
                <Text style={styles.viewTxt}>VIEW</Text>
            </TouchableOpacity>
            <View style={styles.icon}>
            <Fontisto name="car" size={34} color="black" />
            </View>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
  
    subHeadingTxt:{
        fontWeight:"bold",
        fontWeight:"bold",
        color:"red",
        padding:10,
        marginTop:10,
        marginBottom:10,
        fontSize:16,
    },
    
    container2:{
        flex:1,
        width:'100%',
        
        alignItems: 'center',
        justifyContent:'center',
        // backgroundColor:'#ECE3F0',
        backgroundColor:'red',
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
        padding:12,
        marginLeft:15,
    },

    container:{
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundColor:'#fff',
        borderRadius:25,
        width:330,
        margin:10,
        paddingTop:5,
        marginTop:30,
        
    },
    container4:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },

    viewTxt:{
        fontWeight:"bold",
        textAlign:'left',
        marginLeft:32,
        fontSize:16,
        color:'white'
    },
    viewDetButton:{
        // paddingLeft:25,
        // paddingRight:25,
        
       
        // alignSelf:"center",
        marginTop:30,
        marginBottom:10,
    },
    icon:{
    position:'absolute',
    backgroundColor:'red',
    left:290,
    top:20,
    borderRadius:100,
    
    },
    linearGradient:{
        padding:15,
        width:200,
        alignSelf:"center",
        borderRadius:6,
        marginTop:10,
    },

    loginButtonGradient:{
       
       height:65,
       borderBottomLeftRadius:25,
       borderBottomRightRadius:25,
       marginTop:10,
      
    },

    container3:{
        flex:1,
        width:405,
        borderTopRightRadius:35,
        borderTopLeftRadius:35,
        // backgroundColor:'#ECE3F0'.
        backgroundColor:'#F5F5F5',
        marginTop:-70,
        

    },

    contentContainer3:{
        justifyContent:'center',
        alignItems:'center',
        
    },
     // **********************************************NEW**************************
    // 
    headerCard:{
        height:'30%',
        width:'100%',
        backgroundColor:'blue'
  
      },
      header: {
        position:'relative',
        width:'100%',
        top:0,
        height:260,
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
    //   mainCard:{
        
    //     height:480,
    //     borderColor:'green'
    //   },
      scrollCard:{
        // marginTop:440,
        backgroundColor:'yellow',
        width:405,
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        // height:'auto',
        height:680,
        width:405,
        
        
      }

})



export default ViewServices;
export {ViewBreakdownServices }