import { StyleSheet } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";

export default StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 40,
    color: COLORS.white,
   marginVertical: 0
},
buttonContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
},
btnText: {
  color: COLORS.white,
  fontWeight: "500",
  fontSize: 16,
  marginRight:5,
}

})