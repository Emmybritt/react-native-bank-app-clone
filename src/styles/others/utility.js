import { StyleSheet } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:'5%',
    backgroundColor:COLORS.background

  },
  buttonContainer:{
    marginTop:'10%'

  },
  containerSecondary:{
    marginTop:'10%'
  },
  input:{
    marginBottom:'5%',
    height:48, 
    backgroundColor:COLORS.background,
    fontSize: 16,
    color:'grey',
    paddingLeft:5
    

  }
})

export default styles;