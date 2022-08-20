import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { 
  useEffect, 
  useState,
  useCallback 
} from 'react';

import Api from '../services/Api';

import { ICharacter } from '../types';

function RMCharacter() {

  const [ character, setCharacter ] = useState<ICharacter[]>();
  const [ showModal, setShowModal ] = useState(false)
  const [ characterDetails, setCharacterDetails ] = useState<ICharacter[] | undefined>()
  
  useEffect(() => {
    Api.get('character').then(
      res => {
        setCharacter(res.data.results)
      }
    )
  }, [])

  const getDataCharacter = (id: Number) => {
    const result: ICharacter[] | undefined = character?.filter( item => item.id === id )
    setCharacterDetails(result)
    console.log(characterDetails)
  }

  return(
    <SafeAreaView
      style={{ backgroundColor: '#7B25F0' }}
    >
      <ScrollView>
        <View
          style={styles.container}
        >
          { character?.map(
            (item, index) => (
              <View 
                style={styles.card}
                key={index}
              >
                <Modal
                  animationType='slide'
                  visible={showModal}
                  onRequestClose={
                    () => setShowModal(!showModal)
                  }
                >
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#7B25F0'
                  }}>
                    {/* {
                      character.find( item => item.id === selected )
                    } */}
                    <Text>
                      {item.name}
                    </Text>

                    <Pressable
                      onPress={ () => setShowModal(!showModal) }
                    >
                      <Text>Fechar Modal</Text>
                    </Pressable>
                  </View>
                </Modal>
                <Image 
                  style={{ width: 100, height: 100 }}
                  source={{ uri: item.image }}
                />
                <View
                  style={styles.textBox}
                >
                  <Text
                    style={styles.textName}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {item.species}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {item.gender}
                  </Text>
                  <Pressable
                    onPress={ () => {
                      getDataCharacter(item.id)
                      // setShowModal(!showModal)
                    } }
                  >
                    <Text> Ver mais </Text>
                  </Pressable>
                </View>
              </View>
            )
          ) }
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#7B25F0',
    width: Dimensions.get('window').width - 40,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    margin: 12
  },
  textBox: {
    flex: 1,
    paddingHorizontal: 15
  },
  textName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff'
  },
})

export default RMCharacter