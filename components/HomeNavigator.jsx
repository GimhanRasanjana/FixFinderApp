import { StyleSheet, Text, View, NavigateContainer } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login'
import * as React from  'react'
import FirstView from './FirstView';
import Registration from './Registration';
import HomeDash from './HomeDash';
import MyVehicle from './MyVehicle';
import RequestLocation from './RequestLocation';
import ServiceDash from './ServiceDash';
import MyService,{ViewBreakdownServices } from './MyService';
import BreakdownDash from './BreakdownDash';
import BreakdownServiceCenters from './BreakdownServiceCenters';
import ViewServiceCenter from './ViewServiceCenter';
import Inspection from './Inspection';
import InspectionDash from './InspectionDash';
import MaintainDash from './MaintainDash';
import SelectVehicle from './SelectVehicle';
import AddVehicle from './AddVehicle';
import WashVaxDash from './WashVaxDash';
import Feedback from './Feedback';
import PaymentGateway from './PaymentGateway';
import NormalServiceCenters from './NormalServiceCenters';
import SetDateTime from './SetDateTime';
import ViewSingleReservation from './ViewSingleReservation'
import ViewSingleBreakdownReservation from './ViewSingleBreakdownReservation';
// import StartUp from './StartUp';
import { useFonts } from 'expo-font';
import Homepage from './Homepage';
import BackButton from './BackButton';


const Stack = createNativeStackNavigator()

export default HomeNavigator = () =>{
    return (
        <NavigationContainer style={styles.navbar}>
            <Stack.Navigator screenOptions={{headerShown:false}}>
            {/* screenOptions={{headerShown:false}} */}
                <Stack.Screen name='Homepage' component={Homepage}></Stack.Screen>
                {/* <Stack.Screen name='StartUp' component={StartUp}></Stack.Screen> */}
                <Stack.Screen name='Home' component={FirstView}></Stack.Screen>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Register' component={Registration}/>
                <Stack.Screen name='HomeDash' component={HomeDash}/>
                <Stack.Screen name='MyVehicle' component={MyVehicle}/>
                <Stack.Screen name='SelectVehicle' component={SelectVehicle}/>
                <Stack.Screen name='RequestLocation' component={RequestLocation}/>
                <Stack.Screen name='ServiceDash' component={ServiceDash}/>
                <Stack.Screen name='MyService' component={MyService}/>
                <Stack.Screen name='BreakdownDash' component={BreakdownDash}/>
                <Stack.Screen name='BreakdownServiceCenters' component={BreakdownServiceCenters}/>
                <Stack.Screen name='NormalServiceCenters' component={NormalServiceCenters}/>
                <Stack.Screen name='ViewServiceCenter' component={ViewServiceCenter}/>
                <Stack.Screen name='Inspection' component={Inspection}/>
                <Stack.Screen name='InspectionDash' component={InspectionDash}/>
                <Stack.Screen name='MaintainDash' component={MaintainDash}/>
                <Stack.Screen name='WashVaxDash' component={WashVaxDash}/>
                <Stack.Screen name='AddVehicle' component={AddVehicle}/>
                <Stack.Screen name='Feedback' component={Feedback}/>
                <Stack.Screen name='PaymentGateway' component={PaymentGateway}/>
                <Stack.Screen name='SetDateTime' component={SetDateTime}/>
                <Stack.Screen name='ViewSingleReservation' component={ViewSingleReservation}/>
                <Stack.Screen name='ViewBreakdownServices' component={ViewBreakdownServices }/>
                <Stack.Screen name='ViewSingleBreakdownReservation' component={ViewSingleBreakdownReservation}/>
                <Stack.Screen name='BackButton' component={BackButton}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
 
})