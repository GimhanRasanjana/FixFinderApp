import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import axios from 'axios'
import { serverURL } from '../URL';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SelectList } from 'react-native-dropdown-select-list'

// ********************
const initValues ={
    type:"",
    brand:"",
    model:"",
    year:"",
    v_no:"",
}

const initialErrors ={
    isTypeError:false,
    errorType:'',
    isBrandError:false,
    errorBrand:'',
    isModelError:false,
    errorModel:'',
    isYearError:false,
    errorYear:'',
    isVnoError:false,
    errorVno:'',
  }

// ********************



export default function AddVehicleComp(props){

    const [values,setValues]=useState(initValues)
    const [errors,setErrors] =  useState(initialErrors)
   
    const brandData = [
        {key:'Toyota', value:'Toyota'},
        {key:'Tesla', value:'Tesla'},
        {key:'BMW', value:'BMW'},
        {key:'Benz', value:'Benz'},
        {key:'Honda', value:'Honda'},
        {key:'Suziki', value:'Suziki'},
        
    ]
    const typeData = [
        {key:'Bus', value:'Bus'},
        {key:'Van', value:'Van'},
        {key:'Car', value:'Car'},
        {key:'Lorry', value:'Lorry'},
    
    ]

    const yearData = [
        {key:'1991', value:'1991'},
        {key:'1992', value:'1992'},
        {key:'1993', value:'1993'},
        {key:'1994', value:'1994'},
        {key:'1995', value:'1995'},
        {key:'1996', value:'1996'},
        {key:'1997', value:'1997'},
        {key:'1998', value:'1998'},
        {key:'1999', value:'1999'},
        {key:'2000', value:'2000'},
        {key:'2001', value:'2001'},
        {key:'2002', value:'2002'},
        {key:'2003', value:'2003'},
        {key:'2004', value:'2004'},
        {key:'2005', value:'2005'},
        {key:'2006', value:'2006'},
        {key:'2007', value:'2007'},
        {key:'2008', value:'2008'},
        {key:'2009', value:'2009'},
        {key:'2010', value:'2010'},
        {key:'2011', value:'2011'},
        {key:'2012', value:'2012'},
        {key:'2013', value:'2013'},
        {key:'2014', value:'2014'},
        {key:'2015', value:'2015'},
        {key:'2016', value:'2016'},
        {key:'2017', value:'2017'},
        {key:'2018', value:'2018'},
        {key:'2019', value:'2019'},
        {key:'2020', value:'2020'},
        {key:'2021', value:'2021'},
        {key:'2022', value:'2022'},
    ]
    const ValidateType = (val)=>{
        const regex = new RegExp(/^[a-zA-Z]{2,20}$/)
          
          if(!regex.test(val)){
            setErrors({...errors, 
                isTypeError:true,
                errorType:'Please select type' })
          }else{
            setErrors({...errors, 
                isTypeError:false,
                errorType:'' })
          }
    }

    const ValidateBrand = (val)=>{
        const regex = new RegExp(/^[a-zA-Z]{2,20}$/)
          
          if(!regex.test(val)){
            setErrors({...errors, 
                isBrandError:true,
                errorBrand:'Please select Brand' })
          }else{
            setErrors({...errors, 
                isBrandError:false,
                errorBrand:'' })
          }
    }
    const ValidateModel = (val)=>{
        const regex = new RegExp(/^[a-zA-Z]{2,20}$/)
          
          if(!regex.test(val)){
            setErrors({...errors, 
                isModelError:true,
                errorModel:'Please select valid model' })
          }else{
            setErrors({...errors, 
                isModelError:false,
                errorModel:'' })
          }
    }

    const ValidateYear = (val)=>{
        const regex = new RegExp(/^(?:(?:19|20)[0-9]{2})$/)
          
          if(!regex.test(val)){
            setErrors({...errors, 
                isYearError:true,
                errorYear:'Please select valid year' })
          }else{
            setErrors({...errors, 
                isYearError:false,
                errorYear:'' })
          }
    }
    const ValidateVno = (val)=>{ 
        const regex = new RegExp(/^([A-Z]{1,3})([0-9]{4})$/)
          
          if(!regex.test(val)){
            setErrors({...errors, 
                isVnoError:true,
                errorVno:'Please enter valid vehicle no' })
          }else{
            setErrors({...errors, 
                isVnoError:false,
                errorVno:'' })
          }
    }

    const errAlert = (msg)=>{
        if(msg==''){
            msg="Please fill the form"
        }
        Alert.alert("Invalid Inputs",msg)
    }

    const sendDataServer=async()=>{
        try{
            await AsyncStorage.getItem('customerId').then(value => {
                console.log(value)
                //setCusId(value)
                axios.post(serverURL+"CustomerCN/addVehicle/", JSON.stringify({
                    type:values.type,
                    brand:values.brand,
                    model:values.model,
                    year:values.year,
                    v_no:values.v_no,
                    cus_id:value
        
                }))
                .then(function (response) {
                   console.log(response.data);
                    if (response.data.text=="Success") {
                        Alert.alert("Alert","Vehicle Added Successfull")
                        props.navigation.navigate('HomeDash')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }).catch(err=>{
                console.log(err)
                
            })
        }catch(err){
            console.log(err)
        }

    }
    const addVehicleFunction = ()=>{
        return  errors.isTypeError      || values.type     ===''    ? errAlert(errors.errorType)
        :       errors.isBrandError     || values.brand    ===''    ? errAlert(errors.errorBrand)
        :       errors.isModelError     || values.model    ===''    ? errAlert(errors.errorModel)
        :       errors.isYearError      || values.year     ===''    ? errAlert(errors.errorYear)
        :       errors.isVnoError       || values.v_no     ===''    ? errAlert(errors.errorVno)
        :       sendDataServer()
    }

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
            <Text style={styles.mainTopic}>Add vehicle</Text>
            <Text style={styles.txtPar}>Register your vehicle with our app and  {'\n'} get more featuers</Text>
          </View>
        </View>
       
     
      
      <ScrollView style={styles.scroll}>
        <View style={styles.form}>
              {/* ******************** */}
              <Text style={styles.labelTxt} >Type</Text>
                        <SelectList 
                            boxStyles={!errors.isBrandError? styles.inputDropdown : styles.inputError}
                            dropdownStyles={
                                styles.Dropdown
                            }
                            setSelected={(val) => {
                                ValidateType(val)
                                setValues((prev)=>(
                                    {...prev, type:val}
                            ))}}
                            data={typeData} 
                            save={values.type}
                        />

                        <Text style={errors.isTypeError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorType} </Text>
                        
                        <Text style={styles.labelTxt}>Brand</Text>
                        <SelectList 
                            boxStyles={!errors.isBrandError? styles.inputDropdown : styles.inputError}
                            dropdownStyles={
                                styles.Dropdown
                            }
                            setSelected={(val) => {
                                ValidateBrand
                                setValues((prev)=>(
                                {...prev, brand:val}
                            ))} }
                            data={brandData} 
                            save={values.brand}
                        />
                      
                        <Text style={errors.isBrandError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorBrand} </Text>

                        <Text style={styles.labelTxt}>Model</Text>
                        <TextInput style={!errors.isModelError? styles.input : styles.inputError} value={values.model} onChangeText={(newText)=>{ 
                            ValidateModel(newText)
                            setValues((prev)=>(
                            {...prev, model:newText}
                        ))
                        }} />
                        <Text style={errors.isModelError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorModel} </Text>

                        <Text  style={styles.labelTxt}>Year</Text>
                        <SelectList 
                            boxStyles={!errors.isYearError? styles.inputDropdown : styles.inputError}
                            dropdownStyles={
                                styles.Dropdown
                            }
                            setSelected={(val) => {
                                ValidateYear
                                setValues((prev)=>(
                                {...prev, year:val}
                            ))} }
                            data={yearData} 
                            save={values.year}
                        />
                        <Text style={errors.isYearError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorYear} </Text>

                        <Text  style={styles.labelTxt}>Vehicle No</Text>
                        <TextInput style={!errors.isVnoError? styles.input: styles.inputError} value={values.v_no} onChangeText={(newText)=>{
                            ValidateVno(newText)
                            setValues((prev)=>(
                        {...prev, v_no:newText}
                        ))
                        }} />
                        <Text style={errors.isVnoError ?styles.labelTxtError:styles.labelTxtErrorNone}>{errors.errorVno} </Text>

             {/* ******************** */}
        </View>
        <View style={styles.btnCard}>
                    <TouchableOpacity onPress={addVehicleFunction} style={styles.button} >
                            <Text style={styles.buttonText}>Add vehicle</Text>
                        </TouchableOpacity>
                        </View> 

      </ScrollView> 
     
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
  header:{
  marginTop:50,
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
    marginTop:20,
    width: '100%',
    
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // backgroundColor:'green',
  


    
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
  inputDropdown: {
    height: 45,
    width: 350,
    fontWeight:'bold',
    borderWidth: 1,
    borderColor:"#EAEAF5",
    borderRadius: 100,
    
    
    
},
  button: {
    backgroundColor: '#050A30',
    width:350,
    padding: 10,
    borderRadius: 100,
    marginTop:20,
    
    
    
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
