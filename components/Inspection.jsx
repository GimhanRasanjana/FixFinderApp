import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Inspection =(props)=>{

    return (  
        <View style={styles.container}>
            <Text style={styles.previousTxt}>Previous Vehicles</Text>
            <View style={styles.secondContainer}>
            <LinearGradient  start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#98EC2D', '#17AD37']} style={styles.serviceButton}>
             
             <TouchableOpacity style={styles.addVehicle} >
                 <Text style={styles.vehicleTxt}>ADD NEW VEHICLE</Text>
             </TouchableOpacity>
             </LinearGradient>
            </View>   
        </View>
    )
};

    const styles = StyleSheet.create({
        container:{
            marginTop:20,
            flex: 1,
            width:'100%',
            alignItems: 'center',
            justifyContent: 'center',    
        },

        secondContainer:{
            flex: 1,
            width:'100%',
            alignItems: 'center',
            justifyContent: 'center',
        },

        previousTxt:{
            fontWeight:"bold",
            color:"#000",

             fontSize:18, 
        },

        vehicleTxt:{
            fontWeight:"bold",
            textAlign:"center",

            color:"#fff",
            // fontSize:16, 
        },

        serviceButton:{
            width:300,
            alignSelf:"center",
            borderRadius:6,
            padding:10
      },
    });

export default Inspection;