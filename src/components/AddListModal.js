import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../assets/colors'
import firebase_app from '../../firebaseConfig'
import { getFirestore, where } from "firebase/firestore";
import { addDoc, collection, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

const AddListModal = (props) => {

    const backgroundColors = ["#5CD859", "#6DA9E4", "#f979ad", "#AD7BE9", "#D159D8", "#FF8400", "#c2dbf7"]
    const [color, setColor] = useState(backgroundColors[0])
    const [name, setName] = useState("")



    const createTodo = async () => {
        try {
            const docRef = await addDoc(collection(db, "todolist"), {
                id: 0,
                name,
                color,
                todos: []
            });
            await updateDoc(docRef, {
                id: docRef.id
            })
            props.closeModal()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    const renderColor = () => {
        return (
            backgroundColors.map((color, index) => {
                return (
                    <TouchableOpacity key={index} style={[styles.colorSelect, { backgroundColor: color }]} onPress={() => setColor(color)} />
                )
            })
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.closeModal} >
                <AntDesign name='close' size={24} style={{ position: "absolute", right: 32 }} />
            </TouchableOpacity>
            <View style={{ alignSelf: "stretch", marginHorizontal: 32, marginTop: "30%" }}>
                <Text style={styles.title} >Create Todo List</Text>
                <TextInput placeholder='List Name?' style={styles.input} onChangeText={(text) => setName(text)} />
                <View style={{ flexDirection: "row", marginBottom: "20%", justifyContent: "space-between" }}>
                    {renderColor()}
                </View>

                <TouchableOpacity style={[styles.create, { backgroundColor: color }]} onPress={() => createTodo()} >
                    <Text style={{ color: colors.white, fontWeight: "600", fontSize: 20 }}>Create!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddListModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        height: Dimensions.get("window").height * 0.05,
        fontSize: 28,
        alignSelf: "center"
    },
    input: {
        height: Dimensions.get("window").height * 0.06,
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.lightBlue,
    },
    create: {
        height: Dimensions.get("window").height * 0.06,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    colorSelect: {
        height: Dimensions.get("window").height * 0.04,
        width: Dimensions.get("window").height * 0.04,
        borderRadius: 5
    }
})