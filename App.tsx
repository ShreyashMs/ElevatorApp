import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import ElevatorSystem from "./src/components/ElevatorSystem"
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.gradient}>
          <ElevatorSystem />
        </LinearGradient>
      </SafeAreaView>
      <Toast />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
})

export default App