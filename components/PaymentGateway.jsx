import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import { serverURL } from '../URL';
//ADD localhost address of your server
const API_URL = "http://localhost";

const StripeApp = props => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    console.log(cardDetails)
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete ) {
      Alert.alert("Please enter Complete card details and Email");
    
      return;
    }
   
    //2.Fetch the intent client secret from the backend
    try {
      axios.post(serverURL+"PaymentCN/handlePayment", JSON.stringify({
          r_id:props.r_id,
          sc_id:props.sc_id,
          amount:props.price,
          cardNo:`xxxx xxxx xxxx ${cardDetails.last4}`,
          cus_id:props.cus_id
       
      }))
      .then(function (response) {
        
        console.log(response);
          if (response.data.type=="Ok") {
             Alert.alert(response.data.text);
             props.navigation.navigate('MyService')
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.paymentTxt}>Payment Details</Text>
      {/* <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      /> */}
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    width:'100%',padding:20,
    justifyContent: "center",
    margin: 20,
  },

  paymentTxt:{
    fontWeight:"bold",
    color:"black",
    fontWeight:"bold",
    color:"#3050a4",
    padding:10,
    textAlign:'center',
    marginTop:10,
    marginBottom:10,
    fontSize:16,
},
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});