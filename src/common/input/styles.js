import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";

export default StyleSheet.create({
  inputContainer: {
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
  },
  containe: {
    marginVertical: 8,
  },
  icon: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  input: {
    width: "100%",
    fontSize: 16,
    paddingVertical: Platform.OS === "android" ? 9 : 14,
    color: 'white',
    paddingLeft: 5,
    
  },
  label: {
    color: COLORS.headingGrey,
    fontWeight: "400",
    marginBottom: 5,
    fontSize: 15,
    paddingHorizontal:12,
    
    
  },
  error: {
    color: "#f472b6",
    fontWeight: "500",
    paddingHorizontal: 12,
  }
});
