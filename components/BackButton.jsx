import React from 'react';
import { TouchableOpacity ,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ style }) => {
    const navigation = useNavigation();
  
    const handlePress = () => {
      navigation.goBack();
    };
  
    return (
      <TouchableOpacity style={[styles.backButtonContainer, style]} onPress={handlePress}>
        <Ionicons name="md-arrow-back" size={26} color="#fff" />
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    backButtonContainer: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 999,
    },
});
  
  export default BackButton;