import { StyleSheet } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:COLORS.bluebg,
    paddingHorizontal:'5%'

  },
  containerPrimary:{
    height:'100%',  
     paddingHorizontal:'5%',
    backgroundColor:'#f5f9f9',
    marginTop:'15%',
    paddingTop:'10%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  inputContainer:{
    display:'flex',
    flexDirection:'row',
    marginVertical:"10%",
    paddingHorizontal:"10%",
    justifyContent:'space-between'

  },
  buttonContainer:{
    marginTop:'20%',
    paddingHorizontal:'5%'
  },

  heading:{
    textAlign:'center',
    marginVertical:'10%',
    fontSize:18,fontWeight:'300',
    color:'#00090A'

  },
  input:{
    height:45,
    width:45,   
    borderWidth:3,
     borderRadius:5,
     paddingLeft:18

  },
  text:{
    textAlign:'center',
    color:COLORS.primary
  }

})

export default styles;