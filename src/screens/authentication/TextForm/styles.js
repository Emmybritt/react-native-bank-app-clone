import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import { color } from "react-native-reanimated";
import { COLORS } from "../../../helpers/theme/constantstyles";

export default StyleSheet.create({
  container: {
    backgroundColor: "rgb(43, 105, 106)",
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
    height: 200,
    width: 200,
    alignSelf: 'center'
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
    paddingHorizontal: 17,
  },
  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#eee",
    marginHorizontal: 8,
  }
});
