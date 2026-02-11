import { Component } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MOVIES } from '../../data/movies.data';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-page',
  imports: [MatCardModule,MatButtonModule,DatePipe,
    CommonModule,MatRadioModule,FormsModule,MatIconModule
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
 movie!: Movie;
  selectedDate!: Date;
  showTime!: string;
  theatre!: string;

  selectedSeats: string[] = [];
  totalAmount!: number;

  paymentMethod = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe(params => {
      if (
        !movieId ||
        !params['date'] ||
        !params['time'] ||
        !params['theatre'] ||
        !params['seats'] ||
        !params['amount']
      ) {
        this.router.navigate(['/movies']);
        return;
      }

      this.movie = MOVIES.find(m => m.id === movieId)!;
      this.selectedDate = new Date(params['date']);
      this.showTime = params['time'];
      this.theatre = params['theatre'];

      this.selectedSeats = params['seats'].split(',');
      this.totalAmount = Number(params['amount']);
    });
  }

  get convenienceFee():number{
    return this.selectedSeats.length * 25;
  }
  get gstAmount():number{
    return +(this.convenienceFee * 0.18).toFixed(2)
  }
  get grandTotal():number{
    return this.totalAmount + this.convenienceFee + this.gstAmount
  }

  payNow(): void {
    if (!this.paymentMethod) return;

    this.router.navigate(['/payment-method',this.movie.id], {
      queryParams: {
        movie: this.movie.name,
        date: this.selectedDate.toISOString(),
        time: this.showTime,
        theatre: this.theatre,
        seats: this.selectedSeats.join(','),
        amount: this.grandTotal,
        paymentMethod:this.paymentMethod
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/seat-selection', this.movie.id], {
      queryParams: {
        date: this.selectedDate.toISOString(),
        time: this.showTime,
        theatre: this.theatre
      }
    });
  }
}
