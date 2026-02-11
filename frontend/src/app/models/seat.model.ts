export interface Seat {
  id: string;          // A1, B5
  row: string;         // A, B, C
  number: number;      // 1, 2, 3
  category: 'BALCONY' | 'FIRST' | 'BOX';
  price: number;
  booked: boolean;
  selected?: boolean;
}
