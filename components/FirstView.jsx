
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartUp({navigation}){
    
    return(
        <View style={styles.container}>
            
            <View style={styles.imageDiv}>
            <Image
                source={require('../images/non.jpg')}
                style={styles.imageJpg}
                />   
            </View>

            <View style={styles.Title}>
              <Text style={styles.titleTxt}>Convenient Car Service{'\n'} Service</Text>
              
            </View>
            <View style={styles.phaseTxt}>
               <Text style={styles.phasePar}>Our app streamlines vehicle{'\n'}
                maintenance by registering{'\n'}
                 vehicles, locating nearby garages,{'\n'}
                  and booking services, saving time{'\n'}
                   and effort while ensuring safety{'\n'}
                    and maintenance.</Text>
            </View>
        
           
            <View style={styles.btnCard}> 
            <TouchableOpacity style={styles.btnLog} onPress={()=>{navigation.navigate('Login')}}>
            
            <Text style={styles.btnTxt1}>Log in</Text>
            
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnSign} onPress={()=>{navigation.navigate('Register')}}>
            
            <Text style={styles.btnTxt2}>Sign Up</Text>
            
            </TouchableOpacity>

                {/* <Text style={{
                   backgroundColor:'red',
                   padding:15,
                   fontWeight:'bold',
                   fontSize:25,
                   color:'#ffffff',
                   borderRadius:8,
                }}onPress={()=>{navigation.navigate('Home')}}>START WITH US</Text> */}
            </View>
        </View>
    )
}

    const styles = StyleSheet.create({
        
        container:{
            backgroundColor:'#fff',
            flex:1,
            alignItems:'center'
        },
       
        btnCard:{
           alignItems:'center',
           width:'100%',
           height:150,
           
           justifyContent:'center',
            flexDirection:'row',
            marginVertical:10,
           
            
        },
        imageDiv:{
            width:400,
            height:400,
            backgroundColor:'green',
            
            margin:5,
            alignItems:'center'
        },
        imageJpg:{
            //  position:'absolute',
            //   top:4,
              width:470, 
              height:470, 
            resizeMode: 'contain',
                    
              
        },
        Title:{
          alignItems:'center',
          marginTop:40,
        //   marginVertical: 5,
        },
        titleTxt:{
          fontWeight:'bold',
          fontSize:32,
          textAlign:'center'
          
        },
        phaseTxt:{
            textAlign:'center',
            
            marginVertical:10,
        },
        phasePar:{
            fontSize:20,
            textAlign:'center',
        }
        ,btnTxt1:{
          fontWeight:18,
        },
        btnTxt2:{
            fontWeight:18,
            color:'#fff'
          },
        btnLog:{
            padding:10,
            borderRadius:24.5,
            marginVertical: 5,
            backgroundColor:'#fff',
            width:160,
            height:48.02,
            alignItems:'center',
            justifyContent:'center',
            borderColor:'black',
            borderWidth:0.98,
            marginRight:17,
            
        },
        btnSign:{
            padding:10,
            borderRadius:24.5,
            marginVertical: 5,
            backgroundColor:'black',
            width:160,
            height:48.02,
            alignItems:'center',
            justifyContent:'center',
            color:'#fff',
            marginLeft:17,
        },
        bottomTxt:{
            marginTop:5,
           },
           link:{
             color:'red',
             textDecorationLine:'underline',
           },


      
    });