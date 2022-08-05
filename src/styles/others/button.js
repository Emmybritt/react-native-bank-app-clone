import { StyleSheet } from "react-native";
import {COLORS } from '../../helpers/theme/constantstyles'

const styles = StyleSheet.create({
      button: {
            backgroundColor: COLORS.primary,
            width: '100%',
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 40,
            color: COLORS.white,
            display: 'flex',
            marginHorizontal: 'auto',
           marginVertical: 0
            
      },
      heading: {
            color: COLORS.white,
            textAlign: 'center',
            fontWeight:'500'
      }
})

export default styles;