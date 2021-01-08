import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';



export default function App() {
  const [text, onChangeText] = React.useState('');
  const [countSms, setCount] = React.useState(0);
  const [countLimit, setLimit] = React.useState('60');


  const calculateSms = () => setCount(prevCount => {
    const words = text.trim().split(" ");
    prevCount = 0;
    let count = 0;
    words.forEach(word => {
      count += word.length;
      if (count > countLimit) {
        prevCount++;
        count = word.length
      }   
    })
    prevCount = count > 0 ? prevCount +1 : prevCount; 
    
    return prevCount;
  });


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={8}
        maxLength={1000}
        onChangeText={value => onChangeText(value)}
        value={text}
        textAlignVertical={'top'}
      />

      <View style={styles.limitRow}>
        <TextInput 
          maxLength={2}
          keyboardType='numeric'
          value={countLimit}
          onChangeText={value => setLimit(value)}
          style={ styles.inputLimit }>
        </TextInput>
        <Text 
          style={ styles.textLimit }>
            {'символів'}
        </Text>
      </View>

      <View 
        style={styles.btnContainer}>
        <TouchableOpacity 
          onPress={calculateSms}
          style={styles.button}>
          
          <Text 
            style={styles.btnText}>
              {`Порахувати кількість
              SMS`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.result}>
        <Text style={styles.resultText}>
          {'Потрібно смс:'}
        </Text>
        <Text style={ styles.countSms }>
          {countSms}
        </Text>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ccc',
    padding: 20,
  },
  textInput: {
    borderColor: 'black',
    marginTop: 30,
    borderWidth: 1,
    // height: 200,
    padding: 10,
    backgroundColor: 'white',
  },
  limitRow: {
    flexDirection: "row", 
    marginTop: 15
  },
  inputLimit: {
    height: 40, 
    width: 40, 
    padding: 10, 
    borderWidth: 1,
    backgroundColor: 'white',
  },
  textLimit: {
    padding: 7, 
    marginLeft: '5%', 
    fontSize: 18
  },
  btnContainer: { 
    marginTop: 10, 
    padding: 10 
  },
  button: {
    backgroundColor: '#2196F3', 
    alignItems: "center", 
    borderWidth: 1, 
    borderRadius: 10
  },
  btnText: {
    color: 'white', 
    padding: 10,
    fontSize: 18,
  },
  result: {
    flexDirection: "row", 
    marginTop: 25, 
    justifyContent: 'center' 
  },
  resultText: { 
    padding: 3,
    fontSize: 18,
  },
  countSms: {
    marginLeft: '5%', 
    fontSize: 22, 
    fontWeight: 'bold'
  }

});
