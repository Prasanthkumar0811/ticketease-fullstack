import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import lottie from 'lottie-web';

@Component({
  selector: 'app-payment-method',
  imports: [CommonModule,MatButtonModule,
    MatCardModule,MatFormFieldModule,MatSnackBarModule,MatProgressSpinnerModule,
    MatInputModule,ReactiveFormsModule,MatIconModule
  ],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent {
movie!: string;
movieId!: number;
  selectedDate!: Date;
  showTime!: string;
  theatre!: string;
  seats: string[] = [];
  amount!: number;
  paymentMethod!: 'upi' | 'card' | 'netbanking';

  paymentForm!: FormGroup;
  isProcessing = false;
  paymentCompleted=false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    
  this.movieId = Number(this.route.snapshot.paramMap.get('id')) 
    this.route.queryParams.subscribe(params => {
      this.movie = params['movie'];
      this.selectedDate = new Date(params['date']);
      this.showTime = params['time'];
      this.theatre = params['theatre'];
      this.seats = params['seats'].split(',');
      this.amount = Number(params['amount']);
      this.paymentMethod = params['paymentMethod'];

      this.buildForm();
    });
  }

  buildForm(): void {
    if (this.paymentMethod === 'upi') {
      this.paymentForm = this.fb.group({
        upiId: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{3,}$/)
          ]
        ]
      });
    }

    if (this.paymentMethod === 'card') {
      this.paymentForm = this.fb.group({
        cardNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{16}$/)]
        ],
        expiry: [
          '',
          [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),this.expiryValidator.bind(this)]
        ],
        cvv: [
          '',
          [Validators.required, Validators.pattern(/^\d{3}$/)]
        ]
      });
    }

    if (this.paymentMethod === 'netbanking') {
      this.paymentForm = this.fb.group({
        accountNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{9,18}$/)]
        ],
        ifsc: [
          '',
          [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]
        ],
        accountHolder: ['', Validators.required]
      });
    }
  }
  onSuccess(msg: string): void {
  this.snackBar.open(msg, 'OK', {
    duration: 1000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}

private expiryValidator(control: any) {
  const value = control.value;
  if (!value) return null;

  const [month, year] = value.split('/');
  const expMonth = parseInt(month, 10) - 1;
  const expYear = parseInt('20' + year, 10);

  const lastDayOfMonth = new Date(expYear, expMonth + 1, 0);
  const today = new Date();

  return lastDayOfMonth >= today ? null : { expired: true };
}

 submitPayment(): void {
  if (this.paymentForm.invalid) return;

  const confirmPay = confirm(
    `Are you sure you want to pay ₹${this.amount}?`
  );

  if (!confirmPay) return;

  // show spinner
  this.isProcessing = true;

  // simulate payment processing
  setTimeout(() => {
    this.isProcessing = false;
    this.paymentCompleted=true;
    setTimeout(() => {
       lottie.loadAnimation({
        container: document.getElementById('lottie-container')!,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/payment-processing.json'
       })
    });

    // reusable snackbar call ✅
    this.onSuccess('Payment successful 🎉');

    // wait for snackbar to finish, then redirect
    setTimeout(() => {
      this.router.navigate(['/success'], {
        queryParams: {
          movie: this.movie,
          date: this.selectedDate.toISOString(),
          time: this.showTime,
          theatre: this.theatre,
          seats: this.seats.join(','),
          amount: this.amount
        }
      });
    }, 2500);

  }, 3000);
}


  goBack(): void {
    this.router.navigate(
    ['/payment', this.movieId],   // ✅ required param
    {
      queryParams: {
        movie: this.movie,
        date: this.selectedDate.toISOString(),
        time: this.showTime,
        theatre: this.theatre,
        seats: this.seats.join(','),
        amount: this.amount
      }
    }
  );
  }

  
}
