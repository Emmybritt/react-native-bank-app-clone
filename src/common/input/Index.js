import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";

const Input = ({ icon, value, iconRight, onChangeText,error, iconstyle, label, style, ...props }) => {
  const setPassword = () => {
    console.log('it is working');
  }
  return (
    <View style={styles.containe}>
      {label && <Text style={[styles.label, {marginBottom: 10}]}>{label}</Text>}
      <View style={styles.inputContainer}>
        {iconRight && <Text>{iconRight}</Text>}
        <TextInput autoCapitalize = 'none'  {...props} placeholderTextColor='white' onChangeText={onChangeText} value={value} style={styles.input} />
        {icon && (
          <TouchableOpacity>
            <Text style={[styles.icon, iconstyle]}>{icon}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
