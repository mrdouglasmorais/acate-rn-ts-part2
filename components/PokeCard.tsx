import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable
} from 'react-native'

function PokeCard() {

  const [count, setCount] = useState(true);
  
  useEffect(() => {
    console.log('Use effect disparado')
  }, [count])

  return(
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Text>Texto Qualquer</Text>
      <Pressable
        onPress={() => setCount(!count)}
      >
        <Text>
          Click me
        </Text>
      </Pressable>
    </View>
  )
}

export default PokeCard