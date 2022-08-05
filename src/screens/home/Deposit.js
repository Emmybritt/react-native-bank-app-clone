
import styles from "../../styles/others/deposit";
import { Image, Text, View, Pressable } from 'react-native';

// import AddMoney from './AddMoney'


const Deposit = ({navigation}) => {
      return (
            <View style={styles.container}>
            
                  <View style={styles.containerSecondary}>
                        <View style={styles.containerCards}>
                        <Pressable style={styles.card} >
                              <Image source={require('../../../assets/images/bank.png')} style={styles.image}  />
                              <Text style={styles.heading}>Bank Transfer</Text>
                              <Text  style={styles.text}>Add Money directly from your local bank account via obile or Internet banking</Text>

                        </Pressable>

                        <Pressable  style={styles.card} onPress={()=> navigation.navigate('add money')} >
                        <Image source={require('../../../assets/images/cc.png')} style={styles.image}  />
                              <Text  style={styles.heading}>Card TopUp</Text>
                              <Text  style={styles.text}>Add Money directly from your card at a fast speed</Text>


                        </Pressable>

                        <Pressable  style={styles.card}>
                        <Image source={require('../../../assets/images/cash.png')} style={styles.image} />
                              <Text  style={styles.heading}>Cash Deposit</Text>
                              <Text  style={styles.text}>Add Money directly from your local bank account via online or Internet banking</Text>
                        </Pressable>
                        </View>
                  </View>
            </View>
      )
}


export default Deposit;