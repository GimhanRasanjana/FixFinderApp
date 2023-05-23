
import { StyleSheet, Text, View, TextInput,TouchableOpacity, ImageBackground ,Image,Alert , ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import axios from 'axios'
import { serverURL } from '../URL';

const initVals={
  username:'',
  password:''
}

const inputError ={
  isUrnError:false,
  errorUrnMsg:'',
  isPswError:false,
  errorPswMsg:'',
}
export default LoginComp = ({navigation}) => {  
  // ****************************
  
  const [values,setValues] = useState(initVals)
  const[errors, setErrors] = useState(inputError)

  const ValidateUsername =(val)=>{
      const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{6,16}$/)
      if(!regex.test(val)){
          setErrors({...errors, 
            isUrnError:true,
            errorUrnMsg:'Invalid Username' })
      }else{
        setErrors({...errors, 
          isUrnError:false,
          errorUrnMsg:'' })
      }
  }

  const ValidatePw =(val)=>{
      const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/)
      if(!regex.test(val)){
        setErrors({...errors, 
          isPswError:true,
          errorPswMsg:'Invalid Password' })
      }else{
        setErrors({...errors, 
          isPswError:false,
          errorPswMsg:'' })
      }
  }

  const errAlert = (msg)=>{
      if(msg==''){
          msg="Please fill the form"
      }
      Alert.alert("Alert",msg)
  }

  const save = async (customer_id)=>{
      try{
          await AsyncStorage.setItem("customerId", customer_id)
      }
      catch(err){
          console.log(err)
      }
  }

  const sendDataServer=()=>{

      axios.post(serverURL+"CustomerCN/customerlogin/", JSON.stringify({
          username:values.username,
          password: values.password

      }))
      .then(function (response) {
         console.log(response.data);
          if (response.data.hasOwnProperty('data')) {
              save(response.data.data.customer_id)
              navigation.navigate('HomeDash')
          }
      })
      .catch(function (error) {
          console.log(error);
      });     
  }

  const loginFunction = ()=>{
      return  errors.isUrnError       || values.username          ===''    ? errAlert(errors.errorUrnMsg)
      :       errors.isUrnError       || values.password          ===''    ? errAlert(errors.errorPswMsg)
      :       sendDataServer()
  }

  // ***************************

  return (
    <View style={styles.container}>
       
       <View style={styles.header}>
          <View style={styles.logo}>
          <Image
                source={require('../images/logo.png')}
                style={styles.imagePng}
                /> 
                  <Text style={styles.logoTxt}>Fixfinder</Text>
          </View>
          <View style={styles.phase}>
            <Text style={styles.mainTopic}>Welcome Back</Text>
            <Text style={styles.txtPar}>Enter your login information to access {'\n'}your account</Text>
          </View>
        </View>
      
      <View style={styles.formContainer}>
        {/* ******************************** */}
        <Text style={styles.labelTxt}>Username</Text>
                    <TextInput style={!errors.isUrnError? styles.input:styles.inputError} value={values.username} onChangeText={(newText)=>{
                        ValidateUsername(newText)
                        setValues((prev)=>(
                            {...prev, username:newText}
                        ))
                    }} />
        
                    <Text style={errors.isUrnError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorUrnMsg} </Text>

                    <Text style={styles.labelTxt}>Password</Text>
                    <TextInput secureTextEntry={true} style={!errors.isPswError? styles.input:styles.inputError} value={values.password} onChangeText={(newText)=>{
                        ValidatePw(newText)
                        setValues((prev)=>(
                            {...prev, password:newText}
                        ))
                    }} />
                    <Text style={errors.isPswError?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorPswMsg} </Text>

        <TouchableOpacity style={styles.button} onPress={loginFunction}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.bottomTxt}>
          <Text> Don't have an account? <Text style={styles.link}>Sign up</Text></Text>
          </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:"#ffffff",
    
   
    
  },
  header:{
    
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-50,
    
   
  },

  formContainer: {
    
    width: '80%',
   
    marginTop:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 15,
    color:'#ABA7A7',
  },
  input: {
    height: 40,
    width: 350,
    borderColor: '#EAEAF5',
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
    marginVertical: 10,
    fontWeight:'700'
  },
  button: {
    backgroundColor: '#050A30',
    width:350,
    padding: 10,
    borderRadius: 100,
    marginTop:20,
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  txt:{
    fontSize:62,
    color:'#ffffff',
    fontWeight:'bold'
    
  },
  // new things
  inputError:{
    height: 40,
    width: 350,
    textAlign:'left',
    borderWidth: 1,
    color:'red',
    fontWeight:'bold',
    padding: 10,
    marginTop:15,
    marginLeft:25,
    marginRight:25,
    borderRadius:100,
    borderColor:"red",
},
labelTxtError:{
  width: 260,
  textAlign:"left",
  // fontSize:15,
  color:"red",
  marginTop:3,
  marginBottom:10,
  marginLeft:-85
  
},
labelTxtErrorNone:{
  width: 260,
  textAlign:"center",
  display:"none",
  
},

// ****************************
imagePng:{
    width:45,
    height:45,
    
  },
  logo:{
    marginTop:30,
    width:'100%',
    height:50,
    
    alignItems:'center',
    
    // marginVertical:10,
    flexDirection:'row',
  },
  logoTxt:{
   fontWeight:'bold',
   fontSize:20,
  //  textAlign:'center',

  },
  phase:{
   alignItems:'center',
  
    fontSize: 16,
  },
  mainTopic:{
  marginTop:-15,
  fontWeight:'bold',
  fontSize:34,
  },
  txtPar:{
   color:'#D9D9D9',
   textAlign:'center',
   fontSize:14,
  },
  bottomTxt:{
    marginTop:5,
   },
   link:{
     color:'red',
     
   },
  
});
