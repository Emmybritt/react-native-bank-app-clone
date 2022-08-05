import { View, Text, ScrollView,Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Input from "../../../common/input/Index";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../common/button/Index";
import { useNavigation } from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux'
import { loginUser, setErrorMsgNull } from "../../../redux/features/UserSlice";
import CustomToast from "../../../common/customToast/Index";
import { COLORS } from "../../../helpers/theme/constantstyles";

const TextLogin = () => {
  const [errors, setErrors] = useState({});
  const [isSecured, setSecuredTextEntry] = useState({
    password: true,
    confirm_password: true,
  });
  // const [isLoading, setIsLoding] = useState(false);
  const isLoading = useSelector(state => state.user.isLoginLoading);
  const [form, setForm] = useState({});
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === true) {
      setForm(prev => {
        return {...prev, username: ""}
      });
      setForm(prev => {
        return {...prev, password: ""}
      });

      navigation.navigate("verify email", {
        email: form.username
      });

    }
  }, [isLoggedIn])

  const handleSignInForm = () => {
    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: "The username field is required**"}
      })
    }if(!form.password){
      setErrors(prev => {
        return {...prev, password: "The password field is required**"}
      })
    }else{
      dispatch(loginUser(form))
    }
  };

  const errorMsg = useSelector(state => state.user.errorMsg);

  const setPasswordEntry = () => {
    setSecuredTextEntry((prev) => {
      return { ...prev, password: !isSecured.password };
    });
  };

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
    if (value !== "") {
      setErrors(prevError => {
        return {...prevError, [name]: null}
      })
    }else{
      setErrors(prevError => {
        return {...prevError, [name]: "This field is required**"}
      })
    }
    
  };

  const setConfirmPasswordEntry = () => {
    setSecuredTextEntry((prev) => {
      return { ...prev, confirm_password: !isSecured.confirm_password };
    });
  };

  const hideToast = () => {
    dispatch(setErrorMsgNull());
  }

  const showToast = () => {
    return (
      <CustomToast message={errorMsg} icon={<TouchableOpacity onPress={hideToast}><Ionicons name="close" size={20} color={COLORS.headingGrey} /></TouchableOpacity>} />
    )
}

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.logo}
          source={require("../../../../assets/images/Uicon-main1.png")}
        />
        <Text style={styles.label}>Sign in</Text>
        {errorMsg && showToast()}
        <Input
          onChangeText={(value) => {
            onChange({ name: "username", value });
          }}
          value={form.username}
          label="Enter Your username"
          error={errors.username}
        />
        <Input
          onChangeText={(value) => {
            onChange({ name: "password", value });
          }}
          value={form.password}
          onPress={setPasswordEntry}
          iconRight={<Ionicons name="key" size={18} color="gray" />}
          setSecuredTextEntry={setSecuredTextEntry}
          secureTextEntry={isSecured.password}
          entry={isSecured.password}
          iconstyle={{ color: "white" }}
          icon={
            <TouchableOpacity onPress={setPasswordEntry}>
              <Text style={{ color: "grey" }}>
                {isSecured.password ? (
                  <Ionicons name="eye-off" size={23} color="gray" />
                ) : (
                  <Ionicons name="eye" size={23} color="white" />
                )}
              </Text>
            </TouchableOpacity>
          }
          label="Enter Your Password"
          error={errors.password}
        />
        
        <TouchableOpacity onPress={() => {
          navigation.navigate("forget password")
        }}>
          <Text style={styles.decriptionText2}>
          Forgot password?
        </Text>
        </TouchableOpacity>
        
        <CustomButton
          onPress={handleSignInForm}
          isLoading={isLoading}
          title={isLoading ? 'please wait..': 'Sign in'}
        />
        <View style={styles.linkContainer}>
          <Text style={styles.decriptionText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("TestForm")
          }}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => {
            navigation.navigate("verify email")
          }}>
            <Text>verify email</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default TextLogin;
