import { StyleSheet } from "react-native"
import { COLORS } from "../../helpers/theme/constantstyles";

const styles = StyleSheet.create({
      container: {
            height: '100%',
            backgroundColor: COLORS.background
      },
      containerSecondary: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: COLORS.background,
           
      },
      containerCards: {
            display: 'flex',
            flexDirection:'row',
            marginTop: 64,
            flexWrap: 'wrap',
            marginHorizontal: 32,   
            justifyContent:"space-between"
      },
      card: {
            backgroundColor: COLORS.white,
            marginTop: 16,
            width: '48%',
            paddingHorizontal: 10,
            paddingVertical: 8,
           
           
           borderRadius:10
      },
      heading: {
            fontWeight: 'bold',
            marginBottom:8
      },
      text: {
            fontSize: 10
      },
      main: {
            textAlign: 'center',
            color: COLORS.headingGrey,
            marginTop: 8,
            marginRight:70
      },
      image: {
            width: 20,
            height: 20,
            marginVertical:4
      },
      icon: {
            height: 12,
            width: 12,
            marginTop:8
      },
      iconContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 32,
            marginTop: 32,
            position: 'absolute',
            right:32
      },
      icons: {
            height: 25,
            width: 25,
            marginLeft:16
      }

})

export default styles;