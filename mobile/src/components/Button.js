import { Pressable, StyleSheet, Text } from "react-native"

export default function Button({onPress, children}){
    return(
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: ({pressed}) => [{
        backgroundColor: pressed ? '#8DB986': '#ACCE91',
        alignItems: 'center',
        marginVertical: 10, 
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 30
    }],
    text:{
        fontWeight: 600,
        fontSize: 13
    }
    
})