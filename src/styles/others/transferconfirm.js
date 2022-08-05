import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../helpers/theme/constantstyles";

const styles = StyleSheet.create({
      
      containerPrimary: {
            backgroundColor: COLORS.primary,
            paddingVertical: 32,  
      },
      containerSecondary: {
            backgroundColor: COLORS.background,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal:16
      },
      containerTertiary: {
            backgroundColor: COLORS.bluebg,
            marginTop: 16,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal: 32,
            paddingBottom:96
      },
      heading: {
            textAlign: 'center',
            color: COLORS.white,
            fontWeight:'300'
            
      },
      subheading: {
            color: COLORS.primary,
            fontWeight: '700',
            fontSize: SIZES.h2,
            marginVertical:12

      },
      amount: {
            textAlign: 'center',
            fontWeight: "bold",
            color: COLORS.primary,
            fontSize: 30,
            marginVertical:16
      },
      infoContainer: {
            display: 'flex',
            marginBottom: 48,
            justifyContent:'space-around'
      },
      info: {
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            marginBottom:10,
      },
      warning: {
            backgroundColor: COLORS.white,
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 24,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 32,
            justifyContent:'space-around'
         
      },
      image: {
            marginRight:48
      },
      checked: {
          alignSelf:'center'
      },
      icon: {
            position: 'absolute',
            left: '15%',
            top:'100%'

      },
      main: {
            marginTop: '30%',
            backgroundColor: COLORS.bluebg,
            // paddingTop:'10%'
            paddingVertical: "20%",
            marginHorizontal: 16,
            borderRadius: 16,
            paddingHorizontal:32

            
      },
      container: {
            backgroundColor: COLORS.white,
            height:'100%'
      },
      input:{
            borderWidth: 2,
            borderColor: COLORS.bluebg,
            borderBottomColor: COLORS.inputBorder,
            marginBottom:'10%',
            paddingBottom:16,
            color:'black',
            fontSize:18,
            paddingLeft:16,
            
      }
})

export default styles;