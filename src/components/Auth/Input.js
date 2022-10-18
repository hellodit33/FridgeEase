import { View, Text, TextInput, StyleSheet } from "react-native";

import Colors from "../../../constants/Colors";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  placeholderTextColor,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    color: Colors.green,
  },
  label: {
    marginBottom: 4,
    color: Colors.green,
    fontWeight: "bold",
  },
  labelInvalid: {
    color: "black",
  },
  input: {
    paddingVertical: 7,
    backgroundColor: "white",
    color: Colors.green,
    borderRadius: 120,
    fontSize: 16,
    borderColor: Colors.green,
    borderWidth: 4,
    paddingHorizontal: 12,
  },
  inputInvalid: {
    backgroundColor: Colors.green,
  },
});
