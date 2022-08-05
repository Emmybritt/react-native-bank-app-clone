import { View, Text, TextInput } from 'react-native'
import styles from '../../styles/others/personalinfo';
import Button from '../../component/Button';

const PersonalInfo = () => {
      return (
            <View style={styles.container}>
                 

                  <Text style={styles.heading}>Personal Information</Text>
                  <Text style={styles.subheading}> Please as your name as it appears on your official documents and IDs</Text>

                  <View style={styles.containerPrimary}>
                        <TextInput placeholder='First Name'
                              style={styles.input}
                        />
                        <TextInput placeholder='Last Name'
                               style={styles.input}
                        />
                        <TextInput placeholder='Middle Name (Optional)'
                               style={styles.input}
                        />
                        <TextInput placeholder='Gender'
                               style={styles.input}
                        />
                        <TextInput placeholder='Date of Birth'
                               style={styles.input}
                        />
                        <TextInput placeholder='House Address'
                               style={styles.input}
                        />
                  </View>

                  <Button text='Next'/>
                  

            </View>
      )
}

export default PersonalInfo ;