import { Component } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MOVIES } from '../../data/movies.data';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { Seat } from '../../models/seat.model';
import { MatButtonModule } from '@angular/material/button';
import { Theatre } from '../../models/theatre.model';
import { THEATRES } from '../../data/show-time.data';

@Component({
  selector: 'app-seat-selection',
  imports: [MatCardModule,MatButtonModule,CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css'
})
export class SeatSelectionComponent {
   movie!: Movie;
  theatre!: Theatre;
  theatreName!: string;
  showTime!: string;
  selectedDate!: Date;

  seats: Seat[] = [];
  selectedSeats: Seat[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe(params => {
      if (!movieId || !params['date'] || !params['time'] || !params['theatre']) {
        this.router.navigate(['/movies']);
        return;
      }

      this.movie = MOVIES.find(m => m.id === movieId)!;
      this.theatreName = params['theatre'];
      this.showTime = params['time'];
      this.selectedDate = new Date(params['date']);

      this.theatre = THEATRES.find(t => t.name === this.theatreName)!;

      this.generateSeats();
    });
  }
getSeatPrice(type: 'BALCONY' | 'FIRST' | 'BOX'): number {
  return this.theatre.seatCategories?.find(c => c.type === type)?.price ?? 0;
}

  // 🔹 Generate seats from theatre config
  generateSeats(): void {
    this.seats = [];

    this.theatre.seatCategories?.forEach(category => {
      category.rows.forEach(row => {
        for (let i = 1; i <= category.seatsPerRow; i++) {
          this.seats.push({
            id: `${row}${i}`,
            row,
            number: i,
            category: category.type,
            price: category.price,
            booked: Math.random() < 0.25 // simulate booked seats
          });
        }
      });
    });
  }

  // 🔹 Get seats per category
  getSeats(type: 'BALCONY' | 'FIRST' | 'BOX'): Seat[] {
    return this.seats.filter(s => s.category === type);
  }

  // 🔹 Seat toggle
  toggleSeat(seat: Seat): void {
    if (seat.booked) return;

    seat.selected = !seat.selected;

    if (seat.selected) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
    }
  }
  get selectedSeatLabels(): string {
  return this.selectedSeats.length
    ? this.selectedSeats.map(s => s.id).join(', ')
    : '0';
}


  // 🔹 Total fare
  get totalFare(): number {
    return this.selectedSeats.reduce((sum, s) => sum + s.price, 0);
  }

  // 🔹 Continue to payment
  continue(): void {
    if (this.selectedSeats.length === 0) return;

    this.router.navigate(
      ['/payment', this.movie.id],
      {
        queryParams: {
          date: this.selectedDate.toISOString(),
          time: this.showTime,
          theatre: this.theatreName,
          seats: this.selectedSeats.map(s => s.id).join(','),
          amount: this.totalFare,
        }
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/show-times', this.movie.id], {
      queryParams: { date: this.selectedDate.toISOString() }
    });
  }
}
