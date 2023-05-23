import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import axios from 'axios'
import { serverURL } from '../URL';


// ********************
const initValues ={
  fullName:"",
  email:"",
  username:"",
  password:"",
  confirmPassword:"",
  contactNumber:"",
  address:"",
  nic:""
}

const initialErrors ={
  isNameError:false,
  errorName:'',
  isUrnError:false,
  errorUrnMsg:'',
  isAddressError:false,
  errorAddress:'',
  isContactNoError:false,
  errorContactNo:'',
  isNICError:false,
  errorNIC:'',
  isEmailError:false,
  errorEmail:'',
  isCreatePwError:false,
  errorCreatePw:'',
  isConfirmPwError:false,
  errorConfirmPw:'',
}
// ********************



export default RegisterComp = ({navigation}) => {

  // const Font = async () => {
  //   await Font.loadAsync({
  //     'signika-600': require('./path/to/Signika-SemiBold.ttf'),
  //   });
  // };
  
  // Font();
//  *************************

    const [values,setValues] =  useState(initValues)
    const [errors,setErrors] =  useState(initialErrors)

    const ValidateName = (val)=>{
        const regex = new RegExp(/^[a-zA-Z\s]{2,20}$/)
          
          if(!regex.test(val)){
            setErrors({...errors, 
              isNameError:true,
              errorName:'Invalid Name' })
          }else{
            setErrors({...errors, 
              isNameError:false,
              errorName:'' })
          }
    }

    const ValidateUsername = (val)=>{
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{6,16}$/)
        if(!regex.test(val)){
            setErrors({...errors, 
              isUrnError:true,
              errorUrnMsg:'Invalid Username'})
        }else{
          setErrors({...errors, 
            isUrnError:false,
            errorUrnMsg:'' })
        }
    }
    const ValidateAddress = (val)=>{
        const regex = new RegExp(/^[a-zA-Z0-9\s,'-]{5,100}$/)
  
      if(!regex.test(val)){
        setErrors({...errors,
          isAddressError:true,
          errorAddress:'Invalid Address'})

      }else{
          setErrors({...errors, 
            isAddressError:false,
            errorAddress:''})
      }
    }
    const ValidateContactNo = (val)=>{
        const regex = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
      
        if(!regex.test(val)){
          setErrors({...errors, 
            isContactNoError:true,
            errorContactNo:'Invalid Contact Number' })
      }else{
          setErrors({...errors, 
            isContactNoError:false,
            errorContactNo:'' })
      }
    }
    const ValidateNIC = (val)=>{
        const regex = new RegExp(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)
  
        if(!regex.test(val)){
          setErrors({...errors, 
            isNICError:true,
            errorNIC:'Invalid NIC' })
        }else{
          setErrors({...errors, 
            isNICError:false,
            errorNIC:'' })
        }
    }
    const ValidateEmail = (val)=>{
        const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  
        if(!regex.test(val)){
          setErrors({...errors, 
            isEmailError:true,
            errorEmail:'Invalid E-Mail' })
        }else{
          setErrors({...errors, 
            isEmailError:false,
            errorEmail:'' })
        }
    }
    const ValidatePw = (val)=>{
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,12}$/)
        if(!regex.test(val)){
          setErrors({...errors, 
            isCreatePwError:true,
            errorCreatePw:'Invalid Password' })
        }else{
          setErrors({...errors, 
            isCreatePwError:false,
            errorConfirmPw:'' })
        }
    }
    const ValidateCPw = (val)=>{
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,12}$/)
        console.log("check point "+values.password)
        if(!regex.test(val)){
          setErrors({...errors, 
            isConfirmPwError:true,
            errorConfirmPw:'Invalid Password' })
        }else if(new String(val).valueOf() != new String(values.password).valueOf()){
            
            setErrors({...errors, 
                isConfirmPwError:true,
                errorConfirmPw:'Password is not match!' })
        }
        else{
          setErrors(pre=>{return {...pre, 
            isConfirmPwError:false,
            errorConfirmPw:'' }})
        }
    }
    const errAlert = (msg)=>{
        if(msg==''){
            msg="Please fill the form"
        }
        Alert.alert("Alert",msg)
    }
    const sendDataServer = ()=>{
        axios.post(serverURL+"CustomerCN/customerRegistration/", JSON.stringify({
            fullName:values.fullName,
            username:values.username,
            nic:values.nic,
            address:values.address,
            email:values.email,
            password: values.password,
            confirmPassword:values.confirmPassword,
            contactNumber:values.contactNumber
        }))
        .then(function (response) {
           console.log(response.data);
            if (response.data.text=="Success") {
                Alert.alert("Registration Succesfull","Please Login")
                navigation.navigate('Login')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    const createAccountFunction = ()=>{
        return  errors.isNameError      || values.fullName          ===''    ? errAlert(errors.errorName)
        :       errors.isUrnError       || values.username          ===''    ? errAlert(errors.errorUrnMsg)
        :       errors.isCreatePwError  || values.password          ===''    ? errAlert(errors.errorCreatePw)
        :       errors.isConfirmPwError || values.confirmPassword   ===''    ? errAlert(errors.errorConfirmPw)
        :       errors.isAddressError   || values.address           ===''    ? errAlert(errors.errorAddress)
        :       errors.isContactNoError || values.contactNumber     ===''    ? errAlert(errors.errorContactNo)
        :       errors.isNICError       || values.nic               ===''    ? errAlert(errors.errorNIC)
        :       errors.isEmailError     || values.email             ===''    ? errAlert(errors.errorEmail)
        :       sendDataServer()
    }

//  *************************


  

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
            <Text style={styles.mainTopic}>Create an account</Text>
            <Text style={styles.txtPar}>Join now to access nearby garages and {'\n'} gett services in seconds</Text>
          </View>
        </View>
       
      {/* <View style={styles.imageContainer}>
        <ImageBackground
        source={require('../images/pic.jpg')}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          {/* Your login form goes here */}
        {/* </LinearGradient>
      </ImageBackground>
    <View style={styles.txtCard}>
        <Text style={styles.txt}>Sign in</Text>
      </View>
      </View> */} 
      
      <ScrollView style={styles.scroll}>
        <View style={styles.form}>
              {/* ******************** */}
              
              <Text style={styles.labelTxt} >Full Name</Text>
                        <TextInput style={!errors.isNameError? styles.input : styles.inputError} value={values.fullName} onChangeText={(newText)=>{
                            ValidateName(newText)
                            
                            setValues((prev)=>(
                                {...prev, fullName:newText}
                            ))

                        }}/>
                        <Text style={errors.isNameError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorName} </Text>

                        <Text style={styles.labelTxt}>Username</Text>
                        <TextInput style={!errors.isUrnError? styles.input : styles.inputError}  value={values.username} onChangeText={(newText)=>{
                            ValidateUsername(newText)
                            
                            setValues((prev)=>(
                                {...prev, username:newText}
                            ))

                        }} ></TextInput>
                        <Text style={errors.isUrnError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorUrnMsg} </Text>

                        <Text style={styles.labelTxt}>Password</Text>
                        <TextInput secureTextEntry={true} style={!errors.isCreatePwError? styles.input : styles.inputError} value={values.password} onChangeText={(newText)=>{
                            ValidatePw(newText)
                            console.log(newText)
                            setValues((prev)=>(
                                {...prev, password:newText}
                            ))

                        }}  />
                        <Text style={errors.isCreatePwError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorCreatePw} </Text>

                        <Text  style={styles.labelTxt}>Confirm Password</Text>
                        <TextInput secureTextEntry={true}  style={!errors.isConfirmPwError? styles.input : styles.inputError}  value={values.confirmPassword} onChangeText={(newText)=>{
                            ValidateCPw(newText)
                            console.log(newText)
                            setValues((prev)=>(
                                {...prev, confirmPassword:newText}
                            ))

                        }} />
                        <Text style={errors.isConfirmPwError ? styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorConfirmPw} </Text>

                        <Text  style={styles.labelTxt}>NIC</Text>
                        <TextInput style={!errors.isNICError? styles.input : styles.inputError} value={values.nic} onChangeText={(newText)=>{
                            ValidateNIC(newText)
                            setValues((prev)=>(
                                {...prev, nic:newText}
                            ))

                         }} />
                        <Text style={errors.isNICError? styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorNIC} </Text>

                        <Text  style={styles.labelTxt} >Email</Text>
                        <TextInput style={!errors.isEmailError? styles.input : styles.inputError} value={values.email} onChangeText={(newText)=>{
                            ValidateEmail(newText)
                            setValues((prev)=>(
                                {...prev, email:newText}
                            ))
                        }}/>
                        <Text style={errors.isEmailError ? styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorEmail} </Text>

                        <Text style={styles.labelTxt}>Contact Number</Text>

                        <TextInput style={!errors.isContactNoError? styles.input : styles.inputError} value={values.contactNumber} onChangeText={(newText)=>{
                            ValidateContactNo(newText)
                            setValues((prev)=>(
                                {...prev, contactNumber:newText}
                            ))

                        }}/>
                         <Text style={errors.isContactNoError? styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorContactNo} </Text>

                        <Text style={styles.labelTxt}>Address</Text>
                        <TextInput style={!errors.isAddressError ? styles.input : styles.inputError} value={values.address} onChangeText={(newText)=>{
                            ValidateAddress(newText)
                            setValues((prev)=>(
                                {...prev, address:newText}
                            ))
                        }}/>
                        <Text style={errors.isAddressError? styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorAddress} </Text>

              {/* ***************************** */}
          {/* <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />










          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a username"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your contact number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>NIC</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your NIC"
            value={nic}
            onChangeText={setNic}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
           */}
        </View>
      </ScrollView> 
      <View style={styles.btnCard}>
      <TouchableOpacity style={styles.button} onPress={createAccountFunction} >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.bottomTxt}>
          <Text> Already have an account? <Text style={styles.link}>Sign in</Text></Text>
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:'#ffffff',
    paddingBottom:20,
    // alignItems:'center'
    
    
  },
  imagePng:{
    width:45,
    height:45,
  },
  logo:{
    marginTop:30,
    width:'100%',
    height:50,
    
    alignItems:'center',
    justifyContent:'center',
    // marginVertical:10,
    flexDirection:'row',
  },
  logoTxt:{
   fontWeight:'bold',
   fontSize:20,

  },
  phase:{
   alignItems:'center',
  //  fontFamily: 'Signika-VariableFont_wght',
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
  // *******************
  scroll: {
    flex: 1,
    width: '100%',
    
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    


    
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'center',
   
    
  },
  labelTxt: {
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign:'left',
    alignSelf: 'stretch',
    marginTop: 10,
    color:'#ABA7A7',
    marginLeft:15,
  },
  input: {
    height: 40,
    width: 350,
    borderColor: '#EAEAF5',
    borderWidth: 1,
    borderRadius: 100,
    // fontWeight:'bold',
    padding: 10,
    // marginVertical: 10,
  },
  button: {
    backgroundColor: '#050A30',
    width:350,
    padding: 10,
    borderRadius: 100,
    marginTop: 15,
    marginBottom:5,
  },
  bottomTxt:{
   marginTop:5,
  },
  link:{
    color:'red',
    textDecorationLine:'underline',
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  btnCard:{
    alignItems:'center',
    
  },
  // new adding things
  
  inputError:{
    height: 40,
    width: 350,
    textAlign:'left',
    borderWidth: 1,
    color:'red',
    // fontWeight:'bold',
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
});
