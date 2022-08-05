import { StyleSheet } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor: '#E7EFF2',
    paddingHorizontal:'5%',
  },
  containerPrimary:{
    paddingHorizontal:'5%',
    backgroundColor:'#f5f9f9',
    height:'100%',
    marginTop:'15%',
    paddingTop:'10%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input:{
    // width:'100%',
    // height:40,
    // backgroundColor: COLORS.white,
    borderRadius:30,
    // paddingLeft: 16,

  },
  containerSecondary:{
    marginBottom:'10%'

  },
  link:{
    fontWeight:'bold',

  },
  buttonContainer:{
    paddingHorizontal:'5%',
    marginTop:'30%'
  },text:{
    marginBottom:8,
    marginLeft:16
  }

})

export default styles;