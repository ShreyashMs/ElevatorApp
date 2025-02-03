export interface ElevatorState {
  currentFloor: number;
  targetFloor: number | null;
  status: "idle" | "moving" | "waiting";
}

export const findClosestElevator = (elevators: ElevatorState[], targetFloor: number): number => {
  let closestElevator = -1;
  let minDistance = Number.POSITIVE_INFINITY;

  elevators.forEach((elevator, index) => {
    if (elevator.status === "idle") {
      const distance = Math.abs(elevator.currentFloor - targetFloor);
      if (distance < minDistance) {
        minDistance = distance;
        closestElevator = index;
      }
    }
  });

  return closestElevator;
};