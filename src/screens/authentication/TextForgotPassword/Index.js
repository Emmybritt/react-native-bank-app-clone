import { View, Text, ScrollView,Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Input from "../../../common/input/Index";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../common/button/Index";
import { useNavigation } from "@react-navigation/native";

const TextForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const [isSecured, setSecuredTextEntry] = useState({
    password: true,
    confirm_password: true,
  });
  const [isLoading, setIsLoding] = useState(false);
  const [form, setForm] = useState({});

  const handleForgotPassword = () => {
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: "The email field is required"}
      })
    }
    console.log(form);
  };

  const navigation = useNavigation();



  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
    if (value !== "") {
      setErrors((prevErrors) => {
        return {...prevErrors, [name]: null}
      })
    }else{
      setErrors(prevErrors => {
        return {...prevErrors, [name]: "Ensure you enter your email"}
      })
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.logo}
          source={require("../../../../assets/images/warn.png")}
        />
        <Text style={styles.label}>Forgot Password</Text>
        <Input
          onChangeText={(value) => {
            onChange({ name: "email", value });
          }}
          error={errors.email}
        />
       
        
        <TouchableOpacity onPress={() => {
          navigation.navigate("TestForgotPassword")
        }}>
          <Text style={styles.decriptionText2}>
          Enter your registered email to reset your password
        </Text>
        </TouchableOpacity>
        
        <CustomButton
          onPress={handleForgotPassword}
          isLoading={isLoading}
          title="Reset Password"
        />
        <TouchableOpacity onPress={() => {
          navigation.navigate("TestForm")
        }}>
          <Text style={styles.link}>Back to Sign In</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
};

export default TextForgotPassword;
