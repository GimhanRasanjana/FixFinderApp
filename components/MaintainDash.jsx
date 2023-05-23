import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from './BackButton';
const colors = ['#ffffff', '#ffffff']; 
const colorHeader = ['#050A30', '#050A30'];


const MaintainDash =({navigation})=>{
    return (
      <MaintainServices navigation={navigation}></MaintainServices>
    )
};

const MaintainServices = ({ navigation }) => {
    const buttonsData = [
      {
        name: 'Full Service',
        icon: 'truck',
        onPress: () => {
          navigation.navigate('SelectVehicle',{serviceType : "Full Service",servicePrimarytype:"NormalServiceCenters" });
        },
      },
      {
        name: 'Engine Tuneup',
        icon: 'bolt',
        onPress: () => {
          navigation.navigate('SelectVehicle',{serviceType : "Engine Tuneup",servicePrimarytype:"NormalServiceCenters" });
        },
      },
      {
        name: 'Auto AC',
        icon: 'wrench',
        onPress: () => {
          navigation.navigate('SelectVehicle',{serviceType : "Auto AC",servicePrimarytype:"NormalServiceCenters" });
        },
      },
      {
          name: 'Hybrid Battery Service',
          icon: 'wrench',
          onPress: () => {
            navigation.navigate('SelectVehicle',{serviceType : "Hybrid Battery Service",servicePrimarytype:"NormalServiceCenters" });
          },
        },
        {
          name: 'Full Scan Report',
          icon: 'wrench',
          onPress: () => {
            navigation.navigate('SelectVehicle',{serviceType : "Full Scan Report",servicePrimarytype:"NormalServiceCenters" });
          },
        }, 
        {
          name: 'Shock Absorber Repair',
          icon: 'wrench',
          onPress: () => {
            navigation.navigate('SelectVehicle',{serviceType : "Shock Absorber Repair",servicePrimarytype:"NormalServiceCenters" });
          },
        }, 
         
      ];
      
  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <LinearGradient colors={colorHeader} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
        <Text style={styles.headerText}>Maintain & Repair Types</Text>
        <BackButton style={styles.backButton} />
      </View>
      
      <View style={styles.card}>
        {buttonsData.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            activeOpacity={0.7}
            onPress={button.onPress}
          >
            <LinearGradient
              colors={colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            />
            <Text style={styles.buttonText}>{button.name}</Text>
            <View style={styles.iconContainer}>
              <View style={styles.circle}>
                <Icon name={button.icon} size={32} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
     
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A30',
    alignItems:'center',
  },
  backButton:{
    marginLeft:-60,
    marginTop:20,
   },
  header: {
    height: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerText: {
    fontSize:24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom:85,
  },
  card: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 35,
    borderTopRightRadius:35,
    paddingHorizontal: 8,
    paddingTop:15,
    marginTop:-30,
    alignItems:'center',
    width:405,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 90,
    width: '95%',
    borderRadius: 25,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    
    
  },
  buttonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: '#8C9EFF',
    backgroundColor:'#BFD7ED',
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    // backgroundColor: '#536DFE',
    backgroundColor:'#050A30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
 
});
export default MaintainDash;