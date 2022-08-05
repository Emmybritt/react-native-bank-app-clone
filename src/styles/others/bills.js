import { StyleSheet } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:COLORS.background,
    paddingHorizontal:'5%'

  },
  containerPrimary:{
    height:'60%',
    backgroundColor:COLORS.bluebg,
    borderRadius:40,
    marginTop:'10%',
    paddingHorizontal:'5%'

  },
  containerSecondary:{
    paddingHorizontal:"5%",
    marginTop:"5%"

  },
  input:{
    borderColor:COLORS.bluebg,
    borderBottomColor:COLORS.inputBorder,
    borderWidth:2,
    marginVertical:'10%',
    paddingBottom:10,

  },
  amount:{
    marginVertical:'10%',
    textAlign:'center',
    color:COLORS.primary,fontWeight:'bold',
    fontSize:20
  },
  detail:{
    marginBottom:'5%',
    color:COLORS.primary,
    fontWeight:'bold',
    fontSize:18
  },
  buttonContainer:{
    marginTop:'10%'
  },
  info:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:'5%'
  },
  text:{
    color:COLORS.primary
  }
})

export default styles;