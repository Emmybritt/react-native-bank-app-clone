import { StyleSheet } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";

export default StyleSheet.create({
  select: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  dropdown: {
    // position: "absolute",
    // flex: 1,
    backgroundColor: "white",
    width: "100%",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 10,
    // height,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
});
