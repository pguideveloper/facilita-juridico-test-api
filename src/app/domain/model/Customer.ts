export interface Coordinates {
  x: number;
  y: number;
}
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  coordinates: Coordinates;
}
