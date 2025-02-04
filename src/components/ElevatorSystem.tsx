import { useState, useCallback, useEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import Toast from 'react-native-toast-message'
import Elevator from "./Elevator"
import ButtonBoard from "./ButtonBoard"
import { findClosestElevator, ElevatorState } from "../utils"

const NUM_ELEVATORS = 3
const MAX_FLOOR = 7
const MAX_PEOPLE = 5
const WAIT_TIME = 2000 

interface ExtendedElevatorState extends ElevatorState {
  id: number
  direction: "up" | "down" | null
  people: number
}

const ElevatorSystem = () => {
  const [elevators, setElevators] = useState<ExtendedElevatorState[]>(
    Array(NUM_ELEVATORS)
      .fill(null)
      .map((_, index) => ({
        id: index,
        currentFloor: 1,
        targetFloor: null,
        status: "idle",
        direction: null,
        people: 0,
      })),
  )

  const [currentFloor, setCurrentFloor] = useState(1)

  const handleElevatorRequest = useCallback(
    (targetFloor: number) => {
      const availableElevator = findClosestElevator(elevators, currentFloor)
      if (availableElevator !== -1) {
        setElevators((prev) => {
          const newElevators = [...prev]
          const elevator = newElevators[availableElevator]

          if (elevator.currentFloor === currentFloor && currentFloor === targetFloor) {
            Toast.show({
              type: 'info',
              text1: 'Already on the requested floor',
            })
            return newElevators
          }

          if (elevator.currentFloor === currentFloor) {
            elevator.targetFloor = targetFloor
            elevator.status = "moving"
            elevator.direction = targetFloor > currentFloor ? "up" : "down"
            elevator.people = MAX_PEOPLE
            Toast.show({
              type: 'success',
              text1: `Elevator ${availableElevator + 1} is moving to floor ${targetFloor}`,
            })
          } else {
            elevator.targetFloor = currentFloor
            elevator.status = "moving"
            elevator.direction = currentFloor > elevator.currentFloor ? "up" : "down"
            elevator.people = 0
            Toast.show({
              type: 'info',
              text1: `Elevator ${availableElevator + 1} is coming to your floor`,
            })
          }

          return newElevators
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'No available elevators',
        })
      }
    },
    [elevators, currentFloor],
  )

  const handleFloorChange = useCallback((newFloor: number) => {
    setCurrentFloor(newFloor)
    Toast.show({
      type: 'info',
      text1: `Current floor changed to ${newFloor}`,
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setElevators((prev) =>
        prev.map((elevator) => {
          if (elevator.status === "moving" && elevator.targetFloor !== null) {
            if (elevator.currentFloor === elevator.targetFloor) {
              if (elevator.people > 0) {
                Toast.show({
                  type: 'success',
                  text1: `Elevator ${elevator.id + 1} arrived at floor ${elevator.currentFloor}`,
                })
                return {
                  ...elevator,
                  status: "idle",
                  direction: null,
                  people: 0,
                  targetFloor: null,
                }
              } else {
                Toast.show({
                  type: 'info',
                  text1: `Elevator ${elevator.id + 1} waiting at floor ${elevator.currentFloor}`,
                })
                return {
                  ...elevator,
                  status: "waiting",
                  direction: null,
                }
              }
            }else{
              if (elevator.people > 0) {
                Toast.show({
                  type: 'info',
                  text1: `Elevator ${elevator.id + 1} moving to floor ${elevator.targetFloor}`,
                })
              } else {
                Toast.show({
                  type: 'info',
                  text1: `Elevator ${elevator.id + 1} moving to floor ${elevator.currentFloor}`,
                })
              }
            }

            const newFloor = elevator.direction === "up" ? elevator.currentFloor + 1 : elevator.currentFloor - 1

            return { ...elevator, currentFloor: newFloor }
          }

          if (elevator.status === "waiting") {
            setTimeout(() => {
              setElevators((prevElevators) => {
                const updatedElevators = [...prevElevators]
                const updatedElevator = updatedElevators[elevator.id]
                if (updatedElevator.status === "waiting") {
                  updatedElevator.status = "moving"
                  updatedElevator.people = MAX_PEOPLE
                  Toast.show({
                    type: 'success',
                    text1: `Elevator ${elevator.id + 1} is now moving to floor ${updatedElevator.targetFloor}`,
                  })
                }
                return updatedElevators
              })
            }, WAIT_TIME)
          }

          return elevator
        }),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elevator System</Text>
  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  elevatorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
})

export default ElevatorSystem