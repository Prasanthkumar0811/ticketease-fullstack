import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

movie!: Movie;
  date!: Date;
  time!: string;
  theatre!: string;

  seats: Seat[] = [];
  totalAmount = 0;

  clear(): void {
    this.movie = undefined!;
    this.date = undefined!;
    this.time = '';
    this.theatre = '';
    this.seats = [];
    this.totalAmount = 0;
  }}
