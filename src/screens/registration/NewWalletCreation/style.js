import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import { COLORS } from "../../../helpers/theme/constantstyles";
COLORS
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
  error: {
    paddingHorizontal: 15,
    color: "#f472b6",
  },
  input: {
    backgroundColor: "rgba(0,0,0,.52)",
    borderRadius: 100,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    paddingLeft: 24,
    paddingRight: 60,
    fontSize: 16,
    paddingVertical: 13,
    color: "white"
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.headingGrey,
    paddingHorizontal:12,
    marginVertical:9
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
