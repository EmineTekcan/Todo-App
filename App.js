import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import colors from './assets/colors'
import { Feather } from '@expo/vector-icons';
import { useEffect, useLayoutEffect, useState } from 'react';
import tempData from './tempData';
import TodoList from './src/components/TodoList';
import AddListModal from './src/components/AddListModal'
import firebase_app from './firebaseConfig'
import { getFirestore } from "firebase/firestore";
import { collection, getDocs,deleteDoc  } from "firebase/firestore";


const db = getFirestore(firebase_app);

export default function App() {

  const [data, setData] = useState([])
  const [addTodoVisible, setAddTodoVisible] = useState(false)

  const [show,setShow]=useState(false)

  useLayoutEffect(() => {
    getData()
  },[addTodoVisible,show])

  const getData = async () => {
    try {
      datas = []
      const querySnapshot = await getDocs(collection(db, "todolist"));
      querySnapshot.forEach((doc) => {
        datas.push(doc.data())
      });

      setData(datas)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={styles.container}>

      <View>
        <Modal

          animationType="slide"
          transparent={false}
          visible={addTodoVisible}
          onRequestClose={() => {
            setAddTodoVisible(!addTodoVisible)
          }}>
          <View style={{ marginTop: 22 }}>
            <View>
              <AddListModal closeModal={() => setAddTodoVisible(!addTodoVisible)} />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.head}>
        <View style={{
          backgroundColor: colors.blue,
          flex: 1,
          height: 1,
          alignSelf: "center"
        }} />
        <Text style={{ paddingHorizontal: 20, fontSize: 25 }}>
          Todo <Text style={{ color: colors.blue }}>Lists</Text>
        </Text>
        <View style={{
          backgroundColor: colors.blue,
          flex: 1,
          height: 1,
          alignSelf: "center"
        }} />
      </View>

      <View style={{ gap: 5 }} >
        <TouchableOpacity style={{
          borderWidth: 2,
          borderColor: colors.lightBlue,
          borderRadius: 4,
          padding: 16,
          alignItems: "center",
          justifyContent: "center"
        }}

          onPress={() => setAddTodoVisible(!addTodoVisible)}
        >
          <Feather name="plus" size={24} color={colors.blue} />
        </TouchableOpacity>
        <Text style={{ color: colors.blue }}>Add List</Text>
      </View>

      <View style={{ height: "40%" }}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TodoList setshow={()=>setShow(!show)} list={item} key={item.name} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50
  },
  head: {
    flexDirection: "row",
    paddingHorizontal: 20
  }
});
