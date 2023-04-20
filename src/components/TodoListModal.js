import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Keyboard, Animated, Image, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import firebase_app from '../../firebaseConfig'
import { getFirestore, namedQuery, where } from "firebase/firestore";
import { addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Swipelist from 'react-native-swipeable-list-view';

const db = getFirestore(firebase_app);

const TodoListModal = ({ todoList, setShowVisible }) => {


    const [added, setAdded] = useState(false)
    const [todoName, setTodoName] = useState("")

    const [id, setId] = useState(todoList.id)
    const [name, setName] = useState(todoList.name);
    const [color, setColor] = useState(todoList.color)
    const [todos, setTodos] = useState(todoList.todos)
    const completedCount = todoList.todos.filter(todo => todo.completed).length;
    const remainingCount = todoList.todos.filter(todo => !todo.completed).length;

    const getData = async () => {
        try {
            datas = []
            const querySnapshot = await getDocs(collection(db, "todolist/" + todoList.id));
            querySnapshot.forEach((doc) => {
                datas.push(doc.data().todos)
            });
            setData(datas)
        } catch (error) {
            console.log(error)
        }
    }
    const addTodo = async () => {
        try {
            const examcollref = await doc(db, 'todolist/' + todoList.id)
            todos.push({
                title: todoName,
                completed: false
            })
            await updateDoc(examcollref, {
                todos: todos
            })
            setAdded(!added)

        } catch (error) {
            console.log(error)
        }
    }

    const setCompleted = async (title) => {
        try {
            const examcollref = await doc(db, 'todolist/' + todoList.id)
            todos.filter(function (todo) {
                return todo.title == title ? todo.completed = !todo.completed : null;
            }
            );
            await updateDoc(examcollref, {
                todos: todos
            })
            setAdded(!added)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async (title) => {
        try {
            const examcollref = await doc(db, 'todolist/' + todoList.id)
            todos.pop(function (todo) {
                return todo.title != title
            }
            );
            await updateDoc(examcollref, {
                todos: todos
            })
            setAdded(!added)
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <KeyboardAvoidingView style={styles.container}>
            <View>
                <TouchableOpacity
                    onPress={() => setShowVisible()}

                >
                    <AntDesign style={{
                        position: "absolute",
                        right: 20,
                    }} name="close" size={25} color="black" />
                </TouchableOpacity>
            </View>

            <View style={[styles.mid, { borderBottomColor: todoList.color }]}>
                <Text style={styles.name} >{todoList.name}</Text>
                <Text>{completedCount} of {todoList.todos.length} tasks</Text>
            </View>

            <View style={{ marginHorizontal: 32, gap: 10, flexDirection: "row" ,paddingHorizontal:5}}>
                <TextInput placeholder='' style={{ borderColor: color, borderWidth: 1, flex: 1, borderRadius: 5,paddingHorizontal:5 }} onChangeText={(text) => setTodoName(text)} />
                <TouchableOpacity onPress={() => addTodo()} style={{ backgroundColor: color, width: 50, borderRadius: 5, padding: 8, alignItems: "center", justifyContent: "center" }}>
                    <AntDesign name='plus' size={26} color={colors.white} />
                </TouchableOpacity>
            </View>

            <View>
                <Swipelist
                    data={todos}
                    renderRightItem={(item, index) => {
                        return (

                            <View style={styles.todoContainer}>
                                <TouchableOpacity onPress={() => setCompleted(item.title)}  >
                                    <Ionicons name={item.completed ? "ios-square" : "ios-square-outline"} size={24} color={colors.gray} style={{ width: 32 }} />
                                </TouchableOpacity>

                                <Text style={[styles.todo, {
                                    color: item.completed ? colors.gray : colors.black,
                                    textDecorationLine: item.completed ? "line-through" : "none"

                                }]} > {item.title}</Text>
                            </View >

                        )
                    }}
                    renderHiddenItem={(data, index) => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[styles.rightAction, { backgroundColor: '#ff2323' }]}
                                onPress={() => deleteTodo(data.title)}
                            >
                                {/* 
                                
                                <Image
                                    source={require('../../assets/delete.png')}
                                    style={{ width: 30, height: 30 ,backgroundColor:"white"}}
                                />
                                
                                */}
                                <AntDesign name="delete" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={Dimensions.get("window").width * 0.2}
                />
            </View>

        </KeyboardAvoidingView>

    )
}

export default TodoListModal

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        gap: 20
    },
    mid: {
        marginTop: "20%",
        borderBottomWidth: 1.5,
        marginLeft: "10%"
    },
    name: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32
    },

    rightAction: {
        width: '60%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 10,
    },

})