import { Text, Pressable  , TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../styles/others/button';
import { useNavigation } from '@react-navigation/native';
// onPress={()=> navigation.navigate(`${name}`)}
//onPress={onPress}
// const disabled = 'false'
const Button = ({ text, name , onPress, disabled, color}) => {
      const navigation = useNavigation();
      return (
            <TouchableOpacity style={[styles.button]} onPress={()=> navigation.navigate(`${name}`)} onPressIn={onPress} disabled={disabled} activeOpacity={disabled ? 0.5 : 1}>
                  <Text style={styles.heading}>{ text }</Text>
            </TouchableOpacity>
      )
}

export default Button;