import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import { color } from "react-native-reanimated";
import { COLORS } from "../../../helpers/theme/constantstyles";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 48,
    flex:1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
 
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "700",
    fontSize: 33,
    color: COLORS.white,
    marginBottom: 30,
    textAlign: "center",
    textTransform: "capitalize"
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginBottom: 80,
  },
  decriptionText2: {
    color: "#eee",
    fontSize: 19,
    marginBottom: 50,
    textAlign: "center",
    paddingBottom: 22,
  },
  decriptionText: {
    color: "#eee",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 18,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 17,
  },
  link: {
    fontSize: 15,
    fontWeight: "600",
    marginTop:40,
    textAlign: "center",
    color: "#eee",
    marginHorizontal: 8,
  }
});
