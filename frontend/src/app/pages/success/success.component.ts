import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-success',
  imports: [MatCardModule,MatIconModule,DatePipe,MatButtonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
movieName!: string;
  selectedDate!: Date;
  showTime!: string;
  theatre!: string;

  seats: string[] = [];
  amount!: number;
  bookingId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      if (
        !params['movie'] ||
        !params['date'] ||
        !params['time'] ||
        !params['theatre'] ||
        !params['seats'] ||
        !params['amount']
      ) {
        this.router.navigate(['/movies']);
        return;
      }

      this.movieName = params['movie'];
      this.selectedDate = new Date(params['date']);
      this.showTime = params['time'];
      this.theatre = params['theatre'];

      this.seats = params['seats'].split(',');
      this.amount = Number(params['amount']);

      this.bookingId = this.generateBookingId();
setTimeout(() => {
      lottie.loadAnimation({
        container: document.getElementById('success-lottie')!,
        renderer: 'svg',
        loop: false,      // ✅ play once
        autoplay: true,
        path: 'animations/payment-success.json'
      });
    });
    
      setTimeout(() => {
        this.router.navigate(['/movies']);
      }, 5000);
    });
  }

  get seatCount(): number {
    return this.seats.length;
  }

  generateBookingId(): string {
    return 'BK' + Math.floor(100000 + Math.random() * 900000);
  }

  bookAgain(): void {
    this.router.navigate(['/movies']);
  }
}
