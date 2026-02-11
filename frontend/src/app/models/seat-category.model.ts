export interface SeatCategory {
  type: 'BALCONY' | 'FIRST' | 'BOX';
  price: number;
  rows: string[];
  seatsPerRow: number;
}
