import type React from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"

interface ButtonBoardProps {
  onRequest: (floor: number) => void
  maxFloor: number
  currentFloor: number
  onFloorChange: (floor: number) => void
}

const ButtonBoard: React.FC<ButtonBoardProps> = ({ onRequest, maxFloor, currentFloor, onFloorChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Floor: {currentFloor}</Text>
      <View style={styles.buttonContainer}>
        {Array.from({ length: maxFloor }, (_, i) => i + 1).reverse().map((floor) => (
          <TouchableOpacity
            key={floor}
            style={[styles.button, floor === currentFloor && styles.currentFloorButton]}
            onPress={() => onRequest(floor)}
          >
            <Text style={styles.buttonText}>{floor}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.floorChangeContainer}>
        <TouchableOpacity
          style={styles.floorChangeButton}
          onPress={() => onFloorChange(Math.max(1, currentFloor - 1))}
        >
          <Text style={styles.floorChangeButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.floorChangeText}>Change Current Floor</Text>
        <TouchableOpacity
          style={styles.floorChangeButton}
          onPress={() => onFloorChange(Math.min(maxFloor, currentFloor + 1))}
        >
          <Text style={styles.floorChangeButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 150,
  },
  button: {
    backgroundColor: "#333",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderWidth: 2,
    borderColor: "#555",
  },
  currentFloorButton: {
    backgroundColor: "#FFA500",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  floorChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  floorChangeButton: {
    backgroundColor: "#2196F3",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  floorChangeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  floorChangeText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
})

export default ButtonBoard