import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { 
  useEffect, 
  useState 
} from 'react';

import Api from '../services/Api';

import { ICharacter } from '../types';

function RMCharacter() {

  const [character, setCharacter] = useState<ICharacter[]>();
  
  useEffect(() => {
    Api.get('character').then(
      res => {
        setCharacter(res.data.results)
      }
    )
  }, [])

  return(
    <SafeAreaView>
      <ScrollView>

        { character?.map(
          (item, index) => (
            <View key={index}>
              <Image 
                style={{ width: 100, height: 100 }}
                source={{ uri: item.image }}
              />
              <Text>{item.name}</Text>
            </View>
          )
        ) }
      </ScrollView>
    </SafeAreaView>
  )
}

export default RMCharacter