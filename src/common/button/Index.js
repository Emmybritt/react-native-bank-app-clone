import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { COLORS } from "../../helpers/theme/constantstyles";

const CustomButton = ({ title, disabled, onPress, style, isLoading }) => {
  return (
    <TouchableOpacity disabled={disabled}  onPress={onPress} style={styles.button}>
      <View>
        <View style={[styles.buttonContainer, style]}>
          <Text style={styles.btnText}>{title ? title : "button"}</Text>
          {isLoading && <ActivityIndicator color={COLORS.headingGrey} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
