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
        backgroundColor: pressed ? '#f0da8c': '#ebce73',
        alignItems: 'center',
        marginVertical: 2, 
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 30,
        maxWidth:150,
        justifyContent: 'center',
    }],
 
    text:{
        fontWeight: 600,
        fontSize: 12
    }
    
})