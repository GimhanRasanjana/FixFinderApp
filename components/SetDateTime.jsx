import { StyleSheet, View, Text, TouchableOpacity, Button, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const colors = ['#ECE3F0', '#ECE3F0'];
const colorHeader = ['#7F00FF', '#7F00FF'];

export default function ReservationDateAndTime({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateVal, setDateVal] = useState('');
  const [timeVal, setTimeVal] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ':00';
    setDateVal(fDate);
    setTimeVal(fTime);
    console.log(fDate + '(' + fTime + ')')

  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View style={styles.container}>
   {/* *******header************ */}
   <View style={styles.headerCard}>
        <LinearGradient colors={['#050A30', '#050A30']} style={styles.header}>
          <Text style={styles.headerText}>Select Date and Time</Text>
        </LinearGradient>
        </View>
            {/* ************************ */}

            <View style={styles.scrollCard}>

        <TouchableOpacity style={styles.button} onPress={() => showMode('date')}>
          <LinearGradient
            colors={['#8d99ae', '#8d99ae']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
            onPress={() => showMode('date')}
          >
            <Text style={styles.buttonText}><AntDesign name="calendar" size={24} color="white"  /> Date</Text>
            
            <Text style={styles.dateText}>{dateVal}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => showMode('time')}>
          <LinearGradient
            colors={['#8d99ae', '#8d99ae']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}><AntDesign name="clockcircleo" size={24} color="white" style={styles.icon} /> Time</Text>
            
            <Text style={styles.dateText}>{timeVal}</Text>
          </LinearGradient>
        </TouchableOpacity>


        {/* <View style={{ margin: 20 }}></View>
        <Button title='Submit' onPress={() => { navigation.navigate('ViewServiceCenter', { sc_id: route.params.sc_id, serviceName: route.params.serviceName, vehicleId: route.params.vehicleId, time: timeVal, date: dateVal }) }}>Press</Button> */}
          
        <TouchableOpacity style={styles.btmButton} onPress={() => { navigation.navigate('ViewServiceCenter', { sc_id: route.params.sc_id, serviceName: route.params.serviceName, vehicleId: route.params.vehicleId, time: timeVal, date: dateVal }) }}>
          <Text style={styles.btmButtonText}>Set Time & Date</Text>
        </TouchableOpacity>

      </View>


      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
      onChange={onChange}
    />)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
        justifyContent:'center',
    
  },
 
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
 
  
  button: {
    height: 90,
    width: '100%',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  
  gradient: {
    height: 90,
    width: '100%',
    borderRadius:15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold',
  },
  icon:{
    alignItems:'flex-start'
  },
  
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
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    
    
  },
  // ************************
  btmButton: {
    backgroundColor: '#050A30',
    width:'100%',
    padding: 10,
    borderRadius:15,
    marginTop:40,
  }, 
  
  btmButtonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    
  },

 
});