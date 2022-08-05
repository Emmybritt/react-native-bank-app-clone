import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

const RenderList = ({ bankData }) => {
  return (
    <View
      style={{
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingVertical: 10,
      }}
    >
      <Text>{bankData.name}</Text>
    </View>
  );
};

const CustomDropDown = ({
  data,
  placeHolderText,
  setDataName,
  setDataCode,
}) => {
  const [shouldDrop, setDropdown] = useState(false);
  const [List, setList] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropDown = () => {
    setDropdown(true);
  };

  const closeDropDown = () => {
    setDropdown(false);
  };

  useEffect(() => {
    if (data) {
      setList(data);
      // return;
    }
  });

  const HandleSetList = (item) => {
    console.log(item);
    setDataName(item.name);
    setDataCode(item.code);
    setSelectedItem(item);
    setDropdown(false);
  };

  return (
    <Pressable onPress={toggleDropDown} style={styles.select}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: -8 }}>
        <Image source={require(".././../../assets/images/aicon.png")} />
        <Text style={{ marginLeft: 8, color: "grey", fontSize: 16 }}>
          {selectedItem ? (
            selectedItem.name
          ) : (
            <Text>{placeHolderText && placeHolderText}</Text>
          )}
        </Text>
      </View>
      <TextInput editable={false} />
      {shouldDrop && (
        <View style={styles.dropdown}>
          <View style={styles.search}>
            <Ionicons name="search" size={19} color={"grey"} />
            <TextInput
              onChangeText={(event) => setSearchItem(event)}
              style={{ width: "90%", paddingLeft: 9, color: "black" }}
            />
            <TouchableOpacity onPress={closeDropDown}>
              <Ionicons name="close" size={18} />
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 13 }}>
            <ScrollView
              contentContainerStyle={{ flex: 1, flexGrow: 1 }}
              style={{ backgroundColor: "white" }}
            >
              {List.filter((val) => {
                if (searchItem == "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchItem.toLowerCase())
                ) {
                  return val;
                }
              }).map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    HandleSetList(item);
                  }}
                  key={index}
                >
                  <RenderList bankData={item} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default CustomDropDown;
