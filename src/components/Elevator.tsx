import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import Svg, { Rect, Text as SvgText } from "react-native-svg"
import { ElevatorState } from "../utils"

interface ElevatorProps extends ElevatorState {
  id: number
  direction: "up" | "down" | null
  people: number
  maxFloor: number
}

const Elevator: React.FC<ElevatorProps> = React.memo(({ id, currentFloor, targetFloor, status, direction, people, maxFloor }) => {
  const animatedValue = useRef(new Animated.Value(maxFloor - currentFloor)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: maxFloor - currentFloor,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [currentFloor, maxFloor, animatedValue])

  const AnimatedRect = Animated.createAnimatedComponent(Rect)

  const getStatusColor = () => {
    switch (status) {
      case "moving":
        return "#FFA500"
      case "waiting":
        return "#4CAF50"
      default:
        return "#2196F3"
    }
  }

  return (
    <View style={styles.container}>
      <Svg height={maxFloor * 40 + 20} width={100}>
        <Rect x={25} y={0} width={50} height={maxFloor * 40 + 20} fill="#333" />
        {Array.from({ length: maxFloor }).map((_, index) => (
          <SvgText
            key={index}
            x={15}
            y={(maxFloor - index - 1) * 40 + 25}
            fill="#FFFFFF"
            fontSize="12"
            textAnchor="end"
          >
            {index + 1}
          </SvgText>
        ))}
        {Array.from({ length: maxFloor }).map((_, index) => (
          <Rect key={index} x={25} y={index * 40} width={50} height={1} fill="#555" />
        ))}
        <AnimatedRect
          x={30}
          y={0}
          width={40}
          height={35}
          fill={getStatusColor()}
          translateY={animatedValue.interpolate({
            inputRange: [0, maxFloor - 1],
            outputRange: [0, (maxFloor - 1) * 40],
          })}
        />
      </Svg>
      <View style={styles.infoContainer}>
        <Text style={styles.floorText}>Floor: {currentFloor}</Text>
        <Text style={styles.statusText}>{status}</Text>
        {direction && <Text style={styles.directionText}>{direction}</Text>}
        <Text style={styles.peopleText}>People: {people}</Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 10,
    minHeight: 80,
  },
  floorText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  statusText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  directionText: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: 5,
  },
  peopleText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 5,
  },
})

export default Elevator