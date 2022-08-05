import {
  View,
  Text,
  TouchableOpacity,
  StyleS,
  TouchableOpacityheet,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Switch } from "react-native-paper";

const PrivacyAndSecurity = () => {
  const navigation = useNavigation();

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <TouchableOpacity style={styles.label}>
          <View style={{flexDirection: "row-reverse",paddingHorizontal: 9, justifyContent: 'space-between', alignItems: 'center'}}>
            <Switch
              color={COLORS.primary}
              style={styles.switch}
              value={isSwitchOn}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
              onChange={onToggleSwitch}
            />

            <Text style={styles.text}>Biometrics</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.label}
          onPress={() => navigation.navigate("change pin")}
        >
          <View>
            <Image
              source={require("../../../assets/images/arrow-icon.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Trasaction PIN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.label}
          onPress={() => navigation.navigate("change password")}
        >
          <View>
            <Image
              source={require("../../../assets/images/arrow-icon.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Password</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.bluebg,
    paddingHorizontal: "5%",
  },

  containerPrimary: {
    height: "100%",
    paddingHorizontal: "5%",
    backgroundColor: "#f5f9f9",
    marginTop: "15%",
    paddingTop: "10%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  label: {
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: 10,
    marginBottom: "10%",
    justifyContent: 'center',
    paddingBottom: 18
  },
  text: {
    fontWeight: "bold",
    paddingLeft: 16,
    paddingTop: 16,
  },
  image: {
    position: "absolute",
    right: 20,
    top: 16,
  },
  // switch: { height: 20, width: 20, position: "absolute", right: 40, top: 8 },
});

export default PrivacyAndSecurity;
