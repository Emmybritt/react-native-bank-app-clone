import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Button from "../../component/Button";
import styles from "../../styles/others/changepassword";
import { useState } from "react";
import { COLORS } from "../../helpers/theme/constantstyles";

import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { changePassword } from "../../helpers/utils/Apiroutes/ServerRoutes";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import CustomButton from "../../common/button/Index";

const ChangePassword = () => {
  const [passwordVisible1, setPasswordVisible1] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [passwordVisible3, setPasswordVisible3] = useState(true);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getOldPassword = (value) => {
    setOldPassword(value);
  };

  const getNewPassword = (value) => {
    setNewPassword(value);
  };

  const getConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const passwordInfo = { oldPassword, newPassword, confirmPassword };

  const updatePassword = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await axiosInstance.post(`${changePassword}`, passwordInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        alert("password updated successfully");
      }

      if (!res.data.status) {
        alert("old password incorrect");
      }
    } catch (error) {
      alert("check your password fields and try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <View style={styles.containerSecondary}>
          <Text style={styles.text}>Old Password</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            activeOutlineColor={COLORS.primary}
            secureTextEntry={passwordVisible1}
            right={
              <TextInput.Icon
                name={passwordVisible1 ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible1(!passwordVisible1)}
              />
            }
            value={oldPassword}
            onChangeText={(value) => getOldPassword(value)}
          ></TextInput>
        </View>

        <View style={styles.containerSecondary}>
          <Text style={styles.text}>New Password</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            activeOutlineColor={COLORS.primary}
            secureTextEntry={passwordVisible2}
            right={
              <TextInput.Icon
                name={passwordVisible2 ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible2(!passwordVisible2)}
              />
            }
            value={newPassword}
            onChangeText={(value) => getNewPassword(value)}
            editable={oldPassword ? true : false}
          ></TextInput>
        </View>

        <View style={styles.containerSecondary}>
          <Text style={styles.text}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            activeOutlineColor={COLORS.primary}
            secureTextEntry={passwordVisible3}
            right={
              <TextInput.Icon
                name={passwordVisible3 ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible3(!passwordVisible3)}
              />
            }
            value={confirmPassword}
            onChangeText={(value) => getConfirmPassword(value)}
            editable={newPassword ? true : false}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>Forget Transaction PIN? </Text>
          <TouchableOpacity>
            <Text
              style={{ fontWeight: "bold", marginLeft: 7, color: "#0B535B" }}
            >
              Reset{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {/* <Button text='Save Changes' onPress={updatePassword}/> */}
          <CustomButton title="Save Changes" onPress={updatePassword} />
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
