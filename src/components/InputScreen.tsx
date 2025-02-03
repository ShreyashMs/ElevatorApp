import type React from "react"
import { useState } from "react"
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native"

interface InputScreenProps {
  onRequest: (people: number, targetFloor: number) => void
  maxFloor: number
}

const InputScreen: React.FC<InputScreenProps> = ({ onRequest, maxFloor }) => {
  const [people, setPeople] = useState("")
  const [floor, setFloor] = useState("")
  const [error, setError] = useState("")

  const handleRequest = () => {
    const peopleNum = Number.parseInt(people, 10)
    const floorNum = Number.parseInt(floor, 10)

    if (isNaN(peopleNum) || isNaN(floorNum)) {
      setError("Please enter valid numbers")
      return
    }

    if (floorNum < 1 || floorNum > maxFloor) {
      setError(`Please enter a floor between 1 and ${maxFloor}`)
      return
    }

    setError("")
    onRequest(peopleNum, floorNum)
    setPeople("")
    setFloor("")
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Number of people"
        placeholderTextColor="#CCCCCC"
        keyboardType="numeric"
        value={people}
        onChangeText={setPeople}
      />
      <TextInput
        style={styles.input}
        placeholder={`Target floor (1-${maxFloor})`}
        placeholderTextColor="#CCCCCC"
        keyboardType="numeric"
        value={floor}
        onChangeText={setFloor}
      />
      <TouchableOpacity style={styles.button} onPress={handleRequest}>
        <Text style={styles.buttonText}>Request Elevator</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  error: {
    color: "#FF5252",
    marginTop: 10,
    textAlign: "center",
  },
})

export default InputScreen

