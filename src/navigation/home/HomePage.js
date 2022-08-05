import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View, Text, Image } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";
import { Home } from "../../helpers/utils/screen/ScreenImports";

import {
  TransferFunds,
  Deposit,
  WithdrawFunds,
  PaymentAndBills,
  TransferConfirm,
  SavingsDashboard,
  Profile,
} from "../../helpers/utils/screen/ScreenImports";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export default function HomePageNavigator() {
  return (
    <>
      <StatusBar />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {},
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: (isFocused) => (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/home.png")}
                  resizeMode="contain"
                  style={{
                    tintColor: isFocused ? COLORS.primary : "grey",
                  }}
                />
                <Text style={{ color: COLORS.primary }}>Home</Text>
              </View>
            ),
          }}
        />
        {/* <Tab.Screen name='Saving' component={SavingsDashboard} options={{
            tabBarIcon: (focused) => (
              <View>
                <Image source={require('../../../assets/savings.png')} resizeMode='contain'
                  style={{
                    tintColor: focused ? 'grey' : 'black'
                  }}/>
                <Text style={{color:COLORS.primary, textAlign:'center'}}>Savings</Text>
              </View>
            )
              
            
          }}/>
          <Tab.Screen name='Investment' component={''}  options={{
            tabBarIcon: (focused) => (
              <View>
                <Image source={require('../../../assets/investment.png')} resizeMode='contain'  style={{
                    tintColor: focused ? 'grey' : 'black'
                  }} />
                <Text style={{color:COLORS.primary, textAlign:'center'}}>Investment</Text>
              </View>
            )
              
            
          }}/> */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: (focused) => (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/profile.png")}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? COLORS.primary : "black",
                  }}
                />
                <Text style={{ color: COLORS.primary, textAlign: "center" }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
