import { Customer } from '../domain/model/Customer';

interface Point {
  x: number;
  y: number;
}

export function calculateRoute(customers: Customer[]) {
  const n = customers.length;

  // Define the first route and the last, on our case is the company.
  let route = [0];
  let remainingPoints = Array.from({ length: n }, (_, i) => i).slice(1);

  while (remainingPoints.length > 0) {
    let minDistance = Infinity;
    let insertionPoint = -1;
    let newPoint = -1;

    for (let i = 0; i < route.length; i++) {
      for (let j = 0; j < remainingPoints.length; j++) {
        const distanceToExisting = distanceBetweenTwoPoints(
          customers[route[i]].coordinates,
          customers[remainingPoints[j]].coordinates
        );

        if (distanceToExisting < minDistance) {
          minDistance = distanceToExisting;
          insertionPoint = i;
          newPoint = remainingPoints[j];
        }
      }
    }

    route.splice(insertionPoint + 1, 0, newPoint);
    remainingPoints = remainingPoints.filter((point) => point !== newPoint);
  }

  // Return to the first route
  route.push(0);

  // Map the customer object
  const optimizedRoute = route.map((index) => customers[index]);
  return optimizedRoute;
}

/**
 * Calculate the distance between two points based on Euclidean formula
 * @param pointA
 * @param pointB
 * @returns
 */
function distanceBetweenTwoPoints(pointA: Point, pointB: Point) {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );
}
