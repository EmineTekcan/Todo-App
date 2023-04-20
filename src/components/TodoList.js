import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import TodoListModal from './TodoListModal'
import { doc, deleteDoc } from "firebase/firestore";
import firebase_app from '../../firebaseConfig'
import { getFirestore } from "firebase/firestore";
import { Dimensions } from 'react-native';
import { Alert } from 'react-native';
import { showAlert, closeAlert } from 'react-native-customisable-alert';
import AwesomeAlert from 'react-native-awesome-alerts';

const db = getFirestore(firebase_app);

const TodoList = ({ list, setshow }) => {


    const [showListVisible, setShowListVisible] = useState(false)
    const [id, setId] = useState(list.id)
    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remainingCount = list.todos.filter(todo => !todo.completed).length;

    const [deleteShow, setDeleteShow] = useState(false)



    /*        Alert.alert(
        'Are you sure?',
        'Are you sure you want to delete this todo list?',
        [
            {
                text: 'No',
                onPress: () => setshow(),
                style: 'cancel',
            },
            {
                text: 'YES',
                onPress: async () => {
                    await deleteDoc(doc(db, "todolist", id))
                    setshow()
                },
                style: "default"
            },
        ]
    ); */






    return (
        <View>


            <AwesomeAlert
                show={deleteShow}
                showProgress={false}
                title="Are you sure?"
                message="Are you sure you want to delete this todo list?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => setDeleteShow(!deleteShow)}
                onConfirmPressed={async () => {
                    await deleteDoc(doc(db, "todolist", id))
                    setshow()
                }}
            />

            <Modal
                animationType="slide"
                visible={showListVisible}
                onRequestClose={() => {
                    setShowListVisible(!showListVisible)
                }}>
                <View style={{ marginTop: 22 }}>
                    <TodoListModal todoList={list} setShowVisible={() => setShowListVisible(!showListVisible)} />
                </View>
            </Modal>

            <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onLongPress={() => setDeleteShow(!deleteShow)} onPress={() => setShowListVisible(!showListVisible)} >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View >
    )
}

export default TodoList

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }
})