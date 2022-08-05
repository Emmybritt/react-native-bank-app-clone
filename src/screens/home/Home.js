import {
  Image,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../helpers/theme/constantstyles";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  allTransactionHistory,
  walletDetails,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserProfile } from "../../redux/features/UserProfileSlice";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import NairaSvg from "../../common/NairaSvg";

const Home = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [balance, setBalance] = useState("0");
  const [image, setImage] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [bookBalance, setBookBalance] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [userDataValue, setUserDataValue] = useState();

  // console.log('From line 46 Home.js',userDataValue);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userProfile.isLoading);
  const isThere401Response = useSelector(
    (state) => state.userProfile.isThere401Response
  );

  const userInformation = useSelector((state) => state.userProfile.data);
 
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");

      dispatch(FetchUserProfile(token));
      if (isThere401Response) {
        navigation.navigate("welcome back");
      }
      const image = await AsyncStorage.getItem("profile");

      setImage(JSON.parse(image));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("firstName");
      const userData = await AsyncStorage.getItem("userResponseDatas");
      setUserDataValue(JSON.parse(userData));
    })();
  });



  const getTransactionHistory = async () => {
    try {
      const tok = await AsyncStorage.getItem("token");
      const token = JSON.parse(tok);
      // console.log('This is noe thw token for gotv',token);

      const res = await axiosInstance.get(`${allTransactionHistory}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Transactions of a user", res.data);

      setTransactionHistory(res.data.result);
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      getTransactionHistory();
    }, [])
  );

  const toggleBalance = () => {
    setIsVisible((prev) => !prev);
  };

  // const toggleBalance = async () => {
  //   const bal = await AsyncStorage.getItem("balance");
  //   const bookBal = await AsyncStorage.getItem("bookBalance");

  //   if (balance === bal) {
  //     setBalance("XXXXXXXXX");
  //     setBookBalance("XXXXXXXXX");
  //   } else if (balance === "XXXXXXXXX") {
  //     setBalance(bal);
  //     setBookBalance(bookBal);
  //   }
  // };

  return (
    // <Text>Home</Text>
    <View>
      <StatusBar />

      <View style={styles.containerPrimary}>
        <View style={styles.main}>
          <View>
            {
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  style={styles.image}
                  source={
                    image
                      ? { uri: image }
                      : require("../../../assets/images/ava.png")
                  }
                />
              </TouchableOpacity>
            }

            <View style={styles.textContainer}>
              <Text style={{ color: "white", fontWeight: "700" }}>
                Hello,
                {"\n"}
                {/* {userInformation.first_name} {userInformation.last_name} */}

                {userDataValue ? userDataValue.first_name : userInformation.first_name} { userDataValue ? userDataValue.last_name : userInformation.last_nameuserInformation.last_name} 
                {"\n"}
              </Text>
              <Text
                style={{ fontWeight: "400", color: "white", marginTop: -12 }}
              >
                { userDataValue ? userDataValue.account_number : userInformation.account_number }
              </Text>
              {isLoading && (
                <ActivityIndicator style={{ position: "absolute" }} />
              )}
            </View>
          </View>
          <Image
            style={{ height: 50, width: 50, marginTop: 8 }}
            source={require("../../../assets/images/bell.png")}
          />
        </View>

        <View style={styles.balanceContainer}>
          <View>
            <Text style={{ color: "white" }}>Available Balance</Text>
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: SIZES.h3 }}
            >
              {isVisible ? "\u20A6" + userInformation.balance : "XXXXXXXXX"}
            </Text>
            <Text style={{ color: "grey", marginTop: 4 }}>
              Book balance:{" "}
              {isVisible ? "\u20A6" + userInformation.book_balance : "XXXXXXXXX"}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("account info");
              }}
            >
              <Image
                style={{ marginTop: 8, marginBottom: 16 }}
                source={require("../../../assets/images/dots.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                toggleBalance();
              }}
            >
              {/* <Image source={require("../../../assets/images/eye.png")} /> */}
              <Ionicons
                name={isVisible ? "eye-off" : "eye"}
                size={22}
                color={isVisible ? "white" : COLORS.darkGreen}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerSecondary}>
        <View style={styles.topContainer}>
          <Text style={{ fontWeight: "bold" }}>Quick Actions </Text>
          <TouchableOpacity>
            <Text>view more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.label}
            onPress={() => navigation.navigate("transfer type")}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/images/trans.png")}
            />
            <Text style={styles.iconText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.label}
            onPress={() => alert("Coming soon.")}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/images/fxtrans.png")}
            />
            <Text style={styles.iconText}>P2P</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.label}
            onPress={() => navigation.navigate("transfer")}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/images/wallet-vector.png")}
            />
            <Text style={styles.iconText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.label}
            onPress={() => navigation.navigate("payment")}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/images/util.png")}
            />
            <Text style={styles.iconText}>Utilities</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cta}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 14, fontWeight: '800' }}>
            Start your Financial Journey
          </Text>
          <Text style={{ textAlign: "center", color: "white", fontSize: 12 }}>
            Save your money with relative ease
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <Text style={{ fontWeight: "900", color: '#000000', fontSize: 17 }}>Recent Activity</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("all transactions")}
          >
            <Text style={{color: '#7F7F7F', fontSize: 14, fontWeight: "700"}}> View more</Text>
          </TouchableOpacity>
        </View>
        {/* <Divider /> */}

        <View style={{ height: 800,overflow: "hidden", flex: 0, width: '100%' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {transactionHistory ? (
              transactionHistory.map((el, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Transaction Details", {
                        id: el.transaction_id,
                      });
                    }}
                    key={i}
                    style={styles.transaction}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: el.image_url }}
                        style={{ width: 50, height: 50, borderRadius: 15 }}
                      />
                      <View
                        style={{
                          marginLeft: "6%",
                        }}
                      >
                        <Text style={{ fontWeight: "500", fontSize: 10 }}>
                          {/* {newName} */} {el.to_account_name}
                        </Text>
                        <Text style={styles.action}>{el.date_created}</Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        `${el.debit_or_credit_text}` === "Debit"
                          ? { color: "red" }
                          : { color: "green" },
                        { fontWeight: "600" },
                        { marginTop: 16 },
                      ]}
                    >
                      {el.debit_or_credit_text === "Debit"
                        ? `- \u20A6 ${el.amount}`
                        : ` + \u20A6 ${el.amount}`}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <ActivityIndicator
                animating={true}
                color="#0B535B"
                size="large"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                }}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 64,
    paddingTop: Platform.OS === "ios" ? 16 : 0,
  },
  textContainer: {
    left: 80,
    top: -64,
  },
  containerSecondary: {
    // height: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "white",
    marginTop: -32,
    paddingHorizontal: 32,
  },
  topContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 13,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",

    paddingHorizontal: 0,
  },
  balanceContainer: {
    backgroundColor: COLORS.inputGreen,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: -80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cta: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 16,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
  },
  label: {
    marginTop: Platform.OS === "ios" ? 32 : 15,
    marginBottom: Platform.OS === "ios" ? 32 : 22,
    backgroundColor: COLORS.bluebg,
    height: 65,
    width: 65,
    borderRadius: 16,
    paddingHorizontal: 4,
    paddingVertical: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  transaction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  usecase: {
    left: "100%",
    top: "-60%",
  },
  debit: {
    color: "red",
    fontWeight: "bold",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 48,
    marginTop: 32,
  },
  transaction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconText: {
    position: "absolute",
    top: 75,
    fontSize: 12,
    alignSelf: "center",
  },
});

export default Home;
