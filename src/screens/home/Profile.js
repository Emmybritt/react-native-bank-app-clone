import {
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { COLORS, SIZES } from "../../helpers/theme/constantstyles";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import {
  uploadPicture,
  walletDetails,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import style from "../registration/NewWalletCreation/style";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserProfile } from "../../redux/features/UserProfileSlice";

const Profile = () => {
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("");
  const dispatch = useDispatch();
  const userInformation = useSelector(state => state.userProfile.data);
  // console.log('this is user profile', userInformation);

  const navigation = useNavigation();

  const checkAccountType = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await axiosInstance(`${walletDetails}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setAccountType(res.data.result[0].account_type);
    } catch (e) {}
  };

  checkAccountType();

  const getImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync();

    const formData = new FormData();
    let u =
      Platform.OS === "android" ? res.uri : res.uri.replace("file://", "");
    formData.append("ProfilePicture", res);

       console.log('This is the image',u,'This is the form data', formData)

    if (!res.cancelled) {
      const token = await AsyncStorage.getItem("token");
      // console.log(JSON.parse(token));
      // const token = JSON.parse(toke);

      setImage(res.uri);

      await AsyncStorage.setItem("profile", JSON.stringify(res.uri));

      const result = await axiosInstance.post(`${uploadPicture}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      console.log('This is the result',result);
    }
  };

  const displayImage = async () => {
    try {
      const image = await AsyncStorage.getItem("profile");

      setImage(JSON.parse(image));
    } catch (error) {
      alert("can't display picture at this time");
    }
  };

  displayImage();

  const getUserInfo = async () => {
    try {
      const firstName = await AsyncStorage.getItem("firstName");

      const lastName = await AsyncStorage.getItem("lastName");

      setFirstName(firstName);
      setLastName(lastName);
    } catch (error) {}
  };

  useEffect(() => {
    (async() => {
      const token = await AsyncStorage.getItem("token");

      dispatch(FetchUserProfile(token));
    })()
    getUserInfo();
    
  }, []);

  const getTierType = () => {
    if (userInformation.account_type === 'Tier_1') {
      return 'Tier 1'
    }else{
      return 'Tier 2'
    }
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <StatusBar />
      <View style={styles.containerPrimary}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => getImage()}>
            {/* {image &&  <Image  style={styles.image} source={{uri : image}}/>} */}

            {
              <Image
                style={styles.image}
                source={
                  image
                    ? { uri: image }
                    : require("../../../assets/images/avater.png")
                }
              />
            }
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>
          {userInformation.first_name} {userInformation.last_name}
        </Text>
        <Text style={styles.location}>Account Type: {getTierType()}</Text>
      </View>

      <View style={styles.containerSecondary}>
        <View style={styles.labelContainer}>
          <TouchableOpacity
            style={styles.label}
            onPress={() => navigation.navigate("account info")}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/images/user.png")}
            />
            <View style={styles.textInfoContainer}>
              <Text>Your Account</Text>
              <Text style={styles.layer2}>
                Name , Email, phone
              </Text>
            </View>
            <Image
              source={require("../../../assets/images/arrow1.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.label,
              accountType === "Tier_1"
                ? { display: "flex" }
                : { display: "none" },
            ]}
            onPress={() => navigation.navigate("upgrade account")}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/images/card2.png")}
            />
            <View style={styles.textInfoContainer}>
              <Text>Upgrade Account</Text>
              <Text style={styles.layer2}>Increase your spending limit</Text>
            </View>
            <Image
              source={require("../../../assets/images/arrow1.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.label}>
            <Image
              style={styles.icon}
              source={require("../../../assets/images/history.png")}
            />
            <View style={styles.textInfoContainer}>
              <Text>History Activities</Text>
              <Text style={styles.layer2}>Tracking, Alert, Notification</Text>
            </View>
            <Image
              source={require("../../../assets/images/arrow1.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.label}
            onPress={() => navigation.navigate("security")}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/images/lock.png")}
            />
            <View style={styles.textInfoContainer}>
              <Text style={styles.layer1}>Privacy & Security</Text>
              <Text style={styles.layer2}>Password , priviledge , Location</Text>
            </View>
            <Image
              source={require("../../../assets/images/arrow1.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate("welcome back");
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: COLORS.primary,
            fontWeight: "700",
            fontSize: 18,
            marginBottom: 16,
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bluebg,
    height: "100%",
  },
  containerPrimary: {
    backgroundColor: COLORS.bluebg,
    paddingTop: "20%",
    paddingBottom: 48,
  },
  layer2: { fontWeight: "300", color: "grey" },
  textInfoContainer: { justifyContent: "space-between" },
  imageContainer: {
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
    fontSize: SIZES.h3,
  },
  location: {
    textAlign: "center",
    fontWeight: "500"
  },
  heading: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: SIZES.h2,
    color: "#0B535B",
    fontWeight: "500",
  },
  containerSecondary: {
    backgroundColor: '#f5f9f9',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingHorizontal: 32,
    paddingVertical: 32,
    height: '100%'
  },
  label: {
    backgroundColor: 'white',
    marginBottom: 24,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 2,
    display: "flex",
    flexDirection: "row",
    borderRadius: 16,
  },
  layer1: {

  },
  labelContainer: {
    display: "flex",
  },
  icon: {
    marginRight: 12,
  },
  arrow: {
    position: "absolute",
    right: "5%",
    top: "50%",
  },
});

export default Profile;
