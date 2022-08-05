import { StyleSheet } from "react-native";

import { COLORS} from "../../helpers/theme/constantstyles";



const styles = StyleSheet.create({
      container: {
            height:'100%'
      },
      containerPrimary: {
            backgroundColor: COLORS.primary,
            display: 'flex',
            flex:1,
           
            justifyContent: 'center',
          
      },
      containerSecondary: {
            paddingHorizontal: 48,
            paddingVertical: 32,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            backgroundColor:COLORS.white,
            marginTop: -32,
            justifyContent:"center"
            
      },
      heading: {
            color: '#242435',
            fontWeight: "700",
            fontSize: 30,
            marginVertical:40
      },
      image: {
            width:300,
            height: 300,
            alignSelf:'center'
      },
      icon: {
            marginHorizontal: 'auto',
            height: 7,
            width: 41,
            alignSelf:'center'
      }
})

export default styles