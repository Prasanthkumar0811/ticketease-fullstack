import { SeatCategory } from "./seat-category.model";

export interface Theatre {
  id: number;
  name: string;
  shows: string[];
  seatCategories?:SeatCategory[];
}